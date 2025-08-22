# Mental Health Project - API Documentation

This document provides comprehensive API documentation for the Mental Health Project backend services, including endpoints for Patients, Doctors, and Appointments.

## Table of Contents
- [Authentication](#authentication)
- [Patient APIs](#patient-apis)
- [Doctor APIs](#doctor-apis)
- [Appointment APIs](#appointment-apis)
- [Data Models](#data-models)
- [Error Responses](#error-responses)

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
