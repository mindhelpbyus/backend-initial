import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export const getDynamoDBClient = () => {
  const client = new DynamoDBClient({
    endpoint: process.env.DYNAMODB_ENDPOINT,
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'dummy',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'dummy'
    }
  });

  return DynamoDBDocumentClient.from(client);
};