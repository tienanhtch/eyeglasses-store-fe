"use client";

import { useState } from "react";
import {
  Calendar,
  ShoppingBag,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Phone,
  MapPin,
  Star,
  TrendingUp,
  Package,
  CreditCard,
} from "lucide-react";

const recentOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "delivered",
    total: 2500000,
    items: 2,
    tracking: "VN123456789",
  },
  {
    id: "ORD-002",
    date: "2024-01-12",
    status: "shipping",
    total: 1800000,
    items: 1,
    tracking: "VN123456790",
  },
  {
    id: "ORD-003",
    date: "2024-01-10",
    status: "processing",
    total: 3200000,
    items: 3,
    tracking: "VN123456791",
  },
];

const upcomingAppointments = [
  {
    id: "APT-001",
    date: "2024-01-20",
    time: "09:00 - 10:00",
    type: "Đo khúc xạ",
    status: "confirmed",
    staff: "KTV Nguyễn Thị B",
  },
  {
    id: "APT-002",
    date: "2024-01-25",
    time: "14:00 - 15:00",
    type: "Tư vấn kính",
    status: "pending",
    staff: "KTV Lê Văn C",
  },
];

const recommendedProducts = [
  {
    id: "PROD-001",
    name: "Kính cận Ray-Ban Aviator",
    price: 2500000,
    image: "/images/placeholder.svg",
    rating: 4.8,
    reviews: 156,
    discount: 15,
  },
  {
    id: "PROD-002",
    name: "Kính râm Oakley Holbrook",
    price: 1800000,
    image: "/images/placeholder.svg",
    rating: 4.6,
    reviews: 89,
    discount: 0,
  },
  {
    id: "PROD-003",
    name: "Kính cận Gucci GG0061S",
    price: 3200000,
    image: "/images/placeholder.svg",
    rating: 4.9,
    reviews: 203,
    discount: 20,
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "delivered":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "shipping":
      return <Package className="h-4 w-4 text-blue-500" />;
    case "processing":
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case "confirmed":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "pending":
      return <AlertCircle className="h-4 w-4 text-orange-500" />;
    default:
      return <Clock className="h-4 w-4 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-800";
    case "shipping":
      return "bg-blue-100 text-blue-800";
    case "processing":
      return "bg-yellow-100 text-yellow-800";
    case "confirmed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "delivered":
      return "Đã giao";
    case "shipping":
      return "Đang giao";
    case "processing":
      return "Đang xử lý";
    case "confirmed":
      return "Đã xác nhận";
    case "pending":
      return "Chờ xác nhận";
    default:
      return status;
  }
};

export default function CustomerDashboard() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Tổng quan về đơn hàng, lịch hẹn và sản phẩm
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500">
            Hôm nay:{" "}
            <span className="font-medium text-gray-900">
              {new Date().toLocaleDateString("vi-VN")}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ShoppingBag className="h-8 w-8 text-blue-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Tổng đơn hàng</p>
              <p className="text-2xl font-semibold text-gray-900">
                {recentOrders.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Calendar className="h-8 w-8 text-green-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Lịch hẹn sắp tới
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {upcomingAppointments.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CreditCard className="h-8 w-8 text-purple-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Tổng chi tiêu</p>
              <p className="text-2xl font-semibold text-gray-900">
                ₫
                {recentOrders
                  .reduce((total, order) => total + order.total, 0)
                  .toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Điểm tích lũy</p>
              <p className="text-2xl font-semibold text-gray-900">1,250</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                Đơn hàng gần đây
              </h3>
              <a
                href="/customer/orders"
                className="text-sm text-blue-600 hover:text-blue-900"
              >
                Xem tất cả
              </a>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="text-sm font-medium text-gray-900">
                        #{order.id}
                      </h4>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        <span className="ml-1">
                          {getStatusText(order.status)}
                        </span>
                      </span>
                    </div>
                    <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {order.date}
                      </div>
                      <div className="flex items-center">
                        <Package className="h-3 w-3 mr-1" />
                        {order.items} sản phẩm
                      </div>
                      <div className="flex items-center">
                        <CreditCard className="h-3 w-3 mr-1" />₫
                        {order.total.toLocaleString()}
                      </div>
                    </div>
                    {order.tracking && (
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="font-medium">Mã vận đơn:</span>{" "}
                        {order.tracking}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedOrder(order.id)}
                      className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200"
                    >
                      Chi tiết
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                Lịch hẹn sắp tới
              </h3>
              <a
                href="/customer/appointments"
                className="text-sm text-blue-600 hover:text-blue-900"
              >
                Xem tất cả
              </a>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="text-sm font-medium text-gray-900">
                        {appointment.type}
                      </h4>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        {getStatusIcon(appointment.status)}
                        <span className="ml-1">
                          {getStatusText(appointment.status)}
                        </span>
                      </span>
                    </div>
                    <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {appointment.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {appointment.time}
                      </div>
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {appointment.staff}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-md hover:bg-green-200">
                      Chi tiết
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Sản phẩm đề xuất
            </h3>
            <a
              href="/products/kinh-can"
              className="text-sm text-blue-600 hover:text-blue-900"
            >
              Xem tất cả
            </a>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                    {product.name}
                  </h4>
                  <div className="mt-1 flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill={
                            i < Math.floor(product.rating)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {product.rating} ({product.reviews} đánh giá)
                    </span>
                  </div>
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="text-lg font-semibold text-gray-900">
                      ₫{product.price.toLocaleString()}
                    </span>
                    {product.discount > 0 && (
                      <span className="text-sm text-red-600 bg-red-100 px-2 py-1 rounded">
                        -{product.discount}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Chi tiết đơn hàng
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Mã đơn hàng
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {
                            recentOrders.find(
                              (order) => order.id === selectedOrder
                            )?.id
                          }
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Ngày đặt
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {
                            recentOrders.find(
                              (order) => order.id === selectedOrder
                            )?.date
                          }
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Trạng thái
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {getStatusText(
                            recentOrders.find(
                              (order) => order.id === selectedOrder
                            )?.status || ""
                          )}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Tổng tiền
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          ₫
                          {recentOrders
                            .find((order) => order.id === selectedOrder)
                            ?.total.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Số sản phẩm
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {
                            recentOrders.find(
                              (order) => order.id === selectedOrder
                            )?.items
                          }{" "}
                          sản phẩm
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
