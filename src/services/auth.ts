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
  token?: string;
  user?: UserResponse;
  data?: {
    id: string;
    email: string;
    fullName: string;
    phone: string;
    isActive: boolean;
    createdAt: string | null;
    token?: string;
    user?: UserResponse;
  };
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success?: boolean;
  message?: string;
  token?: string;
  user?: UserResponse;
  data?: {
    token: string;
    user: UserResponse;
  };
};

export const register = (payload: RegisterPayload) => {
  return api.post<RegisterResponse>("/auth/register", payload);
};

export const login = (payload: LoginPayload) => {
  return api.post<LoginResponse>("/auth/login", payload);
};

