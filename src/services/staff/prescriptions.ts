import { api } from "@/utils/fetch-api";

export type Prescription = {
  id: string;
  sphereRight: number;
  cylinderRight: number;
  axisRight: number;
  sphereLeft: number;
  cylinderLeft: number;
  axisLeft: number;
  pd: number;
  note?: string;
  source?: "EYE_EXAM" | "EXTERNAL" | "SELF_REPORTED";
  issuedAt?: string;
  createdAt: string;
  userName?: string;
  userPhone?: string;
  customer?: {
    name: string;
    phone: string;
    email: string;
  };
};

export type PrescriptionCreateRequest = {
  sphereRight: number;
  cylinderRight: number;
  axisRight: number;
  sphereLeft: number;
  cylinderLeft: number;
  axisLeft: number;
  pd: number;
  note?: string;
};

export type CreatePrescriptionDto = PrescriptionCreateRequest & {
  userId: string;
};

export type PrescriptionValidationResult = {
  valid: boolean;
  errors: string[];
  warnings: string[];
};

export type PrescriptionReport = {
  prescriptionId: string;
  generatedAt: string;
  prescription: Prescription;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  downloadUrl: string;
};

// Lấy toa kính theo user
export const getPrescriptionsByUser = (userId: string) => {
  return api.get<Prescription[]>(`/public/staff/prescriptions/user/${userId}`);
};

// Chi tiết toa kính
export const getPrescriptionDetail = (prescriptionId: string) => {
  return api.get<Prescription>(`/public/staff/prescriptions/${prescriptionId}`);
};

// Validate toa kính
export const validatePrescription = (data: PrescriptionCreateRequest) => {
  return api.post<PrescriptionValidationResult>("/public/staff/prescriptions/validate", data);
};

// Tạo báo cáo toa kính
export const getPrescriptionReport = (prescriptionId: string) => {
  return api.get<PrescriptionReport>(`/public/staff/prescriptions/${prescriptionId}/report`);
};

// Tìm kiếm toa kính
export const getPrescriptions = (params: {
  query?: string;
  fromDate?: string;
  toDate?: string;
}) => {
  const queryParams = new URLSearchParams();
  if (params.query) queryParams.append("query", params.query);
  if (params.fromDate) queryParams.append("fromDate", params.fromDate);
  if (params.toDate) queryParams.append("toDate", params.toDate);

  return api.get<Prescription[]>(`/public/staff/prescriptions/search?${queryParams.toString()}`);
};

// Tạo toa kính mới
export const createPrescription = (data: CreatePrescriptionDto) => {
  return api.post<{
    success: boolean;
    prescriptionId: string;
    message: string;
  }>(`/public/staff/prescriptions?userId=${data.userId}`, {
    sphereRight: data.sphereRight,
    cylinderRight: data.cylinderRight,
    axisRight: data.axisRight,
    sphereLeft: data.sphereLeft,
    cylinderLeft: data.cylinderLeft,
    axisLeft: data.axisLeft,
    pd: data.pd,
    note: data.note,
  });
};

