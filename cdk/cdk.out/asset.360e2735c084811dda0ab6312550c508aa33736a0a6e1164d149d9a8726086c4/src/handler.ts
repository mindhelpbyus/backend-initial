import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import {
  PutCommand,
  GetCommand,
  ScanCommand,
  QueryCommand,
  UpdateCommand,
  DeleteCommand
} from "@aws-sdk/lib-dynamodb";
import { getDynamoDBClient } from "./config";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { createLogger, withLogging, PerformanceMonitor } from "../../../shared/logger";

const TABLE = process.env.PATIENTS_TABLE || "PatientsTable";
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

const doc = getDynamoDBClient();
const logger = createLogger(process.env.SERVICE_NAME || 'patients');

// Ensure DynamoDB is using local endpoint in test environment
if (process.env.DYNAMODB_ENDPOINT) {
  logger.info("Using local DynamoDB endpoint", { endpoint: process.env.DYNAMODB_ENDPOINT });
}

function jsonResponse(statusCode: number, body: any): APIGatewayProxyResultV2 {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  };
}

function verifyAuth(event: APIGatewayProxyEventV2) {
  const auth = event.headers?.authorization || event.headers?.Authorization;
  if (!auth) return null;
  const match = auth.match(/^Bearer\s+(.+)$/i);
  if (!match) return null;
  try {
    return jwt.verify(match[1], JWT_SECRET) as any;
  } catch (e) {
    return null;
  }
}

