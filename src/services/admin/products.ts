import { api } from "@/utils/fetch-api";

export type ProductVariant = {
  id: string;
  sku: string;
  color: string;
  sizeMm?: number;
  bridgeMm?: number;
  templeMm?: number;
  retailPrice: number;
  salePrice: number;
  isActive: boolean;
};

export type ProductImage = {
  id?: string;
  url: string;
  alt: string;
  sortOrder?: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description?: string;
  brand?: string;
  material?: string;
  frameShape?: string;
  seoTitle?: string;
  seoDescription?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt?: string;
  categories?: Array<{ id: string; name: string }>;
  variants?: ProductVariant[];
  images?: ProductImage[];
};

export type ProductListResponse = {
  content: Product[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
};

export type ProductCreatePayload = {
  slug: string;
  name: string;
  description?: string;
  brand?: string;
  material?: string;
  frameShape?: string;
  seoTitle?: string;
  seoDescription?: string;
  categoryIds?: string[];
};

export type ProductResponse = {
  success: boolean;
  message: string;
  data: Product;
};

export type ImageUploadResponse = {
  success: boolean;
  message: string;
  data: {
    id: string;
    url: string;
    alt: string;
    sortOrder: number;
  };
};

// Lấy danh sách sản phẩm với phân trang
export const getProducts = (params?: {
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) => {
  const queryParams = new URLSearchParams();
  if (params?.page !== undefined) queryParams.append("page", params.page.toString());
  if (params?.size !== undefined) queryParams.append("size", params.size.toString());
  if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
  if (params?.sortOrder) queryParams.append("sortOrder", params.sortOrder);

  const queryString = queryParams.toString();
  return api.get<ProductListResponse>(
    `/admin/products${queryString ? `?${queryString}` : ""}`
  );
};

// Tạo sản phẩm mới
export const createProduct = (payload: ProductCreatePayload) => {
  return api.post<ProductResponse>("/admin/products", payload);
};

// Cập nhật sản phẩm
export const updateProduct = (id: string, payload: Partial<ProductCreatePayload>) => {
  return api.patch<ProductResponse>(`/admin/products/${id}`, payload);
};

// Xóa sản phẩm
export const deleteProduct = (id: string) => {
  return api.delete<{ success: boolean; message: string }>(`/admin/products/${id}`);
};

// Upload ảnh sản phẩm
export const uploadProductImage = (formData: FormData) => {
  return api.post<ImageUploadResponse>("/admin/images/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

