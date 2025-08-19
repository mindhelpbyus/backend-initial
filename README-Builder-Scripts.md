# Patient API Builder Scripts

This document explains how to use the builder scripts to modify APIs and redeploy the Patient Management system.

## Overview

The builder scripts provide a complete development workflow for the Patient API:

- **`scripts/build-and-deploy.sh`** - Main build and deployment script
- **`scripts/modify-api.sh`** - API modification and testing utilities

## Prerequisites

Ensure you have the following installed:

- Node.js and npm
- AWS CLI
- CDK Local (`npm install -g aws-cdk-local`)
- Docker and Docker Compose
- Python 3
- jq (for JSON processing)

## Quick Start

### 1. Full Build and Deploy

```bash
# Complete build and deployment
./scripts/build-and-deploy.sh

# Build only (no deployment)
./scripts/build-and-deploy.sh --build-only

# Deploy only (no build)
./scripts/build-and-deploy.sh --deploy-only

# Deploy without starting API explorer
./scripts/build-and-deploy.sh --no-server
```

### 2. Check Status

```bash
# Check deployment status
./scripts/modify-api.sh status
```

### 3. Test Existing Endpoints

```bash
# Test signup endpoint
./scripts/modify-api.sh test-endpoint --path '/auth/signup' --method POST --body '{"email":"test@example.com","password":"test123"}'

# Test get patients (requires admin token)
./scripts/modify-api.sh test-endpoint --path '/patients' --method GET --token 'your-jwt-token'

# Test get patient by ID
./scripts/modify-api.sh test-endpoint --path '/patients/patient-id-here' --method GET
```

## Adding New API Endpoints

### Method 1: Using the Helper Script

```bash
# Add a new health check endpoint
./scripts/modify-api.sh add-endpoint --path '/health' --method GET --description 'Health check endpoint'

# Add a new user profile endpoint
./scripts/modify-api.sh add-endpoint --path '/profile' --method GET --description 'Get user profile'

# Deploy the changes
./scripts/modify-api.sh quick-deploy
```

### Method 2: Manual Addition

1. **Add route to CDK stack** (`cdk/backend_stack.py`):
```python
http_api.add_routes(
    path="/your-new-endpoint",
    methods=[apigw.HttpMethod.GET],
    integration=patients_integration
)
```

2. **Add handler to Lambda** (`src/lambdas/patients/src/handler.ts`):
```typescript
// Add case to switch statement
case 'GET /your-new-endpoint':
  return await handleGetYourNewEndpoint(event);

// Add handler function
async function handleGetYourNewEndpoint(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  try {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Your new endpoint works!' })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}
```

3. **Deploy changes**:
```bash
./scripts/build-and-deploy.sh
```

## Development Workflow

### 1. Watch Mode (Auto-rebuild on changes)

```bash
# Watch for file changes and auto-deploy
./scripts/modify-api.sh watch
```

### 2. Quick Development Cycle

```bash
# 1. Make changes to your code
# 2. Quick deploy
./scripts/modify-api.sh quick-deploy

# 3. Test your changes
./scripts/modify-api.sh test-endpoint --path '/your-endpoint' --method GET
```

### 3. View Logs

```bash
# Show recent logs
./scripts/modify-api.sh logs

# Tail logs (follow in real-time)
./scripts/modify-api.sh logs --tail
```

## Script Options

### build-and-deploy.sh Options

| Option | Description |
|--------|-------------|
| `--help` | Show help message |
| `--build-only` | Only build Lambda functions |
| `--deploy-only` | Only deploy, don't build |
| `--no-server` | Don't start API explorer server |

### modify-api.sh Commands

