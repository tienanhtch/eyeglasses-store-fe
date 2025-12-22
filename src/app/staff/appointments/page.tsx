"use client";

import { useState, useEffect } from "react";
import {
  getAppointments,
  checkInAppointment,
  completeAppointment,
  cancelAppointment,
  Appointment,
  CompleteRequest,
} from "@/services/staff/appointments";
import { getStores, Store } from "@/services/stores";
import { getCurrentUserId } from "@/utils/auth-storage";
import { Calendar, Clock, User, Phone, CheckCircle, XCircle, Eye } from "lucide-react";

export default function StaffAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState<string>("");
  const [staffId, setStaffId] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  useEffect(() => {
    // Load stores + staffId once
    const init = async () => {
      const userId = getCurrentUserId();
      if (userId) setStaffId(userId);

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

  const [prescriptionData, setPrescriptionData] = useState<CompleteRequest>({
    sphereRight: 0,
    cylinderRight: 0,
    axisRight: 0,
    sphereLeft: 0,
    cylinderLeft: 0,
    axisLeft: 0,
    pd: 62.5,
    note: "",
  });

  useEffect(() => {
    if (!selectedStoreId) return;
    loadAppointments();
  }, [selectedStoreId, selectedDate, statusFilter]);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      if (!selectedStoreId) return;
      const params: any = { storeId: selectedStoreId, date: selectedDate };
      if (statusFilter) params.status = statusFilter;

      const data = await getAppointments(params);
      setAppointments(data);
    } catch (error) {
      console.error("Error loading appointments:", error);
      alert("Không thể tải danh sách lịch hẹn");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async (appointmentId: string) => {
    if (!confirm("Xác nhận check-in khách hàng?")) return;

    try {
      if (!staffId) {
        alert("Không tìm thấy staffId. Vui lòng đăng nhập lại.");
        return;
      }
      await checkInAppointment(appointmentId, staffId);
      alert("Check-in thành công!");
      loadAppointments();
    } catch (error: any) {
      console.error("Error check-in:", error);
      alert(error?.response?.data?.error || "Có lỗi xảy ra");
    }
  };

  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppointment) return;

    try {
      await completeAppointment(selectedAppointment.id, prescriptionData);
      alert("Hoàn thành lịch hẹn và lưu toa kính thành công!");
      setShowCompleteModal(false);
      loadAppointments();
    } catch (error: any) {
      console.error("Error completing:", error);
      alert(error?.response?.data?.error || "Có lỗi xảy ra");
    }
  };

  const handleCancel = async (appointmentId: string) => {
    const reason = prompt("Nhập lý do hủy:");
    if (!reason) return;

    try {
      await cancelAppointment(appointmentId, reason);
      alert("Đã hủy lịch hẹn");
      loadAppointments();
    } catch (error: any) {
      console.error("Error cancelling:", error);
      alert(error?.response?.data?.error || "Có lỗi xảy ra");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Quản lý lịch hẹn</h1>
        <p className="mt-1 text-sm text-gray-500">
          Danh sách lịch hẹn khám mắt tại cửa hàng
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              Ngày
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
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
              <option value="BOOKED">Đã đặt</option>
              <option value="IN_PROGRESS">Đang thực hiện</option>
              <option value="COMPLETED">Hoàn thành</option>
              <option value="CANCELLED">Đã hủy</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={loadAppointments}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              disabled={!selectedStoreId}
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Danh sách lịch hẹn ({appointments.length})
          </h2>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {appointments.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                Không có lịch hẹn nào
              </div>
            ) : (
              appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Calendar className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {appointment.userName}
                          </h3>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Phone className="h-4 w-4 mr-1" />
                              {appointment.userPhone}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {new Date(
                                appointment.startTime
                              ).toLocaleTimeString("vi-VN", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}{" "}
                              -{" "}
                              {new Date(
                                appointment.endTime
                              ).toLocaleTimeString("vi-VN", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          {appointment.note && (
                            <p className="mt-2 text-sm text-gray-600">
                              <strong>Ghi chú:</strong> {appointment.note}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
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
                        {appointment.status === "IN_PROGRESS" &&
                          "Đang thực hiện"}
                        {appointment.status === "COMPLETED" && "Hoàn thành"}
                        {appointment.status === "CANCELLED" && "Đã hủy"}
                      </span>

                      {appointment.status === "BOOKED" && (
                        <button
                          onClick={() => handleCheckIn(appointment.id)}
                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Check-in
                        </button>
                      )}

                      {appointment.status === "IN_PROGRESS" && (
                        <button
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setShowCompleteModal(true);
                          }}
                          className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          Hoàn thành
                        </button>
                      )}

                      {(appointment.status === "BOOKED" ||
                        appointment.status === "IN_PROGRESS") && (
                        <button
                          onClick={() => handleCancel(appointment.id)}
                          className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          Hủy
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Complete Modal */}
      {showCompleteModal && selectedAppointment && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowCompleteModal(false)}
            ></div>

            <div className="relative bg-white rounded-lg max-w-2xl w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Hoàn thành lịch hẹn - Nhập kết quả đo mắt
              </h3>

              <form onSubmit={handleComplete} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Right Eye */}
                  <div className="col-span-2">
                    <h4 className="font-medium text-gray-700 mb-2">Mắt phải (OD)</h4>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SPH (Cầu)
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      value={prescriptionData.sphereRight}
                      onChange={(e) =>
                        setPrescriptionData({
                          ...prescriptionData,
                          sphereRight: parseFloat(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CYL (Trụ)
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      value={prescriptionData.cylinderRight}
                      onChange={(e) =>
                        setPrescriptionData({
                          ...prescriptionData,
                          cylinderRight: parseFloat(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      AXIS (Trục)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="180"
                      value={prescriptionData.axisRight}
                      onChange={(e) =>
                        setPrescriptionData({
                          ...prescriptionData,
                          axisRight: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  {/* Left Eye */}
                  <div className="col-span-2 mt-4">
                    <h4 className="font-medium text-gray-700 mb-2">Mắt trái (OS)</h4>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SPH (Cầu)
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      value={prescriptionData.sphereLeft}
                      onChange={(e) =>
                        setPrescriptionData({
                          ...prescriptionData,
                          sphereLeft: parseFloat(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CYL (Trụ)
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      value={prescriptionData.cylinderLeft}
                      onChange={(e) =>
                        setPrescriptionData({
                          ...prescriptionData,
                          cylinderLeft: parseFloat(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      AXIS (Trục)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="180"
                      value={prescriptionData.axisLeft}
                      onChange={(e) =>
                        setPrescriptionData({
                          ...prescriptionData,
                          axisLeft: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  {/* PD */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PD (Khoảng cách đồng tử)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={prescriptionData.pd}
                      onChange={(e) =>
                        setPrescriptionData({
                          ...prescriptionData,
                          pd: parseFloat(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>

                  {/* Note */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ghi chú
                    </label>
                    <textarea
                      value={prescriptionData.note}
                      onChange={(e) =>
                        setPrescriptionData({
                          ...prescriptionData,
                          note: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowCompleteModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Hoàn thành & Lưu toa
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
