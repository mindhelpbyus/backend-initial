import { APIGatewayProxyResultV2 } from 'aws-lambda';
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
export type AppointmentStatus = 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export interface Appointment {
    appointmentId: string;
    patientId: string;
    doctorId: string;
    appointmentStatus: AppointmentStatus;
    scheduleDate: string;
    duration?: number;
    videoLink?: string;
    paymentId?: string;
    paymentStatus?: PaymentStatus;
    paymentAmount?: number;
    rating?: number;
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
export interface AppointmentCreateRequest {
    patientId: string;
    doctorId: string;
    scheduleDate: string;
    duration?: number;
    videoLink?: string;
    paymentId?: string;
    paymentStatus?: PaymentStatus;
    paymentAmount?: number;
    notes?: string;
    symptoms?: string[];
}
export interface AppointmentUpdateRequest {
    appointmentStatus?: AppointmentStatus;
    scheduleDate?: string;
    duration?: number;
    videoLink?: string;
    paymentId?: string;
    paymentStatus?: PaymentStatus;
    paymentAmount?: number;
    rating?: number;
    reviewText?: string;
    notes?: string;
    symptoms?: string[];
    diagnosis?: string;
    prescription?: string;
    followUpRequired?: boolean;
    followUpDate?: string;
    cancellationReason?: string;
}
export interface AppointmentFilters {
    status?: AppointmentStatus | AppointmentStatus[];
    fromDate?: string;
    toDate?: string;
    patientId?: string;
    doctorId?: string;
}
