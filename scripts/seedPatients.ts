import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

const REGION = process.env.AWS_REGION || "us-east-1";
const TABLE = process.env.PATIENTS_TABLE || "PatientsTable";

async function seed() {
  const client = new DynamoDBClient({ region: REGION });
  const doc = DynamoDBDocumentClient.from(client);

  const patients = [
    {
      patientId: uuidv4(),
      email: "alice@example.com",
      firstName: "Alice",
      lastName: "Smith",
      createdAt: new Date().toISOString(),
      role: "patient",
      visits: [],
      reviews: []
    },
    {
      patientId: uuidv4(),
      email: "bob@example.com",
      firstName: "Bob",
      lastName: "Jones",
      createdAt: new Date().toISOString(),
      role: "patient",
      visits: [],
      reviews: []
    }
  ];

  for (const p of patients) {
    console.log("Seeding:", p.email);
    await doc.send(new PutCommand({ TableName: TABLE, Item: p }));
  }

  console.log("Seeding complete.");
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
