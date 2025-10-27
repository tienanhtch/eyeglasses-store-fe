"use client";

import { useState } from "react";
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

const stats = [
  {
    name: "Tổng đơn hàng",
    value: "1,234",
    change: "+12%",
    changeType: "positive",
    icon: ShoppingCart,
  },
  {
    name: "Sản phẩm",
    value: "456",
    change: "+8%",
    changeType: "positive",
    icon: Package,
  },
  {
    name: "Khách hàng",
    value: "2,890",
    change: "+15%",
    changeType: "positive",
    icon: Users,
  },
  {
    name: "Doanh thu",
    value: "₫125.4M",
    change: "+23%",
    changeType: "positive",
    icon: DollarSign,
  },
];

const recentOrders = [
  {
    id: "#ORD-001",
    customer: "Nguyễn Văn A",
    product: "Kính cận Ray-Ban",
    amount: "₫2,500,000",
    status: "Đang xử lý",
    date: "2024-01-15",
  },
  {
    id: "#ORD-002",
    customer: "Trần Thị B",
    product: "Kính râm Gucci",
    amount: "₫3,200,000",
    status: "Đã giao",
    date: "2024-01-14",
  },
  {
    id: "#ORD-003",
    customer: "Lê Văn C",
    product: "Gói tròng cao cấp",
    amount: "₫1,800,000",
    status: "Chờ xác nhận",
    date: "2024-01-13",
  },
  {
    id: "#ORD-004",
    customer: "Phạm Thị D",
    product: "Kính cận + Tròng",
    amount: "₫4,500,000",
    status: "Đang giao",
    date: "2024-01-12",
  },
];

const upcomingAppointments = [
  {
    id: "APT-001",
    customer: "Nguyễn Văn E",
    store: "Cửa hàng Quận 1",
    time: "14:00 - 15:00",
    date: "2024-01-16",
    type: "Đo khúc xạ",
  },
  {
    id: "APT-002",
    customer: "Trần Thị F",
    store: "Cửa hàng Quận 3",
    time: "10:00 - 11:00",
    date: "2024-01-16",
    type: "Tư vấn kính",
  },
  {
    id: "APT-003",
    customer: "Lê Văn G",
    store: "Cửa hàng Quận 7",
    time: "16:00 - 17:00",
    date: "2024-01-17",
    type: "Đo khúc xạ",
  },
];

const topProducts = [
  {
    name: "Kính cận Ray-Ban RB3025",
    sales: 45,
    revenue: "₫112.5M",
    growth: "+12%",
  },
  {
    name: "Kính râm Gucci GG0061S",
    sales: 32,
    revenue: "₫89.6M",
    growth: "+8%",
  },
  {
    name: "Gói tròng Essilor Varilux",
    sales: 28,
    revenue: "₫67.2M",
    growth: "+15%",
  },
  {
    name: "Kính cận Oakley OO9208",
    sales: 24,
    revenue: "₫48.0M",
    growth: "+5%",
  },
];

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("7days");

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
        {stats.map((stat) => {
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
              <div className="mt-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    stat.changeType === "positive"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  so với tháng trước
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Đơn hàng gần đây
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              Xem tất cả
            </button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-900">
                      {order.id}
                    </span>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "Đã giao"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Đang xử lý"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "Đang giao"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                  <p className="text-sm text-gray-500">{order.product}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {order.amount}
                  </p>
                  <p className="text-xs text-gray-500">{order.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Lịch hẹn sắp tới
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              Xem tất cả
            </button>
          </div>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-900">
                      {appointment.id}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {appointment.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {appointment.customer}
                  </p>
                  <p className="text-sm text-gray-500">{appointment.store}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {appointment.time}
                  </p>
                  <p className="text-xs text-gray-500">{appointment.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Sản phẩm bán chạy
          </h3>
          <button className="text-sm text-blue-600 hover:text-blue-800">
            Xem tất cả
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sản phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số lượng bán
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doanh thu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tăng trưởng
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topProducts.map((product, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.sales}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.revenue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="text-green-600">{product.growth}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
