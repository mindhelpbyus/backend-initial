import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";

const createTable = async () => {
  const client = new DynamoDBClient({
    endpoint: "http://localhost:8000",
    region: "us-east-1",
    credentials: {
      accessKeyId: "dummy",
      secretAccessKey: "dummy"
    }
  });

  try {
    const response = await client.send(new CreateTableCommand({
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
    console.log("✅ Table created successfully:", response);
  } catch (error: any) {
    if (error.name === "ResourceInUseException") {
      console.log("Table already exists");
    } else {
      console.error("Error creating table:", error);
      throw error;
    }
  }
};

createTable();
