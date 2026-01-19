"use client";

import { useState, useEffect } from "react";
import {
  getOrders,
  getOrderDetail,
  updateOrderStatus,
  processOrder,
  shipOrder,
  Order,
} from "@/services/admin/orders";
import { Eye, Package, Truck, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/contexts/ToastContext";

export default function AdminOrdersPage() {
  const toast = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [shipOrderId, setShipOrderId] = useState<string | null>(null);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 20;

  // Load orders
  const loadOrders = async (page = 0, status?: string) => {
    try {
      setLoading(true);
      const params: any = { page, size: pageSize };
      if (status) params.status = status;

      const data = await getOrders(params);
      setOrders(data.content);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (error) {
      console.error("Error loading orders:", error);
      toast.showError("Không thể tải danh sách đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders(0, filterStatus || undefined);
  }, [filterStatus]);

  // View order detail
  const viewOrderDetail = async (orderId: string) => {
    try {
      const data = await getOrderDetail(orderId);
      setSelectedOrder(data);
      setShowDetailModal(true);
    } catch (error) {
      console.error("Error loading order detail:", error);
      toast.showError("Không thể tải chi tiết đơn hàng");
    }
  };

  // Update status
  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, { status: newStatus });
      toast.showSuccess("Cập nhật trạng thái thành công!");
      loadOrders(currentPage, filterStatus || undefined);
      if (selectedOrder && selectedOrder.id === orderId) {
        viewOrderDetail(orderId);
      }
    } catch (error: any) {
      console.error("Error updating status:", error);
      toast.showError(error?.response?.data?.error || "Có lỗi xảy ra");
    }
  };

  // Process order
  const handleProcessOrder = async (orderId: string) => {
    try {
      await processOrder(orderId);
      toast.showSuccess("Đã bắt đầu xử lý đơn hàng!");
      loadOrders(currentPage, filterStatus || undefined);
    } catch (error: any) {
      console.error("Error processing order:", error);
      toast.showError(error?.response?.data?.error || "Có lỗi xảy ra");
    }
  };

  // Ship order
  const handleShipOrder = async () => {
    if (!shipOrderId || !trackingNumber) return;

    try {
      await shipOrder(shipOrderId, {
        trackingNumber,
        shippingMethod: "EXPRESS",
        estimatedDelivery: new Date(
          Date.now() + 3 * 24 * 60 * 60 * 1000
        ).toISOString(),
      });
      toast.showSuccess("Đã giao hàng thành công!");
      setShipOrderId(null);
      setTrackingNumber("");
      loadOrders(currentPage, filterStatus || undefined);
    } catch (error: any) {
      console.error("Error shipping order:", error);
      toast.showError(error?.response?.data?.error || "Có lỗi xảy ra");
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      PENDING: {
        label: "Chờ xử lý",
        className: "bg-yellow-100 text-yellow-800",
      },
      PROCESSING: {
        label: "Đang xử lý",
        className: "bg-blue-100 text-blue-800",
      },
      SHIPPED: {
        label: "Đã giao hàng",
        className: "bg-purple-100 text-purple-800",
      },
      DELIVERED: {
        label: "Hoàn thành",
        className: "bg-green-100 text-green-800",
      },
      CANCELLED: { label: "Đã hủy", className: "bg-red-100 text-red-800" },
    };

    const config = statusMap[status] || {
      label: status,
      className: "bg-gray-100 text-gray-800",
    };
    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${config.className}`}
      >
        {config.label}
      </span>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("vi-VN");
  };

  if (loading && orders.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg text-gray-600">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Đơn hàng</h1>
          <p className="text-sm text-gray-600 mt-1">
            Tổng số: {totalElements} đơn hàng
          </p>
        </div>

        {/* Filter */}
        <div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="PENDING">Chờ xử lý</option>
            <option value="PROCESSING">Đang xử lý</option>
            <option value="SHIPPED">Đã giao hàng</option>
            <option value="DELIVERED">Hoàn thành</option>
            <option value="CANCELLED">Đã hủy</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mã đơn hàng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Khách hàng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tổng tiền
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày đặt
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  Chưa có đơn hàng nào
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.orderNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.customer?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(order.grandTotal)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button
                      onClick={() => viewOrderDetail(order.id)}
                      className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                      title="Xem chi tiết"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    {order.status === "PENDING" && (
                      <button
                        onClick={() => handleProcessOrder(order.id)}
                        className="text-green-600 hover:text-green-800 inline-flex items-center"
                        title="Xử lý đơn hàng"
                      >
                        <Package className="h-4 w-4" />
                      </button>
                    )}
                    {order.status === "PROCESSING" && (
                      <button
                        onClick={() => setShipOrderId(order.id)}
                        className="text-purple-600 hover:text-purple-800 inline-flex items-center"
                        title="Giao hàng"
                      >
                        <Truck className="h-4 w-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-700">
                Trang <span className="font-medium">{currentPage + 1}</span> /{" "}
                <span className="font-medium">{totalPages}</span>
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() =>
                    loadOrders(currentPage - 1, filterStatus || undefined)
                  }
                  disabled={currentPage === 0}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() =>
                    loadOrders(currentPage + 1, filterStatus || undefined)
                  }
                  disabled={currentPage >= totalPages - 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-gray-900/30 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Chi tiết đơn hàng #{selectedOrder.orderNo}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Đặt ngày: {formatDate(selectedOrder.createdAt)}
                </p>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            {/* Order Info */}
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Thông tin khách hàng
                </h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Tên:</span>{" "}
                    {selectedOrder.customer?.name || "N/A"}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    <span className="font-medium">Email:</span>{" "}
                    {selectedOrder.customer?.email || "N/A"}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    <span className="font-medium">SĐT:</span>{" "}
                    {selectedOrder.customer?.phone || "N/A"}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Sản phẩm</h3>
                <div className="space-y-2">
                  {selectedOrder.items?.map((item) => (
                    <div
                      key={item.id}
                      className="bg-gray-50 p-4 rounded-md flex justify-between"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {item.nameSnapshot}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.skuSnapshot}
                        </p>
                        <p className="text-sm text-gray-600">
                          Số lượng: {item.qty}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {formatCurrency(item.lineTotal)}
                        </p>
                        <p className="text-xs text-gray-600">
                          {formatCurrency(item.priceUnit)} x {item.qty}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Tổng kết</h3>
                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Tạm tính:</span>
                    <span className="text-gray-900">
                      {formatCurrency(selectedOrder.subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Phí vận chuyển:</span>
                    <span className="text-gray-900">
                      {formatCurrency(selectedOrder.shippingFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Thuế:</span>
                    <span className="text-gray-900">
                      {formatCurrency(selectedOrder.taxTotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-300">
                    <span className="text-gray-900">Tổng cộng:</span>
                    <span className="text-gray-900">
                      {formatCurrency(selectedOrder.grandTotal)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Actions */}
              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Cập nhật trạng thái
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {selectedOrder.status === "PENDING" && (
                    <button
                      onClick={() =>
                        handleUpdateStatus(selectedOrder.id, "PROCESSING")
                      }
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Xử lý đơn hàng
                    </button>
                  )}
                  {selectedOrder.status === "PROCESSING" && (
                    <button
                      onClick={() =>
                        handleUpdateStatus(selectedOrder.id, "SHIPPED")
                      }
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                    >
                      Đã giao cho vận chuyển
                    </button>
                  )}
                  {selectedOrder.status === "SHIPPED" && (
                    <button
                      onClick={() =>
                        handleUpdateStatus(selectedOrder.id, "DELIVERED")
                      }
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Đã giao hàng
                    </button>
                  )}
                  {selectedOrder.status !== "CANCELLED" &&
                    selectedOrder.status !== "DELIVERED" && (
                      <button
                        onClick={() =>
                          handleUpdateStatus(selectedOrder.id, "CANCELLED")
                        }
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Hủy đơn hàng
                      </button>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shipping Tracking Number Modal */}
      {shipOrderId && (
        <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Giao hàng
            </h3>
            <p className="text-gray-600 mb-4">
              Nhập mã vận đơn để giao hàng:
            </p>
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 mb-6"
              placeholder="Nhập mã vận đơn"
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => { setShipOrderId(null); setTrackingNumber(""); }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleShipOrder}
                disabled={!trackingNumber}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
