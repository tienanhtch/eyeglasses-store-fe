import { api } from "@/utils/fetch-api";

export type CartVariant = {
  id: string;
  sku: string;
  color?: string | null;
  retailPrice?: number;
  salePrice?: number | null;
  productName?: string | null;
  productSlug?: string | null;
  productImageUrl?: string | null;
};

export type CartLensPackage = {
  id: string;
  code?: string | null;
  name: string;
  retailPrice?: number;
  salePrice?: number | null;
};

export type CartItem = {
  id: string;
  qty: number;
  note?: string | null;
  variant: CartVariant;
  lensPackage?: CartLensPackage;
  lineTotal: number;
};

export type Cart = {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type AddCartItemPayload = {
  variantId: string;
  qty: number;
  lensPackageId?: string | null;
  prescriptionId?: string | null;
  customPrice?: number | null;
  note?: string | null;
};

export type UpdateCartItemPayload = {
  qty?: number;
  lensPackageId?: string | null;
  customPrice?: number | null;
  note?: string | null;
};

export const getCart = (userId: string) => {
  return api.get<Cart>(`/cart?userId=${userId}`);
};

export const addCartItem = (userId: string, payload: AddCartItemPayload) => {
  return api.post<Cart>(`/cart/items?userId=${userId}`, payload);
};

export const updateCartItem = (itemId: string, payload: UpdateCartItemPayload) => {
  return api.patch<Cart>(`/cart/items/${itemId}`, payload);
};

export const removeCartItem = (itemId: string) => {
  return api.delete<Cart>(`/cart/items/${itemId}`);
};


