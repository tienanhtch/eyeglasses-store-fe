import { api } from "@/utils/fetch-api";

export type OrderItem = {
  id: string;
  variant: {
    sku: string;
    color: string;
  };
  qty: number;
  priceUnit: number;
  lineTotal: number;
};

export type Order = {
  id: string;
  orderNo: string; // Changed from orderNumber
  status: string;
  fulfillment: "DELIVERY" | "PICKUP";
  subtotal: number;
  shippingFee: number;
  taxTotal: number;
  discountTotal?: number;
  grandTotal: number;
  createdAt: string;
  updatedAt?: string;
  userId: string; // Changed from customer object
  customer?: { // Optional, might be filled later or separate API
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  items?: any[]; // Simplified for now
};

export type OrderListResponse = {
  content: Order[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
};

export type OrderStatusUpdatePayload = {
  status: string;
  note?: string;
};

export type ShipOrderPayload = {
  trackingNumber: string;
  shippingMethod: string;
  estimatedDelivery: string;
};

export type OrderResponse = {
  success: boolean;
  message: string;
  data: any;
};

// Lấy danh sách đơn hàng
export const getOrders = (params?: {
  page?: number;
  size?: number;
  status?: string;
}) => {
  const queryParams = new URLSearchParams();
  if (params?.page !== undefined) queryParams.append("page", params.page.toString());
  if (params?.size !== undefined) queryParams.append("size", params.size.toString());
  if (params?.status) queryParams.append("status", params.status);

  const queryString = queryParams.toString();
  return api.get<OrderListResponse>(
    `/admin/orders${queryString ? `?${queryString}` : ""}`
  );
};

// Lấy chi tiết đơn hàng
export const getOrderDetail = (id: string) => {
  return api.get<Order>(`/admin/orders/${id}`);
};

// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = (id: string, payload: OrderStatusUpdatePayload) => {
  return api.patch<OrderResponse>(`/admin/orders/${id}/status`, payload);
};

// Xử lý đơn hàng
export const processOrder = (id: string) => {
  return api.post<OrderResponse>(`/admin/orders/${id}/process`);
};

// Giao hàng
export const shipOrder = (id: string, payload: ShipOrderPayload) => {
  return api.post<OrderResponse>(`/admin/orders/${id}/ship`, payload);
};

