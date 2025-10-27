"use client";

import { useState } from "react";
import {
  Calendar,
  Users,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Phone,
  MapPin,
} from "lucide-react";

const todayAppointments = [
  {
    id: "APT-001",
    customer: "Nguyễn Văn A",
    phone: "0901234567",
    time: "09:00 - 10:00",
    type: "Đo khúc xạ",
    status: "pending",
    notes: "Khách hàng mới, cần đo kỹ",
  },
  {
    id: "APT-002",
    customer: "Trần Thị B",
    phone: "0902345678",
    time: "10:30 - 11:30",
    type: "Tư vấn kính",
    status: "confirmed",
    notes: "Cần tư vấn kính cận",
  },
  {
    id: "APT-003",
    customer: "Lê Văn C",
    phone: "0903456789",
    time: "14:00 - 15:00",
    type: "Đo khúc xạ",
    status: "in-progress",
    notes: "Đang đo",
  },
  {
    id: "APT-004",
    customer: "Phạm Thị D",
    phone: "0904567890",
    time: "15:30 - 16:30",
    type: "Bảo hành",
    status: "completed",
    notes: "Hoàn tất",
  },
];

const recentCustomers = [
  {
    id: "CUS-001",
    name: "Nguyễn Văn A",
    phone: "0901234567",
    lastVisit: "2024-01-15",
    totalOrders: 3,
    totalSpent: 7500000,
  },
  {
    id: "CUS-002",
    name: "Trần Thị B",
    phone: "0902345678",
    lastVisit: "2024-01-14",
    totalOrders: 1,
    totalSpent: 2500000,
  },
  {
    id: "CUS-003",
    name: "Lê Văn C",
    phone: "0903456789",
    lastVisit: "2024-01-13",
    totalOrders: 5,
    totalSpent: 12000000,
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case "confirmed":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "in-progress":
      return <AlertCircle className="h-4 w-4 text-blue-500" />;
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    default:
      return <Clock className="h-4 w-4 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "confirmed":
      return "bg-green-100 text-green-800";
    case "in-progress":
      return "bg-blue-100 text-blue-800";
    case "completed":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "pending":
      return "Chờ xác nhận";
    case "confirmed":
      return "Đã xác nhận";
    case "in-progress":
      return "Đang xử lý";
    case "completed":
      return "Hoàn tất";
    default:
      return status;
  }
};

export default function StaffDashboard() {
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(
    null
  );

  const handleCheckIn = (appointmentId: string) => {
    // Logic để check-in khách hàng
    console.log("Check-in appointment:", appointmentId);
  };

  const handleStartService = (appointmentId: string) => {
    // Logic để bắt đầu dịch vụ
    console.log("Start service for appointment:", appointmentId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Staff</h1>
          <p className="text-gray-600">
            Quản lý lịch hẹn và dịch vụ khách hàng
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
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Lịch hẹn hôm nay
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {todayAppointments.length}
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
              <p className="text-sm font-medium text-gray-500">Đã hoàn tất</p>
              <p className="text-2xl font-semibold text-gray-900">
                {
                  todayAppointments.filter((apt) => apt.status === "completed")
                    .length
                }
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertCircle className="h-8 w-8 text-orange-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Đang xử lý</p>
              <p className="text-2xl font-semibold text-gray-900">
                {
                  todayAppointments.filter(
                    (apt) => apt.status === "in-progress"
                  ).length
                }
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Chờ xác nhận</p>
              <p className="text-2xl font-semibold text-gray-900">
                {
                  todayAppointments.filter((apt) => apt.status === "pending")
                    .length
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Appointments */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Lịch hẹn hôm nay
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {todayAppointments.map((appointment) => (
            <div key={appointment.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="text-sm font-medium text-gray-900">
                          {appointment.customer}
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
                          <Phone className="h-4 w-4 mr-1" />
                          {appointment.phone}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {appointment.time}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {appointment.type}
                        </div>
                      </div>
                      {appointment.notes && (
                        <div className="mt-2 text-sm text-gray-600">
                          <span className="font-medium">Ghi chú:</span>{" "}
                          {appointment.notes}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {appointment.status === "pending" && (
                    <button
                      onClick={() => handleCheckIn(appointment.id)}
                      className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200"
                    >
                      Check-in
                    </button>
                  )}
                  {appointment.status === "confirmed" && (
                    <button
                      onClick={() => handleStartService(appointment.id)}
                      className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-md hover:bg-green-200"
                    >
                      Bắt đầu
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedAppointment(appointment.id)}
                    className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Customers */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Khách hàng gần đây
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lần cuối
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Đơn hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tổng chi
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {customer.name}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {customer.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.lastVisit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.totalOrders} đơn
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₫{customer.totalSpent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Chi tiết lịch hẹn
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Khách hàng
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {
                            todayAppointments.find(
                              (apt) => apt.id === selectedAppointment
                            )?.customer
                          }
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Số điện thoại
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {
                            todayAppointments.find(
                              (apt) => apt.id === selectedAppointment
                            )?.phone
                          }
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Thời gian
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {
                            todayAppointments.find(
                              (apt) => apt.id === selectedAppointment
                            )?.time
                          }
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Loại dịch vụ
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {
                            todayAppointments.find(
                              (apt) => apt.id === selectedAppointment
                            )?.type
                          }
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Ghi chú
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {
                            todayAppointments.find(
                              (apt) => apt.id === selectedAppointment
                            )?.notes
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setSelectedAppointment(null)}
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
