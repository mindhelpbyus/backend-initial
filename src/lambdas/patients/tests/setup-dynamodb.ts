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

  // Create Patients Table
  try {
    const patientsResponse = await client.send(new CreateTableCommand({
      TableName: "PatientsTable",
      AttributeDefinitions: [
        { AttributeName: "patientId", AttributeType: "S" },
        { AttributeName: "email", AttributeType: "S" },
        { AttributeName: "createdAt", AttributeType: "S" }
      ],
      KeySchema: [
        { AttributeName: "patientId", KeyType: "HASH" }
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
        }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    }));
    console.log("✅ Patients Table created successfully:", patientsResponse);
  } catch (error: any) {
    if (error.name === "ResourceInUseException") {
      console.log("Patients Table already exists");
    } else {
      console.error("Error creating Patients table:", error);
      throw error;
    }
  }

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

createTables();
