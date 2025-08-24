import { handler } from '../../src/handler';
import { APIGatewayProxyEventV2 } from 'aws-lambda';

describe('Appointments Integration Tests', () => {
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

  describe('POST /appointments', () => {
    it('should create a new appointment successfully', async () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      
      const appointmentData = {
        patientId: 'patient-123',
        doctorId: 'doctor-456',
        scheduleDate: futureDate.toISOString(),
        duration: 30,
        videoLink: 'https://meet.example.com/room123',
        paymentId: 'payment-789',
        paymentStatus: 'paid',
        paymentAmount: 100,
        notes: 'Regular checkup',
        symptoms: ['headache', 'fatigue']
      };

      const event = mockEvent('/appointments', 'POST', appointmentData);
      const result = await handler(event) as any;
      
      expect(result.statusCode).toBe(201);
      const body = JSON.parse(result.body);
      expect(body.message).toBe('Appointment created successfully');
      expect(body.appointmentId).toBeDefined();
      expect(typeof body.appointmentId).toBe('string');
    });

    it('should handle appointment creation with minimal data', async () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 2);
      
      const appointmentData = {
        patientId: 'patient-456',
        doctorId: 'doctor-789',
        scheduleDate: futureDate.toISOString()
      };

      const event = mockEvent('/appointments', 'POST', appointmentData);
      const result = await handler(event) as any;
      
      expect(result.statusCode).toBe(201);
      const body = JSON.parse(result.body);
      expect(body.message).toBe('Appointment created successfully');
      expect(body.appointmentId).toBeDefined();
    });
  });

  describe('GET /appointments', () => {
    it('should retrieve all appointments', async () => {
      const event = mockEvent('/appointments', 'GET');
      const result = await handler(event) as any;
      
      expect(result.statusCode).toBe(200);
      const body = JSON.parse(result.body);
      expect(body.appointments).toBeDefined();
      expect(Array.isArray(body.appointments)).toBe(true);
    });

    it('should filter appointments by status', async () => {
      const event = mockEvent('/appointments', 'GET', undefined, {
        status: 'scheduled'
      });
      const result = await handler(event) as any;
      
      expect(result.statusCode).toBe(200);
      const body = JSON.parse(result.body);
      expect(body.appointments).toBeDefined();
      expect(Array.isArray(body.appointments)).toBe(true);
    });

    it('should filter appointments by multiple statuses', async () => {
      const event = mockEvent('/appointments', 'GET', undefined, {
        status: 'scheduled,confirmed'
      });
      const result = await handler(event) as any;
      
      expect(result.statusCode).toBe(200);
      const body = JSON.parse(result.body);
      expect(body.appointments).toBeDefined();
      expect(Array.isArray(body.appointments)).toBe(true);
    });

    it('should filter appointments by date range', async () => {
      const fromDate = new Date();
      const toDate = new Date();
      toDate.setDate(toDate.getDate() + 7);
      
      const event = mockEvent('/appointments', 'GET', undefined, {
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString()
      });
      const result = await handler(event) as any;
      
      expect(result.statusCode).toBe(200);
      const body = JSON.parse(result.body);
      expect(body.appointments).toBeDefined();
      expect(Array.isArray(body.appointments)).toBe(true);
    });
  });

  describe('GET /appointments/patient', () => {
    it('should retrieve appointments for a specific patient', async () => {
      const event = mockEvent('/appointments/patient', 'GET', undefined, {
        patientId: 'patient-123'
      });
      const result = await handler(event) as any;
      
      expect(result.statusCode).toBe(200);
      const body = JSON.parse(result.body);
      expect(body.appointments).toBeDefined();
      expect(Array.isArray(body.appointments)).toBe(true);
    });

    it('should filter patient appointments by status', async () => {
      const event = mockEvent('/appointments/patient', 'GET', undefined, {
        patientId: 'patient-123',
        status: 'scheduled'
      });
      const result = await handler(event) as any;
      
      expect(result.statusCode).toBe(200);
      const body = JSON.parse(result.body);
      expect(body.appointments).toBeDefined();
      expect(Array.isArray(body.appointments)).toBe(true);
    });
  });

  describe('GET /appointments/doctor', () => {
    it('should retrieve appointments for a specific doctor', async () => {
      const event = mockEvent('/appointments/doctor', 'GET', undefined, {
        doctorId: 'doctor-456'
      });
      const result = await handler(event) as any;
      
      expect(result.statusCode).toBe(200);
      const body = JSON.parse(result.body);
      expect(body.appointments).toBeDefined();
      expect(Array.isArray(body.appointments)).toBe(true);
    });

    it('should filter doctor appointments by status', async () => {
      const event = mockEvent('/appointments/doctor', 'GET', undefined, {
        doctorId: 'doctor-456',
        status: 'completed'
      });
      const result = await handler(event) as any;
      
      expect(result.statusCode).toBe(200);
      const body = JSON.parse(result.body);
      expect(body.appointments).toBeDefined();
      expect(Array.isArray(body.appointments)).toBe(true);
    });
  });

  describe('Full appointment lifecycle', () => {
    let appointmentId: string;

    it('should create, retrieve, update, and cancel an appointment', async () => {
      // Create appointment
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 3);
      
      const appointmentData = {
        patientId: 'patient-lifecycle-test',
        doctorId: 'doctor-lifecycle-test',
        scheduleDate: futureDate.toISOString(),
        duration: 45,
        notes: 'Lifecycle test appointment'
      };

      const createEvent = mockEvent('/appointments', 'POST', appointmentData);
      const createResult = await handler(createEvent) as any;
      
      expect(createResult.statusCode).toBe(201);
      const createBody = JSON.parse(createResult.body);
      appointmentId = createBody.appointmentId;
      expect(appointmentId).toBeDefined();

      // Retrieve appointment
      const getEvent = mockEvent(`/appointments/${appointmentId}`, 'GET');
      const getResult = await handler(getEvent) as any;
      
      expect(getResult.statusCode).toBe(200);
      const appointment = JSON.parse(getResult.body);
      expect(appointment.appointmentId).toBe(appointmentId);
      expect(appointment.patientId).toBe('patient-lifecycle-test');
      expect(appointment.doctorId).toBe('doctor-lifecycle-test');
      expect(appointment.appointmentStatus).toBe('scheduled');

      // Update appointment
      const updateData = {
        appointmentStatus: 'confirmed',
        videoLink: 'https://meet.example.com/updated-room',
        notes: 'Updated notes for lifecycle test'
      };

      const updateEvent = mockEvent(`/appointments/${appointmentId}`, 'PUT', updateData);
      const updateResult = await handler(updateEvent) as any;
      
      expect(updateResult.statusCode).toBe(200);
      const updateBody = JSON.parse(updateResult.body);
      expect(updateBody.message).toBe('Appointment updated successfully');

      // Cancel appointment
      const cancelEvent = mockEvent(`/appointments/${appointmentId}`, 'DELETE', undefined, {
        patientId: 'patient-lifecycle-test'
      });
      const cancelResult = await handler(cancelEvent) as any;
      
      expect(cancelResult.statusCode).toBe(200);
      const cancelBody = JSON.parse(cancelResult.body);
      expect(cancelBody.message).toBe('Appointment cancelled successfully');

      // Verify appointment is cancelled
      const verifyEvent = mockEvent(`/appointments/${appointmentId}`, 'GET');
      const verifyResult = await handler(verifyEvent) as any;
      
      expect(verifyResult.statusCode).toBe(200);
      const verifiedAppointment = JSON.parse(verifyResult.body);
      expect(verifiedAppointment.appointmentStatus).toBe('cancelled');
      expect(verifiedAppointment.cancelledBy).toBe('patient-lifecycle-test');
      expect(verifiedAppointment.cancelledAt).toBeDefined();
    });
  });
});
