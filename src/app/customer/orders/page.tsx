"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  CreditCard,
  MapPin,
  Phone,
  Calendar,
  Star,
  Download,
  RefreshCw,
} from "lucide-react";

const orders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "delivered",
    total: 2500000,
    items: [
      { name: "Kính cận Ray-Ban Aviator", quantity: 1, price: 2000000 },
      { name: "Tròng kính chống ánh sáng xanh", quantity: 1, price: 500000 },
    ],
    shippingAddress: "123 Đường ABC, Quận 1, TP.HCM",
    tracking: "VN123456789",
    paymentMethod: "Chuyển khoản",
    estimatedDelivery: "2024-01-18",
    actualDelivery: "2024-01-17",
    notes: "Giao hàng thành công",
  },
  {
    id: "ORD-002",
    date: "2024-01-12",
    status: "shipping",
    total: 1800000,
    items: [{ name: "Kính râm Oakley Holbrook", quantity: 1, price: 1800000 }],
    shippingAddress: "456 Đường XYZ, Quận 3, TP.HCM",
    tracking: "VN123456790",
    paymentMethod: "Thanh toán khi nhận hàng",
    estimatedDelivery: "2024-01-20",
    actualDelivery: null,
    notes: "Đang vận chuyển",
  },
  {
    id: "ORD-003",
    date: "2024-01-10",
    status: "processing",
    total: 3200000,
    items: [
      { name: "Kính cận Gucci GG0061S", quantity: 1, price: 3000000 },
      { name: "Tròng kính đa tròng", quantity: 1, price: 200000 },
    ],
    shippingAddress: "789 Đường DEF, Quận 5, TP.HCM",
    tracking: "VN123456791",
    paymentMethod: "Thẻ tín dụng",
    estimatedDelivery: "2024-01-25",
    actualDelivery: null,
    notes: "Đang xử lý",
  },
  {
    id: "ORD-004",
    date: "2024-01-08",
    status: "cancelled",
    total: 1500000,
    items: [{ name: "Kính cận Prada PR 01VS", quantity: 1, price: 1500000 }],
    shippingAddress: "101 Đường GHI, Quận 7, TP.HCM",
    tracking: null,
    paymentMethod: "Chuyển khoản",
    estimatedDelivery: "2024-01-15",
    actualDelivery: null,
    notes: "Khách hàng hủy",
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
    case "cancelled":
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-500" />;
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
    case "cancelled":
      return "bg-red-100 text-red-800";
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
    case "cancelled":
      return "Đã hủy";
    default:
      return status;
  }
};

export default function OrdersPage() {
  const [ordersList, setOrdersList] = useState(orders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const filteredOrders = ordersList.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleReorder = (orderId: string) => {
    // Logic để đặt lại đơn hàng
    console.log("Reorder order:", orderId);
  };

  const handleRateOrder = (orderId: string) => {
    // Logic để đánh giá đơn hàng
    console.log("Rate order:", orderId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Đơn hàng</h1>
          <p className="text-gray-600">
            Quản lý đơn hàng và theo dõi vận chuyển
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Package className="h-8 w-8 text-blue-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Tổng đơn hàng</p>
              <p className="text-2xl font-semibold text-gray-900">
                {ordersList.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Đã giao</p>
              <p className="text-2xl font-semibold text-gray-900">
                {
                  ordersList.filter((order) => order.status === "delivered")
                    .length
                }
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Package className="h-8 w-8 text-blue-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Đang giao</p>
              <p className="text-2xl font-semibold text-gray-900">
                {
                  ordersList.filter((order) => order.status === "shipping")
                    .length
                }
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
                {ordersList
                  .reduce((total, order) => total + order.total, 0)
                  .toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm đơn hàng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="delivered">Đã giao</option>
              <option value="shipping">Đang giao</option>
              <option value="processing">Đang xử lý</option>
              <option value="cancelled">Đã hủy</option>
            </select>
            <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              Bộ lọc
            </button>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Đơn hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày đặt
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sản phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tổng tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      #{order.id}
                    </div>
                    {order.tracking && (
                      <div className="text-sm text-gray-500">
                        Mã vận đơn: {order.tracking}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {order.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {order.items.length} sản phẩm
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.items[0]?.name}
                      {order.items.length > 1 &&
                        ` +${order.items.length - 1} khác`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₫{order.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
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
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setSelectedOrder(order.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {order.status === "delivered" && (
                        <button
                          onClick={() => handleReorder(order.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </button>
                      )}
                      {order.status === "delivered" && (
                        <button
                          onClick={() => handleRateOrder(order.id)}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          <Star className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Chi tiết đơn hàng #
                      {
                        ordersList.find((order) => order.id === selectedOrder)
                          ?.id
                      }
                    </h3>
                    <div className="space-y-6">
                      {/* Order Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Ngày đặt
                          </label>
                          <p className="mt-1 text-sm text-gray-900">
                            {
                              ordersList.find(
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
                              ordersList.find(
                                (order) => order.id === selectedOrder
                              )?.status || ""
                            )}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Phương thức thanh toán
                          </label>
                          <p className="mt-1 text-sm text-gray-900">
                            {
                              ordersList.find(
                                (order) => order.id === selectedOrder
                              )?.paymentMethod
                            }
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Tổng tiền
                          </label>
                          <p className="mt-1 text-sm text-gray-900">
                            ₫
                            {ordersList
                              .find((order) => order.id === selectedOrder)
                              ?.total.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Items */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Sản phẩm
                        </label>
                        <div className="space-y-2">
                          {ordersList
                            .find((order) => order.id === selectedOrder)
                            ?.items.map((item, index) => (
                              <div
                                key={index}
                                className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
                              >
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {item.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    Số lượng: {item.quantity}
                                  </div>
                                </div>
                                <div className="text-sm text-gray-900">
                                  ₫{item.price.toLocaleString()}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Shipping Info */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Thông tin giao hàng
                        </label>
                        <div className="p-3 bg-gray-50 rounded-md">
                          <div className="flex items-start">
                            <MapPin className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                            <div>
                              <div className="text-sm text-gray-900">
                                {
                                  ordersList.find(
                                    (order) => order.id === selectedOrder
                                  )?.shippingAddress
                                }
                              </div>
                              {ordersList.find(
                                (order) => order.id === selectedOrder
                              )?.tracking && (
                                <div className="text-sm text-gray-500 mt-1">
                                  Mã vận đơn:{" "}
                                  {
                                    ordersList.find(
                                      (order) => order.id === selectedOrder
                                    )?.tracking
                                  }
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Delivery Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Dự kiến giao hàng
                          </label>
                          <p className="mt-1 text-sm text-gray-900">
                            {
                              ordersList.find(
                                (order) => order.id === selectedOrder
                              )?.estimatedDelivery
                            }
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Thực tế giao hàng
                          </label>
                          <p className="mt-1 text-sm text-gray-900">
                            {ordersList.find(
                              (order) => order.id === selectedOrder
                            )?.actualDelivery || "Chưa giao"}
                          </p>
                        </div>
                      </div>

                      {/* Notes */}
                      {ordersList.find((order) => order.id === selectedOrder)
                        ?.notes && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Ghi chú
                          </label>
                          <p className="mt-1 text-sm text-gray-900">
                            {
                              ordersList.find(
                                (order) => order.id === selectedOrder
                              )?.notes
                            }
                          </p>
                        </div>
                      )}
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
