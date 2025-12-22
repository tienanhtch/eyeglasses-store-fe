"use client";

import { useState, useEffect } from "react";
import {
  getServiceTickets,
  updateServiceTicket,
  ServiceTicket,
  ServiceTicketUpdateDto,
} from "@/services/staff/service-tickets";
import { getStores, Store } from "@/services/stores";
import { FileText, Clock, User, Phone, CheckCircle, AlertCircle } from "lucide-react";

export default function StaffServiceTicketsPage() {
  const [tickets, setTickets] = useState<ServiceTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [selectedTicket, setSelectedTicket] = useState<ServiceTicket | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const storeList = await getStores();
        setStores(storeList);
        if (storeList.length > 0) {
          setSelectedStoreId(storeList[0].id);
        }
      } catch (error) {
        console.error("Error loading stores:", error);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (!selectedStoreId) return;
    loadTickets();
  }, [selectedStoreId, statusFilter]);

  const loadTickets = async () => {
    try {
      setLoading(true);
      if (!selectedStoreId) return;
      const params: any = { storeId: selectedStoreId };
      if (statusFilter) params.status = statusFilter;

      const data = await getServiceTickets(params);
      setTickets(data);
    } catch (error) {
      console.error("Error loading tickets:", error);
      alert("Không thể tải danh sách phiếu dịch vụ");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTicket = async (
    ticketId: string,
    updates: ServiceTicketUpdateDto
  ) => {
    try {
      await updateServiceTicket(ticketId, updates);
      alert("Cập nhật thành công!");
      setShowDetailModal(false);
      loadTickets();
    } catch (error: any) {
      console.error("Error updating ticket:", error);
      alert(error?.response?.data?.error || "Có lỗi xảy ra");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Phiếu dịch vụ</h1>
        <p className="mt-1 text-sm text-gray-500">
          Quản lý phiếu yêu cầu sửa chữa và bảo hành kính
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cửa hàng
            </label>
            <select
              value={selectedStoreId}
              onChange={(e) => setSelectedStoreId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">-- Chọn cửa hàng --</option>
              {stores.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trạng thái
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tất cả</option>
              <option value="REQUESTED">Yêu cầu</option>
              <option value="RECEIVED">Đã nhận</option>
              <option value="PROCESSING">Đang xử lý</option>
              <option value="ESTIMATE">Báo giá</option>
              <option value="DONE">Hoàn thành</option>
              <option value="CANCELLED">Đã hủy</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={loadTickets}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              disabled={!selectedStoreId}
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Danh sách phiếu ({tickets.length})
          </h2>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {tickets.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                Không có phiếu dịch vụ nào
              </div>
            ) : (
              tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedTicket(ticket);
                    setShowDetailModal(true);
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <FileText className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            #{ticket.ticketNumber}
                          </h3>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                            <span className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              {ticket.customerName}
                            </span>
                            <span className="flex items-center">
                              <Phone className="h-4 w-4 mr-1" />
                              {ticket.customerPhone}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {new Date(ticket.createdAt).toLocaleDateString(
                                "vi-VN"
                              )}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-gray-600">
                            <strong>Loại dịch vụ:</strong>{" "}
                            {ticket.serviceType === "REPAIR" && "Sửa chữa"}
                            {ticket.serviceType === "WARRANTY" && "Bảo hành"}
                            {ticket.serviceType === "ADJUSTMENT" && "Chỉnh sửa"}
                            {ticket.serviceType === "CLEANING" && "Vệ sinh"}
                          </p>
                          <p className="mt-1 text-sm text-gray-600">
                            <strong>Mô tả:</strong> {ticket.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          ticket.status === "REQUESTED"
                            ? "bg-yellow-100 text-yellow-800"
                            : ticket.status === "RECEIVED"
                            ? "bg-indigo-100 text-indigo-800"
                            : ticket.status === "PROCESSING"
                            ? "bg-blue-100 text-blue-800"
                            : ticket.status === "ESTIMATE"
                            ? "bg-orange-100 text-orange-800"
                            : ticket.status === "DONE"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {ticket.status === "REQUESTED" && "Yêu cầu"}
                        {ticket.status === "RECEIVED" && "Đã nhận"}
                        {ticket.status === "PROCESSING" && "Đang xử lý"}
                        {ticket.status === "ESTIMATE" && "Báo giá"}
                        {ticket.status === "DONE" && "Hoàn thành"}
                        {ticket.status === "CANCELLED" && "Đã hủy"}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedTicket && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowDetailModal(false)}
            ></div>

            <div className="relative bg-white rounded-lg max-w-2xl w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Chi tiết phiếu dịch vụ #{selectedTicket.ticketNumber}
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Khách hàng
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedTicket.customerName}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Số điện thoại
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedTicket.customerPhone}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Loại dịch vụ
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedTicket.serviceType === "REPAIR" && "Sửa chữa"}
                      {selectedTicket.serviceType === "WARRANTY" && "Bảo hành"}
                      {selectedTicket.serviceType === "ADJUSTMENT" &&
                        "Chỉnh sửa"}
                      {selectedTicket.serviceType === "CLEANING" && "Vệ sinh"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Trạng thái
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedTicket.status === "REQUESTED" && "Yêu cầu"}
                      {selectedTicket.status === "RECEIVED" && "Đã nhận"}
                      {selectedTicket.status === "PROCESSING" && "Đang xử lý"}
                      {selectedTicket.status === "ESTIMATE" && "Báo giá"}
                      {selectedTicket.status === "DONE" && "Hoàn thành"}
                      {selectedTicket.status === "CANCELLED" && "Đã hủy"}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mô tả vấn đề
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedTicket.description || "Không có"}
                  </p>
                </div>

                {selectedTicket.resolutionNote && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Ghi chú xử lý
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedTicket.resolutionNote}
                    </p>
                  </div>
                )}

                {selectedTicket.estimatedCost && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Chi phí ước tính
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedTicket.estimatedCost.toLocaleString("vi-VN")} đ
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Ngày tạo
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(selectedTicket.createdAt).toLocaleString(
                        "vi-VN"
                      )}
                    </p>
                  </div>
                  {selectedTicket.resolvedAt && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Ngày hoàn thành
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(selectedTicket.resolvedAt).toLocaleString(
                          "vi-VN"
                        )}
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Đóng
                  </button>

                  {selectedTicket.status === "REQUESTED" && (
                    <button
                      onClick={() =>
                        handleUpdateTicket(selectedTicket.id, {
                          status: "RECEIVED",
                        })
                      }
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Tiếp nhận
                    </button>
                  )}

                  {selectedTicket.status === "RECEIVED" && (
                    <button
                      onClick={() =>
                        handleUpdateTicket(selectedTicket.id, {
                          status: "PROCESSING",
                        })
                      }
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Bắt đầu xử lý
                    </button>
                  )}

                  {selectedTicket.status === "PROCESSING" && (
                    <>
                      <button
                        onClick={() => {
                          const note = prompt("Nhập ghi chú xử lý:");
                          if (note) {
                            handleUpdateTicket(selectedTicket.id, {
                              status: "DONE",
                              resolutionNote: note,
                            });
                          }
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Hoàn thành
                      </button>
                      <button
                        onClick={() => {
                          const reason = prompt("Nhập lý do hủy:");
                          if (reason) {
                            handleUpdateTicket(selectedTicket.id, {
                              status: "CANCELLED",
                              resolutionNote: reason,
                            });
                          }
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Hủy
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

