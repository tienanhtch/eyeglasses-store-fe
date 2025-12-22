import { api } from "@/utils/fetch-api";

export type ServiceTicket = {
  id: string;
  ticketNumber: string;
  status: "REQUESTED" | "RECEIVED" | "PROCESSING" | "ESTIMATE" | "DONE" | "CANCELLED";
  serviceType: "WARRANTY" | "REPAIR" | "CLEANING" | "ADJUSTMENT";
  description: string;
  createdAt: string;
  estimatedCompletion?: string;
  customerName: string;
  customerPhone: string;
  storeName: string;
  customer?: {
    name: string;
    phone: string;
    email: string;
  };
  store?: {
    id: string;
    name: string;
    address: string;
  };
  conditionNotes?: string;
  imageUrls?: string[];
  processNotes?: string;
  estimatedCost?: number;
  estimatedTime?: string;
  materials?: string;
  completionNotes?: string;
  finalCost?: number;
};

export type ServiceTicketDashboard = {
  storeId: string;
  totalTickets: number;
  statusCounts: {
    REQUESTED: number;
    RECEIVED: number;
    PROCESSING: number;
    ESTIMATE: number;
    DONE: number;
  };
  recentTickets: ServiceTicket[];
};

export type ReceiveTicketRequest = {
  conditionNotes: string;
  imageUrls?: string[];
};

export type WalkInTicketRequest = {
  customerName: string;
  customerPhone: string;
  serviceType: "WARRANTY" | "REPAIR" | "CLEANING" | "ADJUSTMENT";
  description: string;
  conditionNotes?: string;
};

// Lấy danh sách service tickets
export const getServiceTickets = (params: {
  storeId: string;
  status?: string;
}) => {
  const queryParams = new URLSearchParams();
  queryParams.append("storeId", params.storeId);
  if (params.status) queryParams.append("status", params.status);

  return api.get<ServiceTicket[]>(`/public/staff/service-tickets?${queryParams.toString()}`);
};

// Chi tiết service ticket
export const getServiceTicketDetail = (ticketId: string) => {
  return api.get<ServiceTicket>(`/public/staff/service-tickets/${ticketId}`);
};

// Tiếp nhận service ticket
export const receiveTicket = (ticketId: string, staffId: string, data: ReceiveTicketRequest) => {
  return api.post<{
    success: boolean;
    ticketId: string;
    status: string;
    message: string;
    conditionNotes: string;
    imageUrls?: string[];
  }>(`/public/staff/service-tickets/${ticketId}/receive?staffId=${staffId}`, data);
};

// Bắt đầu xử lý
export const startProcessing = (
  ticketId: string,
  staffId: string,
  processNotes?: string
) => {
  const queryParams = new URLSearchParams();
  queryParams.append("staffId", staffId);
  if (processNotes) queryParams.append("processNotes", processNotes);

  return api.post<{
    success: boolean;
    ticketId: string;
    status: string;
    message: string;
  }>(`/public/staff/service-tickets/${ticketId}/start-processing?${queryParams.toString()}`, {});
};

// Ước lượng chi phí
export const estimateTicket = (
  ticketId: string,
  estimatedCost: number,
  estimatedTime: string,
  materials?: string
) => {
  const queryParams = new URLSearchParams();
  queryParams.append("estimatedCost", estimatedCost.toString());
  queryParams.append("estimatedTime", estimatedTime);
  if (materials) queryParams.append("materials", materials);

  return api.post<{
    success: boolean;
    ticketId: string;
    status: string;
    estimatedCost: number;
    estimatedTime: string;
    materials?: string;
    message: string;
  }>(`/public/staff/service-tickets/${ticketId}/estimate?${queryParams.toString()}`, {});
};

// Hoàn thành service
export const completeTicket = (
  ticketId: string,
  staffId: string,
  completionNotes: string,
  finalCost: number
) => {
  const queryParams = new URLSearchParams();
  queryParams.append("staffId", staffId);
  queryParams.append("completionNotes", completionNotes);
  queryParams.append("finalCost", finalCost.toString());

  return api.post<{
    success: boolean;
    ticketId: string;
    status: string;
    finalCost: number;
    message: string;
  }>(`/public/staff/service-tickets/${ticketId}/complete?${queryParams.toString()}`, {});
};

// Tạo ticket walk-in
export const createWalkInTicket = (storeId: string, data: WalkInTicketRequest) => {
  return api.post<{
    success: boolean;
    ticketId: string;
    ticketNumber: string;
    status: string;
    customerName: string;
    customerPhone: string;
    message: string;
  }>(`/public/staff/service-tickets/walk-in?storeId=${storeId}`, data);
};

// Dashboard service tickets
export const getServiceTicketDashboard = (storeId: string) => {
  return api.get<ServiceTicketDashboard>(
    `/public/staff/service-tickets/dashboard?storeId=${storeId}`
  );
};

// Update ticket status
export type ServiceTicketUpdateDto = {
  status?: string;
  resolutionNote?: string;
};

export const updateServiceTicket = (ticketId: string, updates: ServiceTicketUpdateDto) => {
  const queryParams = new URLSearchParams();
  if (updates.status) queryParams.append("newStatus", updates.status);
  if (updates.resolutionNote) queryParams.append("notes", updates.resolutionNote);

  return api.patch<{
    success: boolean;
    ticketId: string;
    status: string;
    message: string;
  }>(`/public/staff/service-tickets/${ticketId}/status?${queryParams.toString()}`, {});
};

