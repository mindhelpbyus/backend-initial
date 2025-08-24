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

const TABLE = process.env.APPOINTMENTS_TABLE || "AppointmentsTable";
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

const doc = getDynamoDBClient();

// Ensure DynamoDB is using local endpoint in test environment
if (process.env.DYNAMODB_ENDPOINT) {
  console.log("Using local DynamoDB endpoint:", process.env.DYNAMODB_ENDPOINT);
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

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const path = event.rawPath || (event.requestContext as any).http?.path || "/";
  const method = (event.requestContext as any).http?.method || event.requestContext?.http?.method;
  
  try {
    // Create a new appointment
    if (path === "/appointments" && method === "POST") {
      const body = event.body ? JSON.parse(event.body) : {};
      const validationErrors = validateAppointmentData(body);
      
      if (validationErrors.length > 0) {
        return jsonResponse(400, { message: "Validation failed", errors: validationErrors });
      }
      
      const appointmentId = uuidv4();
      const now = new Date().toISOString();
      
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
      
      await doc.send(new PutCommand({ TableName: TABLE, Item: appointment }));
      return jsonResponse(201, { appointmentId, message: "Appointment created successfully" });
    }

    // Get all appointments with filters
    if (path === "/appointments" && method === "GET") {
      const filters = parseFilters(event.queryStringParameters || null);
      const appointments = await getFilteredAppointments(filters);
      return jsonResponse(200, { appointments });
    }

    // Get appointments for a specific patient
    if (path === "/appointments/patient" && method === "GET") {
      const patientId = (event.queryStringParameters || {})["patientId"];
      if (!patientId) {
        return jsonResponse(400, { message: "patientId query parameter is required" });
      }
      
      const filters = parseFilters(event.queryStringParameters || null);
      filters.patientId = patientId;
      const appointments = await getFilteredAppointments(filters);
      return jsonResponse(200, { appointments });
    }

    // Get appointments for a specific doctor
    if (path === "/appointments/doctor" && method === "GET") {
      const doctorId = (event.queryStringParameters || {})["doctorId"];
      if (!doctorId) {
        return jsonResponse(400, { message: "doctorId query parameter is required" });
      }
      
      const filters = parseFilters(event.queryStringParameters || null);
      filters.doctorId = doctorId;
      const appointments = await getFilteredAppointments(filters);
      return jsonResponse(200, { appointments });
    }

    // Handle appointment-specific routes
    const appointmentIdMatch = path.match(/^\/appointments\/([^\/]+)(\/.*)?$/);
    if (appointmentIdMatch) {
      const appointmentId = decodeURIComponent(appointmentIdMatch[1]);
      const subPath = appointmentIdMatch[2] || "";

      // Get specific appointment details
      if (subPath === "" && method === "GET") {
        const result = await doc.send(new GetCommand({ 
          TableName: TABLE, 
          Key: { appointmentId } 
        }));
        
        if (!result.Item) {
          return jsonResponse(404, { message: "Appointment not found" });
        }
        
        return jsonResponse(200, result.Item);
      }

      // Update appointment
      if (subPath === "" && method === "PUT") {
        const body = event.body ? JSON.parse(event.body) : {};
        const updateData: AppointmentUpdateRequest = body;
        
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
        
        await doc.send(new UpdateCommand({
          TableName: TABLE,
          Key: { appointmentId },
          UpdateExpression: updateExpr,
          ExpressionAttributeNames: attrNames,
          ExpressionAttributeValues: attrVals
        }));
        
        return jsonResponse(200, { message: "Appointment updated successfully" });
      }

      // Delete appointment (cancel)
      if (subPath === "" && method === "DELETE") {
        const queryParams = event.queryStringParameters || {};
        const patientId = queryParams.patientId;
        
        if (!patientId) {
          return jsonResponse(400, { message: "patientId query parameter is required for cancellation" });
        }
        
        // First get the appointment to verify it exists and belongs to the patient
        const result = await doc.send(new GetCommand({ 
          TableName: TABLE, 
          Key: { appointmentId } 
        }));
        
        if (!result.Item) {
          return jsonResponse(404, { message: "Appointment not found" });
        }
        
        const appointment = result.Item as Appointment;
        if (appointment.patientId !== patientId) {
          return jsonResponse(403, { message: "You can only cancel your own appointments" });
        }
        
        if (appointment.appointmentStatus === 'cancelled') {
          return jsonResponse(400, { message: "Appointment is already cancelled" });
        }
        
        if (appointment.appointmentStatus === 'completed') {
          return jsonResponse(400, { message: "Cannot cancel a completed appointment" });
        }
        
        // Update appointment status to cancelled instead of deleting
        const now = new Date().toISOString();
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
        
        return jsonResponse(200, { message: "Appointment cancelled successfully" });
      }
    }

    return jsonResponse(404, { message: "Route not found" });
    
  } catch (err: any) {
    console.error("Handler error:", err);
    return jsonResponse(500, { 
      message: "Internal server error", 
      error: err.message 
    });
  }
};
