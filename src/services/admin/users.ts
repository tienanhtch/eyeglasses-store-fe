import { api } from "@/utils/fetch-api";

export type AdminUser = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  roles: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type FetchAdminUsersParams = {
  page?: number;
  size?: number;
  role?: string;
};

export const fetchAdminUsers = async ({
  page = 0,
  size = 20,
  role,
}: FetchAdminUsersParams = {}) => {
  const params: Record<string, string | number> = {
    page,
    size,
  };

  if (role) {
    params.role = role;
  }

  const data = await api.get<AdminUser[]>("/admin/users", {
    params,
  });

  return data;
};

export type CreateAdminUserPayload = {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  roleIds: string[];
};

export type CreateAdminUserResponse = {
  success: boolean;
  data: AdminUser;
  message: string;
};

const ROLE_IDS: Record<string, string> = {
  STAFF: "0x19c33e0a0f584f72b5a85fcc6f7a8042",
  CUSTOMER: "0x9df3d2a79d3c4b5e8b268f7d47b1cb74",
  KTV: "0xaa6fdca571824b9fb32ff4293521d5d3",
  ADMIN: "0xb90e63710c5f41dfa6a6f7f5fcb4df01",
};

export const getRoleId = (roleName: string): string | undefined => {
  return ROLE_IDS[roleName.toUpperCase()];
};

export const createAdminUser = async (payload: CreateAdminUserPayload) => {
  const response = await api.post<CreateAdminUserResponse>(
    "/admin/users",
    payload
  );
  return response;
};

// Get user by ID
export type GetAdminUserResponse = {
  success: boolean;
  data: AdminUser;
};

export const getAdminUser = async (userId: string) => {
  const response = await api.get<GetAdminUserResponse>(
    `/admin/users/${userId}`
  );
  return response;
};

// Update user
export type UpdateAdminUserPayload = {
  email?: string;
  fullName?: string;
  phone?: string;
  active?: boolean;
  password?: string;
};

export type UpdateAdminUserResponse = {
  success: boolean;
  data: AdminUser;
  message: string;
};

export const updateAdminUser = async (
  userId: string,
  payload: UpdateAdminUserPayload
) => {
  const response = await api.patch<UpdateAdminUserResponse>(
    `/admin/users/${userId}`,
    payload
  );
  return response;
};

// Delete user
export type DeleteAdminUserResponse = {
  success: boolean;
  message: string;
};

export const deleteAdminUser = async (userId: string) => {
  const response = await api.delete<DeleteAdminUserResponse>(
    `/admin/users/${userId}`
  );
  return response;
};

// Lock/Unlock user
export type LockAdminUserResponse = AdminUser;

export const lockAdminUser = async (userId: string, active: boolean) => {
  const response = await api.post<LockAdminUserResponse>(
    `/admin/users/${userId}/lock`,
    {},
    {
      params: { active: active.toString() },
    }
  );
  return response;
};

// Reset password
export type ResetPasswordResponse = {
  status: string;
};

export const resetPassword = async (userId: string, newPassword: string) => {
  const response = await api.post<ResetPasswordResponse>(
    `/admin/users/${userId}/reset-password`,
    {},
    {
      params: { newPassword },
    }
  );
  return response;
};

