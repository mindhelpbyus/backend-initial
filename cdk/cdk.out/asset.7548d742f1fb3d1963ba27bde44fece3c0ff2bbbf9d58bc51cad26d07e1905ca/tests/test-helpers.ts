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
export const generateTestPatient = (overrides: any = {}) => {
  return {
    email: `test${Date.now()}@example.com`,
    password: "testpassword123",
    firstName: "Test",
    lastName: "User",
    ...overrides
  };
};

export const generateAuthToken = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET || "test-secret");
};

// Environment setup for tests
export const setupTestEnvironment = () => {
  process.env.PATIENTS_TABLE = "PatientsTable";
  process.env.JWT_SECRET = "test-secret";
  process.env.AWS_REGION = "us-east-1";
  process.env.DYNAMODB_ENDPOINT = "http://localhost:8000";
  process.env.AWS_ACCESS_KEY_ID = "dummy";
  process.env.AWS_SECRET_ACCESS_KEY = "dummy";
};

// Clean up test data
export const cleanupTestData = async (doc: any, patientIds: string[]) => {
  for (const id of patientIds) {
    try {
      await doc.send(new DeleteCommand({
        TableName: "PatientsTable",
        Key: { patientId: id }
      }));
    } catch (err) {
      console.error(`Error cleaning up test patient ${id}:`, err);
    }
  }
};
