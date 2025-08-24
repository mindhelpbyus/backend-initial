# Logging Guide for Telehealth Backend

This guide provides comprehensive information about the logging system implemented for the Telehealth Backend project.

## Overview

The logging system provides structured, centralized logging across all Lambda functions with the following features:

- **Structured JSON Logging** - Consistent log format for easy parsing and analysis
- **Multiple Log Levels** - DEBUG, INFO, WARN, ERROR with configurable filtering
- **Performance Monitoring** - Built-in request/response timing and database operation tracking
- **Error Tracking** - Comprehensive error logging with context and stack traces
- **CloudWatch Integration** - Automatic log aggregation in AWS CloudWatch
- **Log Analysis Tools** - Scripts for viewing, searching, and analyzing logs

## Architecture

### Components

1. **Shared Logger (`src/shared/logger.ts`)** - Core logging utility used by all Lambda functions
2. **CloudWatch Log Groups** - Separate log groups for each service with retention policies
3. **Log Viewing Scripts** - Python scripts for accessing and analyzing logs
4. **Performance Monitoring** - Built-in timing and metrics collection

### Log Structure

All logs follow a consistent JSON structure:

```json
{
  "timestamp": "2025-01-23T10:30:45.123Z",
  "level": "INFO",
  "message": "User authentication successful",
  "service": "patients",
  "environment": "production",
  "context": {
    "requestId": "abc123-def456",
    "userId": "patient-789",
    "operation": "authentication",
    "method": "POST",
    "path": "/auth/login",
    "duration": 245,
    "success": true
  }
}
```

## Configuration

### Environment Variables

Each Lambda function supports the following logging environment variables:

- `LOG_LEVEL` - Minimum log level (DEBUG, INFO, WARN, ERROR)
- `NODE_ENV` - Environment (development, production)
- `SERVICE_NAME` - Service identifier for log categorization

### CDK Configuration

The CDK stack automatically creates:

- CloudWatch Log Groups for each Lambda function
- Log retention policies (1 month for Lambda logs, 1 week for API Gateway)
- Proper IAM permissions for log writing

## Usage

### Basic Logging

```typescript
import { createLogger } from '../../../shared/logger';

const logger = createLogger('patients');

// Basic logging
logger.info('Processing patient registration');
logger.warn('Invalid email format detected');
logger.error('Database connection failed');

// Logging with context
logger.info('User logged in', {
  userId: 'patient-123',
  email: 'user@example.com',
  loginMethod: 'email'
});
```

### Performance Monitoring

```typescript
import { PerformanceMonitor } from '../../../shared/logger';

const monitor = new PerformanceMonitor(logger, 'database_query', {
  table: 'PatientsTable',
  operation: 'scan'
});

try {
  // Your database operation
  const result = await dynamodb.scan(params).promise();
  monitor.end(true, { recordCount: result.Items.length });
} catch (error) {
  monitor.endWithError(error);
}
```

### Request/Response Logging

The logging system automatically captures:

- Request start/end times
- HTTP methods and paths
- Response status codes
- Request duration
- User agent and IP address

### Database Operation Logging

```typescript
logger.logDatabaseOperation('query', 'PatientsTable', true, 150, {
  patientId: 'patient-123',
  operation: 'get_patient'
});
```

### Authentication Logging

```typescript
logger.logAuthentication(true, 'patient-123', undefined, {
  method: 'JWT',
  loginAttempt: 1
});

logger.logAuthentication(false, undefined, 'Invalid credentials', {
  email: 'user@example.com',
  loginAttempt: 3
});
```

### Validation Error Logging

```typescript
const validationErrors = ['Email is required', 'Password too short'];
logger.logValidationError(validationErrors, {
  endpoint: '/auth/signup',
  userId: 'anonymous'
});
```

## Log Viewing and Analysis

### View Logs Script

Use the `view-logs.py` script to access CloudWatch logs:

```bash
# View recent logs for a service
./scripts/view-logs.py --service patients --hours 1

# View error logs only
./scripts/view-logs.py --service doctors --errors-only --hours 24

# Search for specific content
./scripts/view-logs.py --service appointments --query "authentication" --hours 6

# Filter by log level
./scripts/view-logs.py --service patients --level ERROR --hours 12

# Tail logs in real-time
./scripts/view-logs.py --service patients --tail

# Pretty print JSON logs
./scripts/view-logs.py --service doctors --json --hours 2

# View performance logs
./scripts/view-logs.py --service appointments --performance --hours 4
```

### Log Analysis Script

Use the `analyze-logs.py` script for comprehensive analysis:

```bash
# Generate analysis report
./scripts/analyze-logs.py --service patients --hours 24

# Save report to file
./scripts/analyze-logs.py --service doctors --hours 48 --output report.json

# Analyze specific time period
./scripts/analyze-logs.py --service appointments --hours 6
```

The analysis script provides:

- **Error Analysis** - Error frequency, types, and patterns
- **Performance Analysis** - Response times, slow requests, database metrics
- **Usage Analysis** - API endpoint usage, HTTP methods, status codes
- **Authentication Analysis** - Login success rates, failure reasons

## CloudWatch Log Groups

The system creates the following log groups:

