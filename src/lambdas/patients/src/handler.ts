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

const TABLE = process.env.PATIENTS_TABLE || "PatientsTable";
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

const doc = getDynamoDBClient();

// Ensure DynamoDB is using local endpoint in test environment
if (process.env.DYNAMODB_ENDPOINT) {
  console.log("Using local DynamoDB endpoint:", process.env.DYNAMODB_ENDPOINT);
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

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const path = event.rawPath || (event.requestContext as any).http?.path || "/";
  const method = (event.requestContext as any).http?.method || event.requestContext?.http?.method || event.requestContext?.http?.method;
  try {
    if (path === "/auth/signup" && method === "POST") {
      const body = event.body ? JSON.parse(event.body) : {};
      const { email, password, firstName, lastName } = body;
      if (!email || !password) return jsonResponse(400, { message: "email and password required" });

      const q = await doc.send(new QueryCommand({
        TableName: TABLE,
        IndexName: "email-index",
        KeyConditionExpression: "email = :e",
        ExpressionAttributeValues: { ":e": email }
      }));

      if ((q.Items || []).length > 0) {
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
      await doc.send(new PutCommand({ TableName: TABLE, Item: item }));
      const token = jwt.sign({ patientId, email, role: "patient" }, JWT_SECRET, { expiresIn: "7d" });
      return jsonResponse(201, { patientId, token });
    }

    if (path === "/auth/login" && method === "POST") {
      const body = event.body ? JSON.parse(event.body) : {};
      const { email, password } = body;
      if (!email || !password) return jsonResponse(400, { message: "email and password required" });

      const q = await doc.send(new QueryCommand({
        TableName: TABLE,
        IndexName: "email-index",
        KeyConditionExpression: "email = :e",
        ExpressionAttributeValues: { ":e": email }
      }));

      const user = (q.Items || [])[0];
      if (!user) return jsonResponse(401, { message: "invalid credentials" });

      const ok = bcrypt.compareSync(password, user.password);
      if (!ok) return jsonResponse(401, { message: "invalid credentials" });

      const token = jwt.sign({ patientId: user.patientId, email: user.email, role: user.role || "patient" }, JWT_SECRET, { expiresIn: "7d" });
      return jsonResponse(200, { token, patientId: user.patientId });
    }

    if (path === "/patients" && method === "GET") {
      const auth = verifyAuth(event);
      //if (!auth|| auth.role !== "admin") return jsonResponse(403, { message: "admin required" });
      const r = await doc.send(new ScanCommand({ TableName: TABLE }));
      return jsonResponse(200, { items: r.Items || [] });
    }

    if (path === "/patients" && method === "POST") {
      const auth = verifyAuth(event);
      //if (!auth || auth.role !== "admin") return jsonResponse(403, { message: "admin required" });
      const body = event.body ? JSON.parse(event.body) : {};
      const id = uuidv4();
      const now = new Date().toISOString();
      const item = {
        patientId: id,
        createdAt: now,
        ...body
      };
      await doc.send(new PutCommand({ TableName: TABLE, Item: item }));
      return jsonResponse(201, { patientId: id });
    }

    if (path === "/patients/by-email" && method === "GET") {
      const email = (event.queryStringParameters || {})["email"];
      if (!email) return jsonResponse(400, { message: "email query param required" });
      const q = await doc.send(new QueryCommand({
        TableName: TABLE,
        IndexName: "email-index",
        KeyConditionExpression: "email = :e",
        ExpressionAttributeValues: { ":e": email }
      }));
      return jsonResponse(200, { items: q.Items || [] });
    }

    const patientIdMatch = path.match(/^\/patients\/([^\/]+)(\/.*)?$/);
    if (patientIdMatch) {
      const pid = decodeURIComponent(patientIdMatch[1]);
      const sub = patientIdMatch[2] || "";

      if (sub === "" && method === "GET") {
        const r = await doc.send(new GetCommand({ TableName: TABLE, Key: { patientId: pid } }));
        if (!r.Item) return jsonResponse(404, { message: "not found" });
        const item = { ...r.Item };
        delete item.password;
        return jsonResponse(200, item);
      }

      if (sub === "" && method === "PUT") {
        const auth = verifyAuth(event);
        //if (!auth) return jsonResponse(403, { message: "auth required" });
        const body = event.body ? JSON.parse(event.body) : {};
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
        if (expressions.length === 0) return jsonResponse(400, { message: "no fields to update" });
        const updateExpr = "SET " + expressions.join(", ");
        await doc.send(new UpdateCommand({
          TableName: TABLE,
          Key: { patientId: pid },
          UpdateExpression: updateExpr,
          ExpressionAttributeNames: attrNames,
          ExpressionAttributeValues: attrVals
        }));
        return jsonResponse(200, { message: "updated" });
      }

      if (sub === "" && method === "DELETE") {
        const auth = verifyAuth(event);
        //if (!auth || auth.role !== "admin") return jsonResponse(403, { message: "admin required" });
        await doc.send(new DeleteCommand({ TableName: TABLE, Key: { patientId: pid } }));
        return jsonResponse(200, { message: "deleted" });
      }

      if (sub === "/visits" && method === "GET") {
        const r = await doc.send(new GetCommand({ TableName: TABLE, Key: { patientId: pid } }));
        if (!r.Item) return jsonResponse(404, { message: "not found" });
        return jsonResponse(200, { visits: r.Item.visits || [] });
      }

      if (sub === "/reviews" && method === "POST") {
        const auth = verifyAuth(event);
        //if (!auth) return jsonResponse(403, { message: "auth required" });
        const body = event.body ? JSON.parse(event.body) : {};
        const review = {
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          ...body
        };
        await doc.send(new UpdateCommand({
          TableName: TABLE,
          Key: { patientId: pid },
          UpdateExpression: "SET reviews = list_append(if_not_exists(reviews, :empty_list), :r)",
          ExpressionAttributeValues: {
            ":r": [review],
            ":empty_list": []
          }
        }));
        return jsonResponse(201, { review });
      }
    }

    return jsonResponse(404, { message: "route not found" });
  } catch (err: any) {
    console.error("Handler error:", err);
    return jsonResponse(500, { message: "internal server error", error: err.message });
  }
};
