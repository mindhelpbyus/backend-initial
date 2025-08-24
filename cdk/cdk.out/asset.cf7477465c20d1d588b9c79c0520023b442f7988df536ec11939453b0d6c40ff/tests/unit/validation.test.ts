describe('Doctor Data Validation Unit Tests', () => {
  describe('Doctor Data Validation', () => {
    test('should validate doctor creation data', () => {
      const validateDoctorData = (data: any) => {
        const errors: string[] = [];
        
        if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
          errors.push('Valid email is required');
        }
        
        if (!data.firstName || data.firstName.trim().length < 2) {
          errors.push('First name must be at least 2 characters');
        }
        
        if (!data.lastName || data.lastName.trim().length < 2) {
          errors.push('Last name must be at least 2 characters');
        }
        
        if (!data.specialization || data.specialization.trim().length < 2) {
          errors.push('Specialization is required');
        }
        
        if (!data.licenseNumber || data.licenseNumber.trim().length < 3) {
          errors.push('License number is required');
        }
        
        if (data.experience !== undefined && (data.experience < 0 || data.experience > 50)) {
          errors.push('Experience must be between 0 and 50 years');
        }
        
        return errors;
      };

      // Valid data
      expect(validateDoctorData({
        email: 'doctor@example.com',
        firstName: 'John',
        lastName: 'Smith',
        specialization: 'Cardiology',
        licenseNumber: 'MD123456',
        experience: 10
      })).toEqual([]);

      // Missing required fields
      expect(validateDoctorData({
        firstName: 'John'
      })).toContain('Valid email is required');

      expect(validateDoctorData({
        email: 'doctor@example.com'
      })).toContain('First name must be at least 2 characters');

      // Invalid email format
      expect(validateDoctorData({
        email: 'invalid-email',
        firstName: 'John',
        lastName: 'Smith',
        specialization: 'Cardiology',
        licenseNumber: 'MD123456'
      })).toContain('Valid email is required');

      // Short names
      expect(validateDoctorData({
        email: 'doctor@example.com',
        firstName: 'J',
        lastName: 'S',
        specialization: 'Cardiology',
        licenseNumber: 'MD123456'
      })).toEqual([
        'First name must be at least 2 characters',
        'Last name must be at least 2 characters'
      ]);

      // Invalid experience
      expect(validateDoctorData({
        email: 'doctor@example.com',
        firstName: 'John',
        lastName: 'Smith',
        specialization: 'Cardiology',
        licenseNumber: 'MD123456',
        experience: -1
      })).toContain('Experience must be between 0 and 50 years');

      expect(validateDoctorData({
        email: 'doctor@example.com',
        firstName: 'John',
        lastName: 'Smith',
        specialization: 'Cardiology',
        licenseNumber: 'MD123456',
        experience: 51
      })).toContain('Experience must be between 0 and 50 years');
    });

    test('should validate doctor update data', () => {
      const validateDoctorUpdateData = (data: any) => {
        const errors: string[] = [];
        
        if (data.firstName !== undefined && (!data.firstName || data.firstName.trim().length < 2)) {
          errors.push('First name must be at least 2 characters');
        }
        
        if (data.lastName !== undefined && (!data.lastName || data.lastName.trim().length < 2)) {
          errors.push('Last name must be at least 2 characters');
        }
        
        if (data.specialization !== undefined && (!data.specialization || data.specialization.trim().length < 2)) {
          errors.push('Specialization must be at least 2 characters');
        }
        
        if (data.experience !== undefined && (data.experience < 0 || data.experience > 50)) {
          errors.push('Experience must be between 0 and 50 years');
        }
        
        if (data.isActive !== undefined && typeof data.isActive !== 'boolean') {
          errors.push('isActive must be a boolean');
        }
        
        return errors;
      };

      // Valid update data
      expect(validateDoctorUpdateData({
        firstName: 'Jane',
        experience: 15,
        isActive: true
      })).toEqual([]);

      // Empty update (should be valid)
      expect(validateDoctorUpdateData({})).toEqual([]);

      // Invalid update data
      expect(validateDoctorUpdateData({
        firstName: 'J',
        experience: -5,
        isActive: 'yes'
      })).toEqual([
        'First name must be at least 2 characters',
        'Experience must be between 0 and 50 years',
        'isActive must be a boolean'
      ]);
    });

    test('should validate specialization values', () => {
      const validateSpecialization = (specialization: string) => {
        const validSpecializations = [
          'Cardiology',
          'Dermatology',
          'Endocrinology',
          'Gastroenterology',
          'Neurology',
          'Oncology',
          'Orthopedics',
          'Pediatrics',
          'Psychiatry',
          'Radiology',
          'General Practice',
          'Internal Medicine'
        ];
        
        return validSpecializations.includes(specialization);
      };

      expect(validateSpecialization('Cardiology')).toBe(true);
      expect(validateSpecialization('Pediatrics')).toBe(true);
      expect(validateSpecialization('General Practice')).toBe(true);
      expect(validateSpecialization('Invalid Specialty')).toBe(false);
      expect(validateSpecialization('')).toBe(false);
    });
  });

  describe('Route Parameter Validation', () => {
    test('should validate doctor ID format', () => {
      const isValidDoctorId = (id: string) => {
        return !!(id && typeof id === 'string' && id.trim().length > 0);
      };

      expect(isValidDoctorId('valid-doctor-id')).toBe(true);
      expect(isValidDoctorId('123e4567-e89b-12d3-a456-426614174000')).toBe(true);
      expect(isValidDoctorId('')).toBe(false);
      expect(isValidDoctorId('   ')).toBe(false);
      expect(isValidDoctorId(null as any)).toBe(false);
      expect(isValidDoctorId(undefined as any)).toBe(false);
    });

    test('should extract and validate path parameters', () => {
      const extractDoctorId = (path: string) => {
        const match = path.match(/\/doctors\/([^\/]+)/);
        return match ? decodeURIComponent(match[1]) : null;
      };

      expect(extractDoctorId('/doctors/123')).toBe('123');
      expect(extractDoctorId('/doctors/doctor-id-123')).toBe('doctor-id-123');
      expect(extractDoctorId('/doctors/123/appointments')).toBe('123');
      expect(extractDoctorId('/doctors')).toBe(null);
      expect(extractDoctorId('/patients/123')).toBe(null);
    });
  });

  describe('Query Parameter Validation', () => {
    test('should validate email query parameter', () => {
      const validateEmailQuery = (queryParams: any) => {
        if (!queryParams || !queryParams.email) {
          return { valid: false, error: 'email query parameter is required' };
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
      expect(validateEmailQuery({ email: 'doctor@example.com' })).toEqual({
        valid: true,
        email: 'doctor@example.com'
      });

      // Missing email
      expect(validateEmailQuery({})).toEqual({
        valid: false,
        error: 'email query parameter is required'
      });

      // Invalid email format
      expect(validateEmailQuery({ email: 'invalid-email' })).toEqual({
        valid: false,
        error: 'invalid email format'
      });
    });

    test('should validate specialization query parameter', () => {
      const validateSpecializationQuery = (queryParams: any) => {
        if (!queryParams || !queryParams.specialization) {
          return { valid: false, error: 'specialization query parameter is required' };
        }
        
        if (typeof queryParams.specialization !== 'string') {
          return { valid: false, error: 'specialization must be a string' };
        }
        
        if (queryParams.specialization.trim().length < 2) {
          return { valid: false, error: 'specialization must be at least 2 characters' };
        }
        
        return { valid: true, specialization: queryParams.specialization };
      };

      // Valid specialization
      expect(validateSpecializationQuery({ specialization: 'Cardiology' })).toEqual({
        valid: true,
        specialization: 'Cardiology'
      });

      // Missing specialization
      expect(validateSpecializationQuery({})).toEqual({
        valid: false,
        error: 'specialization query parameter is required'
      });

      // Too short specialization
      expect(validateSpecializationQuery({ specialization: 'C' })).toEqual({
        valid: false,
        error: 'specialization must be at least 2 characters'
      });
    });
  });

  describe('Authorization Validation', () => {
    test('should validate admin role for doctor creation', () => {
      const validateAdminAccess = (user: any) => {
        if (!user) {
          return { valid: false, error: 'Authentication required' };
        }
        
        if (user.role !== 'admin') {
          return { valid: false, error: 'Admin access required' };
        }
        
        return { valid: true };
      };

      // Valid admin
      expect(validateAdminAccess({ role: 'admin', email: 'admin@example.com' })).toEqual({
        valid: true
      });

      // Non-admin user
      expect(validateAdminAccess({ role: 'doctor', email: 'doctor@example.com' })).toEqual({
        valid: false,
        error: 'Admin access required'
      });

      // No user
      expect(validateAdminAccess(null)).toEqual({
        valid: false,
        error: 'Authentication required'
      });
    });

    test('should validate doctor update permissions', () => {
      const validateUpdatePermissions = (user: any, doctorId: string) => {
        if (!user) {
          return { valid: false, error: 'Authentication required' };
        }
        
        if (user.role === 'admin') {
          return { valid: true };
        }
        
        if (user.role === 'doctor' && user.doctorId === doctorId) {
          return { valid: true };
        }
        
        return { valid: false, error: 'Access denied' };
      };

      // Admin can update any doctor
      expect(validateUpdatePermissions(
        { role: 'admin', email: 'admin@example.com' },
        'doctor-123'
      )).toEqual({ valid: true });

      // Doctor can update their own profile
      expect(validateUpdatePermissions(
        { role: 'doctor', doctorId: 'doctor-123', email: 'doctor@example.com' },
        'doctor-123'
      )).toEqual({ valid: true });

      // Doctor cannot update another doctor's profile
      expect(validateUpdatePermissions(
        { role: 'doctor', doctorId: 'doctor-123', email: 'doctor@example.com' },
        'doctor-456'
      )).toEqual({ valid: false, error: 'Access denied' });

      // Patient cannot update doctor profile
      expect(validateUpdatePermissions(
        { role: 'patient', patientId: 'patient-123', email: 'patient@example.com' },
        'doctor-123'
      )).toEqual({ valid: false, error: 'Access denied' });
    });
  });

  describe('Data Sanitization', () => {
    test('should sanitize doctor data for public response', () => {
      const sanitizeDoctorForPublic = (doctor: any) => {
        if (!doctor) return null;
        
        const { licenseNumber, ...publicData } = doctor;
        return publicData;
      };

      const doctor = {
        doctorId: 'doctor-123',
        email: 'doctor@example.com',
        firstName: 'John',
        lastName: 'Smith',
        specialization: 'Cardiology',
        licenseNumber: 'MD123456',
        experience: 10,
        rating: 4.5,
        isActive: true
      };

      const result = sanitizeDoctorForPublic(doctor);

      expect(result).not.toHaveProperty('licenseNumber');
      expect(result).toEqual({
        doctorId: 'doctor-123',
        email: 'doctor@example.com',
        firstName: 'John',
        lastName: 'Smith',
        specialization: 'Cardiology',
        experience: 10,
        rating: 4.5,
        isActive: true
      });

      // Handle null input
      expect(sanitizeDoctorForPublic(null)).toBe(null);
    });

    test('should sanitize array of doctors', () => {
      const sanitizeDoctorsArray = (doctors: any[]) => {
        if (!Array.isArray(doctors)) return [];
        
        return doctors.map(doctor => {
          const { licenseNumber, ...publicData } = doctor;
          return publicData;
        });
      };

      const doctors = [
        {
          doctorId: 'doctor-1',
          email: 'doctor1@example.com',
          licenseNumber: 'MD111',
          firstName: 'John',
          specialization: 'Cardiology'
        },
        {
          doctorId: 'doctor-2',
          email: 'doctor2@example.com',
          licenseNumber: 'MD222',
          firstName: 'Jane',
          specialization: 'Dermatology'
        }
      ];

      const result = sanitizeDoctorsArray(doctors);

      expect(result).toHaveLength(2);
      expect(result[0]).not.toHaveProperty('licenseNumber');
      expect(result[1]).not.toHaveProperty('licenseNumber');
      expect(result[0].email).toBe('doctor1@example.com');
      expect(result[1].email).toBe('doctor2@example.com');

      // Handle non-array input
      expect(sanitizeDoctorsArray(null as any)).toEqual([]);
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
