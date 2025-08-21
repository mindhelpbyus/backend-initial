import * as jwt from 'jsonwebtoken';

describe('Doctor Authentication Unit Tests', () => {
  const JWT_SECRET = 'test-secret';

  describe('JWT Token Validation', () => {
    test('should validate valid JWT token', () => {
      const verifyAuth = (authHeader: string) => {
        if (!authHeader) return null;
        const match = authHeader.match(/^Bearer\s+(.+)$/i);
        if (!match) return null;
        try {
          return jwt.verify(match[1], JWT_SECRET) as any;
        } catch (e) {
          return null;
        }
      };

      // Create a valid token
      const payload = { doctorId: 'doctor-123', email: 'doctor@example.com', role: 'doctor' };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
      
      const result = verifyAuth(`Bearer ${token}`);
      
      expect(result).toBeTruthy();
      expect(result.doctorId).toBe('doctor-123');
      expect(result.email).toBe('doctor@example.com');
      expect(result.role).toBe('doctor');
    });

    test('should reject invalid JWT token', () => {
      const verifyAuth = (authHeader: string) => {
        if (!authHeader) return null;
        const match = authHeader.match(/^Bearer\s+(.+)$/i);
        if (!match) return null;
        try {
          return jwt.verify(match[1], JWT_SECRET) as any;
        } catch (e) {
          return null;
        }
      };

      // Invalid token
      expect(verifyAuth('Bearer invalid-token')).toBe(null);
      
      // Wrong secret
      const wrongToken = jwt.sign({ doctorId: 'doctor-123' }, 'wrong-secret');
      expect(verifyAuth(`Bearer ${wrongToken}`)).toBe(null);
      
      // Expired token
      const expiredToken = jwt.sign({ doctorId: 'doctor-123' }, JWT_SECRET, { expiresIn: '-1h' });
      expect(verifyAuth(`Bearer ${expiredToken}`)).toBe(null);
    });

    test('should handle malformed authorization headers', () => {
      const verifyAuth = (authHeader: string) => {
        if (!authHeader) return null;
        const match = authHeader.match(/^Bearer\s+(.+)$/i);
        if (!match) return null;
        try {
          return jwt.verify(match[1], JWT_SECRET) as any;
        } catch (e) {
          return null;
        }
      };

      expect(verifyAuth('')).toBe(null);
      expect(verifyAuth('Invalid format')).toBe(null);
      expect(verifyAuth('Bearer')).toBe(null);
      expect(verifyAuth('Basic token')).toBe(null);
    });
  });

  describe('Role-based Authorization', () => {
    test('should validate admin role for doctor management', () => {
      const requireAdmin = (user: any) => {
        if (!user) return { authorized: false, error: 'Authentication required' };
        if (user.role !== 'admin') return { authorized: false, error: 'Admin access required' };
        return { authorized: true };
      };

      // Valid admin
      expect(requireAdmin({ role: 'admin', email: 'admin@example.com' })).toEqual({
        authorized: true
      });

      // Non-admin user
      expect(requireAdmin({ role: 'doctor', doctorId: 'doctor-123' })).toEqual({
        authorized: false,
        error: 'Admin access required'
      });

      // Patient user
      expect(requireAdmin({ role: 'patient', patientId: 'patient-123' })).toEqual({
        authorized: false,
        error: 'Admin access required'
      });

      // No user
      expect(requireAdmin(null)).toEqual({
        authorized: false,
        error: 'Authentication required'
      });
    });

    test('should validate doctor self-access permissions', () => {
      const canAccessDoctor = (user: any, doctorId: string) => {
        if (!user) return { authorized: false, error: 'Authentication required' };
        
        // Admin can access any doctor
        if (user.role === 'admin') return { authorized: true };
        
        // Doctor can access their own profile
        if (user.role === 'doctor' && user.doctorId === doctorId) {
          return { authorized: true };
        }
        
        return { authorized: false, error: 'Access denied' };
      };

      // Admin accessing any doctor
      expect(canAccessDoctor(
        { role: 'admin', email: 'admin@example.com' },
        'doctor-123'
      )).toEqual({ authorized: true });

      // Doctor accessing own profile
      expect(canAccessDoctor(
        { role: 'doctor', doctorId: 'doctor-123', email: 'doctor@example.com' },
        'doctor-123'
      )).toEqual({ authorized: true });

      // Doctor accessing another doctor's profile
      expect(canAccessDoctor(
        { role: 'doctor', doctorId: 'doctor-123', email: 'doctor@example.com' },
        'doctor-456'
      )).toEqual({ authorized: false, error: 'Access denied' });

      // Patient accessing doctor profile
      expect(canAccessDoctor(
        { role: 'patient', patientId: 'patient-123', email: 'patient@example.com' },
        'doctor-123'
      )).toEqual({ authorized: false, error: 'Access denied' });
    });

    test('should validate public access permissions', () => {
      const canViewPublicDoctorInfo = (user: any) => {
        // Public doctor information can be viewed by authenticated users
        if (!user) return { authorized: false, error: 'Authentication required' };
        return { authorized: true };
      };

      // Any authenticated user can view public doctor info
      expect(canViewPublicDoctorInfo({ role: 'patient', patientId: 'patient-123' })).toEqual({
        authorized: true
      });

      expect(canViewPublicDoctorInfo({ role: 'doctor', doctorId: 'doctor-123' })).toEqual({
        authorized: true
      });

      expect(canViewPublicDoctorInfo({ role: 'admin', email: 'admin@example.com' })).toEqual({
        authorized: true
      });

      // Unauthenticated users cannot view
      expect(canViewPublicDoctorInfo(null)).toEqual({
        authorized: false,
        error: 'Authentication required'
      });
    });
  });

  describe('Token Generation', () => {
    test('should generate valid doctor tokens', () => {
      const generateDoctorToken = (doctor: any) => {
        const payload = {
          doctorId: doctor.doctorId,
          email: doctor.email,
          role: 'doctor'
        };
        return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
      };

      const doctor = {
        doctorId: 'doctor-123',
        email: 'doctor@example.com',
        firstName: 'John',
        lastName: 'Smith'
      };

      const token = generateDoctorToken(doctor);
      expect(token).toBeTruthy();

      // Verify the token contains correct data
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      expect(decoded.doctorId).toBe('doctor-123');
      expect(decoded.email).toBe('doctor@example.com');
      expect(decoded.role).toBe('doctor');
    });

    test('should generate valid admin tokens', () => {
      const generateAdminToken = (admin: any) => {
        const payload = {
          adminId: admin.adminId,
          email: admin.email,
          role: 'admin'
        };
        return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
      };

      const admin = {
        adminId: 'admin-123',
        email: 'admin@example.com'
      };

      const token = generateAdminToken(admin);
      expect(token).toBeTruthy();

      // Verify the token contains correct data
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      expect(decoded.adminId).toBe('admin-123');
      expect(decoded.email).toBe('admin@example.com');
      expect(decoded.role).toBe('admin');
    });
  });

  describe('Authorization Header Parsing', () => {
    test('should parse authorization headers correctly', () => {
      const parseAuthHeader = (headers: any) => {
        const authHeader = headers?.authorization || headers?.Authorization;
        
        if (!authHeader) {
          return { type: null, token: null, error: 'No authorization header' };
        }
        
        if (typeof authHeader !== 'string') {
          return { type: null, token: null, error: 'Invalid header format' };
        }
        
        const bearerMatch = authHeader.match(/^Bearer\s+(.+)$/i);
        if (bearerMatch) {
          return { type: 'Bearer', token: bearerMatch[1], error: null };
        }
        
        const basicMatch = authHeader.match(/^Basic\s+(.+)$/i);
        if (basicMatch) {
          return { type: 'Basic', token: basicMatch[1], error: null };
        }
        
        return { type: null, token: null, error: 'Unsupported authorization type' };
      };

      // Valid Bearer token
      expect(parseAuthHeader({ authorization: 'Bearer abc123' })).toEqual({
        type: 'Bearer',
        token: 'abc123',
        error: null
      });

      // Case insensitive
      expect(parseAuthHeader({ Authorization: 'bearer xyz789' })).toEqual({
        type: 'Bearer',
        token: 'xyz789',
        error: null
      });

      // Basic auth (not supported for our API but should be parsed)
      expect(parseAuthHeader({ authorization: 'Basic dGVzdA==' })).toEqual({
        type: 'Basic',
        token: 'dGVzdA==',
        error: null
      });

      // Missing header
      expect(parseAuthHeader({})).toEqual({
        type: null,
        token: null,
        error: 'No authorization header'
      });

      // Invalid format
      expect(parseAuthHeader({ authorization: 'InvalidFormat' })).toEqual({
        type: null,
        token: null,
        error: 'Unsupported authorization type'
      });
    });
  });

  describe('Session Management', () => {
    test('should validate token expiration', () => {
      const isTokenExpired = (token: string) => {
        try {
          const decoded = jwt.verify(token, JWT_SECRET) as any;
          const now = Math.floor(Date.now() / 1000);
          return decoded.exp < now;
        } catch (error) {
          return true; // Invalid tokens are considered expired
        }
      };

      // Valid non-expired token
      const validToken = jwt.sign({ doctorId: 'doctor-123' }, JWT_SECRET, { expiresIn: '1h' });
      expect(isTokenExpired(validToken)).toBe(false);

      // Expired token
      const expiredToken = jwt.sign({ doctorId: 'doctor-123' }, JWT_SECRET, { expiresIn: '-1h' });
      expect(isTokenExpired(expiredToken)).toBe(true);

      // Invalid token
      expect(isTokenExpired('invalid-token')).toBe(true);
    });

    test('should extract user context from token', () => {
      const extractUserContext = (token: string) => {
        try {
          const decoded = jwt.verify(token, JWT_SECRET) as any;
          return {
            success: true,
            user: {
              id: decoded.doctorId || decoded.patientId || decoded.adminId,
              email: decoded.email,
              role: decoded.role
            }
          };
        } catch (error) {
          return {
            success: false,
            error: 'Invalid or expired token'
          };
        }
      };

      // Doctor token
      const doctorToken = jwt.sign({
        doctorId: 'doctor-123',
        email: 'doctor@example.com',
        role: 'doctor'
      }, JWT_SECRET);

      expect(extractUserContext(doctorToken)).toEqual({
        success: true,
        user: {
          id: 'doctor-123',
          email: 'doctor@example.com',
          role: 'doctor'
        }
      });

      // Patient token
      const patientToken = jwt.sign({
        patientId: 'patient-123',
        email: 'patient@example.com',
        role: 'patient'
      }, JWT_SECRET);

      expect(extractUserContext(patientToken)).toEqual({
        success: true,
        user: {
          id: 'patient-123',
          email: 'patient@example.com',
          role: 'patient'
        }
      });

      // Invalid token
      expect(extractUserContext('invalid-token')).toEqual({
        success: false,
        error: 'Invalid or expired token'
      });
    });
  });

  describe('Permission Helpers', () => {
    test('should check if user can create doctors', () => {
      const canCreateDoctor = (user: any) => {
        return !!(user && user.role === 'admin');
      };

      expect(canCreateDoctor({ role: 'admin' })).toBe(true);
      expect(canCreateDoctor({ role: 'doctor' })).toBe(false);
      expect(canCreateDoctor({ role: 'patient' })).toBe(false);
      expect(canCreateDoctor(null)).toBe(false);
    });

    test('should check if user can delete doctors', () => {
      const canDeleteDoctor = (user: any) => {
        return !!(user && user.role === 'admin');
      };

      expect(canDeleteDoctor({ role: 'admin' })).toBe(true);
      expect(canDeleteDoctor({ role: 'doctor' })).toBe(false);
      expect(canDeleteDoctor({ role: 'patient' })).toBe(false);
      expect(canDeleteDoctor(null)).toBe(false);
    });

    test('should check if user can update doctor profile', () => {
      const canUpdateDoctor = (user: any, doctorId: string) => {
        if (!user) return false;
        if (user.role === 'admin') return true;
        if (user.role === 'doctor' && user.doctorId === doctorId) return true;
        return false;
      };

      // Admin can update any doctor
      expect(canUpdateDoctor({ role: 'admin' }, 'doctor-123')).toBe(true);

      // Doctor can update own profile
      expect(canUpdateDoctor({ role: 'doctor', doctorId: 'doctor-123' }, 'doctor-123')).toBe(true);

      // Doctor cannot update other doctor's profile
      expect(canUpdateDoctor({ role: 'doctor', doctorId: 'doctor-123' }, 'doctor-456')).toBe(false);

      // Patient cannot update doctor profile
      expect(canUpdateDoctor({ role: 'patient' }, 'doctor-123')).toBe(false);

      // No user
      expect(canUpdateDoctor(null, 'doctor-123')).toBe(false);
    });
  });
});
