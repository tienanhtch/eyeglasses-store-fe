import { api } from "@/utils/fetch-api";

export type Store = {
  id: string;
  code: string;
  name: string;
  address: string;
  phone: string;
  openHours: string;
};

// Lấy danh sách tất cả stores
export const getStores = () => {
  return api.get<Store[]>("/stores");
};

// Note: API `/stores` đã trả về danh sách store active rồi.

