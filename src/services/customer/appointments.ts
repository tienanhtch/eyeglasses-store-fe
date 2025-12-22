import { api } from "@/utils/fetch-api";

export type AppointmentSlot = {
  start: string;
  end: string;
  available: boolean;
};

export type CustomerAppointment = {
  id: string;
  storeId: string;
  userId: string;
  startTime: string;
  endTime: string;
  status: string;
  note?: string | null;
};

export type BookAppointmentPayload = {
  userId: string;
  storeId: string;
  start: string;
  end: string;
  note?: string | null;
};

export const getStoreSlots = (storeId: string, date: string) => {
  return api.get<AppointmentSlot[]>(`/stores/${storeId}/slots?date=${date}`);
};

export const bookAppointment = (payload: BookAppointmentPayload) => {
  return api.post<CustomerAppointment>("/appointments", payload);
};

export const listMyAppointments = (userId: string) => {
  return api.get<CustomerAppointment[]>(`/appointments?userId=${userId}`);
};

export const cancelAppointment = (appointmentId: string) => {
  return api.delete<CustomerAppointment>(`/appointments/${appointmentId}`);
};


