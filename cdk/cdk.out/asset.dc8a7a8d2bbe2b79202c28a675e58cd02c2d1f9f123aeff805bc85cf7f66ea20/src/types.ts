import { APIGatewayProxyResultV2, APIGatewayProxyEventV2 } from 'aws-lambda';

export interface ExtendedAPIGatewayProxyResultV2 extends Omit<APIGatewayProxyResultV2, 'body'> {
  statusCode: number;
  body: string;
  headers?: {
    [header: string]: boolean | number | string;
  };
}

export interface AuthenticatedUser {
  doctorId?: string;
  patientId?: string;
  email: string;
  role?: string;
}

export interface Doctor {
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

export interface DoctorCreateRequest {
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
}

export interface DoctorUpdateRequest {
  firstName?: string;
  lastName?: string;
  specialization?: string;
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
  isActive?: boolean;
}
