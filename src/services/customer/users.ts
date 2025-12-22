import { api } from "@/utils/fetch-api";

export type UserProfile = {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  isActive: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type UserAddress = {
  id: string;
  recipient: string;
  phone: string;
  line1: string;
  line2?: string | null;
  city: string;
  district: string;
  ward?: string | null;
  postalCode?: string | null;
  country?: string | null;
  isDefault?: boolean;
};

export type CreateAddressPayload = Omit<UserAddress, "id">;

export const getUserProfile = (userId: string) => {
  return api.get<UserProfile>(`/users/profile?userId=${userId}`);
};

export const getUserAddresses = (userId: string) => {
  return api.get<UserAddress[]>(`/users/addresses?userId=${userId}`);
};

export const createUserAddress = (userId: string, payload: CreateAddressPayload) => {
  return api.post<UserAddress>(`/users/addresses?userId=${userId}`, payload);
};


