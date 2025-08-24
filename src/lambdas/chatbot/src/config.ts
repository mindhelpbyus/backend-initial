import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export function getDynamoDBClient(): DynamoDBDocumentClient {
  const client = new DynamoDBClient({
    region: process.env.AWS_REGION || "us-east-1",
    ...(process.env.DYNAMODB_ENDPOINT && {
      endpoint: process.env.DYNAMODB_ENDPOINT,
    }),
  });
  
  return DynamoDBDocumentClient.from(client);
}

export const CHATBOT_CONFIG = {
  CHAT_SESSIONS_TABLE: process.env.CHAT_SESSIONS_TABLE || "ChatSessionsTable",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  MODEL: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
  MAX_TOKENS: parseInt(process.env.MAX_TOKENS || "1000"),
  TEMPERATURE: parseFloat(process.env.TEMPERATURE || "0.7"),
  JWT_SECRET: process.env.JWT_SECRET || "dev-secret",
  SYSTEM_PROMPT: `You are Kadhaippoma, a compassionate AI assistant helping with mental health intake. 
Your role is to:
1. Gather essential information for mental health assessment
2. Ask empathetic, non-judgmental questions
3. Provide emotional support and validation
4. Extract structured data for healthcare providers
5. Determine when to recommend scheduling an appointment

Guidelines:
- Be warm, understanding, and professional
- Ask one question at a time
- Validate emotions and experiences
- Respect privacy and confidentiality
- Focus on current concerns, history, and goals
- Use simple, clear language
- Avoid giving medical advice or diagnoses

Start by introducing yourself and asking how you can help today.`
};