const handlerImpl = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const path = event.rawPath || (event.requestContext as any).http?.path || "/";
  const method = (event.requestContext as any).http?.method || event.requestContext?.http?.method || event.requestContext?.http?.method;
  const requestId = (event.requestContext as any).requestId;
  
  const logContext = {
    requestId,
    path,
    method,
    userAgent: event.headers?.['user-agent'],
    ip: event.requestContext?.http?.sourceIp
  };

  try {
    if (path === "/auth/signup" && method === "POST") {
      const monitor = new PerformanceMonitor(logger, 'auth_signup', logContext);
      
      const body = event.body ? JSON.parse(event.body) : {};
      const { email, password, firstName, lastName } = body;
      
      if (!email || !password) {
        logger.logValidationError(['email and password required'], logContext);
        monitor.end(false);
        return jsonResponse(400, { message: "email and password required" });
      }

      logger.info('Processing signup request', { ...logContext, email });

      const dbStart = Date.now();
      const q = await doc.send(new QueryCommand({
        TableName: TABLE,
        IndexName: "email-index",
        KeyConditionExpression: "email = :e",
        ExpressionAttributeValues: { ":e": email }
      }));
      logger.logDatabaseOperation('query', TABLE, true, Date.now() - dbStart, { ...logContext, index: 'email-index' });

      if ((q.Items || []).length > 0) {
        logger.warn('Signup attempt with existing email', { ...logContext, email });
        monitor.end(false);
        return jsonResponse(409, { message: "email already registered" });
      }

      const hashed = bcrypt.hashSync(password, 8);
      const patientId = uuidv4();
      const now = new Date().toISOString();
      const item = {
        patientId,
        email,
        password: hashed,
        firstName: firstName || "",
        lastName: lastName || "",
        createdAt: now,
        role: "patient",
        reviews: [],
        visits: []
      };
      
      const putStart = Date.now();
      await doc.send(new PutCommand({ TableName: TABLE, Item: item }));
      logger.logDatabaseOperation('put', TABLE, true, Date.now() - putStart, { ...logContext, patientId });
      
      const token = jwt.sign({ patientId, email, role: "patient" }, JWT_SECRET, { expiresIn: "7d" });
      
      logger.logBusinessLogic('patient_registration', true, { patientId, email }, logContext);
      monitor.end(true, { patientId });
      
      return jsonResponse(201, { patientId, token });
    }

    if (path === "/auth/login" && method === "POST") {
      const monitor = new PerformanceMonitor(logger, 'auth_login', logContext);
      
      const body = event.body ? JSON.parse(event.body) : {};
      const { email, password } = body;
      
      if (!email || !password) {
        logger.logValidationError(['email and password required'], logContext);
        monitor.end(false);
        return jsonResponse(400, { message: "email and password required" });
      }

      logger.info('Processing login request', { ...logContext, email });

      const dbStart = Date.now();
      const q = await doc.send(new QueryCommand({
        TableName: TABLE,
        IndexName: "email-index",
        KeyConditionExpression: "email = :e",
        ExpressionAttributeValues: { ":e": email }
      }));
      logger.logDatabaseOperation('query', TABLE, true, Date.now() - dbStart, { ...logContext, index: 'email-index' });

      const user = (q.Items || [])[0];
      if (!user) {
        logger.logAuthentication(false, undefined, 'User not found', { ...logContext, email });
        monitor.end(false);
        return jsonResponse(401, { message: "invalid credentials" });
      }

      const ok = bcrypt.compareSync(password, user.password);
      if (!ok) {
        logger.logAuthentication(false, user.patientId, 'Invalid password', { ...logContext, email });
        monitor.end(false);
        return jsonResponse(401, { message: "invalid credentials" });
      }

      const token = jwt.sign({ patientId: user.patientId, email: user.email, role: user.role || "patient" }, JWT_SECRET, { expiresIn: "7d" });
      
      logger.logAuthentication(true, user.patientId, undefined, { ...logContext, email });
      monitor.end(true, { patientId: user.patientId });
      
      return jsonResponse(200, { token, patientId: user.patientId });
    }

    if (path === "/patients" && method === "GET") {
      const monitor = new PerformanceMonitor(logger, 'get_patients', logContext);
      
      const auth = verifyAuth(event);
      logger.info('Fetching patients list', { ...logContext, authenticated: !!auth });
      
      const dbStart = Date.now();
      const r = await doc.send(new ScanCommand({ TableName: TABLE }));
      logger.logDatabaseOperation('scan', TABLE, true, Date.now() - dbStart, { ...logContext, itemCount: r.Items?.length });
      
      monitor.end(true, { itemCount: r.Items?.length });
      return jsonResponse(200, { items: r.Items || [] });
    }

    if (path === "/patients" && method === "POST") {
      const monitor = new PerformanceMonitor(logger, 'create_patient', logContext);
      
      const auth = verifyAuth(event);
      const body = event.body ? JSON.parse(event.body) : {};
      const id = uuidv4();
      const now = new Date().toISOString();
      
      logger.info('Creating new patient', { ...logContext, patientId: id, authenticated: !!auth });
      
      const item = {
        patientId: id,
        createdAt: now,
        ...body
      };
      
      const dbStart = Date.now();
      await doc.send(new PutCommand({ TableName: TABLE, Item: item }));
      logger.logDatabaseOperation('put', TABLE, true, Date.now() - dbStart, { ...logContext, patientId: id });
      
      logger.logBusinessLogic('patient_creation', true, { patientId: id }, logContext);
      monitor.end(true, { patientId: id });
      
      return jsonResponse(201, { patientId: id });
    }

    if (path === "/patients/by-email" && method === "GET") {
      const monitor = new PerformanceMonitor(logger, 'get_patient_by_email', logContext);
      
      const email = (event.queryStringParameters || {})["email"];
      if (!email) {
        logger.logValidationError(['email query param required'], logContext);
        monitor.end(false);
        return jsonResponse(400, { message: "email query param required" });
      }
      
      logger.info('Fetching patient by email', { ...logContext, email });
      
      const dbStart = Date.now();
      const q = await doc.send(new QueryCommand({
        TableName: TABLE,
        IndexName: "email-index",
        KeyConditionExpression: "email = :e",
        ExpressionAttributeValues: { ":e": email }
      }));
      logger.logDatabaseOperation('query', TABLE, true, Date.now() - dbStart, { ...logContext, index: 'email-index', itemCount: q.Items?.length });
      
      monitor.end(true, { itemCount: q.Items?.length });
      return jsonResponse(200, { items: q.Items || [] });
    }

    const patientIdMatch = path.match(/^\/patients\/([^\/]+)(\/.*)?$/);
    if (patientIdMatch) {
      const pid = decodeURIComponent(patientIdMatch[1]);
      const sub = patientIdMatch[2] || "";
      const patientContext = { ...logContext, patientId: pid };

      if (sub === "" && method === "GET") {
        const monitor = new PerformanceMonitor(logger, 'get_patient', patientContext);
        
        logger.info('Fetching patient details', patientContext);
        
        const dbStart = Date.now();
        const r = await doc.send(new GetCommand({ TableName: TABLE, Key: { patientId: pid } }));
        logger.logDatabaseOperation('get', TABLE, true, Date.now() - dbStart, patientContext);
        
        if (!r.Item) {
          logger.warn('Patient not found', patientContext);
          monitor.end(false);
          return jsonResponse(404, { message: "not found" });
        }
        
        const item = { ...r.Item };
        delete item.password;
        
        monitor.end(true);
        return jsonResponse(200, item);
      }

      if (sub === "" && method === "PUT") {
        const monitor = new PerformanceMonitor(logger, 'update_patient', patientContext);
        
        const auth = verifyAuth(event);
        const body = event.body ? JSON.parse(event.body) : {};
        
        logger.info('Updating patient', { ...patientContext, authenticated: !!auth, fieldsToUpdate: Object.keys(body) });
        
        const expressions = [];
        const attrVals: any = {};
        const attrNames: any = {};
        let i = 0;
        for (const k of Object.keys(body)) {
          i++;
          const nameKey = `#n${i}`;
          const valKey = `:v${i}`;
          expressions.push(`${nameKey} = ${valKey}`);
          attrNames[nameKey] = k;
          attrVals[valKey] = body[k];
        }
        
        if (expressions.length === 0) {
          logger.logValidationError(['no fields to update'], patientContext);
          monitor.end(false);
          return jsonResponse(400, { message: "no fields to update" });
        }
        
        const updateExpr = "SET " + expressions.join(", ");
        
        const dbStart = Date.now();
        await doc.send(new UpdateCommand({
          TableName: TABLE,
          Key: { patientId: pid },
          UpdateExpression: updateExpr,
          ExpressionAttributeNames: attrNames,
          ExpressionAttributeValues: attrVals
        }));
        logger.logDatabaseOperation('update', TABLE, true, Date.now() - dbStart, patientContext);
        
        logger.logBusinessLogic('patient_update', true, { fieldsUpdated: Object.keys(body) }, patientContext);
        monitor.end(true);
        
        return jsonResponse(200, { message: "updated" });
      }

      if (sub === "" && method === "DELETE") {
        const monitor = new PerformanceMonitor(logger, 'delete_patient', patientContext);
        
        const auth = verifyAuth(event);
        logger.info('Deleting patient', { ...patientContext, authenticated: !!auth });
        
        const dbStart = Date.now();
        await doc.send(new DeleteCommand({ TableName: TABLE, Key: { patientId: pid } }));
        logger.logDatabaseOperation('delete', TABLE, true, Date.now() - dbStart, patientContext);
        
        logger.logBusinessLogic('patient_deletion', true, {}, patientContext);
        monitor.end(true);
        
        return jsonResponse(200, { message: "deleted" });
      }

      if (sub === "/visits" && method === "GET") {
        const monitor = new PerformanceMonitor(logger, 'get_patient_visits', patientContext);
        
        logger.info('Fetching patient visits', patientContext);
        
        const dbStart = Date.now();
        const r = await doc.send(new GetCommand({ TableName: TABLE, Key: { patientId: pid } }));
        logger.logDatabaseOperation('get', TABLE, true, Date.now() - dbStart, patientContext);
        
        if (!r.Item) {
          logger.warn('Patient not found for visits', patientContext);
          monitor.end(false);
          return jsonResponse(404, { message: "not found" });
        }
        
        monitor.end(true, { visitCount: r.Item.visits?.length || 0 });
        return jsonResponse(200, { visits: r.Item.visits || [] });
      }

      if (sub === "/reviews" && method === "POST") {
        const monitor = new PerformanceMonitor(logger, 'add_patient_review', patientContext);
        
        const auth = verifyAuth(event);
        const body = event.body ? JSON.parse(event.body) : {};
        const reviewId = uuidv4();
        
        logger.info('Adding patient review', { ...patientContext, authenticated: !!auth, reviewId });
        
        const review = {
          id: reviewId,
          createdAt: new Date().toISOString(),
          ...body
        };
        
        const dbStart = Date.now();
        await doc.send(new UpdateCommand({
          TableName: TABLE,
          Key: { patientId: pid },
          UpdateExpression: "SET reviews = list_append(if_not_exists(reviews, :empty_list), :r)",
          ExpressionAttributeValues: {
            ":r": [review],
            ":empty_list": []
          }
        }));
        logger.logDatabaseOperation('update', TABLE, true, Date.now() - dbStart, { ...patientContext, reviewId });
        
        logger.logBusinessLogic('review_creation', true, { reviewId }, patientContext);
        monitor.end(true, { reviewId });
        
        return jsonResponse(201, { review });
      }
    }

    logger.warn('Route not found', logContext);
    return jsonResponse(404, { message: "route not found" });
  } catch (err: any) {
    logger.error('Unhandled error in handler', logContext, err);
    return jsonResponse(500, { message: "internal server error", error: err.message });
  }
};

// Export handler with logging middleware
export const handler = withLogging(handlerImpl, logger);
