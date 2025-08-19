# Patient API Testing with Local DynamoDB

This guide explains how to set up and run tests for the Patient APIs using a local DynamoDB container.

## Prerequisites

- Docker and Docker Compose installed
- Node.js (version 18 or higher)
- npm or yarn package manager

## Setup Instructions

### 1. Start Local DynamoDB Container

First, start the local DynamoDB container using Docker Compose:

```bash
# Start DynamoDB Local and DynamoDB Admin
docker-compose up -d

# Verify containers are running
docker-compose ps
```

This will start:
- DynamoDB Local on port 8000
- DynamoDB Admin UI on port 8001 (optional, for viewing data)

### 2. Create DynamoDB Tables

Set up the required tables in the local DynamoDB instance:

```bash
# Install dependencies for the setup script
npm install

# Create the PatientsTable
node scripts/setup-local-dynamodb.js
```

### 3. Install Test Dependencies

Navigate to the patients lambda directory and install dependencies:

```bash
cd src/lambdas/patients
npm install
```

### 4. Run Tests

Execute the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

## Test Structure

The test suite is organized into the following files:

### `tests/test-helpers.ts`
Contains utility functions for:
- Setting up test environment
- Creating mock API Gateway events
- Generating test data
- Connecting to local DynamoDB
- Cleaning up test data

### `tests/patients-post.test.ts`
Tests for POST operations:
- `POST /auth/signup` - User registration
- `POST /auth/login` - User authentication
- `POST /patients` - Admin patient creation
- `POST /patients/{patientId}/reviews` - Adding reviews

### `tests/patients-get.test.ts`
Tests for GET operations:
- `GET /patients` - List all patients (admin only)
- `GET /patients/{patientId}` - Get patient by ID
- `GET /patients/by-email` - Find patient by email
- `GET /patients/{patientId}/visits` - Get patient visits

## Test Features

### Local DynamoDB Integration
- Tests run against a real DynamoDB Local instance
- Automatic table creation and cleanup
- Isolated test data for each test run

### Comprehensive API Coverage
- Authentication and authorization testing
- Input validation testing
- Error handling verification
- Database integration testing

### Test Data Management
- Automatic generation of unique test data
- Proper cleanup after each test suite
- No test data pollution between runs

## Environment Variables

The tests use the following environment variables:

```bash
PATIENTS_TABLE=PatientsTable
JWT_SECRET=test-secret
REGION=us-east-1
AWS_ACCESS_KEY_ID=dummy
AWS_SECRET_ACCESS_KEY=dummy
```

These are automatically set by the test helpers.

## Troubleshooting

### DynamoDB Connection Issues

If tests fail with connection errors:

1. Ensure Docker containers are running:
   ```bash
   docker-compose ps
   ```

2. Check DynamoDB Local is accessible:
   ```bash
   curl http://localhost:8000
   ```

3. Verify tables exist:
   ```bash
   node scripts/setup-local-dynamodb.js
   ```

### Test Timeout Issues

If tests timeout:

1. Increase Jest timeout in `jest.config.js`
2. Check DynamoDB Local performance
3. Ensure proper test cleanup

### Port Conflicts

If ports 8000 or 8001 are in use:

1. Stop conflicting services
2. Modify ports in `docker-compose.yml`
3. Update connection settings in test helpers

## Viewing Test Data

You can view the test data using:

1. **DynamoDB Admin UI**: Visit http://localhost:8001
2. **AWS CLI**: Configure with dummy credentials and use `--endpoint-url http://localhost:8000`

## Cleanup

To stop and clean up the local DynamoDB:

```bash
# Stop containers
docker-compose down

# Remove volumes (optional, removes all data)
docker-compose down -v
```

## Integration with CI/CD

To run these tests in a CI/CD pipeline:

1. Start DynamoDB Local container
2. Wait for service to be ready
3. Create tables
4. Run tests
5. Clean up containers

Example GitHub Actions workflow:

```yaml
- name: Start DynamoDB Local
  run: docker-compose up -d dynamodb-local

- name: Setup tables
  run: node scripts/setup-local-dynamodb.js

- name: Run tests
  run: |
    cd src/lambdas/patients
    npm test

- name: Cleanup
  run: docker-compose down
```

## Test Coverage

The test suite covers:

- ✅ User registration and authentication
- ✅ Patient CRUD operations
- ✅ Authorization and access control
- ✅ Input validation
- ✅ Error handling
- ✅ Database operations
- ✅ JWT token handling
- ✅ Password hashing verification

## Next Steps

1. Add integration tests with API Gateway
2. Add performance tests
3. Add end-to-end tests with frontend
4. Add tests for other Lambda functions
5. Set up automated testing in CI/CD pipeline
