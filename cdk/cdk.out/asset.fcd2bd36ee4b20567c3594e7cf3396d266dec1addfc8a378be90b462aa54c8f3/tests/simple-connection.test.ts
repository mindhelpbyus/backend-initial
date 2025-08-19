import { 
  setupTestEnvironment, 
  createMockAPIGatewayEvent, 
  generateTestPatient,
  cleanupTestData,
  getTestDynamoDBClient
} from "./test-helpers";
import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

// Set up environment before importing handler
process.env.DYNAMODB_ENDPOINT = "http://localhost:8000";
process.env.AWS_REGION = "us-east-1";
process.env.PATIENTS_TABLE = "PatientsTable";
process.env.JWT_SECRET = "test-secret";
process.env.AWS_ACCESS_KEY_ID = "dummy";
process.env.AWS_SECRET_ACCESS_KEY = "dummy";

// Import handler after environment setup
import { handler } from "../src/handler";

describe("DynamoDB Local Connection Test", () => {
  let doc: any;
  let createdPatientIds: string[] = [];
  let testId: string;

  beforeAll(() => {
    console.log("Test environment setup:", {
      endpoint: process.env.DYNAMODB_ENDPOINT,
      region: process.env.AWS_REGION,
      table: process.env.PATIENTS_TABLE
    });
    
    setupTestEnvironment();
    doc = getTestDynamoDBClient();
    testId = `test-${Date.now()}`;
  });

  afterAll(async () => {
    await cleanupTestData(doc, createdPatientIds);
  });

  test("should connect to local DynamoDB and create a patient", async () => {
    const testPatient = generateTestPatient();
    const event = createMockAPIGatewayEvent("/auth/signup", "POST", testPatient);

    const response = await handler(event);
    
    // Type assertion to work around TypeScript issues
    const result = response as any;
    const body = JSON.parse(result.body);

    console.log("Response status:", result.statusCode);
    console.log("Response body:", body);

    if (result.statusCode !== 201) {
      console.error("Error response:", body);
    }

    expect(result.statusCode).toBe(201);
    expect(body.patientId).toBeDefined();
    expect(body.token).toBeDefined();

    // Store for cleanup
    createdPatientIds.push(body.patientId);

    console.log("✅ Successfully connected to local DynamoDB and created patient:", body.patientId);
  });

  test("should retrieve patient data from local DynamoDB", async () => {
    // First create a patient
    const testPatient = generateTestPatient();
    const signupEvent = createMockAPIGatewayEvent("/auth/signup", "POST", testPatient);
    const signupResponse = await handler(signupEvent);
    const signupResult = signupResponse as any;
    const signupBody = JSON.parse(signupResult.body);
    
    createdPatientIds.push(signupBody.patientId);

    // Then retrieve the patient
    const getEvent = createMockAPIGatewayEvent(`/patients/${signupBody.patientId}`, "GET");
    const getResponse = await handler(getEvent);
    const getResult = getResponse as any;
    const getBody = JSON.parse(getResult.body);

    expect(getResult.statusCode).toBe(200);
    expect(getBody.patientId).toBe(signupBody.patientId);
    expect(getBody.email).toBe(testPatient.email);
    expect(getBody.password).toBeUndefined(); // Should be removed

    console.log("✅ Successfully retrieved patient data from local DynamoDB:", getBody.patientId);
  });

  test("should perform direct DynamoDB operations", async () => {
    const testItem = {
      patientId: testId,
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
      createdAt: new Date().toISOString()
    };

    // Put item
    await doc.send(new PutCommand({
      TableName: "PatientsTable",
      Item: testItem
    }));

    // Get item
    const result = await doc.send(new GetCommand({
      TableName: "PatientsTable",
      Key: { patientId: testId }
    }));

    expect(result.Item).toBeDefined();
    expect(result.Item.email).toBe(testItem.email);
    expect(result.Item.firstName).toBe(testItem.firstName);
    expect(result.Item.lastName).toBe(testItem.lastName);
  });
});
