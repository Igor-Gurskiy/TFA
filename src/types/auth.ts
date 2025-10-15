export interface BaseAuth {
  email: string;
  password: string;
}

export interface TwoFAuth {
  code: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  requires2FA?: boolean;
  // token?: string;
}

export interface AuthError {
  message: string;
  code?: string;
  field?: 'email' | 'password' | 'code';
}