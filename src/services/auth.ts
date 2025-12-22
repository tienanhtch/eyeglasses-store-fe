import { api } from "@/utils/fetch-api";

export type RegisterPayload = {
  email: string;
  password: string;
  fullName: string;
  phone: string;
};

export type UserResponse = {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  roles: string[];
  isActive: boolean;
  createdAt: string | null;
  updatedAt: string | null;
};

export type RegisterResponse = {
  success?: boolean;
  message?: string;
  data?: {
    id: string;
    email: string;
    fullName: string;
    phone: string;
    isActive: boolean;
    createdAt: string | null;
  };
  // Legacy format support
  user?: UserResponse;
  token?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success?: boolean;
  message?: string;
  data?: {
    token: string;
    user: UserResponse;
  };
  // Legacy format support
  user?: UserResponse;
  token?: string;
};

export const register = (payload: RegisterPayload) => {
  return api.post<RegisterResponse>("/auth/register", payload);
};

export const login = (payload: LoginPayload) => {
  return api.post<LoginResponse>("/auth/login", payload);
};

