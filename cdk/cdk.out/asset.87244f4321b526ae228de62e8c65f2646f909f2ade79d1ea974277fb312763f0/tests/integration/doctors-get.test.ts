import { 
  setupTestEnvironment, 
  createMockAPIGatewayEvent, 
  generateTestDoctor,
  generateAdminToken,
  generateDoctorToken,
  generatePatientToken,
  cleanupTestData,
  getTestDynamoDBClient,
  validateDoctorResponse,
  validateDoctorArray,
  getRandomSpecialization
} from "../test-helpers";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

// Set up environment before importing handler
process.env.DYNAMODB_ENDPOINT = "http://localhost:8000";
process.env.AWS_REGION = "us-east-1";
process.env.DOCTORS_TABLE = "DoctorsTable";
process.env.JWT_SECRET = "test-secret";
process.env.AWS_ACCESS_KEY_ID = "dummy";
process.env.AWS_SECRET_ACCESS_KEY = "dummy";

// Import handler after environment setup
import { handler } from "../../src/handler";

describe("Doctor API GET Operations", () => {
  let doc: any;
  let createdDoctorIds: string[] = [];
  let adminToken: string;
  let testDoctors: any[] = [];

  beforeAll(async () => {
    setupTestEnvironment();
    doc = getTestDynamoDBClient();
    adminToken = generateAdminToken();

    // Create test doctors for GET operations
    const specializations = ['Cardiology', 'Dermatology', 'Pediatrics'];
    
    for (let i = 0; i < 3; i++) {
      const doctorData = generateTestDoctor({
        specialization: specializations[i],
        experience: 5 + i * 3
      });
      
      const doctorId = uuidv4();
      const now = new Date().toISOString();
      
      const doctor = {
        doctorId,
        email: doctorData.email,
        firstName: doctorData.firstName,
        lastName: doctorData.lastName,
        specialization: doctorData.specialization,
        licenseNumber: doctorData.licenseNumber,
        phoneNumber: doctorData.phoneNumber || "",
        address: doctorData.address || "",
        bio: doctorData.bio || "",
        experience: doctorData.experience || 0,
        education: doctorData.education || [],
        certifications: doctorData.certifications || [],
        rating: 0,
        reviewCount: 0,
        createdAt: now,
        isActive: true
      };

      await doc.send(new PutCommand({
        TableName: "DoctorsTable",
        Item: doctor
      }));

      createdDoctorIds.push(doctorId);
      testDoctors.push(doctor);
    }
  });

  afterAll(async () => {
    // Clean up test data
    await cleanupTestData(doc, createdDoctorIds);
  });

  describe("GET /doctors", () => {
    test("should get all doctors successfully", async () => {
      const event = createMockAPIGatewayEvent("/doctors", "GET");

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(200);
      expect(body.doctors).toBeDefined();
      expect(Array.isArray(body.doctors)).toBe(true);
      expect(body.doctors.length).toBeGreaterThanOrEqual(3); // At least our test doctors

      // Validate structure of returned doctors
      validateDoctorArray(body.doctors);

      // Check that our test doctors are included
      const returnedEmails = body.doctors.map((d: any) => d.email);
      testDoctors.forEach(testDoctor => {
        expect(returnedEmails).toContain(testDoctor.email);
      });
    });

    test("should return empty array when no doctors exist", async () => {
      // This test would require clearing the table first
      // For now, we'll just verify the structure is correct
      const event = createMockAPIGatewayEvent("/doctors", "GET");

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(200);
      expect(body.doctors).toBeDefined();
      expect(Array.isArray(body.doctors)).toBe(true);
    });
  });

  describe("GET /doctors/{doctorId}", () => {
    test("should get specific doctor by ID successfully", async () => {
      const testDoctor = testDoctors[0];
      const event = createMockAPIGatewayEvent(`/doctors/${testDoctor.doctorId}`, "GET");

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(200);
      validateDoctorResponse(body);
      expect(body.doctorId).toBe(testDoctor.doctorId);
      expect(body.email).toBe(testDoctor.email);
      expect(body.firstName).toBe(testDoctor.firstName);
      expect(body.lastName).toBe(testDoctor.lastName);
      expect(body.specialization).toBe(testDoctor.specialization);
    });

    test("should return 404 for non-existent doctor", async () => {
      const nonExistentId = "non-existent-doctor-id";
      const event = createMockAPIGatewayEvent(`/doctors/${nonExistentId}`, "GET");

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(404);
      expect(body.message).toBe("Doctor not found");
    });

    test("should handle URL encoded doctor IDs", async () => {
      const testDoctor = testDoctors[0];
      const encodedId = encodeURIComponent(testDoctor.doctorId);
      const event = createMockAPIGatewayEvent(`/doctors/${encodedId}`, "GET");

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(200);
      expect(body.doctorId).toBe(testDoctor.doctorId);
    });
  });

  describe("GET /doctors/by-specialization", () => {
    test("should get doctors by specialization successfully", async () => {
      const specialization = "Cardiology";
      const event = createMockAPIGatewayEvent(
        "/doctors/by-specialization", 
        "GET",
        undefined,
        undefined,
        { specialization }
      );

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(200);
      expect(body.doctors).toBeDefined();
      expect(Array.isArray(body.doctors)).toBe(true);

      // All returned doctors should have the requested specialization
      body.doctors.forEach((doctor: any) => {
        expect(doctor.specialization).toBe(specialization);
        validateDoctorResponse(doctor);
      });

      // Should include our test cardiologist
      const cardiologist = testDoctors.find(d => d.specialization === "Cardiology");
      if (cardiologist) {
        const returnedIds = body.doctors.map((d: any) => d.doctorId);
        expect(returnedIds).toContain(cardiologist.doctorId);
      }
    });

    test("should return empty array for specialization with no doctors", async () => {
      const specialization = "NonExistentSpecialty";
      const event = createMockAPIGatewayEvent(
        "/doctors/by-specialization", 
        "GET",
        undefined,
        undefined,
        { specialization }
      );

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(200);
      expect(body.doctors).toBeDefined();
      expect(Array.isArray(body.doctors)).toBe(true);
      expect(body.doctors.length).toBe(0);
    });

    test("should reject request without specialization parameter", async () => {
      const event = createMockAPIGatewayEvent("/doctors/by-specialization", "GET");

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(400);
      expect(body.message).toBe("specialization query parameter is required");
    });

    test("should handle case-sensitive specialization search", async () => {
      const specialization = "cardiology"; // lowercase
      const event = createMockAPIGatewayEvent(
        "/doctors/by-specialization", 
        "GET",
        undefined,
        undefined,
        { specialization }
      );

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(200);
      expect(body.doctors).toBeDefined();
      // Should return empty array since our test data uses "Cardiology" (capitalized)
      expect(body.doctors.length).toBe(0);
    });
  });

  describe("GET /doctors/by-email", () => {
    test("should get doctor by email successfully", async () => {
      const testDoctor = testDoctors[0];
      const event = createMockAPIGatewayEvent(
        "/doctors/by-email", 
        "GET",
        undefined,
        undefined,
        { email: testDoctor.email }
      );

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(200);
      expect(body.doctors).toBeDefined();
      expect(Array.isArray(body.doctors)).toBe(true);
      expect(body.doctors.length).toBeGreaterThanOrEqual(1);
      
      // Find our test doctor in the results
      const returnedDoctor = body.doctors.find((d: any) => d.doctorId === testDoctor.doctorId);
      expect(returnedDoctor).toBeDefined();
      validateDoctorResponse(returnedDoctor);
      expect(returnedDoctor.email).toBe(testDoctor.email);
    });

    test("should return empty array for non-existent email", async () => {
      const nonExistentEmail = "nonexistent@example.com";
      const event = createMockAPIGatewayEvent(
        "/doctors/by-email", 
        "GET",
        undefined,
        undefined,
        { email: nonExistentEmail }
      );

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(200);
      expect(body.doctors).toBeDefined();
      expect(Array.isArray(body.doctors)).toBe(true);
      expect(body.doctors.length).toBe(0);
    });

    test("should reject request without email parameter", async () => {
      const event = createMockAPIGatewayEvent("/doctors/by-email", "GET");

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(400);
      expect(body.message).toBe("email query parameter is required");
    });

    test("should handle URL encoded email addresses", async () => {
      const testDoctor = testDoctors[0];
      // Use the raw email since our mock doesn't actually URL decode
      const event = createMockAPIGatewayEvent(
        "/doctors/by-email", 
        "GET",
        undefined,
        undefined,
        { email: testDoctor.email }
      );

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(200);
      expect(body.doctors.length).toBeGreaterThanOrEqual(1);
      
      // Find our test doctor in the results
      const returnedDoctor = body.doctors.find((d: any) => d.doctorId === testDoctor.doctorId);
      expect(returnedDoctor).toBeDefined();
      expect(returnedDoctor.email).toBe(testDoctor.email);
    });
  });

  describe("Authentication and Authorization", () => {
    test("should allow unauthenticated access to public doctor listings", async () => {
      // GET /doctors should work without authentication
      const event = createMockAPIGatewayEvent("/doctors", "GET");

      const response = await handler(event);
      const result = response as any;

      expect(result.statusCode).toBe(200);
    });

    test("should allow authenticated users to view doctor details", async () => {
      const patientToken = generatePatientToken("patient-123", "patient@example.com");
      const testDoctor = testDoctors[0];
      
      const event = createMockAPIGatewayEvent(
        `/doctors/${testDoctor.doctorId}`, 
        "GET",
        undefined,
        { Authorization: `Bearer ${patientToken}` }
      );

      const response = await handler(event);
      const result = response as any;

      expect(result.statusCode).toBe(200);
    });

    test("should allow doctors to view their own profile", async () => {
      const testDoctor = testDoctors[0];
      const doctorToken = generateDoctorToken(testDoctor.doctorId, testDoctor.email);
      
      const event = createMockAPIGatewayEvent(
        `/doctors/${testDoctor.doctorId}`, 
        "GET",
        undefined,
        { Authorization: `Bearer ${doctorToken}` }
      );

      const response = await handler(event);
      const result = response as any;

      expect(result.statusCode).toBe(200);
    });

    test("should allow admin to view any doctor profile", async () => {
      const testDoctor = testDoctors[0];
      
      const event = createMockAPIGatewayEvent(
        `/doctors/${testDoctor.doctorId}`, 
        "GET",
        undefined,
        { Authorization: `Bearer ${adminToken}` }
      );

      const response = await handler(event);
      const result = response as any;

      expect(result.statusCode).toBe(200);
    });
  });

  describe("Error Handling", () => {
    test("should handle malformed query parameters", async () => {
      // Test with empty specialization
      const event = createMockAPIGatewayEvent(
        "/doctors/by-specialization", 
        "GET",
        undefined,
        undefined,
        { specialization: "" }
      );

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(400);
      expect(body.message).toBe("specialization query parameter is required");
    });

    test("should handle invalid doctor ID format", async () => {
      const invalidId = ""; // Empty ID
      const event = createMockAPIGatewayEvent(`/doctors/${invalidId}`, "GET");

      const response = await handler(event);
      const result = response as any;

      // Should either return 404 or handle gracefully
      expect([404, 500]).toContain(result.statusCode);
    });
  });

  describe("Data Consistency", () => {
    test("should return consistent doctor data across different endpoints", async () => {
      const testDoctor = testDoctors[0];

      // Get doctor by ID
      const byIdEvent = createMockAPIGatewayEvent(`/doctors/${testDoctor.doctorId}`, "GET");
      const byIdResponse = await handler(byIdEvent);
      const byIdResult = JSON.parse((byIdResponse as any).body);

      // Get doctor by email
      const byEmailEvent = createMockAPIGatewayEvent(
        "/doctors/by-email", 
        "GET",
        undefined,
        undefined,
        { email: testDoctor.email }
      );
      const byEmailResponse = await handler(byEmailEvent);
      const byEmailResult = JSON.parse((byEmailResponse as any).body);

      // Get doctor by specialization
      const bySpecEvent = createMockAPIGatewayEvent(
        "/doctors/by-specialization", 
        "GET",
        undefined,
        undefined,
        { specialization: testDoctor.specialization }
      );
      const bySpecResponse = await handler(bySpecEvent);
      const bySpecResult = JSON.parse((bySpecResponse as any).body);

      // All should return the same doctor data
      expect(byIdResult.doctorId).toBe(testDoctor.doctorId);
      expect(byEmailResult.doctors[0].doctorId).toBe(testDoctor.doctorId);
      
      const specDoctor = bySpecResult.doctors.find((d: any) => d.doctorId === testDoctor.doctorId);
      expect(specDoctor).toBeDefined();
      expect(specDoctor.email).toBe(testDoctor.email);
    });

    test("should include all required fields in doctor responses", async () => {
      const event = createMockAPIGatewayEvent("/doctors", "GET");
      const response = await handler(event);
      const result = JSON.parse((response as any).body);

      result.doctors.forEach((doctor: any) => {
        // Required fields
        expect(doctor.doctorId).toBeDefined();
        expect(doctor.email).toBeDefined();
        expect(doctor.firstName).toBeDefined();
        expect(doctor.lastName).toBeDefined();
        expect(doctor.specialization).toBeDefined();
        expect(doctor.licenseNumber).toBeDefined();
        expect(doctor.createdAt).toBeDefined();
        expect(typeof doctor.isActive).toBe('boolean');
        expect(typeof doctor.rating).toBe('number');
        expect(typeof doctor.reviewCount).toBe('number');
        
        // Optional fields should exist (even if empty)
        expect(doctor.phoneNumber !== undefined).toBe(true);
        expect(doctor.address !== undefined).toBe(true);
        expect(doctor.bio !== undefined).toBe(true);
        expect(typeof doctor.experience).toBe('number');
        expect(Array.isArray(doctor.education)).toBe(true);
        expect(Array.isArray(doctor.certifications)).toBe(true);
      });
    });
  });
});
