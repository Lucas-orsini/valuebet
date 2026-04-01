// Shared types for authentication

export type AuthState = 'idle' | 'loading' | 'error' | 'success';

export type AuthError =
  | 'invalid_credentials'
  | 'email_taken'
  | 'weak_password'
  | 'rate_limited'
  | 'unknown';

export interface User {
  id: string;
  email: string;
  name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Session {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at?: number;
  token_type: string;
  user: User;
}
