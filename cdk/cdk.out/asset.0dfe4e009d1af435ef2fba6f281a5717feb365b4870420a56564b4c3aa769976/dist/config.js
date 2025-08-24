"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDynamoDBClient = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const getDynamoDBClient = () => {
    const client = new client_dynamodb_1.DynamoDBClient({
        endpoint: process.env.DYNAMODB_ENDPOINT,
        region: process.env.AWS_REGION || 'us-east-1',
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'dummy',
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'dummy'
        }
    });
    return lib_dynamodb_1.DynamoDBDocumentClient.from(client);
};
exports.getDynamoDBClient = getDynamoDBClient;
//# sourceMappingURL=config.js.map