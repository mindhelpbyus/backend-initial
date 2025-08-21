const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { 
  CreateTableCommand, 
  DescribeTableCommand,
  ListTablesCommand 
} = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({
  region: "us-east-1",
  endpoint: "http://localhost:8000",
  credentials: {
    accessKeyId: "dummy",
    secretAccessKey: "dummy"
  }
});

async function createPatientsTable() {
  try {
    // Check if table already exists
    try {
      await client.send(new DescribeTableCommand({ TableName: "PatientsTable" }));
      console.log("PatientsTable already exists");
      return;
    } catch (error) {
      // Table doesn't exist, create it
    }

    const createTableParams = {
      TableName: "PatientsTable",
      KeySchema: [
        {
          AttributeName: "patientId",
          KeyType: "HASH"
        }
      ],
      AttributeDefinitions: [
        {
          AttributeName: "patientId",
          AttributeType: "S"
        },
        {
          AttributeName: "email",
          AttributeType: "S"
        },
        {
          AttributeName: "createdAt",
          AttributeType: "S"
        }
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: "email-index",
          KeySchema: [
            {
              AttributeName: "email",
              KeyType: "HASH"
            },
            {
              AttributeName: "createdAt",
              KeyType: "RANGE"
            }
          ],
          Projection: {
            ProjectionType: "ALL"
          },
          BillingMode: "PAY_PER_REQUEST"
        }
      ],
      BillingMode: "PAY_PER_REQUEST"
    };

    const result = await client.send(new CreateTableCommand(createTableParams));
    console.log("PatientsTable created successfully:", result.TableDescription.TableName);
    
    // Wait for table to be active
    let tableStatus = "CREATING";
    while (tableStatus !== "ACTIVE") {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const describeResult = await client.send(new DescribeTableCommand({ TableName: "PatientsTable" }));
      tableStatus = describeResult.Table.TableStatus;
      console.log("PatientsTable status:", tableStatus);
    }
    
    console.log("PatientsTable is now active and ready to use!");
    
  } catch (error) {
    console.error("Error creating PatientsTable:", error);
    process.exit(1);
  }
}

async function createDoctorsTable() {
  try {
    // Check if table already exists
    try {
      await client.send(new DescribeTableCommand({ TableName: "DoctorsTable" }));
      console.log("DoctorsTable already exists");
      return;
    } catch (error) {
      // Table doesn't exist, create it
    }

    const createTableParams = {
      TableName: "DoctorsTable",
      KeySchema: [
        {
          AttributeName: "doctorId",
          KeyType: "HASH"
        }
      ],
      AttributeDefinitions: [
        {
          AttributeName: "doctorId",
          AttributeType: "S"
        },
        {
          AttributeName: "email",
          AttributeType: "S"
        },
        {
          AttributeName: "specialization",
          AttributeType: "S"
        },
        {
          AttributeName: "createdAt",
          AttributeType: "S"
        }
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: "email-index",
          KeySchema: [
            {
              AttributeName: "email",
              KeyType: "HASH"
            },
            {
              AttributeName: "createdAt",
              KeyType: "RANGE"
            }
          ],
          Projection: {
            ProjectionType: "ALL"
          },
          BillingMode: "PAY_PER_REQUEST"
        },
        {
          IndexName: "specialization-index",
          KeySchema: [
            {
              AttributeName: "specialization",
              KeyType: "HASH"
            },
            {
              AttributeName: "createdAt",
              KeyType: "RANGE"
            }
          ],
          Projection: {
            ProjectionType: "ALL"
          },
          BillingMode: "PAY_PER_REQUEST"
        }
      ],
      BillingMode: "PAY_PER_REQUEST"
    };

    const result = await client.send(new CreateTableCommand(createTableParams));
    console.log("DoctorsTable created successfully:", result.TableDescription.TableName);
    
    // Wait for table to be active
    let tableStatus = "CREATING";
    while (tableStatus !== "ACTIVE") {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const describeResult = await client.send(new DescribeTableCommand({ TableName: "DoctorsTable" }));
      tableStatus = describeResult.Table.TableStatus;
      console.log("DoctorsTable status:", tableStatus);
    }
    
    console.log("DoctorsTable is now active and ready to use!");
    
  } catch (error) {
    console.error("Error creating DoctorsTable:", error);
    process.exit(1);
  }
}

async function listTables() {
  try {
    const result = await client.send(new ListTablesCommand({}));
    console.log("Available tables:", result.TableNames);
  } catch (error) {
    console.error("Error listing tables:", error);
  }
}

async function main() {
  console.log("Setting up local DynamoDB tables...");
  await createPatientsTable();
  await createDoctorsTable();
  await listTables();
  console.log("Setup complete!");
}

main().catch(console.error);
