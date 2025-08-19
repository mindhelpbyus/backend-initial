import { 
  setupTestEnvironment, 
  createMockAPIGatewayEvent, 
  generateTestPatient,
  generateAuthToken,
  cleanupTestData,
  getTestDynamoDBClient
} from "./test-helpers";
import { GetCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

// Set up environment before importing handler
process.env.DYNAMODB_ENDPOINT = "http://localhost:8000";
process.env.AWS_REGION = "us-east-1";
process.env.PATIENTS_TABLE = "PatientsTable";
process.env.JWT_SECRET = "test-secret";
process.env.AWS_ACCESS_KEY_ID = "dummy";
process.env.AWS_SECRET_ACCESS_KEY = "dummy";

// Import handler after environment setup
import { handler } from "../src/handler";

describe("Patient API POST Operations", () => {
  let doc: any;
  let createdPatientIds: string[] = [];

  beforeAll(() => {
    setupTestEnvironment();
    doc = getTestDynamoDBClient();
  });

  afterAll(async () => {
    // Clean up test data
    await cleanupTestData(doc, createdPatientIds);
  });

  describe("POST /auth/signup", () => {
    test("should create a new patient successfully", async () => {
      const testPatient = generateTestPatient();
      const event = createMockAPIGatewayEvent("/auth/signup", "POST", testPatient);

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(201);
      expect(body.patientId).toBeDefined();
      expect(body.token).toBeDefined();

      // Store for cleanup
      createdPatientIds.push(body.patientId);

      // Verify patient was created in database
      const dbResult = await doc.send(new GetCommand({
        TableName: "PatientsTable",
        Key: { patientId: body.patientId }
      }));

      expect(dbResult.Item).toBeDefined();
      expect(dbResult.Item.email).toBe(testPatient.email);
      expect(dbResult.Item.firstName).toBe(testPatient.firstName);
      expect(dbResult.Item.lastName).toBe(testPatient.lastName);
      expect(dbResult.Item.password).not.toBe(testPatient.password); // Should be hashed
      expect(dbResult.Item.role).toBe("patient");
      expect(dbResult.Item.createdAt).toBeDefined();
    });

    test("should reject signup with missing email", async () => {
      const testPatient = generateTestPatient();
      delete testPatient.email;
      const event = createMockAPIGatewayEvent("/auth/signup", "POST", testPatient);

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(400);
      expect(body.message).toBe("email and password required");
    });

    test("should reject signup with missing password", async () => {
      const testPatient = generateTestPatient();
      delete testPatient.password;
      const event = createMockAPIGatewayEvent("/auth/signup", "POST", testPatient);

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(400);
      expect(body.message).toBe("email and password required");
    });

    test("should reject duplicate email registration", async () => {
      const testPatient = generateTestPatient();
      
      // First signup
      const event1 = createMockAPIGatewayEvent("/auth/signup", "POST", testPatient);
      const response1 = await handler(event1);
      const result1 = response1 as any;
      const body1 = JSON.parse(result1.body);
      
      expect(result1.statusCode).toBe(201);
      createdPatientIds.push(body1.patientId);

      // Second signup with same email
      const event2 = createMockAPIGatewayEvent("/auth/signup", "POST", testPatient);
      const response2 = await handler(event2);
      const result2 = response2 as any;
      const body2 = JSON.parse(result2.body);

      expect(result2.statusCode).toBe(409);
      expect(body2.message).toBe("email already registered");
    });

    test("should create patient with minimal data (only email and password)", async () => {
      const testPatient = {
        email: `minimal${Date.now()}@example.com`,
        password: "testpassword123"
      };
      const event = createMockAPIGatewayEvent("/auth/signup", "POST", testPatient);

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(201);
      expect(body.patientId).toBeDefined();
      expect(body.token).toBeDefined();

      createdPatientIds.push(body.patientId);

      // Verify in database
      const dbResult = await doc.send(new GetCommand({
        TableName: "PatientsTable",
        Key: { patientId: body.patientId }
      }));

      expect(dbResult.Item.email).toBe(testPatient.email);
      expect(dbResult.Item.firstName).toBe("");
      expect(dbResult.Item.lastName).toBe("");
    });
  });

  describe("POST /auth/login", () => {
    let testPatient: any;
    let patientId: string;

    beforeAll(async () => {
      // Create a test patient for login tests
      testPatient = generateTestPatient();
      const signupEvent = createMockAPIGatewayEvent("/auth/signup", "POST", testPatient);
      const signupResponse = await handler(signupEvent);
      const signupResult = signupResponse as any;
      const signupBody = JSON.parse(signupResult.body);
      patientId = signupBody.patientId;
      createdPatientIds.push(patientId);
    });

    test("should login successfully with correct credentials", async () => {
      const loginData = {
        email: testPatient.email,
        password: testPatient.password
      };
      const event = createMockAPIGatewayEvent("/auth/login", "POST", loginData);

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(200);
      expect(body.token).toBeDefined();
      expect(body.patientId).toBe(patientId);
    });

    test("should reject login with incorrect password", async () => {
      const loginData = {
        email: testPatient.email,
        password: "wrongpassword"
      };
      const event = createMockAPIGatewayEvent("/auth/login", "POST", loginData);

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(401);
      expect(body.message).toBe("invalid credentials");
    });

    test("should reject login with non-existent email", async () => {
      const loginData = {
        email: "nonexistent@example.com",
        password: "anypassword"
      };
      const event = createMockAPIGatewayEvent("/auth/login", "POST", loginData);

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(401);
      expect(body.message).toBe("invalid credentials");
    });

    test("should reject login with missing email", async () => {
      const loginData = {
        password: testPatient.password
      };
      const event = createMockAPIGatewayEvent("/auth/login", "POST", loginData);

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(400);
      expect(body.message).toBe("email and password required");
    });

    test("should reject login with missing password", async () => {
      const loginData = {
        email: testPatient.email
      };
      const event = createMockAPIGatewayEvent("/auth/login", "POST", loginData);

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(400);
      expect(body.message).toBe("email and password required");
    });
  });

  describe("POST /patients", () => {
    let adminToken: string;

    beforeAll(() => {
      // Generate admin token for testing
      adminToken = generateAuthToken({
        patientId: "admin-id",
        email: "admin@example.com",
        role: "admin"
      });
    });

    test("should create patient as admin successfully", async () => {
      const patientData = generateTestPatient();
      const event = createMockAPIGatewayEvent(
        "/patients", 
        "POST", 
        patientData,
        { Authorization: `Bearer ${adminToken}` }
      );

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(201);
      expect(body.patientId).toBeDefined();

      createdPatientIds.push(body.patientId);

      // Verify in database
      const dbResult = await doc.send(new GetCommand({
        TableName: "PatientsTable",
        Key: { patientId: body.patientId }
      }));

      expect(dbResult.Item).toBeDefined();
      expect(dbResult.Item.email).toBe(patientData.email);
    });

    test("should reject patient creation without admin role", async () => {
      const patientToken = generateAuthToken({
        patientId: "patient-id",
        email: "patient@example.com",
        role: "patient"
      });

      const patientData = generateTestPatient();
      const event = createMockAPIGatewayEvent(
        "/patients", 
        "POST", 
        patientData,
        { Authorization: `Bearer ${patientToken}` }
      );

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(403);
      expect(body.message).toBe("admin required");
    });

    test("should reject patient creation without authentication", async () => {
      const patientData = generateTestPatient();
      const event = createMockAPIGatewayEvent("/patients", "POST", patientData);

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(403);
      expect(body.message).toBe("admin required");
    });
  });

  describe("POST /patients/{patientId}/reviews", () => {
    let testPatientId: string;
    let patientToken: string;

    beforeAll(async () => {
      // Create a test patient for review tests
      const testPatient = generateTestPatient();
      const signupEvent = createMockAPIGatewayEvent("/auth/signup", "POST", testPatient);
      const signupResponse = await handler(signupEvent);
      const signupResult = signupResponse as any;
      const signupBody = JSON.parse(signupResult.body);
      testPatientId = signupBody.patientId;
      patientToken = signupBody.token;
      createdPatientIds.push(testPatientId);
    });

    test("should add review to patient successfully", async () => {
      const reviewData = {
        rating: 5,
        comment: "Great service!",
        doctorId: "doctor-123"
      };

      const event = createMockAPIGatewayEvent(
        `/patients/${testPatientId}/reviews`,
        "POST",
        reviewData,
        { Authorization: `Bearer ${patientToken}` }
      );

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(201);
      expect(body.review).toBeDefined();
      expect(body.review.id).toBeDefined();
      expect(body.review.rating).toBe(5);
      expect(body.review.comment).toBe("Great service!");
      expect(body.review.doctorId).toBe("doctor-123");
      expect(body.review.createdAt).toBeDefined();

      // Verify review was added to patient in database
      const dbResult = await doc.send(new GetCommand({
        TableName: "PatientsTable",
        Key: { patientId: testPatientId }
      }));

      expect(dbResult.Item.reviews).toBeDefined();
      expect(dbResult.Item.reviews.length).toBe(1);
      expect(dbResult.Item.reviews[0].rating).toBe(5);
    });

    test("should reject review creation without authentication", async () => {
      const reviewData = {
        rating: 4,
        comment: "Good service"
      };

      const event = createMockAPIGatewayEvent(
        `/patients/${testPatientId}/reviews`,
        "POST",
        reviewData
      );

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(403);
      expect(body.message).toBe("auth required");
    });
  });
});
