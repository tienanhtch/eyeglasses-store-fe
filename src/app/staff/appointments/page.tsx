"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  Phone,
  Eye,
  CheckCircle,
  AlertCircle,
  XCircle,
  Edit,
  Trash2,
  MoreVertical,
} from "lucide-react";

const appointments = [
  {
    id: "APT-001",
    customer: "Nguyễn Văn A",
    phone: "0901234567",
    email: "vana@example.com",
    date: "2024-01-15",
    time: "09:00 - 10:00",
    type: "Đo khúc xạ",
    status: "pending",
    notes: "Khách hàng mới, cần đo kỹ",
    staff: "KTV Nguyễn Thị B",
    createdAt: "2024-01-14T10:00:00Z",
  },
  {
    id: "APT-002",
    customer: "Trần Thị B",
    phone: "0902345678",
    email: "thib@example.com",
    date: "2024-01-15",
    time: "10:30 - 11:30",
    type: "Tư vấn kính",
    status: "confirmed",
    notes: "Cần tư vấn kính cận",
    staff: "KTV Lê Văn C",
    createdAt: "2024-01-14T11:00:00Z",
  },
  {
    id: "APT-003",
    customer: "Lê Văn C",
    phone: "0903456789",
    email: "vanc@example.com",
    date: "2024-01-15",
    time: "14:00 - 15:00",
    type: "Đo khúc xạ",
    status: "in-progress",
    notes: "Đang đo",
    staff: "KTV Phạm Thị D",
    createdAt: "2024-01-14T12:00:00Z",
  },
  {
    id: "APT-004",
    customer: "Phạm Thị D",
    phone: "0904567890",
    email: "thid@example.com",
    date: "2024-01-15",
    time: "15:30 - 16:30",
    type: "Bảo hành",
    status: "completed",
    notes: "Hoàn tất",
    staff: "KTV Hoàng Văn E",
    createdAt: "2024-01-14T13:00:00Z",
  },
  {
    id: "APT-005",
    customer: "Hoàng Văn E",
    phone: "0905678901",
    email: "vane@example.com",
    date: "2024-01-16",
    time: "09:00 - 10:00",
    type: "Đo khúc xạ",
    status: "cancelled",
    notes: "Khách hàng hủy",
    staff: "KTV Nguyễn Thị B",
    createdAt: "2024-01-14T14:00:00Z",
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
    case "cancelled":
      return <XCircle className="h-4 w-4 text-red-500" />;
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
    case "cancelled":
      return "bg-red-100 text-red-800";
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
    case "cancelled":
      return "Đã hủy";
    default:
      return status;
  }
};

