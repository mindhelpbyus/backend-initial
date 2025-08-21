import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";

const createTables = async () => {
  const client = new DynamoDBClient({
    endpoint: "http://localhost:8000",
    region: "us-east-1",
    credentials: {
      accessKeyId: "dummy",
      secretAccessKey: "dummy"
    }
  });

  // Create Appointments Table
  try {
    const appointmentsResponse = await client.send(new CreateTableCommand({
      TableName: "AppointmentsTable",
      AttributeDefinitions: [
        { AttributeName: "appointmentId", AttributeType: "S" },
        { AttributeName: "patientId", AttributeType: "S" },
        { AttributeName: "doctorId", AttributeType: "S" },
        { AttributeName: "appointmentStatus", AttributeType: "S" },
        { AttributeName: "scheduleDate", AttributeType: "S" },
        { AttributeName: "createdAt", AttributeType: "S" }
      ],
      KeySchema: [
        { AttributeName: "appointmentId", KeyType: "HASH" }
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: "patient-index",
          KeySchema: [
            { AttributeName: "patientId", KeyType: "HASH" },
            { AttributeName: "scheduleDate", KeyType: "RANGE" }
          ],
          Projection: {
            ProjectionType: "ALL"
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
          }
        },
        {
          IndexName: "doctor-index",
          KeySchema: [
            { AttributeName: "doctorId", KeyType: "HASH" },
            { AttributeName: "scheduleDate", KeyType: "RANGE" }
          ],
          Projection: {
            ProjectionType: "ALL"
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
          }
        },
        {
          IndexName: "status-index",
          KeySchema: [
            { AttributeName: "appointmentStatus", KeyType: "HASH" },
            { AttributeName: "createdAt", KeyType: "RANGE" }
          ],
          Projection: {
            ProjectionType: "ALL"
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
          }
        }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    }));
    console.log("✅ Appointments Table created successfully:", appointmentsResponse);
  } catch (error: any) {
    if (error.name === "ResourceInUseException") {
      console.log("Appointments Table already exists");
    } else {
      console.error("Error creating Appointments table:", error);
      throw error;
    }
  }
};

// Set environment variables for tests
process.env.DYNAMODB_ENDPOINT = "http://localhost:8000";
process.env.AWS_REGION = "us-east-1";
process.env.AWS_ACCESS_KEY_ID = "dummy";
process.env.AWS_SECRET_ACCESS_KEY = "dummy";
process.env.APPOINTMENTS_TABLE = "AppointmentsTable";
process.env.JWT_SECRET = "test-secret";

beforeAll(async () => {
  await createTables();
});
