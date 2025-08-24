import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import {
  PutCommand,
  GetCommand,
  UpdateCommand,
  QueryCommand
} from "@aws-sdk/lib-dynamodb";
import { getDynamoDBClient, CHATBOT_CONFIG } from "./config";
import { ChatSession, ChatMessage, IntakeData, AIResponse } from "./types";
import { v4 as uuidv4 } from "uuid";
import * as jwt from "jsonwebtoken";
import { createLogger, withLogging, PerformanceMonitor } from "../../../shared/logger";

const doc = getDynamoDBClient();
const logger = createLogger(process.env.SERVICE_NAME || 'chatbot');

function jsonResponse(statusCode: number, body: any): APIGatewayProxyResultV2 {
  return {
    statusCode,
    headers: { 
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
    },
    body: JSON.stringify(body)
  };
}

function verifyAuth(event: APIGatewayProxyEventV2) {
  const auth = event.headers?.authorization || event.headers?.Authorization;
  if (!auth) return null;
  const match = auth.match(/^Bearer\s+(.+)$/i);
  if (!match) return null;
  try {
    return jwt.verify(match[1], CHATBOT_CONFIG.JWT_SECRET) as any;
  } catch (e) {
    return null;
  }
}

async function callOpenAI(messages: ChatMessage[], sessionData?: ChatSession): Promise<AIResponse> {
  // Mock AI response for now - replace with actual OpenAI API call
  const userMessage = messages[messages.length - 1]?.message || "";
  
  // Simple rule-based responses for demonstration
  let response: AIResponse = {
    message: "I understand. Can you tell me more about that?",
    intent: "gather_info",
    confidence: 0.8
  };

  if (messages.length === 1) {
    response = {
      message: "Hello! I'm Kadhaippoma, your mental health intake assistant. I'm here to help you get started on your mental health journey. How are you feeling today, and what brings you here?",
      intent: "greeting",
      confidence: 0.9,
      nextQuestions: ["How are you feeling today?", "What brings you here?"]
    };
  } else if (userMessage.toLowerCase().includes("anxious") || userMessage.toLowerCase().includes("anxiety")) {
    response = {
      message: "I hear that you're experiencing anxiety. That takes courage to share. Can you tell me how long you've been feeling this way?",
      intent: "anxiety_assessment",
      confidence: 0.85,
      extractedData: {
        currentConcerns: {
          primaryConcern: "anxiety",
          symptoms: ["anxiety"]
        }
      }
    };
  } else if (userMessage.toLowerCase().includes("depressed") || userMessage.toLowerCase().includes("depression")) {
    response = {
      message: "Thank you for trusting me with that. Depression can feel overwhelming. On a scale of 1-10, how would you rate how you're feeling today?",
      intent: "depression_assessment",
      confidence: 0.85,
      extractedData: {
        currentConcerns: {
          primaryConcern: "depression",
          symptoms: ["depression"]
        }
      }
    };
  } else if (userMessage.match(/\b\d+\b/) && sessionData?.intakeData?.currentConcerns?.primaryConcern) {
    const severity = parseInt(userMessage.match(/\b\d+\b/)![0]);
    response = {
      message: `I understand you're rating your feelings as ${severity}/10. That helps me understand better. Have you experienced these feelings before, or is this something new for you?`,
      intent: "severity_assessment",
      confidence: 0.9,
      extractedData: {
        currentConcerns: {
          severity: severity
        }
      }
    };
  } else if (userMessage.toLowerCase().includes("therapy") || userMessage.toLowerCase().includes("counseling")) {
    response = {
      message: "It sounds like you're interested in therapy. Have you worked with a therapist or counselor before?",
      intent: "therapy_history",
      confidence: 0.8
    };
  } else if (userMessage.toLowerCase().includes("yes") || userMessage.toLowerCase().includes("no")) {
    response = {
      message: "Thank you for sharing that with me. Based on what you've told me, it sounds like you could benefit from speaking with one of our mental health professionals. Would you like me to help you schedule an appointment?",
      intent: "appointment_recommendation",
      confidence: 0.85,
      shouldScheduleAppointment: true
    };
  }

  return response;
}

