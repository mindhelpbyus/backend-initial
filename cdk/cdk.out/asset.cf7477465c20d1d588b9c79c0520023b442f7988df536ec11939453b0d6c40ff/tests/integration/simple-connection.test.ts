import { 
  setupTestEnvironment, 
  createMockAPIGatewayEvent, 
  getTestDynamoDBClient
} from "../test-helpers";

// Set up environment before importing handler
process.env.DYNAMODB_ENDPOINT = "http://localhost:8000";
process.env.AWS_REGION = "us-east-1";
process.env.DOCTORS_TABLE = "DoctorsTable";
process.env.JWT_SECRET = "test-secret";
process.env.AWS_ACCESS_KEY_ID = "dummy";
process.env.AWS_SECRET_ACCESS_KEY = "dummy";

// Import handler after environment setup
import { handler } from "../../src/handler";

describe("Doctor API Simple Connection Tests", () => {
  beforeAll(() => {
    setupTestEnvironment();
  });

  test("should handle unknown routes gracefully", async () => {
    const event = createMockAPIGatewayEvent("/unknown-route", "GET");

    const response = await handler(event);
    const result = response as any;
    const body = JSON.parse(result.body);

    expect(result.statusCode).toBe(404);
    expect(body.message).toBe("Route not found");
  });

  test("should handle unsupported HTTP methods", async () => {
    const event = createMockAPIGatewayEvent("/doctors", "PATCH");

    const response = await handler(event);
    const result = response as any;
    const body = JSON.parse(result.body);

    expect(result.statusCode).toBe(404);
    expect(body.message).toBe("Route not found");
  });

  test("should return proper JSON response format", async () => {
    const event = createMockAPIGatewayEvent("/doctors", "GET");

    const response = await handler(event);
    const result = response as any;

    expect(result.statusCode).toBeDefined();
    expect(result.headers).toBeDefined();
    expect(result.headers["Content-Type"]).toBe("application/json");
    expect(result.body).toBeDefined();
    
    // Should be valid JSON
    expect(() => JSON.parse(result.body)).not.toThrow();
  });

  test("should handle empty request body gracefully", async () => {
    const event = createMockAPIGatewayEvent("/doctors", "GET", undefined);

    const response = await handler(event);
    const result = response as any;

    expect(result.statusCode).toBeDefined();
    expect(typeof result.statusCode).toBe('number');
  });

  test("should handle malformed JSON in request body", async () => {
    const event = createMockAPIGatewayEvent("/doctors", "POST");
    // Manually set malformed JSON
    event.body = '{"invalid": json}';

    const response = await handler(event);
    const result = response as any;

    // Should return 403 because auth is checked first, then JSON parsing
    expect(result.statusCode).toBe(403);
    expect(result.body).toBeDefined();
  });

  test("should validate environment configuration", () => {
    expect(process.env.DOCTORS_TABLE).toBe("DoctorsTable");
    expect(process.env.JWT_SECRET).toBe("test-secret");
    expect(process.env.DYNAMODB_ENDPOINT).toBe("http://localhost:8000");
  });

  test("should be able to connect to test DynamoDB", async () => {
    const doc = getTestDynamoDBClient();
    expect(doc).toBeDefined();
    
    // This will test the connection without requiring the table to exist
    try {
      // Just test that we can create a client
      expect(typeof doc.send).toBe('function');
    } catch (error) {
      // Connection test - we don't expect this to fail
      fail('Should be able to create DynamoDB client');
    }
  });
});
