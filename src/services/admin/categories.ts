import { api } from "@/utils/fetch-api";

export type Category = {
  id: string;
  slug: string;
  name: string;
  description?: string;
  sortOrder: number;
  active: boolean;
  parentId?: string | null;
};

export type CategoryCreatePayload = {
  slug: string;
  name: string;
  description?: string;
  sortOrder?: number;
  parentId?: string | null;
};

export type CategoryUpdatePayload = {
  name?: string;
  description?: string;
  sortOrder?: number;
};

export type CategoryResponse = {
  success: boolean;
  message: string;
  data: Category;
};

// Lấy danh sách tất cả danh mục
export const getAllCategories = () => {
  return api.get<Category[]>("/admin/categories");
};

// Tạo danh mục mới
export const createCategory = (payload: CategoryCreatePayload) => {
  return api.post<CategoryResponse>("/admin/categories", payload);
};

// Cập nhật danh mục
export const updateCategory = (id: string, payload: CategoryUpdatePayload) => {
  return api.patch<CategoryResponse>(`/admin/categories/${id}`, payload);
};

// Xóa danh mục
export const deleteCategory = (id: string) => {
  return api.delete<{ success: boolean; message: string }>(`/admin/categories/${id}`);
};

