import { api } from "@/utils/fetch-api";

export type Appointment = {
  id: string;
  userName: string;
  userPhone: string;
  startTime: string;
  endTime: string;
  status: "BOOKED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  note?: string;
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
};

export type AppointmentDashboard = {
  date: string;
  storeId: string;
  totalAppointments: number;
  statusCounts: {
    BOOKED: number;
    IN_PROGRESS: number;
    COMPLETED: number;
  };
  appointments: Appointment[];
};

export type CheckInRequest = {
  staffId: string;
};

export type CompleteRequest = {
  sphereRight: number;
  cylinderRight: number;
  axisRight: number;
  sphereLeft: number;
  cylinderLeft: number;
  axisLeft: number;
  pd: number;
  note?: string;
};

// Lấy danh sách lịch hẹn
export const getAppointments = (params: {
  storeId: string;
  date?: string;
  status?: string;
}) => {
  const queryParams = new URLSearchParams();
  queryParams.append("storeId", params.storeId);
  if (params.date) queryParams.append("date", params.date);
  if (params.status) queryParams.append("status", params.status);

  return api.get<Appointment[]>(`/public/staff/appointments?${queryParams.toString()}`);
};

// Chi tiết lịch hẹn
export const getAppointmentDetail = (appointmentId: string) => {
  return api.get<Appointment>(`/public/staff/appointments/${appointmentId}`);
};

// Check-in lịch hẹn
export const checkInAppointment = (appointmentId: string, staffId: string) => {
  return api.post<{
    success: boolean;
    appointmentId: string;
    status: string;
    message: string;
  }>(`/public/staff/appointments/${appointmentId}/checkin?staffId=${staffId}`, {});
};

// Hoàn thành lịch hẹn
export const completeAppointment = (appointmentId: string, data: CompleteRequest) => {
  return api.post<{
    success: boolean;
    appointmentId: string;
    prescriptionId: string;
    status: string;
    message: string;
  }>(`/public/staff/appointments/${appointmentId}/complete`, data);
};

// Hủy lịch hẹn
export const cancelAppointment = (appointmentId: string, reason: string) => {
  return api.post<{
    success: boolean;
    appointmentId: string;
    status: string;
    message: string;
  }>(`/public/staff/appointments/${appointmentId}/cancel?reason=${encodeURIComponent(reason)}`, {});
};

// Dashboard lịch hẹn
export const getAppointmentDashboard = (storeId: string, date?: string) => {
  const queryParams = new URLSearchParams();
  queryParams.append("storeId", storeId);
  if (date) queryParams.append("date", date);

  return api.get<AppointmentDashboard>(
    `/public/staff/appointments/dashboard?${queryParams.toString()}`
  );
};

