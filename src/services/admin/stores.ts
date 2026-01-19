import { api } from "@/utils/fetch-api";

export type Store = {
  id: string;
  code: string;
  name: string;
  address: string;
  lat?: number;
  lng?: number;
  phone: string;
  openHours: string;
  active: boolean; // Renamed from isActive
};

export type StoreCreatePayload = {
  code: string;
  name: string;
  address: string;
  lat?: number;
  lng?: number;
  phone: string;
  openHours: string;
};

export type StoreResponse = {
  success: boolean;
  message: string;
  data: Store;
};

// Lấy danh sách cửa hàng
export const getStores = () => {
  return api.get<Store[]>("/admin/stores");
};

// Tạo cửa hàng mới
export const createStore = (payload: StoreCreatePayload) => {
  return api.post<StoreResponse>("/admin/stores", payload);
};

// Cập nhật cửa hàng
export const updateStore = (id: string, payload: Partial<StoreCreatePayload>) => {
  return api.patch<StoreResponse>(`/admin/stores/${id}`, payload);
};

// Xóa cửa hàng
export const deleteStore = (id: string) => {
  return api.delete<{ success: boolean; message: string }>(`/admin/stores/${id}`);
};

