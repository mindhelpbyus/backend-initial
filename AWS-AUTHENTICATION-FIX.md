# AWS Authentication Fix for DynamoDB Access

## Problem
The signup API was failing with the error:
```
UnrecognizedClientException: The security token included in the request is invalid.
```

## Root Cause
The Lambda functions were explicitly setting AWS credentials in their DynamoDB client configuration, even when running in AWS Lambda environment. This overrode the IAM role-based authentication that AWS Lambda provides automatically.

### Problematic Code (Before Fix)
```typescript
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
```

## Solution
Modified the DynamoDB client configuration to:
1. Only set explicit credentials when running locally (when `DYNAMODB_ENDPOINT` is set)
2. Let AWS Lambda's IAM role handle authentication in production

### Fixed Code (After Fix)
```typescript
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
```

## Files Modified
- `src/lambdas/patients/src/config.ts`
- `src/lambdas/doctors/src/config.ts`
- `src/lambdas/appointments/src/config.ts`

Note: `src/lambdas/chatbot/src/config.ts` was already correctly implemented.

## IAM Permissions
The CDK stack already had the correct IAM permissions configured:
- Lambda execution role with DynamoDB read/write permissions
- Proper table grants: `patients_table.grant_read_write_data(lambda_role)`

## Key Principle
**In AWS Lambda, never explicitly set credentials when the execution role has the necessary permissions. Let AWS handle authentication automatically through the IAM role.**

## Testing
After deployment, the signup API should work correctly without authentication errors.
