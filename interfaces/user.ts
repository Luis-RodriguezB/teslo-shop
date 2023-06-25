export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: User_Role;

  createdAt?: string;
  updatedAt?: string;
}

export enum User_Role {
  USER_ADMIN = 'admin',
  USER_CLIENT = 'client',
}

export interface UserResponse {
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: UserResponse;
}
