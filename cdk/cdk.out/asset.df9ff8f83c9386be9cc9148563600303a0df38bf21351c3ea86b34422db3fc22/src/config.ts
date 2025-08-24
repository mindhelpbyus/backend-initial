import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export const getDynamoDBClient = () => {
  const clientConfig: any = {
    region: process.env.AWS_REGION || process.env.REGION || 'us-east-1'
  };

  // Only set endpoint for local development (when DYNAMODB_ENDPOINT is set)
  if (process.env.DYNAMODB_ENDPOINT) {
    clientConfig.endpoint = process.env.DYNAMODB_ENDPOINT;
    // Only set explicit credentials for local development
    clientConfig.credentials = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'dummy',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'dummy'
    };
  }
  // For AWS Lambda, don't set credentials - let IAM role handle it

  const client = new DynamoDBClient(clientConfig);
  return DynamoDBDocumentClient.from(client);
};
