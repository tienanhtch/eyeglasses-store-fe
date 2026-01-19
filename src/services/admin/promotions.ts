import { api } from "@/utils/fetch-api";

export type PromotionType = "percentage" | "fixed" | "free_shipping";

export type Promotion = {
    id: string;
    code: string;
    name: string;
    description?: string;
    type: PromotionType;
    value: number;
    startDate: string;
    endDate: string;
    minOrderAmount?: number;
    maxDiscountAmount?: number;
    usageLimit?: number;
    usedCount: number;
    active: boolean; // Renamed from isActive
    createdAt?: string;
    updatedAt?: string;
};

export type PromotionCreatePayload = {
    code: string;
    name: string;
    description?: string;
    type: PromotionType;
    value: number;
    startDate: string;
    endDate: string;
    minOrderAmount?: number;
    maxDiscountAmount?: number;
    usageLimit?: number;
    active?: boolean;
};

// Get all promotions with pagination
export const getPromotions = async (page = 0, size = 20) => {
    return api.get<any>(`/admin/promotions?page=${page}&size=${size}`);
};

// Create new promotion
export const createPromotion = async (payload: PromotionCreatePayload) => {
    return api.post("/admin/promotions", payload);
};

// Update promotion
export const updatePromotion = async (
    id: string,
    payload: Partial<PromotionCreatePayload>
) => {
    return api.patch(`/admin/promotions/${id}`, payload);
};

// Toggle promotion status
export const togglePromotionStatus = async (id: string, active: boolean) => {
    return api.patch(`/admin/promotions/${id}/toggle?active=${active}`);
};

// Delete promotion
export const deletePromotion = async (id: string) => {
    return api.delete(`/admin/promotions/${id}`);
};

// Get promotion summary statistics
export const getPromotionSummary = async () => {
    return api.get<any>("/admin/promotions/summary");
};