const handlerImpl = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const path = event.rawPath || (event.requestContext as any).http?.path || "/";
  const method = (event.requestContext as any).http?.method || event.requestContext?.http?.method;
  const requestId = (event.requestContext as any).requestId;
  
  const logContext = {
    requestId,
    path,
    method,
    userAgent: event.headers?.['user-agent'],
    ip: event.requestContext?.http?.sourceIp
  };

  try {
    // Handle CORS preflight
    if (method === "OPTIONS") {
      return jsonResponse(200, { message: "OK" });
    }

    if (path === "/chat/start" && method === "POST") {
      const monitor = new PerformanceMonitor(logger, 'chat_start', logContext);
      
      const sessionId = uuidv4();
      const now = new Date().toISOString();
      
      const session: ChatSession = {
        sessionId,
        startTime: now,
        lastActivity: now,
        status: 'active',
        messages: [],
        intakeData: {}
      };

      logger.info('Starting new chat session', { ...logContext, sessionId });

      const dbStart = Date.now();
      await doc.send(new PutCommand({
        TableName: CHATBOT_CONFIG.CHAT_SESSIONS_TABLE,
        Item: session
      }));
      logger.logDatabaseOperation('put', CHATBOT_CONFIG.CHAT_SESSIONS_TABLE, true, Date.now() - dbStart, { ...logContext, sessionId });

      // Generate initial greeting
      const aiResponse = await callOpenAI([]);
      const botMessage: ChatMessage = {
        id: uuidv4(),
        sessionId,
        message: aiResponse.message,
        sender: 'bot',
        timestamp: now,
        metadata: {
          intent: aiResponse.intent,
          confidence: aiResponse.confidence
        }
      };

      session.messages.push(botMessage);
      
      await doc.send(new UpdateCommand({
        TableName: CHATBOT_CONFIG.CHAT_SESSIONS_TABLE,
        Key: { sessionId },
        UpdateExpression: "SET messages = :messages, lastActivity = :lastActivity",
        ExpressionAttributeValues: {
          ":messages": session.messages,
          ":lastActivity": now
        }
      }));

      monitor.end(true, { sessionId });
      return jsonResponse(201, { sessionId, message: botMessage });
    }

    if (path === "/chat/message" && method === "POST") {
      const monitor = new PerformanceMonitor(logger, 'chat_message', logContext);
      
      const body = event.body ? JSON.parse(event.body) : {};
      const { sessionId, message } = body;

      if (!sessionId || !message) {
        logger.logValidationError(['sessionId and message required'], logContext);
        monitor.end(false);
        return jsonResponse(400, { message: "sessionId and message required" });
      }

      logger.info('Processing chat message', { ...logContext, sessionId });

      // Get existing session
      const dbStart = Date.now();
      const sessionResult = await doc.send(new GetCommand({
        TableName: CHATBOT_CONFIG.CHAT_SESSIONS_TABLE,
        Key: { sessionId }
      }));
      logger.logDatabaseOperation('get', CHATBOT_CONFIG.CHAT_SESSIONS_TABLE, true, Date.now() - dbStart, { ...logContext, sessionId });

      if (!sessionResult.Item) {
        logger.warn('Chat session not found', { ...logContext, sessionId });
        monitor.end(false);
        return jsonResponse(404, { message: "session not found" });
      }

      const session = sessionResult.Item as ChatSession;
      const now = new Date().toISOString();

      // Add user message
      const userMessage: ChatMessage = {
        id: uuidv4(),
        sessionId,
        message,
        sender: 'user',
        timestamp: now
      };

      session.messages.push(userMessage);

      // Get AI response
      const aiResponse = await callOpenAI(session.messages, session);
      
      // Add bot message
      const botMessage: ChatMessage = {
        id: uuidv4(),
        sessionId,
        message: aiResponse.message,
        sender: 'bot',
        timestamp: now,
        metadata: {
          intent: aiResponse.intent,
          confidence: aiResponse.confidence
        }
      };

      session.messages.push(botMessage);
      session.lastActivity = now;

      // Update intake data if extracted
      if (aiResponse.extractedData) {
        session.intakeData = {
          ...session.intakeData,
          ...aiResponse.extractedData,
          currentConcerns: {
            ...session.intakeData?.currentConcerns,
            ...aiResponse.extractedData.currentConcerns
          }
        };
      }

      // Update session in database
      const updateStart = Date.now();
      await doc.send(new UpdateCommand({
        TableName: CHATBOT_CONFIG.CHAT_SESSIONS_TABLE,
        Key: { sessionId },
        UpdateExpression: "SET messages = :messages, lastActivity = :lastActivity, intakeData = :intakeData",
        ExpressionAttributeValues: {
          ":messages": session.messages,
          ":lastActivity": session.lastActivity,
          ":intakeData": session.intakeData
        }
      }));
      logger.logDatabaseOperation('update', CHATBOT_CONFIG.CHAT_SESSIONS_TABLE, true, Date.now() - updateStart, { ...logContext, sessionId });

      monitor.end(true, { sessionId, messageCount: session.messages.length });
      return jsonResponse(200, { 
        message: botMessage,
        shouldScheduleAppointment: aiResponse.shouldScheduleAppointment,
        intakeData: session.intakeData
      });
    }

    if (path.match(/^\/chat\/sessions\/([^\/]+)$/) && method === "GET") {
      const monitor = new PerformanceMonitor(logger, 'get_chat_session', logContext);
      
      const sessionId = path.split('/')[3];
      
      logger.info('Fetching chat session', { ...logContext, sessionId });

      const dbStart = Date.now();
      const result = await doc.send(new GetCommand({
        TableName: CHATBOT_CONFIG.CHAT_SESSIONS_TABLE,
        Key: { sessionId }
      }));
      logger.logDatabaseOperation('get', CHATBOT_CONFIG.CHAT_SESSIONS_TABLE, true, Date.now() - dbStart, { ...logContext, sessionId });

      if (!result.Item) {
        logger.warn('Chat session not found', { ...logContext, sessionId });
        monitor.end(false);
        return jsonResponse(404, { message: "session not found" });
      }

      monitor.end(true, { sessionId });
      return jsonResponse(200, result.Item);
    }

    logger.warn('Route not found', logContext);
    return jsonResponse(404, { message: "route not found" });
  } catch (err: any) {
    logger.error('Unhandled error in chatbot handler', logContext, err);
    return jsonResponse(500, { message: "internal server error", error: err.message });
  }
};

// Export handler with logging middleware
export const handler = withLogging(handlerImpl, logger);
