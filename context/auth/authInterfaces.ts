import { UserResponse } from '@/interfaces';

export interface AuthContextProps {
  isLoggedIn: boolean;
  user?: UserResponse;

  loginUser: (email: string, password: string) => Promise<boolean>;
  registerUser: (name: string, email: string, password: string) => Promise<{ hasError: boolean, message?: string }>;
}

export interface AuthState {
  isLoggedIn: boolean;
  user?: UserResponse;
}
