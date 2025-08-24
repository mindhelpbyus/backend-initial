import { 
  setupTestEnvironment, 
  createMockAPIGatewayEvent, 
  generateTestDoctor,
  generateAdminToken,
  generateDoctorToken,
  generatePatientToken,
  cleanupTestData,
  getTestDynamoDBClient,
  validateDoctorResponse
} from "../test-helpers";
import { GetCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

// Set up environment before importing handler
process.env.DYNAMODB_ENDPOINT = "http://localhost:8000";
process.env.AWS_REGION = "us-east-1";
process.env.DOCTORS_TABLE = "DoctorsTable";
process.env.JWT_SECRET = "test-secret";
process.env.AWS_ACCESS_KEY_ID = "dummy";
process.env.AWS_SECRET_ACCESS_KEY = "dummy";

// Import handler after environment setup
import { handler } from "../../src/handler";

describe("Doctor API POST Operations", () => {
  let doc: any;
  let createdDoctorIds: string[] = [];
  let adminToken: string;

  beforeAll(() => {
    setupTestEnvironment();
    doc = getTestDynamoDBClient();
    adminToken = generateAdminToken();
  });

  afterAll(async () => {
    // Clean up test data
    await cleanupTestData(doc, createdDoctorIds);
  });

  describe("POST /doctors", () => {
    test("should create a new doctor successfully as admin", async () => {
      const testDoctor = generateTestDoctor();
      const event = createMockAPIGatewayEvent(
        "/doctors", 
        "POST", 
        testDoctor,
        { Authorization: `Bearer ${adminToken}` }
      );

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(201);
      expect(body.doctorId).toBeDefined();
      expect(body.message).toBe("Doctor created successfully");

      // Store for cleanup
      createdDoctorIds.push(body.doctorId);

      // Verify doctor was created in database
      const dbResult = await doc.send(new GetCommand({
        TableName: "DoctorsTable",
        Key: { doctorId: body.doctorId }
      }));

      expect(dbResult.Item).toBeDefined();
      validateDoctorResponse(dbResult.Item);
      expect(dbResult.Item.email).toBe(testDoctor.email);
      expect(dbResult.Item.firstName).toBe(testDoctor.firstName);
      expect(dbResult.Item.lastName).toBe(testDoctor.lastName);
      expect(dbResult.Item.specialization).toBe(testDoctor.specialization);
      expect(dbResult.Item.licenseNumber).toBe(testDoctor.licenseNumber);
      expect(dbResult.Item.isActive).toBe(true);
      expect(dbResult.Item.rating).toBe(0);
      expect(dbResult.Item.reviewCount).toBe(0);
    });

    test("should reject doctor creation without admin role", async () => {
      const doctorToken = generateDoctorToken("doctor-123", "doctor@example.com");
      const testDoctor = generateTestDoctor();
      
      const event = createMockAPIGatewayEvent(
        "/doctors", 
        "POST", 
        testDoctor,
        { Authorization: `Bearer ${doctorToken}` }
      );

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(403);
      expect(body.message).toBe("Admin access required");
    });

    test("should reject doctor creation without authentication", async () => {
      const testDoctor = generateTestDoctor();
      const event = createMockAPIGatewayEvent("/doctors", "POST", testDoctor);

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(403);
      expect(body.message).toBe("Admin access required");
    });

    test("should reject doctor creation with missing required fields", async () => {
      const invalidDoctor = {
        email: "incomplete@example.com"
        // Missing required fields
      };

      const event = createMockAPIGatewayEvent(
        "/doctors", 
        "POST", 
        invalidDoctor,
        { Authorization: `Bearer ${adminToken}` }
      );

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(400);
      expect(body.message).toBe("Validation failed");
      expect(body.errors).toBeDefined();
      expect(Array.isArray(body.errors)).toBe(true);
      expect(body.errors.length).toBeGreaterThan(0);
    });

    test("should reject doctor creation with invalid email", async () => {
      const testDoctor = generateTestDoctor({
        email: "invalid-email-format"
      });

      const event = createMockAPIGatewayEvent(
        "/doctors", 
        "POST", 
        testDoctor,
        { Authorization: `Bearer ${adminToken}` }
      );

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(400);
      expect(body.message).toBe("Validation failed");
      expect(body.errors).toContain("Valid email is required");
    });

    test("should reject doctor creation with duplicate email", async () => {
      const testDoctor = generateTestDoctor();
      
      // First creation
      const event1 = createMockAPIGatewayEvent(
        "/doctors", 
        "POST", 
        testDoctor,
        { Authorization: `Bearer ${adminToken}` }
      );

      const response1 = await handler(event1);
      const result1 = response1 as any;
      const body1 = JSON.parse(result1.body);
      
      expect(result1.statusCode).toBe(201);
      createdDoctorIds.push(body1.doctorId);

      // Second creation with same email
      const event2 = createMockAPIGatewayEvent(
        "/doctors", 
        "POST", 
        testDoctor,
        { Authorization: `Bearer ${adminToken}` }
      );

      const response2 = await handler(event2);
      const result2 = response2 as any;
      const body2 = JSON.parse(result2.body);

      expect(result2.statusCode).toBe(409);
      expect(body2.message).toBe("Doctor with this email already exists");
    });

    test("should reject doctor creation with invalid experience", async () => {
      const testDoctor = generateTestDoctor({
        experience: -5 // Invalid negative experience
      });

      const event = createMockAPIGatewayEvent(
        "/doctors", 
        "POST", 
        testDoctor,
        { Authorization: `Bearer ${adminToken}` }
      );

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(400);
      expect(body.message).toBe("Validation failed");
      expect(body.errors).toContain("Experience must be between 0 and 50 years");
    });

    test("should create doctor with minimal required fields", async () => {
      const minimalDoctor = {
        email: `minimal${Date.now()}@example.com`,
        firstName: "Jane",
        lastName: "Doe",
        specialization: "General Practice",
        licenseNumber: `MIN${Date.now()}`
      };

      const event = createMockAPIGatewayEvent(
        "/doctors", 
        "POST", 
        minimalDoctor,
        { Authorization: `Bearer ${adminToken}` }
      );

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(201);
      expect(body.doctorId).toBeDefined();

      createdDoctorIds.push(body.doctorId);

      // Verify in database
      const dbResult = await doc.send(new GetCommand({
        TableName: "DoctorsTable",
        Key: { doctorId: body.doctorId }
      }));

      expect(dbResult.Item.email).toBe(minimalDoctor.email);
      expect(dbResult.Item.firstName).toBe(minimalDoctor.firstName);
      expect(dbResult.Item.lastName).toBe(minimalDoctor.lastName);
      expect(dbResult.Item.specialization).toBe(minimalDoctor.specialization);
      expect(dbResult.Item.licenseNumber).toBe(minimalDoctor.licenseNumber);
      expect(dbResult.Item.phoneNumber).toBe("");
      expect(dbResult.Item.address).toBe("");
      expect(dbResult.Item.bio).toBe("");
      expect(dbResult.Item.experience).toBe(0);
      expect(dbResult.Item.education).toEqual([]);
      expect(dbResult.Item.certifications).toEqual([]);
    });

    test("should create doctor with all optional fields", async () => {
      const fullDoctor = generateTestDoctor({
        phoneNumber: "+1-555-9999",
        address: "456 Hospital Ave, Medical City, MC 67890",
        bio: "Specialized in pediatric cardiology with extensive research background",
        experience: 15,
        education: ["Stanford Medical School", "UCSF Pediatric Residency", "Boston Children's Fellowship"],
        certifications: ["Board Certified Pediatric Cardiologist", "Pediatric Advanced Life Support", "Echocardiography Certification"]
      });

      const event = createMockAPIGatewayEvent(
        "/doctors", 
        "POST", 
        fullDoctor,
        { Authorization: `Bearer ${adminToken}` }
      );

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(201);
      createdDoctorIds.push(body.doctorId);

      // Verify all fields in database
      const dbResult = await doc.send(new GetCommand({
        TableName: "DoctorsTable",
        Key: { doctorId: body.doctorId }
      }));

      expect(dbResult.Item.phoneNumber).toBe(fullDoctor.phoneNumber);
      expect(dbResult.Item.address).toBe(fullDoctor.address);
      expect(dbResult.Item.bio).toBe(fullDoctor.bio);
      expect(dbResult.Item.experience).toBe(fullDoctor.experience);
      expect(dbResult.Item.education).toEqual(fullDoctor.education);
      expect(dbResult.Item.certifications).toEqual(fullDoctor.certifications);
    });

    test("should reject creation by patient user", async () => {
      const patientToken = generatePatientToken("patient-123", "patient@example.com");
      const testDoctor = generateTestDoctor();

      const event = createMockAPIGatewayEvent(
        "/doctors", 
        "POST", 
        testDoctor,
        { Authorization: `Bearer ${patientToken}` }
      );

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(403);
      expect(body.message).toBe("Admin access required");
    });

    test("should handle malformed JSON in request body", async () => {
      const event = createMockAPIGatewayEvent(
        "/doctors", 
        "POST", 
        undefined, // No body
        { Authorization: `Bearer ${adminToken}` }
      );

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(400);
      expect(body.message).toBe("Validation failed");
    });

    test("should validate short names", async () => {
      const testDoctor = generateTestDoctor({
        firstName: "A", // Too short
        lastName: "B"   // Too short
      });

      const event = createMockAPIGatewayEvent(
        "/doctors", 
        "POST", 
        testDoctor,
        { Authorization: `Bearer ${adminToken}` }
      );

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(400);
      expect(body.errors).toContain("First name must be at least 2 characters");
      expect(body.errors).toContain("Last name must be at least 2 characters");
    });

    test("should validate short license number", async () => {
      const testDoctor = generateTestDoctor({
        licenseNumber: "AB" // Too short
      });

      const event = createMockAPIGatewayEvent(
        "/doctors", 
        "POST", 
        testDoctor,
        { Authorization: `Bearer ${adminToken}` }
      );

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(400);
      expect(body.errors).toContain("License number is required");
    });
  });

  describe("Error Handling", () => {
    test("should handle database errors gracefully", async () => {
      // Test with malformed JSON to trigger error handling
      const event = createMockAPIGatewayEvent(
        "/doctors", 
        "POST", 
        undefined,
        { Authorization: `Bearer ${adminToken}` }
      );
      // Set malformed JSON body directly
      event.body = '{"invalid": json}';

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(500);
      expect(body.message).toBe("Internal server error");
    });

    test("should handle invalid JWT token", async () => {
      const testDoctor = generateTestDoctor();
      const event = createMockAPIGatewayEvent(
        "/doctors", 
        "POST", 
        testDoctor,
        { Authorization: "Bearer invalid-token" }
      );

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(403);
      expect(body.message).toBe("Admin access required");
    });

    test("should handle missing authorization header", async () => {
      const testDoctor = generateTestDoctor();
      const event = createMockAPIGatewayEvent("/doctors", "POST", testDoctor);

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(403);
      expect(body.message).toBe("Admin access required");
    });
  });
});
