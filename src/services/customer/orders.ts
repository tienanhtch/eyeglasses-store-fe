import { api } from "@/utils/fetch-api";

export type OrderItem = {
  id: string;
  nameSnapshot: string;
  skuSnapshot: string;
  priceUnit: number;
  qty: number;
  lineTotal: number;
};

export type Order = {
  id: string;
  orderNo: string;
  status: string;
  fulfillment: string;
  subtotal: number;
  discountTotal?: number | null;
  shippingFee?: number | null;
  taxTotal?: number | null;
  grandTotal: number;
  createdAt: string;
  updatedAt?: string | null;
  items: OrderItem[];
};

export type CheckoutPayload = {
  shippingAddressId?: string | null;
  billingAddressId?: string | null;
  fulfillment?: "DELIVERY" | "PICKUP";
  storeId?: string | null;
};

export const listOrders = (userId: string) => {
  return api.get<Order[]>(`/orders?userId=${userId}`);
};

export const getOrderDetail = (orderId: string) => {
  return api.get<Order>(`/orders/${orderId}`);
};

// Backend hiện tại nhận checkout params qua query string (không nhận body)
export const checkout = (userId: string, payload: CheckoutPayload) => {
  const query = new URLSearchParams();
  if (payload.shippingAddressId) query.append("shippingAddressId", payload.shippingAddressId);
  if (payload.billingAddressId) query.append("billingAddressId", payload.billingAddressId);
  if (payload.fulfillment) query.append("fulfillment", payload.fulfillment);
  if (payload.storeId) query.append("storeId", payload.storeId);

  const qs = query.toString();
  return api.post<Order>(`/orders/checkout?userId=${userId}${qs ? `&${qs}` : ""}`);
};


