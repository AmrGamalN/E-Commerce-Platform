export interface SignUpData {
  phoneNumber?: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  accountType: string | null;
  confirmPassword: string;
  terms: boolean;
}

export interface LoginResponse {
  status: number;
  success: boolean;
  message: string;
}

export interface LogoutResponse {
  status: number;
  success: boolean;
  message: string;
}