| Command | Description | Example |
|---------|-------------|---------|
| `add-endpoint` | Add new API endpoint | `./scripts/modify-api.sh add-endpoint --path '/health' --method GET` |
| `test-endpoint` | Test specific endpoint | `./scripts/modify-api.sh test-endpoint --path '/auth/signup' --method POST` |
| `quick-deploy` | Quick build and deploy | `./scripts/modify-api.sh quick-deploy` |
| `watch` | Watch for changes | `./scripts/modify-api.sh watch` |
| `logs` | Show logs | `./scripts/modify-api.sh logs --tail` |
| `status` | Show deployment status | `./scripts/modify-api.sh status` |

## Common Use Cases

### Adding Authentication to New Endpoints

1. **Add JWT validation**:
```typescript
import { verifyToken } from './auth-utils';

async function handleProtectedEndpoint(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  try {
    // Verify JWT token
    const token = event.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return {
        statusCode: 401,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Authorization token required' })
      };
    }

    const decoded = verifyToken(token);
    // Your endpoint logic here...
    
  } catch (error) {
    return {
      statusCode: 401,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Invalid token' })
    };
  }
}
```

### Adding Database Operations

1. **Add DynamoDB operations**:
```typescript
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const docClient = DynamoDBDocumentClient.from(client);

async function handleDatabaseEndpoint(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  try {
    const command = new GetCommand({
      TableName: process.env.PATIENTS_TABLE,
      Key: { patientId: 'some-id' }
    });
    
    const result = await docClient.send(command);
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result.Item)
    };
  } catch (error) {
    console.error('Database error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Database operation failed' })
    };
  }
}
```

## Troubleshooting

### Common Issues

1. **LocalStack not running**:
```bash
docker-compose up -d
```

2. **Port 8080 already in use**:
```bash
lsof -ti:8080 | xargs kill -9
```

3. **CDK bootstrap needed**:
```bash
cd cdk && cdklocal bootstrap
```

4. **Lambda function not found**:
```bash
# Check if stack is deployed
./scripts/modify-api.sh status

# Redeploy if needed
./scripts/build-and-deploy.sh
```

### Debug Mode

Enable debug output by setting environment variables:
```bash
export DEBUG=1
./scripts/build-and-deploy.sh
```

### Manual Testing

Test Lambda functions directly:
```bash
# Get function name from stack outputs
aws --endpoint-url=http://localhost:4566 cloudformation describe-stacks --stack-name TelehealthBackend-dev

# Invoke function directly
aws --endpoint-url=http://localhost:4566 lambda invoke \
  --function-name "TelehealthBackend-dev-PatientsLambda..." \
  --payload '{"version":"2.0","routeKey":"GET /health"}' \
  response.json
```

## File Structure

```
├── scripts/
│   ├── build-and-deploy.sh      # Main build/deploy script
│   ├── modify-api.sh            # API modification utilities
│   └── serve-api-explorer.py    # API explorer server
├── src/lambdas/patients/
│   ├── src/handler.ts           # Main Lambda handler
│   ├── package.json             # Node.js dependencies
│   └── tsconfig.json            # TypeScript config
├── cdk/
│   ├── backend_stack.py         # CDK stack definition
│   └── app.py                   # CDK app entry point
├── api-explorer.html            # Interactive API testing UI
└── docker-compose.yml           # LocalStack configuration
```

## Environment Variables

The scripts use these environment variables:

- `AWS_REGION` - AWS region (default: us-east-1)
- `PATIENTS_TABLE` - DynamoDB table name
- `JWT_SECRET` - JWT signing secret
- `DEBUG` - Enable debug output

## Next Steps

1. **Customize endpoints** - Modify the generated handler functions
2. **Add validation** - Implement input validation for your endpoints
3. **Add tests** - Create unit tests for your Lambda functions
4. **Add monitoring** - Implement logging and error tracking
5. **Deploy to AWS** - Modify scripts for real AWS deployment

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review LocalStack logs: `./scripts/modify-api.sh logs --tail`
3. Verify deployment status: `./scripts/modify-api.sh status`
4. Test individual endpoints: `./scripts/modify-api.sh test-endpoint --path '/your-path'`
