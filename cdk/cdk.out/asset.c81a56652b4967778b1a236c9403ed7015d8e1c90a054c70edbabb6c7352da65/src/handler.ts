import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import {
  PutCommand,
  GetCommand,
  ScanCommand,
  QueryCommand,
  UpdateCommand,
  DeleteCommand
} from "@aws-sdk/lib-dynamodb";
import { getDynamoDBClient } from "./config";
import * as jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { 
  Appointment, 
  AppointmentCreateRequest, 
  AppointmentUpdateRequest, 
  AppointmentFilters,
  AppointmentStatus 
} from "./types";
import { createLogger, withLogging, PerformanceMonitor } from "../../../shared/logger";

const TABLE = process.env.APPOINTMENTS_TABLE || "AppointmentsTable";
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

const doc = getDynamoDBClient();
const logger = createLogger(process.env.SERVICE_NAME || 'appointments');

// Ensure DynamoDB is using local endpoint in test environment
if (process.env.DYNAMODB_ENDPOINT) {
  logger.info("Using local DynamoDB endpoint", { endpoint: process.env.DYNAMODB_ENDPOINT });
}

function jsonResponse(statusCode: number, body: any): APIGatewayProxyResultV2 {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  };
}

function verifyAuth(event: APIGatewayProxyEventV2) {
  const auth = event.headers?.authorization || event.headers?.Authorization;
  if (!auth) return null;
  const match = auth.match(/^Bearer\s+(.+)$/i);
  if (!match) return null;
  try {
    return jwt.verify(match[1], JWT_SECRET) as any;
  } catch (e) {
    return null;
  }
}

function validateAppointmentData(data: AppointmentCreateRequest): string[] {
  const errors: string[] = [];
  
  if (!data.patientId || data.patientId.trim().length === 0) {
    errors.push("Patient ID is required");
  }
  
  if (!data.doctorId || data.doctorId.trim().length === 0) {
    errors.push("Doctor ID is required");
  }
  
  if (!data.scheduleDate) {
    errors.push("Schedule date is required");
  } else {
    const scheduleDate = new Date(data.scheduleDate);
    if (isNaN(scheduleDate.getTime())) {
      errors.push("Invalid schedule date format");
    } else if (scheduleDate < new Date()) {
      errors.push("Schedule date cannot be in the past");
    }
  }
  
  if (data.duration !== undefined && (data.duration < 15 || data.duration > 180)) {
    errors.push("Duration must be between 15 and 180 minutes");
  }
  
  if (data.paymentAmount !== undefined && data.paymentAmount < 0) {
    errors.push("Payment amount cannot be negative");
  }
  
  return errors;
}

function parseFilters(queryParams: Record<string, string | undefined> | null): AppointmentFilters {
  const filters: AppointmentFilters = {};
  
  if (!queryParams) return filters;
  
  if (queryParams.status) {
    const statuses = queryParams.status.split(',') as AppointmentStatus[];
    filters.status = statuses.length === 1 ? statuses[0] : statuses;
  }
  
  if (queryParams.fromDate) {
    filters.fromDate = queryParams.fromDate;
  }
  
  if (queryParams.toDate) {
    filters.toDate = queryParams.toDate;
  }
  
  if (queryParams.patientId) {
    filters.patientId = queryParams.patientId;
  }
  
  if (queryParams.doctorId) {
    filters.doctorId = queryParams.doctorId;
  }
  
  return filters;
}