- `/aws/lambda/PatientsLambda` - Patient service logs
- `/aws/lambda/DoctorsLambda` - Doctor service logs  
- `/aws/lambda/AppointmentsLambda` - Appointment service logs
- `/aws/apigateway/telehealth-api-access-logs` - API Gateway access logs

### Retention Policies

- Lambda function logs: 30 days
- API Gateway access logs: 7 days

## Log Levels

### DEBUG
- Detailed diagnostic information
- Function entry/exit points
- Variable values and state changes
- Only enabled in development environments

### INFO
- General operational messages
- Successful operations
- Request/response logging
- Business logic milestones

### WARN
- Potentially harmful situations
- Validation failures
- Authentication failures
- Recoverable errors

### ERROR
- Error events that might still allow the application to continue
- Database errors
- External service failures
- Unhandled exceptions

## Best Practices

### 1. Use Appropriate Log Levels
```typescript
// Good
logger.info('User registration completed', { userId: 'patient-123' });
logger.warn('Invalid email format', { email: 'invalid-email' });
logger.error('Database connection failed', {}, error);

// Avoid
logger.error('User logged in'); // Should be INFO
logger.info('Critical system failure'); // Should be ERROR
```

### 2. Include Relevant Context
```typescript
// Good
logger.info('Appointment created', {
  appointmentId: 'apt-123',
  patientId: 'patient-456',
  doctorId: 'doctor-789',
  scheduleDate: '2025-01-25T10:00:00Z'
});

// Avoid
logger.info('Appointment created');
```

### 3. Don't Log Sensitive Information
```typescript
// Good
logger.info('User authenticated', {
  userId: 'patient-123',
  method: 'JWT'
});

// Avoid
logger.info('User authenticated', {
  password: 'secret123', // Never log passwords
  creditCard: '1234-5678-9012-3456' // Never log sensitive data
});
```

### 4. Use Performance Monitoring
```typescript
// Good - Track operation performance
const monitor = new PerformanceMonitor(logger, 'create_appointment');
try {
  const result = await createAppointment(data);
  monitor.end(true, { appointmentId: result.id });
} catch (error) {
  monitor.endWithError(error);
}
```

### 5. Log Business Events
```typescript
// Track important business events
logger.logBusinessLogic('appointment_booking', true, {
  appointmentType: 'consultation',
  paymentAmount: 150,
  duration: 30
});
```

## Monitoring and Alerting

### CloudWatch Alarms

Consider setting up CloudWatch alarms for:

- High error rates (>5% of requests)
- Slow response times (>5 seconds)
- Authentication failures (>10 per minute)
- Database connection errors

### Log Metrics

Key metrics to monitor:

- **Error Rate** - Percentage of ERROR level logs
- **Response Time** - Average request duration
- **Throughput** - Requests per minute/hour
- **Authentication Success Rate** - Successful vs failed logins

## Troubleshooting

### Common Issues

1. **No Logs Appearing**
   - Check IAM permissions for CloudWatch Logs
   - Verify log group names match CDK configuration
   - Ensure LOG_LEVEL environment variable is set correctly

2. **Logs Not Structured**
   - Verify NODE_ENV is set to 'production' for JSON logging
   - Check logger initialization in Lambda functions

3. **Performance Impact**
   - Logging adds minimal overhead (~1-2ms per request)
   - Use appropriate log levels to reduce volume
   - Consider sampling for high-volume operations

### Debug Mode

Enable debug logging temporarily:

```bash
# Set LOG_LEVEL to DEBUG in Lambda environment variables
aws lambda update-function-configuration \
  --function-name PatientsLambda \
  --environment Variables='{LOG_LEVEL=DEBUG}'
```

## Integration with Lambda Functions

### Example Implementation

```typescript
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { createLogger, withLogging, PerformanceMonitor } from '../../../shared/logger';

const logger = createLogger(process.env.SERVICE_NAME || 'patients');

const handlerImpl = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const monitor = new PerformanceMonitor(logger, 'handle_request', {
    path: event.rawPath,
    method: event.requestContext.http.method
  });

  try {
    // Your business logic here
    const result = await processRequest(event);
    
    monitor.end(true, { statusCode: result.statusCode });
    return result;
  } catch (error) {
    monitor.endWithError(error as Error);
    throw error;
  }
};

// Export handler with logging middleware
export const handler = withLogging(handlerImpl, logger);
```

## Future Enhancements

Potential improvements to consider:

1. **Log Aggregation** - Centralized logging with ELK stack or similar
2. **Real-time Monitoring** - Dashboard for live log monitoring
3. **Automated Alerting** - Slack/email notifications for critical errors
4. **Log Sampling** - Reduce volume for high-traffic endpoints
5. **Distributed Tracing** - Request tracing across services
6. **Log Encryption** - Encrypt sensitive log data at rest

## Support

For questions or issues with the logging system:

1. Check this documentation first
2. Review CloudWatch logs for error messages
3. Use the analysis scripts to identify patterns
4. Contact the development team for assistance

---

*This logging system provides comprehensive observability for the Telehealth Backend. Regular monitoring and analysis of logs will help maintain system health and quickly identify issues.*
