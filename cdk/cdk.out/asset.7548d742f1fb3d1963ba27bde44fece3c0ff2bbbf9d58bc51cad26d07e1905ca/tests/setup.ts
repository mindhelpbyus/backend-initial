// Jest setup file for Patient API tests

// Set up test environment variables
process.env.NODE_ENV = 'test';
process.env.PATIENTS_TABLE = 'PatientsTable';
process.env.JWT_SECRET = 'test-secret';
process.env.REGION = 'us-east-1';
process.env.AWS_ACCESS_KEY_ID = 'dummy';
process.env.AWS_SECRET_ACCESS_KEY = 'dummy';

// Increase timeout for DynamoDB operations
jest.setTimeout(30000);

// Mock console.error to reduce noise in test output
const originalConsoleError = console.error;
beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = originalConsoleError;
});
