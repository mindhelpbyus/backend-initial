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

  // Create Doctors Table
  try {
    const doctorsResponse = await client.send(new CreateTableCommand({
      TableName: "DoctorsTable",
      AttributeDefinitions: [
        { AttributeName: "doctorId", AttributeType: "S" },
        { AttributeName: "email", AttributeType: "S" },
        { AttributeName: "specialization", AttributeType: "S" },
        { AttributeName: "createdAt", AttributeType: "S" }
      ],
      KeySchema: [
        { AttributeName: "doctorId", KeyType: "HASH" }
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: "email-index",
          KeySchema: [
            { AttributeName: "email", KeyType: "HASH" },
            { AttributeName: "createdAt", KeyType: "RANGE" }
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
          IndexName: "specialization-index",
          KeySchema: [
            { AttributeName: "specialization", KeyType: "HASH" },
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
    console.log("✅ Doctors Table created successfully:", doctorsResponse);
  } catch (error: any) {
    if (error.name === "ResourceInUseException") {
      console.log("Doctors Table already exists");
    } else {
      console.error("Error creating Doctors table:", error);
      throw error;
    }
  }
};

// Set environment variables for tests
process.env.DYNAMODB_ENDPOINT = "http://localhost:8000";
process.env.AWS_REGION = "us-east-1";
process.env.AWS_ACCESS_KEY_ID = "dummy";
process.env.AWS_SECRET_ACCESS_KEY = "dummy";
process.env.DOCTORS_TABLE = "DoctorsTable";
process.env.JWT_SECRET = "test-secret";

beforeAll(async () => {
  await createTables();
});
