import { 
  setupTestEnvironment, 
  createMockAPIGatewayEvent, 
  generateTestPatient,
  generateAuthToken,
  cleanupTestData,
  getTestDynamoDBClient
} from "../test-helpers";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

// Set up environment before importing handler
process.env.DYNAMODB_ENDPOINT = "http://localhost:8000";
process.env.AWS_REGION = "us-east-1";
process.env.PATIENTS_TABLE = "PatientsTable";
process.env.JWT_SECRET = "test-secret";
process.env.AWS_ACCESS_KEY_ID = "dummy";
process.env.AWS_SECRET_ACCESS_KEY = "dummy";

// Import handler after environment setup
import { handler } from "../../src/handler";

describe("Patient API GET Operations", () => {
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

  describe("GET /patients", () => {
    let adminToken: string;
    let testPatients: any[] = [];

    beforeAll(async () => {
      // Generate admin token for testing
      adminToken = generateAuthToken({
        patientId: "admin-id",
        email: "admin@example.com",
        role: "admin"
      });

      // Create some test patients directly in the database
      for (let i = 0; i < 3; i++) {
        const testPatient = generateTestPatient({
          email: `gettest${i}@example.com`
        });
        const patientId = `test-patient-${i}-${Date.now()}`;
        
        await doc.send(new PutCommand({
          TableName: "PatientsTable",
          Item: {
            patientId,
            email: testPatient.email,
            firstName: testPatient.firstName,
            lastName: testPatient.lastName,
            password: "hashed-password",
            role: "patient",
            createdAt: new Date().toISOString(),
            reviews: [],
            visits: []
          }
        }));

        testPatients.push({ patientId, ...testPatient });
        createdPatientIds.push(patientId);
      }
    });

    test("should get all patients as admin", async () => {
      const event = createMockAPIGatewayEvent(
        "/patients",
        "GET",
        undefined,
        { Authorization: `Bearer ${adminToken}` }
      );

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(200);
      expect(body.items).toBeDefined();
      expect(Array.isArray(body.items)).toBe(true);
      expect(body.items.length).toBeGreaterThanOrEqual(3);

      // Check that our test patients are included
      const emails = body.items.map((item: any) => item.email);
      expect(emails).toContain("gettest0@example.com");
      expect(emails).toContain("gettest1@example.com");
      expect(emails).toContain("gettest2@example.com");
    });

    test("should reject get all patients without admin role", async () => {
      const patientToken = generateAuthToken({
        patientId: "patient-id",
        email: "patient@example.com",
        role: "patient"
      });

      const event = createMockAPIGatewayEvent(
        "/patients",
        "GET",
        undefined,
        { Authorization: `Bearer ${patientToken}` }
      );

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(403);
      expect(body.message).toBe("admin required");
    });

    test("should reject get all patients without authentication", async () => {
      const event = createMockAPIGatewayEvent("/patients", "GET");

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(403);
      expect(body.message).toBe("admin required");
    });
  });

  describe("GET /patients/{patientId}", () => {
    let testPatientId: string;
    let testPatientData: any;

    beforeAll(async () => {
      // Create a test patient directly in the database
      testPatientData = generateTestPatient({
        email: "singlepatient@example.com"
      });
      testPatientId = `single-patient-${Date.now()}`;
      
      await doc.send(new PutCommand({
        TableName: "PatientsTable",
        Item: {
          patientId: testPatientId,
          email: testPatientData.email,
          firstName: testPatientData.firstName,
          lastName: testPatientData.lastName,
          password: "hashed-password",
          role: "patient",
          createdAt: new Date().toISOString(),
          reviews: [
            {
              id: "review-1",
              rating: 5,
              comment: "Great service!",
              createdAt: new Date().toISOString()
            }
          ],
          visits: [
            {
              id: "visit-1",
              date: new Date().toISOString(),
              doctorId: "doctor-123"
            }
          ]
        }
      }));

      createdPatientIds.push(testPatientId);
    });

    test("should get patient by ID successfully", async () => {
      const event = createMockAPIGatewayEvent(`/patients/${testPatientId}`, "GET");

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(200);
      expect(body.patientId).toBe(testPatientId);
      expect(body.email).toBe(testPatientData.email);
      expect(body.firstName).toBe(testPatientData.firstName);
      expect(body.lastName).toBe(testPatientData.lastName);
      expect(body.password).toBeUndefined(); // Password should be removed
      expect(body.reviews).toBeDefined();
      expect(body.visits).toBeDefined();
      expect(body.createdAt).toBeDefined();
    });

    test("should return 404 for non-existent patient", async () => {
      const event = createMockAPIGatewayEvent("/patients/non-existent-id", "GET");

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(404);
      expect(body.message).toBe("not found");
    });

    test("should handle URL encoded patient ID", async () => {
      const encodedId = encodeURIComponent(testPatientId);
      const event = createMockAPIGatewayEvent(`/patients/${encodedId}`, "GET");

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(200);
      expect(body.patientId).toBe(testPatientId);
    });
  });

  describe("GET /patients/by-email", () => {
    let testPatientData: any;
    let testPatientId: string;

    beforeAll(async () => {
      // Create a test patient for email search
      testPatientData = generateTestPatient({
        email: `emailsearch${Date.now()}@example.com`
      });
      testPatientId = `email-search-${Date.now()}`;
      
      await doc.send(new PutCommand({
        TableName: "PatientsTable",
        Item: {
          patientId: testPatientId,
          email: testPatientData.email,
          firstName: testPatientData.firstName,
          lastName: testPatientData.lastName,
          password: "hashed-password",
          role: "patient",
          createdAt: new Date().toISOString(),
          reviews: [],
          visits: []
        }
      }));

      createdPatientIds.push(testPatientId);
    });

    test("should find patient by email", async () => {
      const event = createMockAPIGatewayEvent(
        "/patients/by-email",
        "GET",
        undefined,
        {},
        { email: testPatientData.email }
      );

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(200);
      expect(body.items).toBeDefined();
      expect(Array.isArray(body.items)).toBe(true);
      expect(body.items.length).toBe(1);
      expect(body.items[0].email).toBe(testPatientData.email);
      expect(body.items[0].patientId).toBe(testPatientId);
    });

    test("should return empty array for non-existent email", async () => {
      const event = createMockAPIGatewayEvent(
        "/patients/by-email",
        "GET",
        undefined,
        {},
        { email: "nonexistent@example.com" }
      );

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(200);
      expect(body.items).toBeDefined();
      expect(Array.isArray(body.items)).toBe(true);
      expect(body.items.length).toBe(0);
    });

    test("should reject request without email parameter", async () => {
      const event = createMockAPIGatewayEvent("/patients/by-email", "GET");

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(400);
      expect(body.message).toBe("email query param required");
    });
  });

  describe("GET /patients/{patientId}/visits", () => {
    let testPatientId: string;
    let testVisits: any[];

    beforeAll(async () => {
      // Create a test patient with visits
      testPatientId = `visits-patient-${Date.now()}`;
      testVisits = [
        {
          id: "visit-1",
          date: "2023-01-01T10:00:00Z",
          doctorId: "doctor-123",
          type: "consultation"
        },
        {
          id: "visit-2",
          date: "2023-01-15T14:00:00Z",
          doctorId: "doctor-456",
          type: "follow-up"
        }
      ];
      
      await doc.send(new PutCommand({
        TableName: "PatientsTable",
        Item: {
          patientId: testPatientId,
          email: "visitspatient@example.com",
          firstName: "Visits",
          lastName: "Patient",
          password: "hashed-password",
          role: "patient",
          createdAt: new Date().toISOString(),
          reviews: [],
          visits: testVisits
        }
      }));

      createdPatientIds.push(testPatientId);
    });

    test("should get patient visits successfully", async () => {
      const event = createMockAPIGatewayEvent(`/patients/${testPatientId}/visits`, "GET");

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(200);
      expect(body.visits).toBeDefined();
      expect(Array.isArray(body.visits)).toBe(true);
      expect(body.visits.length).toBe(2);
      expect(body.visits[0].id).toBe("visit-1");
      expect(body.visits[1].id).toBe("visit-2");
    });

    test("should return empty visits array for patient with no visits", async () => {
      // Create a patient with no visits
      const noVisitsPatientId = `no-visits-${Date.now()}`;
      await doc.send(new PutCommand({
        TableName: "PatientsTable",
        Item: {
          patientId: noVisitsPatientId,
          email: "novisits@example.com",
          firstName: "No",
          lastName: "Visits",
          password: "hashed-password",
          role: "patient",
          createdAt: new Date().toISOString(),
          reviews: [],
          visits: []
        }
      }));

      createdPatientIds.push(noVisitsPatientId);

      const event = createMockAPIGatewayEvent(`/patients/${noVisitsPatientId}/visits`, "GET");

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(200);
      expect(body.visits).toBeDefined();
      expect(Array.isArray(body.visits)).toBe(true);
      expect(body.visits.length).toBe(0);
    });

    test("should return 404 for non-existent patient visits", async () => {
      const event = createMockAPIGatewayEvent("/patients/non-existent-id/visits", "GET");

      const response = await handler(event);
      const result = response as any;
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(404);
      expect(body.message).toBe("not found");
    });
  });
});
