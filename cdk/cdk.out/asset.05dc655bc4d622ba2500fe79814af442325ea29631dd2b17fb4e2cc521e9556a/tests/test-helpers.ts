import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import * as jwt from 'jsonwebtoken';
import { APIGatewayProxyEventV2 } from 'aws-lambda';

// Test configuration for local DynamoDB
export const getTestDynamoDBClient = () => {
  const client = new DynamoDBClient({
    endpoint: "http://localhost:8000",
    region: "us-east-1",
    credentials: {
      accessKeyId: "dummy",
      secretAccessKey: "dummy"
    }
  });
  
  return DynamoDBDocumentClient.from(client);
};

// Mock event helper for API Gateway events
export const createMockAPIGatewayEvent = (
  path: string,
  method: string,
  body?: any,
  headers?: Record<string, string>,
  queryStringParameters?: Record<string, string>
): APIGatewayProxyEventV2 => {
  return {
    version: "2.0",
    routeKey: `${method} ${path}`,
    rawPath: path,
    rawQueryString: "",
    headers: headers || {},
    queryStringParameters: queryStringParameters || undefined,
    requestContext: {
      accountId: "123456789012",
      apiId: "test-api",
      domainName: "test.execute-api.us-east-1.amazonaws.com",
      domainPrefix: "test",
      http: {
        method: method,
        path: path,
        protocol: "HTTP/1.1",
        sourceIp: "127.0.0.1",
        userAgent: "test-agent"
      },
      requestId: "test-request-id",
      routeKey: `${method} ${path}`,
      stage: "test",
      time: "01/Jan/2023:00:00:00 +0000",
      timeEpoch: 1672531200000
    },
    body: body ? JSON.stringify(body) : undefined,
    isBase64Encoded: false
  } as APIGatewayProxyEventV2;
};

// Test data generators
export const generateTestDoctor = (overrides: any = {}) => {
  const timestamp = Date.now();
  return {
    email: `doctor${timestamp}@example.com`,
    firstName: "Dr. John",
    lastName: "Smith",
    specialization: "Cardiology",
    licenseNumber: `MD${timestamp}`,
    phoneNumber: "+1-555-0123",
    address: "123 Medical Center Dr, City, State 12345",
    bio: "Experienced cardiologist with 10+ years of practice",
    experience: 10,
    education: ["Harvard Medical School", "Johns Hopkins Residency"],
    certifications: ["Board Certified Cardiologist", "Advanced Cardiac Life Support"],
    ...overrides
  };
};

export const generateAuthToken = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET || "test-secret", { expiresIn: '1h' });
};

export const generateAdminToken = () => {
  return generateAuthToken({
    adminId: "admin-123",
    email: "admin@example.com",
    role: "admin"
  });
};

export const generateDoctorToken = (doctorId: string, email: string) => {
  return generateAuthToken({
    doctorId,
    email,
    role: "doctor"
  });
};

export const generatePatientToken = (patientId: string, email: string) => {
  return generateAuthToken({
    patientId,
    email,
    role: "patient"
  });
};

// Environment setup for tests
export const setupTestEnvironment = () => {
  process.env.DOCTORS_TABLE = "DoctorsTable";
  process.env.JWT_SECRET = "test-secret";
  process.env.AWS_REGION = "us-east-1";
  process.env.DYNAMODB_ENDPOINT = "http://localhost:8000";
  process.env.AWS_ACCESS_KEY_ID = "dummy";
  process.env.AWS_SECRET_ACCESS_KEY = "dummy";
};

// Clean up test data
export const cleanupTestData = async (doc: any, doctorIds: string[]) => {
  for (const id of doctorIds) {
    try {
      await doc.send(new DeleteCommand({
        TableName: "DoctorsTable",
        Key: { doctorId: id }
      }));
    } catch (err) {
      console.error(`Error cleaning up test doctor ${id}:`, err);
    }
  }
};

// Validation helpers for tests
export const validateDoctorResponse = (doctor: any) => {
  expect(doctor.doctorId).toBeDefined();
  expect(doctor.email).toBeDefined();
  expect(doctor.firstName).toBeDefined();
  expect(doctor.lastName).toBeDefined();
  expect(doctor.specialization).toBeDefined();
  expect(doctor.licenseNumber).toBeDefined();
  expect(doctor.createdAt).toBeDefined();
  expect(doctor.isActive).toBeDefined();
};

export const validateDoctorArray = (doctors: any[]) => {
  expect(Array.isArray(doctors)).toBe(true);
  doctors.forEach(doctor => {
    validateDoctorResponse(doctor);
  });
};

// Common test data
export const VALID_SPECIALIZATIONS = [
  'Cardiology',
  'Dermatology',
  'Endocrinology',
  'Gastroenterology',
  'Neurology',
  'Oncology',
  'Orthopedics',
  'Pediatrics',
  'Psychiatry',
  'Radiology',
  'General Practice',
  'Internal Medicine'
];

export const getRandomSpecialization = () => {
  return VALID_SPECIALIZATIONS[Math.floor(Math.random() * VALID_SPECIALIZATIONS.length)];
};
