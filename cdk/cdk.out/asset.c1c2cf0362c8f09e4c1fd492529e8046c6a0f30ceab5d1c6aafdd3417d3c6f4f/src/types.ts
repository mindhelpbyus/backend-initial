import { APIGatewayProxyResultV2, APIGatewayProxyEventV2 } from 'aws-lambda';

export interface ExtendedAPIGatewayProxyResultV2 extends Omit<APIGatewayProxyResultV2, 'body'> {
  statusCode: number;
  body: string;
  headers?: {
    [header: string]: boolean | number | string;
  };
}

export interface AuthenticatedUser {
  patientId: string;
  email: string;
  role?: string;
}