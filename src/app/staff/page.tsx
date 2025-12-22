"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getAppointmentDashboard,
  AppointmentDashboard,
} from "@/services/staff/appointments";
import {
  getServiceTicketDashboard,
  ServiceTicketDashboard,
} from "@/services/staff/service-tickets";
import { getStores, Store } from "@/services/stores";
import {
  Calendar,
  Wrench,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

export default function StaffDashboardPage() {
  const [appointmentDashboard, setAppointmentDashboard] =
    useState<AppointmentDashboard | null>(null);
  const [ticketDashboard, setTicketDashboard] =
    useState<ServiceTicketDashboard | null>(null);
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Load stores on mount (only once)
  useEffect(() => {
    loadStores();
  }, []);

  // Load dashboard when store or date changes
  useEffect(() => {
    if (selectedStoreId) {
      loadDashboard();
    }
  }, [selectedStoreId, selectedDate]);

  const loadStores = async () => {
    try {
      const storeList = await getStores();
      setStores(storeList);
      // Auto-select first store
      if (storeList.length > 0) {
        setSelectedStoreId(storeList[0].id);
      }
    } catch (error) {
      console.error("Error loading stores:", error);
      alert("Không thể tải danh sách cửa hàng");
    }
  };

  const loadDashboard = async () => {
    if (!selectedStoreId) return;

    try {
      setLoading(true);
      const [appointments, tickets] = await Promise.all([
        getAppointmentDashboard(selectedStoreId, selectedDate),
        getServiceTicketDashboard(selectedStoreId),
      ]);
      setAppointmentDashboard(appointments);
      setTicketDashboard(tickets);
    } catch (error) {
      console.error("Error loading dashboard:", error);
      // Don't alert for every error, just log it
      console.error("Dashboard load failed. Please check store ID and backend.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard - Kỹ thuật viên
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Tổng quan lịch hẹn và phiếu dịch vụ
          </p>
        </div>
      </div>

      {/* Store & Date Selector */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chọn cửa hàng
            </label>
            <select
              value={selectedStoreId}
              onChange={(e) => setSelectedStoreId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">-- Chọn cửa hàng --</option>
              {stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngày
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>


      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Appointments Today */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Lịch hẹn hôm nay</p>
              <p className="text-2xl font-semibold text-gray-900">
                {appointmentDashboard?.totalAppointments || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Booked Appointments */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Chờ check-in</p>
              <p className="text-2xl font-semibold text-gray-900">
                {appointmentDashboard?.statusCounts.BOOKED || 0}
              </p>
            </div>
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Đang thực hiện</p>
              <p className="text-2xl font-semibold text-gray-900">
                {appointmentDashboard?.statusCounts.IN_PROGRESS || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Hoàn thành</p>
              <p className="text-2xl font-semibold text-gray-900">
                {appointmentDashboard?.statusCounts.COMPLETED || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Service Tickets Stats */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Phiếu dịch vụ</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {ticketDashboard?.totalTickets || 0}
              </p>
              <p className="text-sm text-gray-600 mt-1">Tổng số</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {ticketDashboard?.statusCounts.REQUESTED || 0}
              </p>
              <p className="text-sm text-gray-600 mt-1">Yêu cầu mới</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {ticketDashboard?.statusCounts.PROCESSING || 0}
              </p>
              <p className="text-sm text-gray-600 mt-1">Đang xử lý</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {ticketDashboard?.statusCounts.ESTIMATE || 0}
              </p>
              <p className="text-sm text-gray-600 mt-1">Đang báo giá</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {ticketDashboard?.statusCounts.DONE || 0}
              </p>
              <p className="text-sm text-gray-600 mt-1">Hoàn thành</p>
            </div>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Lịch hẹn hôm nay
          </h2>
          <Link
            href="/staff/appointments"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Xem tất cả →
          </Link>
        </div>
        <div className="divide-y divide-gray-200">
          {appointmentDashboard?.appointments &&
          appointmentDashboard.appointments.length > 0 ? (
            appointmentDashboard.appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="font-medium text-gray-900">
                          {appointment.userName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {appointment.userPhone}
                        </p>
                      </div>
                    </div>
                    {appointment.note && (
                      <p className="mt-2 text-sm text-gray-600">
                        {appointment.note}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        {new Date(appointment.startTime).toLocaleTimeString(
                          "vi-VN",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}{" "}
                        -{" "}
                        {new Date(appointment.endTime).toLocaleTimeString(
                          "vi-VN",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          appointment.status === "BOOKED"
                            ? "bg-yellow-100 text-yellow-800"
                            : appointment.status === "IN_PROGRESS"
                            ? "bg-blue-100 text-blue-800"
                            : appointment.status === "COMPLETED"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {appointment.status === "BOOKED" && "Đã đặt"}
                        {appointment.status === "IN_PROGRESS" && "Đang thực hiện"}
                        {appointment.status === "COMPLETED" && "Hoàn thành"}
                        {appointment.status === "CANCELLED" && "Đã hủy"}
                      </span>
                    </div>
                    <Link
                      href={`/staff/appointments/${appointment.id}`}
                      className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      Chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center text-gray-500">
              Không có lịch hẹn nào trong ngày
            </div>
          )}
        </div>
      </div>

      {/* Recent Service Tickets */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Phiếu dịch vụ gần đây
          </h2>
          <Link
            href="/staff/service-tickets"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Xem tất cả →
          </Link>
        </div>
        <div className="divide-y divide-gray-200">
          {ticketDashboard?.recentTickets &&
          ticketDashboard.recentTickets.length > 0 ? (
            ticketDashboard.recentTickets.slice(0, 5).map((ticket) => (
              <div
                key={ticket.id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <Wrench className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {ticket.ticketNumber}
                        </p>
                        <p className="text-sm text-gray-500">
                          {ticket.serviceType === "WARRANTY" && "Bảo hành"}
                          {ticket.serviceType === "REPAIR" && "Sửa chữa"}
                          {ticket.serviceType === "CLEANING" && "Vệ sinh"}
                          {ticket.serviceType === "ADJUSTMENT" && "Điều chỉnh"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        ticket.status === "REQUESTED"
                          ? "bg-yellow-100 text-yellow-800"
                          : ticket.status === "RECEIVED"
                          ? "bg-blue-100 text-blue-800"
                          : ticket.status === "PROCESSING"
                          ? "bg-purple-100 text-purple-800"
                          : ticket.status === "DONE"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {ticket.status === "REQUESTED" && "Yêu cầu mới"}
                      {ticket.status === "RECEIVED" && "Đã tiếp nhận"}
                      {ticket.status === "PROCESSING" && "Đang xử lý"}
                      {ticket.status === "ESTIMATE" && "Đã báo giá"}
                      {ticket.status === "DONE" && "Hoàn thành"}
                    </span>
                    <Link
                      href={`/staff/service-tickets/${ticket.id}`}
                      className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      Chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center text-gray-500">
              Không có phiếu dịch vụ nào
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
