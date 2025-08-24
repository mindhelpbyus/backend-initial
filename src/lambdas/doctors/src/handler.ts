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
import { Doctor, DoctorCreateRequest, DoctorUpdateRequest } from "./types";
import { createLogger, withLogging, PerformanceMonitor } from "../../../shared/logger";

const TABLE = process.env.DOCTORS_TABLE || "DoctorsTable";
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

const doc = getDynamoDBClient();
const logger = createLogger(process.env.SERVICE_NAME || 'doctors');

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
  /*const auth = event.headers?.authorization || event.headers?.Authorization;
  if (!auth) return null;
  const match = auth.match(/^Bearer\s+(.+)$/i);
  if (!match) return null;
  try {
    return jwt.verify(match[1], JWT_SECRET) as any;
  } catch (e) {
    return null;
  }*/
 return true;
}

function validateDoctorData(data: DoctorCreateRequest): string[] {
  const errors: string[] = [];
  
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Valid email is required");
  }
  
  if (!data.firstName || data.firstName.trim().length < 2) {
    errors.push("First name must be at least 2 characters");
  }
  
  if (!data.lastName || data.lastName.trim().length < 2) {
    errors.push("Last name must be at least 2 characters");
  }
  
  if (!data.specialization || data.specialization.trim().length < 2) {
    errors.push("Specialization is required");
  }
  
  if (!data.licenseNumber || data.licenseNumber.trim().length < 3) {
    errors.push("License number is required");
  }
  
  if (data.experience !== undefined && (data.experience < 0 || data.experience > 50)) {
    errors.push("Experience must be between 0 and 50 years");
  }
  
  return errors;
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
    // Create a new doctor (admin only)
    if (path === "/doctors" && method === "POST") {
      const monitor = new PerformanceMonitor(logger, 'create_doctor', logContext);
      
      const auth = verifyAuth(event);
      const body = event.body ? JSON.parse(event.body) : {};
      const validationErrors = validateDoctorData(body);
      
      if (validationErrors.length > 0) {
        logger.logValidationError(validationErrors, logContext);
        monitor.end(false);
        return jsonResponse(400, { message: "Validation failed", errors: validationErrors });
      }
      
      logger.info('Processing doctor creation request', { ...logContext, email: body.email });

      // Check if email already exists
      const dbStart = Date.now();
      const existingDoctor = await doc.send(new QueryCommand({
        TableName: TABLE,
        IndexName: "email-index",
        KeyConditionExpression: "email = :e",
        ExpressionAttributeValues: { ":e": body.email }
      }));
      logger.logDatabaseOperation('query', TABLE, true, Date.now() - dbStart, { ...logContext, index: 'email-index' });
      
      if ((existingDoctor.Items || []).length > 0) {
        logger.warn('Doctor creation attempt with existing email', { ...logContext, email: body.email });
        monitor.end(false);
        return jsonResponse(409, { message: "Doctor with this email already exists" });
      }
      
      const doctorId = uuidv4();
      const now = new Date().toISOString();
      const doctorContext = { ...logContext, doctorId };
      
      const doctor: Doctor = {
        doctorId,
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        specialization: body.specialization,
        licenseNumber: body.licenseNumber,
        phoneNumber: body.phoneNumber || "",
        address: body.address || "",
        bio: body.bio || "",
        experience: body.experience || 0,
        education: body.education || [],
        certifications: body.certifications || [],
        rating: 0,
        reviewCount: 0,
        createdAt: now,
        isActive: true
      };
      
      const putStart = Date.now();
      await doc.send(new PutCommand({ TableName: TABLE, Item: doctor }));
      logger.logDatabaseOperation('put', TABLE, true, Date.now() - putStart, doctorContext);
      
      logger.logBusinessLogic('doctor_creation', true, { doctorId, email: body.email, specialization: body.specialization }, doctorContext);
      monitor.end(true, { doctorId });
      
      return jsonResponse(201, { doctorId, message: "Doctor created successfully" });
    }

    // Get all doctors
    if (path === "/doctors" && method === "GET") {
      const monitor = new PerformanceMonitor(logger, 'get_doctors', logContext);
      
      const auth = verifyAuth(event);
      logger.info('Fetching doctors list', { ...logContext, authenticated: !!auth });
      
      const dbStart = Date.now();
      const result = await doc.send(new ScanCommand({ TableName: TABLE }));
      logger.logDatabaseOperation('scan', TABLE, true, Date.now() - dbStart, { ...logContext, itemCount: result.Items?.length });
      
      const doctors = (result.Items || []).map(doctor => {
        // Remove sensitive information if needed
        return doctor;
      });
      
      monitor.end(true, { itemCount: doctors.length });
      return jsonResponse(200, { doctors });
    }

    // Get doctors by specialization
    if (path === "/doctors/by-specialization" && method === "GET") {
      const monitor = new PerformanceMonitor(logger, 'get_doctors_by_specialization', logContext);
      
      const specialization = (event.queryStringParameters || {})["specialization"];
      if (!specialization) {
        logger.logValidationError(['specialization query parameter required'], logContext);
        monitor.end(false);
        return jsonResponse(400, { message: "specialization query parameter is required" });
      }
      
      logger.info('Fetching doctors by specialization', { ...logContext, specialization });
      
      const dbStart = Date.now();
      const result = await doc.send(new QueryCommand({
        TableName: TABLE,
        IndexName: "specialization-index",
        KeyConditionExpression: "specialization = :s",
        ExpressionAttributeValues: { ":s": specialization }
      }));
      logger.logDatabaseOperation('query', TABLE, true, Date.now() - dbStart, { ...logContext, index: 'specialization-index', itemCount: result.Items?.length });
      
      monitor.end(true, { itemCount: result.Items?.length });
      return jsonResponse(200, { doctors: result.Items || [] });
    }

    // Get doctor by email
    if (path === "/doctors/by-email" && method === "GET") {
      const monitor = new PerformanceMonitor(logger, 'get_doctor_by_email', logContext);
      
      const email = (event.queryStringParameters || {})["email"];
      if (!email) {
        logger.logValidationError(['email query parameter required'], logContext);
        monitor.end(false);
        return jsonResponse(400, { message: "email query parameter is required" });
      }
      
      logger.info('Fetching doctor by email', { ...logContext, email });
      
      const dbStart = Date.now();
      const result = await doc.send(new QueryCommand({
        TableName: TABLE,
        IndexName: "email-index",
        KeyConditionExpression: "email = :e",
        ExpressionAttributeValues: { ":e": email }
      }));
      logger.logDatabaseOperation('query', TABLE, true, Date.now() - dbStart, { ...logContext, index: 'email-index', itemCount: result.Items?.length });
      
      monitor.end(true, { itemCount: result.Items?.length });
      return jsonResponse(200, { doctors: result.Items || [] });
    }

    // Handle doctor-specific routes
    const doctorIdMatch = path.match(/^\/doctors\/([^\/]+)(\/.*)?$/);
    if (doctorIdMatch) {
      const doctorId = decodeURIComponent(doctorIdMatch[1]);
      const subPath = doctorIdMatch[2] || "";
      const doctorContext = { ...logContext, doctorId };

      // Get specific doctor details
      if (subPath === "" && method === "GET") {
        const monitor = new PerformanceMonitor(logger, 'get_doctor', doctorContext);
        
        logger.info('Fetching doctor details', doctorContext);
        
        const dbStart = Date.now();
        const result = await doc.send(new GetCommand({ 
          TableName: TABLE, 
          Key: { doctorId } 
        }));
        logger.logDatabaseOperation('get', TABLE, true, Date.now() - dbStart, doctorContext);
        
        if (!result.Item) {
          logger.warn('Doctor not found', doctorContext);
          monitor.end(false);
          return jsonResponse(404, { message: "Doctor not found" });
        }
        
        monitor.end(true);
        return jsonResponse(200, result.Item);
      }

      // Update doctor information
      if (subPath === "" && method === "PUT") {
        const monitor = new PerformanceMonitor(logger, 'update_doctor', doctorContext);
        
        const auth = verifyAuth(event);
        const body = event.body ? JSON.parse(event.body) : {};
        const updateData: DoctorUpdateRequest = body;
        
        logger.info('Updating doctor', { ...doctorContext, authenticated: !!auth, fieldsToUpdate: Object.keys(body) });
        
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
          logger.logValidationError(['no fields to update'], doctorContext);
          monitor.end(false);
          return jsonResponse(400, { message: "No fields to update" });
        }
        
        // Add updatedAt timestamp
        i++;
        expressions.push(`#n${i} = :v${i}`);
        attrNames[`#n${i}`] = "updatedAt";
        attrVals[`:v${i}`] = new Date().toISOString();
        
        const updateExpr = "SET " + expressions.join(", ");
        
        const dbStart = Date.now();
        await doc.send(new UpdateCommand({
          TableName: TABLE,
          Key: { doctorId },
          UpdateExpression: updateExpr,
          ExpressionAttributeNames: attrNames,
          ExpressionAttributeValues: attrVals
        }));
        logger.logDatabaseOperation('update', TABLE, true, Date.now() - dbStart, doctorContext);
        
        logger.logBusinessLogic('doctor_update', true, { fieldsUpdated: Object.keys(body) }, doctorContext);
        monitor.end(true);
        
        return jsonResponse(200, { message: "Doctor updated successfully" });
      }

      // Delete doctor
      if (subPath === "" && method === "DELETE") {
        const monitor = new PerformanceMonitor(logger, 'delete_doctor', doctorContext);
        
        const auth = verifyAuth(event);
        logger.info('Deleting doctor', { ...doctorContext, authenticated: !!auth });
        
        const dbStart = Date.now();
        await doc.send(new DeleteCommand({ 
          TableName: TABLE, 
          Key: { doctorId } 
        }));
        logger.logDatabaseOperation('delete', TABLE, true, Date.now() - dbStart, doctorContext);
        
        logger.logBusinessLogic('doctor_deletion', true, {}, doctorContext);
        monitor.end(true);
        
        return jsonResponse(200, { message: "Doctor deleted successfully" });
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