async function getFilteredAppointments(filters: AppointmentFilters): Promise<Appointment[]> {
  let appointments: Appointment[] = [];
  
  if (filters.patientId) {
    // Query by patient index
    const result = await doc.send(new QueryCommand({
      TableName: TABLE,
      IndexName: "patient-index",
      KeyConditionExpression: "patientId = :patientId",
      ExpressionAttributeValues: { ":patientId": filters.patientId }
    }));
    appointments = result.Items as Appointment[] || [];
  } else if (filters.doctorId) {
    // Query by doctor index
    const result = await doc.send(new QueryCommand({
      TableName: TABLE,
      IndexName: "doctor-index",
      KeyConditionExpression: "doctorId = :doctorId",
      ExpressionAttributeValues: { ":doctorId": filters.doctorId }
    }));
    appointments = result.Items as Appointment[] || [];
  } else {
    // Scan all appointments
    const result = await doc.send(new ScanCommand({ TableName: TABLE }));
    appointments = result.Items as Appointment[] || [];
  }
  
  // Apply additional filters
  return appointments.filter(appointment => {
    // Status filter
    if (filters.status) {
      const statusArray = Array.isArray(filters.status) ? filters.status : [filters.status];
      if (!statusArray.includes(appointment.appointmentStatus)) {
        return false;
      }
    }
    
    // Date range filter
    if (filters.fromDate && appointment.scheduleDate < filters.fromDate) {
      return false;
    }
    
    if (filters.toDate && appointment.scheduleDate > filters.toDate) {
      return false;
    }
    
    return true;
  });
}

