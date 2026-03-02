import { api } from "@/utils/fetch-api";
import { getOrders, Order } from "./orders";
import { getProducts } from "./products";

export type DashboardStats = {
    totalOrders: number;
    revenue: number;
    totalCustomers: number;
    totalProducts: number;
};

// Response types from specific services
type OrderSummaryResponse = {
    total: number;
    revenue: number;
    // other fields omitted
};

type UserSummaryResponse = {
    total: number;
    customers: number;
    // other fields omitted
};

export const getDashboardStats = async (): Promise<DashboardStats> => {
    try {
        const [ordersSummary, usersSummary, productsList] = await Promise.all([
            api.get<OrderSummaryResponse>("/admin/orders-management/summary"),
            api.get<UserSummaryResponse>("/admin/users-management/summary"),
            getProducts({ size: 1 }) // Fetch 1 product just to get totalElements
        ]);

        return {
            totalOrders: ordersSummary.total || 0,
            revenue: ordersSummary.revenue || 0,
            totalCustomers: usersSummary.customers || 0, // Using customers count specifically
            totalProducts: productsList.totalElements || 0,
        };
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        // Return zeros on error to avoid breaking UI
        return {
            totalOrders: 0,
            revenue: 0,
            totalCustomers: 0,
            totalProducts: 0,
        };
    }
};

export const getRecentOrders = async (limit = 5) => {
    const response = await getOrders({
        page: 0,
        size: limit,
        // Add sorting if API supports it, e.g. sort=createdAt,desc
        // Based on AdminOrderManagementController, it uses pageable which supports sort
    });
    return response.content;
};

// Using StaffAppointmentController endpoints as they seem most relevant for listing
export const getUpcomingAppointments = async () => {
    // This is a bit tricky as we don't have a direct "all upcoming" endpoint for admin
    // We'll try to use the staff endpoint without filters or with date range if needed
    // For now, let's try to fetch for today or upcoming
    try {
        // Using a safe fallback
        return [];
        // const response = await api.get<any[]>("/public/staff/appointments", {
        //     params: { date: new Date().toISOString().split('T')[0] }
        // });
        // return response;
    } catch (error) {
        console.warn("Appointments API not fully ready", error);
        return [];
    }
};

export const getTopProducts = async () => {
    // Placeholder - Backend doesn't support this yet
    return [];
}
