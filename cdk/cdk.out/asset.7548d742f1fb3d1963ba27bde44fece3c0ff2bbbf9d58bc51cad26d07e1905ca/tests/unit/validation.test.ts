describe('Data Validation Unit Tests', () => {
  describe('Patient Data Validation', () => {
    test('should validate patient creation data', () => {
      const validatePatientData = (data: any) => {
        const errors: string[] = [];
        
        if (!data.email || typeof data.email !== 'string' || !data.email.trim()) {
          errors.push('Valid email is required');
        }
        
        if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
          errors.push('Invalid email format');
        }
        
        if (data.firstName && typeof data.firstName !== 'string') {
          errors.push('First name must be a string');
        }
        
        if (data.lastName && typeof data.lastName !== 'string') {
          errors.push('Last name must be a string');
        }
        
        if (data.role && !['patient', 'admin'].includes(data.role)) {
          errors.push('Role must be either patient or admin');
        }
        
        return errors;
      };

      // Valid data
      expect(validatePatientData({
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'patient'
      })).toEqual([]);

      // Missing email
      expect(validatePatientData({
        firstName: 'John',
        lastName: 'Doe'
      })).toContain('Valid email is required');

      // Invalid email format
      expect(validatePatientData({
        email: 'invalid-email',
        firstName: 'John'
      })).toContain('Invalid email format');

      // Invalid role
      expect(validatePatientData({
        email: 'test@example.com',
        role: 'invalid-role'
      })).toContain('Role must be either patient or admin');

      // Invalid data types
      expect(validatePatientData({
        email: 'test@example.com',
        firstName: 123,
        lastName: true
      })).toEqual([
        'First name must be a string',
        'Last name must be a string'
      ]);
    });

    test('should validate review data', () => {
      const validateReviewData = (data: any) => {
        const errors: string[] = [];
        
        if (data.rating === undefined || data.rating === null || typeof data.rating !== 'number') {
          errors.push('Rating is required and must be a number');
        } else if (data.rating < 1 || data.rating > 5) {
          errors.push('Rating must be between 1 and 5');
        }
        
        if (data.comment && typeof data.comment !== 'string') {
          errors.push('Comment must be a string');
        }
        
        if (data.doctorId && typeof data.doctorId !== 'string') {
          errors.push('Doctor ID must be a string');
        }
        
        return errors;
      };

      // Valid data
      expect(validateReviewData({
        rating: 5,
        comment: 'Great service!',
        doctorId: 'doctor-123'
      })).toEqual([]);

      // Missing rating
      expect(validateReviewData({
        comment: 'Good service'
      })).toContain('Rating is required and must be a number');

      // Invalid rating range
      expect(validateReviewData({
        rating: 6
      })).toContain('Rating must be between 1 and 5');

      expect(validateReviewData({
        rating: 0
      })).toContain('Rating must be between 1 and 5');

      // Invalid data types
      expect(validateReviewData({
        rating: 5,
        comment: 123,
        doctorId: true
      })).toEqual([
        'Comment must be a string',
        'Doctor ID must be a string'
      ]);
    });
  });

  describe('Route Parameter Validation', () => {
    test('should validate patient ID format', () => {
      const isValidPatientId = (id: string) => {
        return !!(id && typeof id === 'string' && id.trim().length > 0);
      };

      expect(isValidPatientId('valid-patient-id')).toBe(true);
      expect(isValidPatientId('123e4567-e89b-12d3-a456-426614174000')).toBe(true);
      expect(isValidPatientId('')).toBe(false);
      expect(isValidPatientId('   ')).toBe(false);
      expect(isValidPatientId(null as any)).toBe(false);
      expect(isValidPatientId(undefined as any)).toBe(false);
    });

    test('should extract and validate path parameters', () => {
      const extractPatientId = (path: string) => {
        const match = path.match(/\/patients\/([^\/]+)/);
        return match ? decodeURIComponent(match[1]) : null;
      };

      expect(extractPatientId('/patients/123')).toBe('123');
      expect(extractPatientId('/patients/patient-id-123')).toBe('patient-id-123');
      expect(extractPatientId('/patients/123/visits')).toBe('123');
      expect(extractPatientId('/patients')).toBe(null);
      expect(extractPatientId('/other/123')).toBe(null);
    });
  });

  describe('Query Parameter Validation', () => {
    test('should validate email query parameter', () => {
      const validateEmailQuery = (queryParams: any) => {
        if (!queryParams || !queryParams.email) {
          return { valid: false, error: 'email query param required' };
        }
        
        if (typeof queryParams.email !== 'string') {
          return { valid: false, error: 'email must be a string' };
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(queryParams.email)) {
          return { valid: false, error: 'invalid email format' };
        }
        
        return { valid: true, email: queryParams.email };
      };

      // Valid email
      expect(validateEmailQuery({ email: 'test@example.com' })).toEqual({
        valid: true,
        email: 'test@example.com'
      });

      // Missing email
      expect(validateEmailQuery({})).toEqual({
        valid: false,
        error: 'email query param required'
      });

      // Invalid email format
      expect(validateEmailQuery({ email: 'invalid-email' })).toEqual({
        valid: false,
        error: 'invalid email format'
      });

      // Non-string email
      expect(validateEmailQuery({ email: 123 })).toEqual({
        valid: false,
        error: 'email must be a string'
      });
    });
  });

  describe('Authorization Header Validation', () => {
    test('should extract bearer token from authorization header', () => {
      const extractBearerToken = (headers: any) => {
        const authHeader = headers?.authorization || headers?.Authorization;
        
        if (!authHeader) {
          return null;
        }
        
        if (typeof authHeader !== 'string') {
          return null;
        }
        
        const match = authHeader.match(/^Bearer\s+(.+)$/);
        return match ? match[1] : null;
      };

      // Valid bearer token
      expect(extractBearerToken({
        authorization: 'Bearer valid-jwt-token'
      })).toBe('valid-jwt-token');

      // Case insensitive header
      expect(extractBearerToken({
        Authorization: 'Bearer another-token'
      })).toBe('another-token');

      // Missing authorization header
      expect(extractBearerToken({})).toBe(null);

      // Invalid format
      expect(extractBearerToken({
        authorization: 'Invalid format'
      })).toBe(null);

      // Non-string header
      expect(extractBearerToken({
        authorization: 123
      })).toBe(null);
    });
  });

  describe('Data Sanitization', () => {
    test('should sanitize patient data for response', () => {
      const sanitizePatientForResponse = (patient: any) => {
        if (!patient) return null;
        
        const { password, ...sanitized } = patient;
        return sanitized;
      };

      const patient = {
        patientId: 'test-id',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'hashed-password',
        role: 'patient',
        createdAt: '2023-01-01T00:00:00Z'
      };

      const result = sanitizePatientForResponse(patient);

      expect(result).not.toHaveProperty('password');
      expect(result).toEqual({
        patientId: 'test-id',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'patient',
        createdAt: '2023-01-01T00:00:00Z'
      });

      // Handle null input
      expect(sanitizePatientForResponse(null)).toBe(null);
    });

    test('should sanitize array of patients', () => {
      const sanitizePatientsArray = (patients: any[]) => {
        if (!Array.isArray(patients)) return [];
        
        return patients.map(patient => {
          const { password, ...sanitized } = patient;
          return sanitized;
        });
      };

      const patients = [
        {
          patientId: 'id1',
          email: 'user1@example.com',
          password: 'hash1',
          firstName: 'John'
        },
        {
          patientId: 'id2',
          email: 'user2@example.com',
          password: 'hash2',
          firstName: 'Jane'
        }
      ];

      const result = sanitizePatientsArray(patients);

      expect(result).toHaveLength(2);
      expect(result[0]).not.toHaveProperty('password');
      expect(result[1]).not.toHaveProperty('password');
      expect(result[0].email).toBe('user1@example.com');
      expect(result[1].email).toBe('user2@example.com');

      // Handle non-array input
      expect(sanitizePatientsArray(null as any)).toEqual([]);
    });
  });

  describe('Error Message Formatting', () => {
    test('should format validation errors consistently', () => {
      const formatValidationErrors = (errors: string[]) => {
        if (!errors || errors.length === 0) {
          return null;
        }
        
        if (errors.length === 1) {
          return errors[0];
        }
        
        return errors.join(', ');
      };

      expect(formatValidationErrors([])).toBe(null);
      expect(formatValidationErrors(['Single error'])).toBe('Single error');
      expect(formatValidationErrors(['Error 1', 'Error 2'])).toBe('Error 1, Error 2');
      expect(formatValidationErrors(['A', 'B', 'C'])).toBe('A, B, C');
    });
  });
});
