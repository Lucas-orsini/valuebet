/**
 * Shared types for authentication
 */

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  error: string;
}

export interface ApiValidationErrorResponse {
  errors: ValidationError[];
}
