import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';

// Create a mock send function
const mockSend = jest.fn();

// Mock the DynamoDB client
jest.mock('../../src/config', () => ({
  getDynamoDBClient: () => ({
    send: mockSend
  })
}));

// Mock AWS SDK commands
jest.mock('@aws-sdk/lib-dynamodb', () => ({
  DynamoDBDocumentClient: {
    from: jest.fn(() => ({
      send: mockSend
    }))
  },
  ScanCommand: jest.fn().mockImplementation((params) => params),
  QueryCommand: jest.fn().mockImplementation((params) => params),
  GetCommand: jest.fn().mockImplementation((params) => params),
  PutCommand: jest.fn().mockImplementation((params) => params),
  UpdateCommand: jest.fn().mockImplementation((params) => params),
  DeleteCommand: jest.fn().mockImplementation((params) => params)
}));

// Import handler after mocks are set up
import { handler } from '../../src/handler';

describe('Appointments Handler', () => {
  const mockEvent = (
    path: string,
    method: string,
    body?: any,
    queryStringParameters?: Record<string, string>
  ): APIGatewayProxyEventV2 => ({
    version: '2.0',
    routeKey: `${method} ${path}`,
    rawPath: path,
    rawQueryString: '',
    headers: {},
    requestContext: {
      accountId: '123456789012',
      apiId: 'api-id',
      domainName: 'id.execute-api.us-east-1.amazonaws.com',
      domainPrefix: 'id',
      http: {
        method,
        path,
        protocol: 'HTTP/1.1',
        sourceIp: '192.0.2.1',
        userAgent: 'agent'
      },
      requestId: 'id',
      routeKey: `${method} ${path}`,
      stage: '$default',
      time: '12/Mar/2020:19:03:58 +0000',
      timeEpoch: 1583348638390
    },
    body: body ? JSON.stringify(body) : undefined,
    queryStringParameters,
    isBase64Encoded: false
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /appointments', () => {
    it('should validate required fields', async () => {
      const event = mockEvent('/appointments', 'POST', {});
      const result = await handler(event) as any;
      
      expect(result.statusCode).toBe(400);
      const body = JSON.parse(result.body);
      expect(body.message).toBe('Validation failed');
      expect(body.errors).toContain('Patient ID is required');
      expect(body.errors).toContain('Doctor ID is required');
      expect(body.errors).toContain('Schedule date is required');
    });

    it('should validate schedule date format', async () => {
      const event = mockEvent('/appointments', 'POST', {
        patientId: 'patient-123',
        doctorId: 'doctor-456',
        scheduleDate: 'invalid-date'
      });
      const result = await handler(event) as any;
      
      expect(result.statusCode).toBe(400);
      const body = JSON.parse(result.body);
      expect(body.errors).toContain('Invalid schedule date format');
    });

    it('should validate schedule date is not in the past', async () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      
      const event = mockEvent('/appointments', 'POST', {
        patientId: 'patient-123',
        doctorId: 'doctor-456',
        scheduleDate: pastDate.toISOString()
      });
      const result = await handler(event) as any;
      
      expect(result.statusCode).toBe(400);
      const body = JSON.parse(result.body);
      expect(body.errors).toContain('Schedule date cannot be in the past');
    });

    it('should validate duration range', async () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      
      const event = mockEvent('/appointments', 'POST', {
        patientId: 'patient-123',
        doctorId: 'doctor-456',
        scheduleDate: futureDate.toISOString(),
        duration: 10 // Less than minimum 15
      });
      const result = await handler(event) as any;
      
      expect(result.statusCode).toBe(400);
      const body = JSON.parse(result.body);
      expect(body.errors).toContain('Duration must be between 15 and 180 minutes');
    });

    it('should validate payment amount is not negative', async () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      
      const event = mockEvent('/appointments', 'POST', {
        patientId: 'patient-123',
        doctorId: 'doctor-456',
        scheduleDate: futureDate.toISOString(),
        paymentAmount: -50
      });
      const result = await handler(event) as any;
      
      expect(result.statusCode).toBe(400);
      const body = JSON.parse(result.body);
      expect(body.errors).toContain('Payment amount cannot be negative');
    });
  });

  describe('GET /appointments', () => {
    it('should return 200 for valid request', async () => {
      mockSend.mockResolvedValue({ Items: [] });

      const event = mockEvent('/appointments', 'GET');
      const result = await handler(event) as any;
      
      expect(result.statusCode).toBe(200);
      const body = JSON.parse(result.body);
      expect(body.appointments).toEqual([]);
    });
  });

  describe('GET /appointments/patient', () => {
    it('should require patientId parameter', async () => {
      const event = mockEvent('/appointments/patient', 'GET');
      const result = await handler(event) as any;
      
      expect(result.statusCode).toBe(400);
      const body = JSON.parse(result.body);
      expect(body.message).toBe('patientId query parameter is required');
    });

    it('should return appointments for valid patientId', async () => {
      mockSend.mockResolvedValue({ Items: [] });

      const event = mockEvent('/appointments/patient', 'GET', undefined, {
        patientId: 'patient-123'
      });
      const result = await handler(event) as any;
      
      expect(result.statusCode).toBe(200);
      const body = JSON.parse(result.body);
      expect(body.appointments).toEqual([]);
    });
  });

  describe('GET /appointments/doctor', () => {
    it('should require doctorId parameter', async () => {
      const event = mockEvent('/appointments/doctor', 'GET');
      const result = await handler(event) as any;
      
      expect(result.statusCode).toBe(400);
      const body = JSON.parse(result.body);
      expect(body.message).toBe('doctorId query parameter is required');
    });

    it('should return appointments for valid doctorId', async () => {
      mockSend.mockResolvedValue({ Items: [] });

      const event = mockEvent('/appointments/doctor', 'GET', undefined, {
        doctorId: 'doctor-456'
      });
      const result = await handler(event) as any;
      
      expect(result.statusCode).toBe(200);
      const body = JSON.parse(result.body);
      expect(body.appointments).toEqual([]);
    });
  });

  describe('GET /appointments/{appointmentId}', () => {
    it('should return 404 for non-existent appointment', async () => {
      mockSend.mockResolvedValue({ Item: null });

      const event = mockEvent('/appointments/non-existent-id', 'GET');
      const result = await handler(event) as any;
      
      expect(result.statusCode).toBe(404);
      const body = JSON.parse(result.body);
      expect(body.message).toBe('Appointment not found');
    });
  });

  describe('DELETE /appointments/{appointmentId}', () => {
    it('should require patientId parameter for cancellation', async () => {
      const event = mockEvent('/appointments/appointment-123', 'DELETE');
      const result = await handler(event) as any;
      
      expect(result.statusCode).toBe(400);
      const body = JSON.parse(result.body);
      expect(body.message).toBe('patientId query parameter is required for cancellation');
    });

    it('should return 404 for non-existent appointment', async () => {
      mockSend.mockResolvedValue({ Item: null });

      const event = mockEvent('/appointments/non-existent-id', 'DELETE', undefined, {
        patientId: 'patient-123'
      });
      const result = await handler(event) as any;
      
      expect(result.statusCode).toBe(404);
      const body = JSON.parse(result.body);
      expect(body.message).toBe('Appointment not found');
    });
  });

  describe('PUT /appointments/{appointmentId}', () => {
    it('should return 400 when no fields to update', async () => {
      const event = mockEvent('/appointments/appointment-123', 'PUT', {});
      const result = await handler(event) as any;
      
      expect(result.statusCode).toBe(400);
      const body = JSON.parse(result.body);
      expect(body.message).toBe('No fields to update');
    });
  });

  describe('Route not found', () => {
    it('should return 404 for unknown routes', async () => {
      const event = mockEvent('/unknown-route', 'GET');
      const result = await handler(event) as any;
      
      expect(result.statusCode).toBe(404);
      const body = JSON.parse(result.body);
      expect(body.message).toBe('Route not found');
    });
  });
});
