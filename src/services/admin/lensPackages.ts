import { api } from "@/utils/fetch-api";

export type LensPackage = {
    id: string;
    code: string;
    name: string;
    refractiveIdx: number;
    features?: string;
    minSph: number;
    maxSph: number;
    minCyl: number;
    maxCyl: number;
    retailPrice: number;
    salePrice?: number;
    active: boolean;
};

export type LensPackageCreatePayload = {
    code: string;
    name: string;
    brand: string;
    material: string;
    refractiveIdx: number;
    retailPrice: number;
    salePrice?: number;
    features?: string[];
    description?: string;
    minSph?: number;
    maxSph?: number;
    minCyl?: number;
    maxCyl?: number;
};

// Get all lens packages
export const getLensPackages = async (): Promise<LensPackage[]> => {
    return api.get("/admin/lens-bulk/packages");
};

// Create lens package
export const createLensPackage = async (
    payload: LensPackageCreatePayload
) => {
    return api.post("/admin/lens-bulk/packages", payload);
};

// Update lens package
export const updateLensPackage = async (
    id: string,
    payload: Partial<LensPackageCreatePayload>
) => {
    return api.put(`/admin/lens-bulk/packages/${id}`, payload);
};

// Delete lens package
export const deleteLensPackage = async (id: string) => {
    return api.delete(`/admin/lens-bulk/packages/${id}`);
};

// Update lens package status
export const updateLensPackageStatus = async (
    id: string,
    active: boolean
) => {
    return api.patch(`/admin/lens-bulk/packages/${id}/status?active=${active}`);
};

// Update lens package pricing
export const updateLensPackagePricing = async (
    id: string,
    retailPrice: number,
    salePrice?: number
) => {
    const params = new URLSearchParams({ retailPrice: retailPrice.toString() });
    if (salePrice !== undefined) {
        params.append("salePrice", salePrice.toString());
    }
    return api.patch(`/admin/lens-bulk/packages/${id}/pricing?${params.toString()}`);
};