export default function AppointmentsPage() {
  const [appointmentsList, setAppointmentsList] = useState(appointments);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<any>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(
    null
  );

  const filteredAppointments = appointmentsList.filter((apt) => {
    const matchesSearch =
      apt.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.phone.includes(searchTerm) ||
      apt.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || apt.status === statusFilter;
    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "today" &&
        apt.date === new Date().toISOString().split("T")[0]) ||
      (dateFilter === "tomorrow" &&
        apt.date ===
          new Date(Date.now() + 86400000).toISOString().split("T")[0]) ||
      (dateFilter === "week" &&
        (() => {
          const weekStart = new Date();
          weekStart.setDate(weekStart.getDate() - weekStart.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekEnd.getDate() + 6);
          const aptDate = new Date(apt.date);
          return aptDate >= weekStart && aptDate <= weekEnd;
        })());
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleStatusChange = (id: string, newStatus: string) => {
    setAppointmentsList(
      appointmentsList.map((apt) =>
        apt.id === id ? { ...apt, status: newStatus } : apt
      )
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa lịch hẹn này?")) {
      setAppointmentsList(appointmentsList.filter((apt) => apt.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý lịch hẹn</h1>
          <p className="text-gray-600">
            Quản lý lịch hẹn và dịch vụ khách hàng
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm lịch hẹn
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Tổng lịch hẹn</p>
              <p className="text-2xl font-semibold text-gray-900">
                {appointmentsList.length}
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
                  appointmentsList.filter((apt) => apt.status === "completed")
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
                  appointmentsList.filter((apt) => apt.status === "in-progress")
                    .length
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
                  appointmentsList.filter((apt) => apt.status === "pending")
                    .length
                }
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
                placeholder="Tìm kiếm lịch hẹn..."
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
              <option value="pending">Chờ xác nhận</option>
              <option value="confirmed">Đã xác nhận</option>
              <option value="in-progress">Đang xử lý</option>
              <option value="completed">Hoàn tất</option>
              <option value="cancelled">Đã hủy</option>
            </select>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả ngày</option>
              <option value="today">Hôm nay</option>
              <option value="tomorrow">Ngày mai</option>
              <option value="week">Tuần này</option>
            </select>
            <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              Bộ lọc
            </button>
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thời gian
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dịch vụ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  KTV
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
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.customer}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {appointment.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {appointment.date}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {appointment.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {appointment.type}
                    </div>
                    {appointment.notes && (
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {appointment.notes}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.staff}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
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
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setSelectedAppointment(appointment.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setEditingAppointment(appointment)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(appointment.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <div className="relative">
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white px-6 py-3 border-t border-gray-200">
        <div className="flex items-center text-sm text-gray-700">
          Hiển thị <span className="font-medium">1</span> đến{" "}
          <span className="font-medium">{filteredAppointments.length}</span>{" "}
          trong{" "}
          <span className="font-medium">{filteredAppointments.length}</span> kết
          quả
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Trước
          </button>
          <button className="px-3 py-1 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md">
            1
          </button>
          <button className="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Sau
          </button>
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
                            appointmentsList.find(
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
                            appointmentsList.find(
                              (apt) => apt.id === selectedAppointment
                            )?.phone
                          }
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {
                            appointmentsList.find(
                              (apt) => apt.id === selectedAppointment
                            )?.email
                          }
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Thời gian
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {
                            appointmentsList.find(
                              (apt) => apt.id === selectedAppointment
                            )?.date
                          }{" "}
                          -{" "}
                          {
                            appointmentsList.find(
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
                            appointmentsList.find(
                              (apt) => apt.id === selectedAppointment
                            )?.type
                          }
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          KTV phụ trách
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {
                            appointmentsList.find(
                              (apt) => apt.id === selectedAppointment
                            )?.staff
                          }
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Ghi chú
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {
                            appointmentsList.find(
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

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      {editingAppointment
                        ? "Chỉnh sửa lịch hẹn"
                        : "Thêm lịch hẹn mới"}
                    </h3>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Tên khách hàng
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập tên khách hàng"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Số điện thoại
                          </label>
                          <input
                            type="tel"
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập số điện thoại"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Nhập email"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Ngày
                          </label>
                          <input
                            type="date"
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Thời gian
                          </label>
                          <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="09:00 - 10:00">09:00 - 10:00</option>
                            <option value="10:30 - 11:30">10:30 - 11:30</option>
                            <option value="14:00 - 15:00">14:00 - 15:00</option>
                            <option value="15:30 - 16:30">15:30 - 16:30</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Loại dịch vụ
                          </label>
                          <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="Đo khúc xạ">Đo khúc xạ</option>
                            <option value="Tư vấn kính">Tư vấn kính</option>
                            <option value="Bảo hành">Bảo hành</option>
                            <option value="Sửa chữa">Sửa chữa</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            KTV phụ trách
                          </label>
                          <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="KTV Nguyễn Thị B">
                              KTV Nguyễn Thị B
                            </option>
                            <option value="KTV Lê Văn C">KTV Lê Văn C</option>
                            <option value="KTV Phạm Thị D">
                              KTV Phạm Thị D
                            </option>
                            <option value="KTV Hoàng Văn E">
                              KTV Hoàng Văn E
                            </option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Ghi chú
                        </label>
                        <textarea
                          rows={3}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Nhập ghi chú"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {editingAppointment ? "Cập nhật" : "Thêm mới"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingAppointment(null);
                  }}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
