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
  published: boolean;
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
  url: string;
  filename: string;
};

export type AddImagePayload = {
  url: string;
  alt?: string;
  sortOrder?: number;
};

export type AddImageResponse = {
  id: string;
  url: string;
  alt: string;
  sortOrder: number;
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

// Lấy chi tiết sản phẩm (bao gồm images và variants)
export const getProductDetail = (id: string) => {
  return api.get<Product>(`/admin/products/${id}`);
};

// Upload file ảnh lên server, trả về URL
export const uploadProductImage = (file: File, folder = "products") => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);
  return api.post<ImageUploadResponse>("/admin/images/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Gắn ảnh vào sản phẩm (sau khi đã upload xong và có URL)
export const addProductImage = (productId: string, payload: AddImagePayload) => {
  return api.post<AddImageResponse>(`/admin/products/${productId}/images`, payload);
};

// Xóa ảnh khỏi sản phẩm
export const deleteProductImage = (imageId: string) => {
  return api.delete<{ status: string }>(`/admin/images/${imageId}`);
};

// ---- Variant Management ----

export type VariantCreatePayload = {
  sku: string;
  color?: string;
  sizeMm?: number;
  bridgeMm?: number;
  templeMm?: number;
  retailPrice: number;
  salePrice?: number;
  isActive?: boolean;
};

// Thêm variant vào sản phẩm
export const addVariant = (productId: string, payload: VariantCreatePayload) => {
  return api.post<ProductVariant>(`/admin/products/${productId}/variants`, payload);
};

// Cập nhật variant
export const updateVariant = (variantId: string, payload: Partial<VariantCreatePayload>) => {
  return api.patch<ProductVariant>(`/admin/variants/${variantId}`, payload);
};

// Xóa variant
export const deleteVariant = (variantId: string) => {
  return api.delete<{ status: string }>(`/admin/variants/${variantId}`);
};

// ---- Inventory Management ----

export type SetStockPayload = {
  storeId: string;
  variantId: string;
  onHand: number;
  reserved?: number;
};

export type InventoryRecord = {
  id: string;
  storeId: string;
  variantId: string;
  onHand: number;
  reserved: number;
};

// Set số lượng tồn kho (upsert)
export const setInventoryStock = (payload: SetStockPayload) => {
  return api.post<InventoryRecord>("/admin/inventory/set", payload);
};