const handlerImpl = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const path = event.rawPath || (event.requestContext as any).http?.path || "/";
  const method = (event.requestContext as any).http?.method || event.requestContext?.http?.method;
  const requestId = (event.requestContext as any).requestId;
  
  const logContext = {
    requestId,
    path,
    method,
    userAgent: event.headers?.['user-agent'],
    ip: event.requestContext?.http?.sourceIp
  };

  try {
    // Create a new appointment
    if (path === "/appointments" && method === "POST") {
      const monitor = new PerformanceMonitor(logger, 'create_appointment', logContext);
      
      const body = event.body ? JSON.parse(event.body) : {};
      const validationErrors = validateAppointmentData(body);
      
      if (validationErrors.length > 0) {
        logger.logValidationError(validationErrors, logContext);
        monitor.end(false);
        return jsonResponse(400, { message: "Validation failed", errors: validationErrors });
      }
      
      const appointmentId = uuidv4();
      const now = new Date().toISOString();
      const appointmentContext = { ...logContext, appointmentId, patientId: body.patientId, doctorId: body.doctorId };
      
      logger.info('Processing appointment creation request', appointmentContext);
      
      const appointment: Appointment = {
        appointmentId,
        patientId: body.patientId,
        doctorId: body.doctorId,
        appointmentStatus: 'scheduled',
        scheduleDate: body.scheduleDate,
        duration: body.duration || 30,
        videoLink: body.videoLink,
        paymentId: body.paymentId,
        paymentStatus: body.paymentStatus || 'pending',
        paymentAmount: body.paymentAmount,
        notes: body.notes,
        symptoms: body.symptoms || [],
        createdAt: now
      };
      
      const dbStart = Date.now();
      await doc.send(new PutCommand({ TableName: TABLE, Item: appointment }));
      logger.logDatabaseOperation('put', TABLE, true, Date.now() - dbStart, appointmentContext);
      
      logger.logBusinessLogic('appointment_creation', true, { 
        appointmentId, 
        patientId: body.patientId, 
        doctorId: body.doctorId, 
        scheduleDate: body.scheduleDate 
      }, appointmentContext);
      monitor.end(true, { appointmentId });
      
      return jsonResponse(201, { appointmentId, message: "Appointment created successfully" });
    }

    // Get all appointments with filters
    if (path === "/appointments" && method === "GET") {
      const monitor = new PerformanceMonitor(logger, 'get_appointments', logContext);
      
      const filters = parseFilters(event.queryStringParameters || null);
      logger.info('Fetching appointments with filters', { ...logContext, filters });
      
      const appointments = await getFilteredAppointments(filters);
      
      monitor.end(true, { itemCount: appointments.length });
      return jsonResponse(200, { appointments });
    }

    // Get appointments for a specific patient
    if (path === "/appointments/patient" && method === "GET") {
      const monitor = new PerformanceMonitor(logger, 'get_patient_appointments', logContext);
      
      const patientId = (event.queryStringParameters || {})["patientId"];
      if (!patientId) {
        logger.logValidationError(['patientId query parameter required'], logContext);
        monitor.end(false);
        return jsonResponse(400, { message: "patientId query parameter is required" });
      }
      
      const patientContext = { ...logContext, patientId };
      logger.info('Fetching appointments for patient', patientContext);
      
      const filters = parseFilters(event.queryStringParameters || null);
      filters.patientId = patientId;
      const appointments = await getFilteredAppointments(filters);
      
      monitor.end(true, { itemCount: appointments.length });
      return jsonResponse(200, { appointments });
    }

    // Get appointments for a specific doctor
    if (path === "/appointments/doctor" && method === "GET") {
      const monitor = new PerformanceMonitor(logger, 'get_doctor_appointments', logContext);
      
      const doctorId = (event.queryStringParameters || {})["doctorId"];
      if (!doctorId) {
        logger.logValidationError(['doctorId query parameter required'], logContext);
        monitor.end(false);
        return jsonResponse(400, { message: "doctorId query parameter is required" });
      }
      
      const doctorContext = { ...logContext, doctorId };
      logger.info('Fetching appointments for doctor', doctorContext);
      
      const filters = parseFilters(event.queryStringParameters || null);
      filters.doctorId = doctorId;
      const appointments = await getFilteredAppointments(filters);
      
      monitor.end(true, { itemCount: appointments.length });
      return jsonResponse(200, { appointments });
    }

    // Handle appointment-specific routes
    const appointmentIdMatch = path.match(/^\/appointments\/([^\/]+)(\/.*)?$/);
    if (appointmentIdMatch) {
      const appointmentId = decodeURIComponent(appointmentIdMatch[1]);
      const subPath = appointmentIdMatch[2] || "";
      const appointmentContext = { ...logContext, appointmentId };

      // Get specific appointment details
      if (subPath === "" && method === "GET") {
        const monitor = new PerformanceMonitor(logger, 'get_appointment', appointmentContext);
        
        logger.info('Fetching appointment details', appointmentContext);
        
        const dbStart = Date.now();
        const result = await doc.send(new GetCommand({ 
          TableName: TABLE, 
          Key: { appointmentId } 
        }));
        logger.logDatabaseOperation('get', TABLE, true, Date.now() - dbStart, appointmentContext);
        
        if (!result.Item) {
          logger.warn('Appointment not found', appointmentContext);
          monitor.end(false);
          return jsonResponse(404, { message: "Appointment not found" });
        }
        
        const appointment = result.Item as Appointment;
        const fullContext = { ...appointmentContext, patientId: appointment.patientId, doctorId: appointment.doctorId };
        
        monitor.end(true);
        return jsonResponse(200, result.Item);
      }

      // Update appointment
      if (subPath === "" && method === "PUT") {
        const monitor = new PerformanceMonitor(logger, 'update_appointment', appointmentContext);
        
        const body = event.body ? JSON.parse(event.body) : {};
        const updateData: AppointmentUpdateRequest = body;
        
        logger.info('Updating appointment', { ...appointmentContext, fieldsToUpdate: Object.keys(body) });
        
        // Build update expression
        const expressions = [];
        const attrVals: any = {};
        const attrNames: any = {};
        let i = 0;
        
        for (const [key, value] of Object.entries(updateData)) {
          if (value !== undefined) {
            i++;
            const nameKey = `#n${i}`;
            const valKey = `:v${i}`;
            expressions.push(`${nameKey} = ${valKey}`);
            attrNames[nameKey] = key;
            attrVals[valKey] = value;
          }
        }
        
        if (expressions.length === 0) {
          logger.logValidationError(['no fields to update'], appointmentContext);
          monitor.end(false);
          return jsonResponse(400, { message: "No fields to update" });
        }
        
        // Add updatedAt timestamp
        i++;
        expressions.push(`#n${i} = :v${i}`);
        attrNames[`#n${i}`] = "updatedAt";
        attrVals[`:v${i}`] = new Date().toISOString();
        
        // If cancelling, add cancellation timestamp
        if (updateData.appointmentStatus === 'cancelled') {
          i++;
          expressions.push(`#n${i} = :v${i}`);
          attrNames[`#n${i}`] = "cancelledAt";
          attrVals[`:v${i}`] = new Date().toISOString();
        }
        
        const updateExpr = "SET " + expressions.join(", ");
        
        const dbStart = Date.now();
        await doc.send(new UpdateCommand({
          TableName: TABLE,
          Key: { appointmentId },
          UpdateExpression: updateExpr,
          ExpressionAttributeNames: attrNames,
          ExpressionAttributeValues: attrVals
        }));
        logger.logDatabaseOperation('update', TABLE, true, Date.now() - dbStart, appointmentContext);
        
        logger.logBusinessLogic('appointment_update', true, { fieldsUpdated: Object.keys(body) }, appointmentContext);
        monitor.end(true);
        
        return jsonResponse(200, { message: "Appointment updated successfully" });
      }

      // Delete appointment (cancel)
      if (subPath === "" && method === "DELETE") {
        const monitor = new PerformanceMonitor(logger, 'cancel_appointment', appointmentContext);
        
        const queryParams = event.queryStringParameters || {};
        const patientId = queryParams.patientId;
        
        if (!patientId) {
          logger.logValidationError(['patientId query parameter required for cancellation'], appointmentContext);
          monitor.end(false);
          return jsonResponse(400, { message: "patientId query parameter is required for cancellation" });
        }
        
        const fullContext = { ...appointmentContext, patientId };
        logger.info('Processing appointment cancellation', fullContext);
        
        // First get the appointment to verify it exists and belongs to the patient
        const dbStart = Date.now();
        const result = await doc.send(new GetCommand({ 
          TableName: TABLE, 
          Key: { appointmentId } 
        }));
        logger.logDatabaseOperation('get', TABLE, true, Date.now() - dbStart, appointmentContext);
        
        if (!result.Item) {
          logger.warn('Appointment not found for cancellation', fullContext);
          monitor.end(false);
          return jsonResponse(404, { message: "Appointment not found" });
        }
        
        const appointment = result.Item as Appointment;
        if (appointment.patientId !== patientId) {
          logger.warn('Unauthorized cancellation attempt', { ...fullContext, actualPatientId: appointment.patientId });
          monitor.end(false);
          return jsonResponse(403, { message: "You can only cancel your own appointments" });
        }
        
        if (appointment.appointmentStatus === 'cancelled') {
          logger.warn('Attempt to cancel already cancelled appointment', fullContext);
          monitor.end(false);
          return jsonResponse(400, { message: "Appointment is already cancelled" });
        }
        
        if (appointment.appointmentStatus === 'completed') {
          logger.warn('Attempt to cancel completed appointment', fullContext);
          monitor.end(false);
          return jsonResponse(400, { message: "Cannot cancel a completed appointment" });
        }
        
        // Update appointment status to cancelled instead of deleting
        const now = new Date().toISOString();
        const updateStart = Date.now();
        await doc.send(new UpdateCommand({
          TableName: TABLE,
          Key: { appointmentId },
          UpdateExpression: "SET appointmentStatus = :status, cancelledAt = :cancelledAt, cancelledBy = :cancelledBy, updatedAt = :updatedAt",
          ExpressionAttributeValues: {
            ":status": "cancelled",
            ":cancelledAt": now,
            ":cancelledBy": patientId,
            ":updatedAt": now
          }
        }));
        logger.logDatabaseOperation('update', TABLE, true, Date.now() - updateStart, fullContext);
        
        logger.logBusinessLogic('appointment_cancellation', true, { cancelledBy: patientId }, fullContext);
        monitor.end(true);
        
        return jsonResponse(200, { message: "Appointment cancelled successfully" });
      }
    }

    logger.warn('Route not found', logContext);
    return jsonResponse(404, { message: "Route not found" });
    
  } catch (err: any) {
    logger.error('Unhandled error in handler', logContext, err);
    return jsonResponse(500, { 
      message: "Internal server error", 
      error: err.message 
    });
  }
};

// Export handler with logging middleware
export const handler = withLogging(handlerImpl, logger);
