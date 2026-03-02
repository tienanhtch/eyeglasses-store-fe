"use client";

import { useState, useEffect } from "react";
import {
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  Eye,
  Store,
  DollarSign,
  Calendar,
} from "lucide-react";
import { 
  getDashboardStats, 
  getRecentOrders, 
  DashboardStats 
} from "@/services/admin/dashboard";
import { getOrders, Order } from "@/services/admin/orders";
import { formatCurrency } from "@/utils/format";
import { format, subDays } from "date-fns";
import { vi } from "date-fns/locale";
import { useRouter } from "next/navigation";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


export default function AdminDashboard() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState("7days");
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [statusData, setStatusData] = useState<any[]>([]);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Helper to safely fetch orders without breaking Promise.all
        const safeGetOrders = async (params: any) => {
          try {
             return await getOrders(params);
          } catch (e) {
             console.error("Error fetching orders:", params, e);
             return { totalElements: 0, content: [] };
          }
        };

        const safeGetStats = async () => {
            try {
                return await getDashboardStats();
            } catch (e) {
                console.error("Error fetching stats:", e);
                return { totalOrders: 0, revenue: 0, totalCustomers: 0, totalProducts: 0 };
            }
        };

        const [statsData, ordersData, pending, shipped, delivered, completed, cancelled, recentList] = await Promise.all([
          safeGetStats(),
          safeGetOrders({ size: 5 }),
          safeGetOrders({ size: 1, status: 'PENDING' }),
          safeGetOrders({ size: 1, status: 'SHIPPED' }),
          safeGetOrders({ size: 1, status: 'DELIVERED' }),
          safeGetOrders({ size: 1, status: 'COMPLETED' }),
          safeGetOrders({ size: 1, status: 'CANCELLED' }),
          safeGetOrders({ size: 100 })
        ]);
        
        setStats(statsData);
        // ordersData.content might be undefined if safeGetOrders returns default struct with empty content, but our helper ensures it returns {content: []}
        // However getOrders returns OrderListResponse which has content.
        // Let's ensure types.
        setRecentOrders(ordersData?.content || []);

        // Process Status Data
        setStatusData([
          { name: 'Chờ xử lý', value: pending?.totalElements || 0, color: '#EAB308' },
          { name: 'Đang giao', value: shipped?.totalElements || 0, color: '#3B82F6' },
          { name: 'Đã giao', value: delivered?.totalElements || 0, color: '#10B981' }, // Added Delivered
          { name: 'Hoàn thành', value: completed?.totalElements || 0, color: '#22C55E' },
          { name: 'Đã hủy', value: cancelled?.totalElements || 0, color: '#EF4444' },
        ]);

        // Process Revenue Data (Last 7 days)
        const revenueMap = new Map<string, number>();
        for (let i = 6; i >= 0; i--) {
            const d = subDays(new Date(), i);
            const dateStr = format(d, 'dd/MM');
            revenueMap.set(dateStr, 0);
        }

        if (recentList?.content) {
            recentList.content.forEach((order: any) => {
                if (order.status !== 'CANCELLED') {
                    const dateStr = format(new Date(order.createdAt), 'dd/MM');
                    if (revenueMap.has(dateStr)) {
                        revenueMap.set(dateStr, (revenueMap.get(dateStr) || 0) + order.grandTotal);
                    }
                }
            });
        }
        setRevenueData(Array.from(revenueMap.entries()).map(([name, value]) => ({ name, value })));

      } catch (error) {
        console.error("Critical failure loading dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statsList = [
    {
      name: "Tổng đơn hàng",
      value: stats?.totalOrders.toString() || "0",
      change: "0%",
      changeType: "neutral",
      icon: ShoppingCart,
    },
    {
      name: "Sản phẩm",
      value: stats?.totalProducts.toString() || "0",
      change: "0%",
      changeType: "neutral",
      icon: Package,
    },
    {
      name: "Khách hàng",
      value: stats?.totalCustomers.toString() || "0",
      change: "0%",
      changeType: "neutral",
      icon: Users,
    },
    {
      name: "Doanh thu",
      value: formatCurrency(stats?.revenue || 0),
      change: "0%",
      changeType: "neutral",
      icon: DollarSign,
    },
  ];

  if (loading) {
      return (
          <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
      );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Tổng quan hoạt động cửa hàng</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7days">7 ngày qua</option>
            <option value="30days">30 ngày qua</option>
            <option value="90days">90 ngày qua</option>
            <option value="1year">1 năm qua</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsList.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon className="h-8 w-8 text-gray-400" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-500">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution - Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Trạng thái đơn hàng</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: { name?: string; percent?: number }) => `${name ?? ''} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Trend - Line Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Doanh thu 7 ngày qua</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value: number) => `${value / 1000}k`} />
                <Tooltip formatter={(value: number | undefined) => formatCurrency(value ?? 0)} />
                <Legend />
                <Line type="monotone" dataKey="value" name="Doanh thu" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Đơn hàng gần đây
            </h3>
            <button 
              onClick={() => router.push('/admin/orders')}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Xem tất cả
            </button>
          </div>
          <div className="space-y-4">
             {recentOrders.length === 0 ? (
                <p className="text-center text-gray-500 py-4">Chưa có đơn hàng nào</p>
            ) : (
                recentOrders.map((order) => (
                <div
                    key={order.id}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                >
                    <div className="flex-1">
                    <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-900">
                        {order.orderNo}
                        </span>
                        <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === "COMPLETED"
                            ? "bg-green-100 text-green-800"
                            : order.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "SHIPPED"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                        >
                        {order.status}
                        </span>
                    </div>
                    <p className="text-sm text-gray-600">
                        {order.customer?.name || "Khách lẻ"}
                    </p>
                    <p className="text-sm text-gray-500">
                         {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm", { locale: vi })}
                    </p>
                    </div>
                    <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(order.grandTotal)}
                    </p>
                    </div>
                </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
