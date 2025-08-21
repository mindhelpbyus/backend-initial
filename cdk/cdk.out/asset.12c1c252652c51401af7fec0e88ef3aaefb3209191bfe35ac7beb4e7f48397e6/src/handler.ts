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

const TABLE = process.env.DOCTORS_TABLE || "DoctorsTable";
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

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const path = event.rawPath || (event.requestContext as any).http?.path || "/";
  const method = (event.requestContext as any).http?.method || event.requestContext?.http?.method;
  
  try {
    // Create a new doctor (admin only)
    if (path === "/doctors" && method === "POST") {
      const auth = verifyAuth(event);
      if (!auth || auth.role !== "admin") {
        return jsonResponse(403, { message: "Admin access required" });
      }
      
      const body = event.body ? JSON.parse(event.body) : {};
      const validationErrors = validateDoctorData(body);
      
      if (validationErrors.length > 0) {
        return jsonResponse(400, { message: "Validation failed", errors: validationErrors });
      }
      
      // Check if email already exists
      const existingDoctor = await doc.send(new QueryCommand({
        TableName: TABLE,
        IndexName: "email-index",
        KeyConditionExpression: "email = :e",
        ExpressionAttributeValues: { ":e": body.email }
      }));
      
      if ((existingDoctor.Items || []).length > 0) {
        return jsonResponse(409, { message: "Doctor with this email already exists" });
      }
      
      const doctorId = uuidv4();
      const now = new Date().toISOString();
      
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
      
      await doc.send(new PutCommand({ TableName: TABLE, Item: doctor }));
      return jsonResponse(201, { doctorId, message: "Doctor created successfully" });
    }

    // Get all doctors
    if (path === "/doctors" && method === "GET") {
      const result = await doc.send(new ScanCommand({ TableName: TABLE }));
      const doctors = (result.Items || []).map(doctor => {
        // Remove sensitive information if needed
        return doctor;
      });
      return jsonResponse(200, { doctors });
    }

    // Get doctors by specialization
    if (path === "/doctors/by-specialization" && method === "GET") {
      const specialization = (event.queryStringParameters || {})["specialization"];
      if (!specialization) {
        return jsonResponse(400, { message: "specialization query parameter is required" });
      }
      
      const result = await doc.send(new QueryCommand({
        TableName: TABLE,
        IndexName: "specialization-index",
        KeyConditionExpression: "specialization = :s",
        ExpressionAttributeValues: { ":s": specialization }
      }));
      
      return jsonResponse(200, { doctors: result.Items || [] });
    }

    // Get doctor by email
    if (path === "/doctors/by-email" && method === "GET") {
      const email = (event.queryStringParameters || {})["email"];
      if (!email) {
        return jsonResponse(400, { message: "email query parameter is required" });
      }
      
      const result = await doc.send(new QueryCommand({
        TableName: TABLE,
        IndexName: "email-index",
        KeyConditionExpression: "email = :e",
        ExpressionAttributeValues: { ":e": email }
      }));
      
      return jsonResponse(200, { doctors: result.Items || [] });
    }

    // Handle doctor-specific routes
    const doctorIdMatch = path.match(/^\/doctors\/([^\/]+)(\/.*)?$/);
    if (doctorIdMatch) {
      const doctorId = decodeURIComponent(doctorIdMatch[1]);
      const subPath = doctorIdMatch[2] || "";

      // Get specific doctor details
      if (subPath === "" && method === "GET") {
        const result = await doc.send(new GetCommand({ 
          TableName: TABLE, 
          Key: { doctorId } 
        }));
        
        if (!result.Item) {
          return jsonResponse(404, { message: "Doctor not found" });
        }
        
        return jsonResponse(200, result.Item);
      }

      // Update doctor information
      if (subPath === "" && method === "PUT") {
        const auth = verifyAuth(event);
        if (!auth || (auth.role !== "admin" && auth.doctorId !== doctorId)) {
          return jsonResponse(403, { message: "Access denied" });
        }
        
        const body = event.body ? JSON.parse(event.body) : {};
        const updateData: DoctorUpdateRequest = body;
        
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
        
        const updateExpr = "SET " + expressions.join(", ");
        
        await doc.send(new UpdateCommand({
          TableName: TABLE,
          Key: { doctorId },
          UpdateExpression: updateExpr,
          ExpressionAttributeNames: attrNames,
          ExpressionAttributeValues: attrVals
        }));
        
        return jsonResponse(200, { message: "Doctor updated successfully" });
      }

      // Delete doctor
      if (subPath === "" && method === "DELETE") {
        const auth = verifyAuth(event);
        if (!auth || auth.role !== "admin") {
          return jsonResponse(403, { message: "Admin access required" });
        }
        
        await doc.send(new DeleteCommand({ 
          TableName: TABLE, 
          Key: { doctorId } 
        }));
        
        return jsonResponse(200, { message: "Doctor deleted successfully" });
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
