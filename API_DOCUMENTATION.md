# Mental Health Project - API Documentation

This document provides comprehensive API documentation for the Mental Health Project backend services, including endpoints for Patients, Doctors, and Appointments.

## Table of Contents
- [API Gateway Endpoints](#api-gateway-endpoints)
- [Environment Configuration](#environment-configuration)
- [Authentication](#authentication)
- [Patient APIs](#patient-apis)
- [Doctor APIs](#doctor-apis)
- [Appointment APIs](#appointment-apis)
- [Data Models](#data-models)
- [Error Responses](#error-responses)
- [UI Integration Guide](#ui-integration-guide)

---

## API Gateway Endpoints

### Production (AWS)
- **Base URL**: `https://lf4digbabc.execute-api.us-east-1.amazonaws.com`
- **AWS Account**: `121775527089`
- **Region**: `us-east-1`
- **Stack Name**: `TelehealthBackend-prod`

To get the actual API Gateway URL after deployment:
```bash
aws cloudformation describe-stacks \
  --stack-name TelehealthBackend-prod \
  --region us-east-1 \
  --query 'Stacks[0].Outputs[?OutputKey==`ApiUrl`].OutputValue' \
  --output text
```

### Development (Local)
- **Base URL**: `http://localhost:8080/api-proxy`
- **LocalStack URL**: `https://{api-id}.execute-api.localhost.localstack.cloud:4566/`
- **API Explorer**: `http://localhost:8080/api-explorer.html`

### Development Services
- **DynamoDB Local**: `http://localhost:8000`
- **DynamoDB Admin**: `http://localhost:8001`
- **LocalStack**: `http://localhost:4566`

---

## Environment Configuration

### AWS Production Environment
```bash
# Environment Variables
export CDK_DEFAULT_ACCOUNT="121775527089"
export CDK_DEFAULT_REGION="us-east-1"
export STAGE="prod"

# Deploy to AWS
./scripts/deploy-to-aws.sh
```

### Local Development Environment
```bash
# Start local services
docker-compose up -d

# Start API Explorer (serves local API proxy)
python3 scripts/serve-api-explorer.py

# Access API Explorer
open http://localhost:8080/api-explorer.html
```

### Environment-Specific Configurations

| Environment | Base URL | Authentication | Database |
|-------------|----------|----------------|----------|
| **Production** | `https://{api-id}.execute-api.us-east-1.amazonaws.com/` | JWT Required | AWS DynamoDB |
| **Development** | `http://localhost:8080/api-proxy` | JWT Optional | DynamoDB Local |
| **LocalStack** | `https://{api-id}.execute-api.localhost.localstack.cloud:4566/` | JWT Optional | DynamoDB Local |

---

## Authentication

Most endpoints require JWT authentication via Bearer token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

---

## Patient APIs

### 1. Patient Signup
**POST** `/auth/signup`

Creates a new patient account and returns authentication token.

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)",
  "firstName": "string (optional)",
  "lastName": "string (optional)"
}
```

**Response (201):**
```json
{
  "patientId": "string",
  "token": "string"
}
```

**Validation:**
- Email and password are required
- Email must be unique (returns 409 if already exists)

---

### 2. Patient Login
**POST** `/auth/login`

Authenticates a patient and returns JWT token.

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response (200):**
```json
{
  "token": "string",
  "patientId": "string"
}
```

**Error Responses:**
- 401: Invalid credentials

---

### 3. Get All Patients
**GET** `/patients`

Retrieves all patients (admin access recommended).

**Headers:**
- Authorization: Bearer token (optional, commented out in code)

**Response (200):**
```json
{
  "items": [
    {
      "patientId": "string",
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      "createdAt": "string (ISO date)",
      "role": "patient",
      "reviews": [],
      "visits": []
    }
  ]
}
```

---

### 4. Create Patient
**POST** `/patients`

Creates a new patient record (admin access recommended).

**Headers:**
- Authorization: Bearer token (optional, commented out in code)

**Request Body:**
```json
{
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  // Additional patient fields
}
```

**Response (201):**
```json
{
  "patientId": "string"
}
```

---

### 5. Get Patient by Email
**GET** `/patients/by-email?email={email}`

Retrieves patients by email address.

**Query Parameters:**
- `email` (required): Patient's email address

**Response (200):**
```json
{
  "items": [
    {
      "patientId": "string",
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      // Other patient fields
    }
  ]
}
```

---

### 6. Get Patient by ID
**GET** `/patients/{patientId}`

Retrieves a specific patient's details (password excluded).

**Path Parameters:**
- `patientId`: Unique patient identifier

**Response (200):**
```json
{
  "patientId": "string",
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "createdAt": "string",
  "role": "patient",
  "reviews": [],
  "visits": []
}
```

**Error Responses:**
- 404: Patient not found

---

### 7. Update Patient
**PUT** `/patients/{patientId}`

Updates patient information.

**Path Parameters:**
- `patientId`: Unique patient identifier

**Headers:**
- Authorization: Bearer token (optional, commented out in code)

**Request Body:**
```json
{
  "firstName": "string (optional)",
  "lastName": "string (optional)",
  "email": "string (optional)",
  // Any other patient fields to update
}
```

**Response (200):**
```json
{
  "message": "updated"
}
```

---

### 8. Delete Patient
**DELETE** `/patients/{patientId}`

Deletes a patient record (admin access recommended).

**Path Parameters:**
- `patientId`: Unique patient identifier

**Headers:**
- Authorization: Bearer token (optional, commented out in code)

**Response (200):**
```json
{
  "message": "deleted"
}
```

---

### 9. Get Patient Visits
**GET** `/patients/{patientId}/visits`

Retrieves all visits for a specific patient.

**Path Parameters:**
- `patientId`: Unique patient identifier

**Response (200):**
```json
{
  "visits": []
}
```

---

### 10. Add Patient Review
**POST** `/patients/{patientId}/reviews`

Adds a review for a patient.

**Path Parameters:**
- `patientId`: Unique patient identifier

**Headers:**
- Authorization: Bearer token (optional, commented out in code)

**Request Body:**
```json
{
  "rating": "number",
  "reviewText": "string",
  "doctorId": "string"
  // Additional review fields
}
```

**Response (201):**
```json
{
  "review": {
    "id": "string",
    "createdAt": "string (ISO date)",
    "rating": "number",
    "reviewText": "string",
    // Other review fields
  }
}
```

---

## Doctor APIs

### 1. Create Doctor
**POST** `/doctors`

Creates a new doctor record (admin access recommended).

**Headers:**
- Authorization: Bearer token (optional, commented out in code)

**Request Body:**
```json
{
  "email": "string (required)",
  "firstName": "string (required, min 2 chars)",
  "lastName": "string (required, min 2 chars)",
  "specialization": "string (required, min 2 chars)",
  "licenseNumber": "string (required, min 3 chars)",
  "phoneNumber": "string (optional)",
  "address": "string (optional)",
  "bio": "string (optional)",
  "experience": "number (optional, 0-50 years)",
  "education": "string[] (optional)",
  "certifications": "string[] (optional)"
}
```

**Response (201):**
```json
{
  "doctorId": "string",
  "message": "Doctor created successfully"
}
```

**Validation Errors (400):**
- Valid email is required
- First name must be at least 2 characters
- Last name must be at least 2 characters
- Specialization is required
- License number is required
- Experience must be between 0 and 50 years

**Error Responses:**
- 409: Doctor with this email already exists

---

### 2. Get All Doctors
**GET** `/doctors`

Retrieves all doctors.

**Response (200):**
```json
{
  "doctors": [
    {
      "doctorId": "string",
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      "specialization": "string",
      "licenseNumber": "string",
      "phoneNumber": "string",
      "address": "string",
      "bio": "string",
      "experience": "number",
      "education": "string[]",
      "certifications": "string[]",
      "rating": "number",
      "reviewCount": "number",
      "createdAt": "string (ISO date)",
      "isActive": "boolean"
    }
  ]
}
```

---

### 3. Get Doctors by Specialization
**GET** `/doctors/by-specialization?specialization={specialization}`

Retrieves doctors filtered by specialization.

**Query Parameters:**
- `specialization` (required): Medical specialization

**Response (200):**
```json
{
  "doctors": [
    {
      "doctorId": "string",
      "firstName": "string",
      "lastName": "string",
      "specialization": "string",
      // Other doctor fields
    }
  ]
}
```

---

### 4. Get Doctor by Email
**GET** `/doctors/by-email?email={email}`

Retrieves doctors by email address.

**Query Parameters:**
- `email` (required): Doctor's email address

**Response (200):**
```json
{
  "doctors": [
    {
      "doctorId": "string",
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      // Other doctor fields
    }
  ]
}
```

---

### 5. Get Doctor by ID
**GET** `/doctors/{doctorId}`

Retrieves a specific doctor's details.

**Path Parameters:**
- `doctorId`: Unique doctor identifier

**Response (200):**
```json
{
  "doctorId": "string",
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "specialization": "string",
  "licenseNumber": "string",
  "phoneNumber": "string",
  "address": "string",
  "bio": "string",
  "experience": "number",
  "education": "string[]",
  "certifications": "string[]",
  "availability": {
    "monday": {
      "start": "string",
      "end": "string"
    }
    // Other days
  },
  "rating": "number",
  "reviewCount": "number",
  "createdAt": "string (ISO date)",
  "updatedAt": "string (ISO date)",
  "isActive": "boolean"
}
```

**Error Responses:**
- 404: Doctor not found

---

### 6. Update Doctor
**PUT** `/doctors/{doctorId}`

Updates doctor information.

**Path Parameters:**
- `doctorId`: Unique doctor identifier

**Headers:**
- Authorization: Bearer token (optional, commented out in code)

**Request Body:**
```json
{
  "firstName": "string (optional)",
  "lastName": "string (optional)",
  "specialization": "string (optional)",
  "phoneNumber": "string (optional)",
  "address": "string (optional)",
  "bio": "string (optional)",
  "experience": "number (optional)",
  "education": "string[] (optional)",
  "certifications": "string[] (optional)",
  "availability": {
    "monday": {
      "start": "string",
      "end": "string"
    }
    // Other days
  },
  "isActive": "boolean (optional)"
}
```

**Response (200):**
```json
{
  "message": "Doctor updated successfully"
}
```

---

### 7. Delete Doctor
**DELETE** `/doctors/{doctorId}`

Deletes a doctor record (admin access recommended).

**Path Parameters:**
- `doctorId`: Unique doctor identifier

**Headers:**
- Authorization: Bearer token (optional, commented out in code)

**Response (200):**
```json
{
  "message": "Doctor deleted successfully"
}
```

---

## Appointment APIs

### 1. Create Appointment
**POST** `/appointments`

Creates a new appointment.

**Request Body:**
```json
{
  "patientId": "string (required)",
  "doctorId": "string (required)",
  "scheduleDate": "string (required, ISO date, future date)",
  "duration": "number (optional, 15-180 minutes, default 30)",
  "videoLink": "string (optional)",
  "paymentId": "string (optional)",
  "paymentStatus": "string (optional, default 'pending')",
  "paymentAmount": "number (optional, >= 0)",
  "notes": "string (optional)",
  "symptoms": "string[] (optional)"
}
```

**Response (201):**
```json
{
  "appointmentId": "string",
  "message": "Appointment created successfully"
}
```

**Validation Errors (400):**
- Patient ID is required
- Doctor ID is required
- Schedule date is required and must be in the future
- Duration must be between 15 and 180 minutes
- Payment amount cannot be negative

---

### 2. Get All Appointments
**GET** `/appointments`

Retrieves all appointments with optional filters.

**Query Parameters (all optional):**
- `status`: Appointment status (comma-separated for multiple)
- `fromDate`: Start date filter (ISO string)
- `toDate`: End date filter (ISO string)
- `patientId`: Filter by patient ID
- `doctorId`: Filter by doctor ID

**Response (200):**
```json
{
  "appointments": [
    {
      "appointmentId": "string",
      "patientId": "string",
      "doctorId": "string",
      "appointmentStatus": "string",
      "scheduleDate": "string (ISO date)",
      "duration": "number",
      "videoLink": "string",
      "paymentId": "string",
      "paymentStatus": "string",
      "paymentAmount": "number",
      "rating": "number",
      "reviewText": "string",
      "notes": "string",
      "symptoms": "string[]",
      "diagnosis": "string",
      "prescription": "string",
      "followUpRequired": "boolean",
      "followUpDate": "string",
      "createdAt": "string (ISO date)",
      "updatedAt": "string (ISO date)",
      "cancelledAt": "string (ISO date)",
      "cancelledBy": "string",
      "cancellationReason": "string"
    }
  ]
}
```

---

### 3. Get Patient Appointments
**GET** `/appointments/patient?patientId={patientId}`

Retrieves appointments for a specific patient.

**Query Parameters:**
- `patientId` (required): Patient identifier
- Other filter parameters (same as Get All Appointments)

**Response (200):**
```json
{
  "appointments": [
    // Array of appointment objects
  ]
}
```

---

### 4. Get Doctor Appointments
**GET** `/appointments/doctor?doctorId={doctorId}`

Retrieves appointments for a specific doctor.

**Query Parameters:**
- `doctorId` (required): Doctor identifier
- Other filter parameters (same as Get All Appointments)

**Response (200):**
```json
{
  "appointments": [
    // Array of appointment objects
  ]
}
```

---

### 5. Get Appointment by ID
**GET** `/appointments/{appointmentId}`

Retrieves a specific appointment's details.

**Path Parameters:**
- `appointmentId`: Unique appointment identifier

**Response (200):**
```json
{
  "appointmentId": "string",
  "patientId": "string",
  "doctorId": "string",
  "appointmentStatus": "string",
  "scheduleDate": "string (ISO date)",
  "duration": "number",
  "videoLink": "string",
  "paymentId": "string",
  "paymentStatus": "string",
  "paymentAmount": "number",
  "rating": "number",
  "reviewText": "string",
  "notes": "string",
  "symptoms": "string[]",
  "diagnosis": "string",
  "prescription": "string",
  "followUpRequired": "boolean",
  "followUpDate": "string",
  "createdAt": "string (ISO date)",
  "updatedAt": "string (ISO date)"
}
```

**Error Responses:**
- 404: Appointment not found

---

### 6. Update Appointment
**PUT** `/appointments/{appointmentId}`

Updates appointment information.

**Path Parameters:**
- `appointmentId`: Unique appointment identifier

**Request Body:**
```json
{
  "appointmentStatus": "string (optional)",
  "scheduleDate": "string (optional, ISO date)",
  "duration": "number (optional)",
  "videoLink": "string (optional)",
  "paymentId": "string (optional)",
  "paymentStatus": "string (optional)",
  "paymentAmount": "number (optional)",
  "rating": "number (optional, 1-5)",
  "reviewText": "string (optional)",
  "notes": "string (optional)",
  "symptoms": "string[] (optional)",
  "diagnosis": "string (optional)",
  "prescription": "string (optional)",
  "followUpRequired": "boolean (optional)",
  "followUpDate": "string (optional)",
  "cancellationReason": "string (optional)"
}
```

**Response (200):**
```json
{
  "message": "Appointment updated successfully"
}
```

**Special Behavior:**
- If status is changed to 'cancelled', adds `cancelledAt` timestamp
- Automatically adds `updatedAt` timestamp

---

### 7. Cancel Appointment
**DELETE** `/appointments/{appointmentId}?patientId={patientId}`

Cancels an appointment (changes status to 'cancelled' instead of deleting).

**Path Parameters:**
- `appointmentId`: Unique appointment identifier

**Query Parameters:**
- `patientId` (required): Patient ID for authorization

**Response (200):**
```json
{
  "message": "Appointment cancelled successfully"
}
```

**Validation:**
- Patient can only cancel their own appointments
- Cannot cancel already cancelled appointments
- Cannot cancel completed appointments

**Error Responses:**
- 400: Missing patientId, already cancelled, or completed appointment
- 403: Trying to cancel someone else's appointment
- 404: Appointment not found

---

## Data Models

### Patient Model
```typescript
{
  patientId: string;
  email: string;
  password: string; // hashed, excluded from responses
  firstName: string;
  lastName: string;
  createdAt: string; // ISO date
  role: "patient";
  reviews: Review[];
  visits: Visit[];
}
```

### Doctor Model
```typescript
{
  doctorId: string;
  email: string;
  firstName: string;
  lastName: string;
  specialization: string;
  licenseNumber: string;
  phoneNumber?: string;
  address?: string;
  bio?: string;
  experience?: number;
  education?: string[];
  certifications?: string[];
  availability?: {
    [day: string]: {
      start: string;
      end: string;
    };
  };
  rating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt?: string;
  isActive: boolean;
}
```

### Appointment Model
```typescript
{
  appointmentId: string;
  patientId: string;
  doctorId: string;
  appointmentStatus: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  scheduleDate: string; // ISO date
  duration?: number; // minutes
  videoLink?: string;
  paymentId?: string;
  paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentAmount?: number;
  rating?: number; // 1-5 stars
  reviewText?: string;
  notes?: string;
  symptoms?: string[];
  diagnosis?: string;
  prescription?: string;
  followUpRequired?: boolean;
  followUpDate?: string;
  createdAt: string;
  updatedAt?: string;
  cancelledAt?: string;
  cancelledBy?: string;
  cancellationReason?: string;
}
```

---

## Error Responses

### Common HTTP Status Codes

**400 Bad Request**
```json
{
  "message": "Validation failed",
  "errors": ["Error description 1", "Error description 2"]
}
```

**401 Unauthorized**
```json
{
  "message": "Invalid credentials"
}
```

**403 Forbidden**
```json
{
  "message": "Access denied"
}
```

**404 Not Found**
```json
{
  "message": "Resource not found"
}
```

**409 Conflict**
```json
{
  "message": "Resource already exists"
}
```

**500 Internal Server Error**
```json
{
  "message": "Internal server error",
  "error": "Error details"
}
```

---

## Notes

1. **Authentication**: Most endpoints have authentication commented out in the current implementation but should be enabled in production.

2. **Validation**: All create and update endpoints include comprehensive validation with detailed error messages.

3. **Timestamps**: All resources include `createdAt` timestamps, and updates add `updatedAt` timestamps.

4. **Soft Deletes**: Appointments use soft deletes (status change to 'cancelled') rather than hard deletes.

5. **Indexing**: The system uses DynamoDB with secondary indexes for efficient querying by email, specialization, patient ID, and doctor ID.

6. **JWT Tokens**: Authentication tokens expire in 7 days and include user role information.

---

## UI Integration Guide

### Quick Start for Frontend Developers

#### 1. Environment Setup
```javascript
// config.js - Environment configuration
const config = {
  development: {
    apiBaseUrl: 'http://localhost:8080/api-proxy',
    apiExplorer: 'http://localhost:8080/api-explorer.html'
  },
  production: {
    apiBaseUrl: 'https://{api-id}.execute-api.us-east-1.amazonaws.com',
    // Get actual URL with: aws cloudformation describe-stacks --stack-name TelehealthBackend-prod --query 'Stacks[0].Outputs[?OutputKey==`ApiUrl`].OutputValue' --output text
  }
};

export default config[process.env.NODE_ENV || 'development'];
```

#### 2. API Client Setup
```javascript
// apiClient.js - HTTP client with authentication
class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('authToken');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Authentication methods
  async signup(userData) {
    const response = await this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    this.setToken(response.token);
    return response;
  }

  async login(credentials) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    this.setToken(response.token);
    return response;
  }

  logout() {
    this.clearToken();
  }

  // Patient methods
  async getPatients() {
    return this.request('/patients');
  }

  async getPatient(patientId) {
    return this.request(`/patients/${patientId}`);
  }

  async updatePatient(patientId, data) {
    return this.request(`/patients/${patientId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  // Doctor methods
  async getDoctors() {
    return this.request('/doctors');
  }

  async getDoctorsBySpecialization(specialization) {
    return this.request(`/doctors/by-specialization?specialization=${encodeURIComponent(specialization)}`);
  }

  async getDoctor(doctorId) {
    return this.request(`/doctors/${doctorId}`);
  }

  // Appointment methods
  async createAppointment(appointmentData) {
    return this.request('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData)
    });
  }

  async getAppointments(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/appointments?${params}`);
  }

  async getPatientAppointments(patientId, filters = {}) {
    const params = new URLSearchParams({ patientId, ...filters });
    return this.request(`/appointments/patient?${params}`);
  }

  async getDoctorAppointments(doctorId, filters = {}) {
    const params = new URLSearchParams({ doctorId, ...filters });
    return this.request(`/appointments/doctor?${params}`);
  }

  async updateAppointment(appointmentId, data) {
    return this.request(`/appointments/${appointmentId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async cancelAppointment(appointmentId, patientId) {
    return this.request(`/appointments/${appointmentId}?patientId=${patientId}`, {
      method: 'DELETE'
    });
  }
}

export default ApiClient;
```

#### 3. React Hook Example
```javascript
// useApi.js - React hook for API integration
import { useState, useEffect, useContext, createContext } from 'react';
import ApiClient from './apiClient';
import config from './config';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [api] = useState(() => new ApiClient(config.apiBaseUrl));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app start
    const token = localStorage.getItem('authToken');
    if (token) {
      api.setToken(token);
      // Optionally validate token by fetching user profile
    }
    setLoading(false);
  }, [api]);

  const login = async (credentials) => {
    try {
      const response = await api.login(credentials);
      setUser({ patientId: response.patientId });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    api.logout();
    setUser(null);
  };

  return (
    <ApiContext.Provider value={{ api, user, login, logout, loading }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within ApiProvider');
  }
  return context;
};

// Custom hooks for specific resources
export const usePatients = () => {
  const { api } = useApi();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await api.getPatients();
      setPatients(response.items || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return { patients, loading, error, refetch: fetchPatients };
};

export const useDoctors = (specialization = null) => {
  const { api } = useApi();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = specialization 
        ? await api.getDoctorsBySpecialization(specialization)
        : await api.getDoctors();
      setDoctors(response.doctors || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [specialization]);

  return { doctors, loading, error, refetch: fetchDoctors };
};
```

#### 4. Component Examples
```javascript
// LoginForm.jsx
import React, { useState } from 'react';
import { useApi } from './hooks/useApi';

const LoginForm = () => {
  const { login } = useApi();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(credentials);
      // Redirect to dashboard
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={credentials.email}
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        required
      />
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

// DoctorList.jsx
import React from 'react';
import { useDoctors } from './hooks/useApi';

const DoctorList = ({ specialization }) => {
  const { doctors, loading, error } = useDoctors(specialization);

  if (loading) return <div>Loading doctors...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="doctor-list">
      {doctors.map(doctor => (
        <div key={doctor.doctorId} className="doctor-card">
          <h3>{doctor.firstName} {doctor.lastName}</h3>
          <p>{doctor.specialization}</p>
          <p>Experience: {doctor.experience} years</p>
          <p>Rating: {doctor.rating}/5 ({doctor.reviewCount} reviews)</p>
        </div>
      ))}
    </div>
  );
};
```

#### 5. Error Handling Best Practices
```javascript
// errorHandler.js
export const handleApiError = (error) => {
  console.error('API Error:', error);

  // Handle specific error types
  if (error.message.includes('401')) {
    // Unauthorized - redirect to login
    localStorage.removeItem('authToken');
    window.location.href = '/login';
    return;
  }

  if (error.message.includes('403')) {
    // Forbidden - show access denied message
    return 'Access denied. You do not have permission to perform this action.';
  }

  if (error.message.includes('404')) {
    // Not found
    return 'The requested resource was not found.';
  }

  if (error.message.includes('409')) {
    // Conflict - usually validation errors
    return 'This resource already exists or conflicts with existing data.';
  }

  // Generic error message
  return error.message || 'An unexpected error occurred. Please try again.';
};
```

#### 6. Local Development Setup
```bash
# 1. Start backend services
docker-compose up -d

# 2. Start API explorer (for testing)
python3 scripts/serve-api-explorer.py

# 3. In your frontend project, use the development API URL
# http://localhost:8080/api-proxy
```

#### 7. Production Deployment Notes
- Replace `{api-id}` in production URLs with actual API Gateway ID
- Use the AWS CLI command provided to get the actual API URL after deployment
- Ensure CORS is properly configured for your frontend domain
- Implement proper error handling and loading states
- Add authentication token refresh logic for long-running sessions
- Consider implementing retry logic for network failures

#### 8. Testing with API Explorer
Visit `http://localhost:8080/api-explorer.html` during local development to:
- Test API endpoints interactively
- View request/response formats
- Debug authentication issues
- Validate data models

This provides a complete integration guide for frontend developers to quickly connect their UI applications to the Mental Health Project API.
