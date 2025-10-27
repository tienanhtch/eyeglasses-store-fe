"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Phone,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";

const appointments = [
  {
    id: "APT-001",
    date: "2024-01-20",
    time: "09:00 - 10:00",
    type: "Đo khúc xạ",
    status: "confirmed",
    staff: "KTV Nguyễn Thị B",
    location: "Cửa hàng Quận 1",
    notes: "Khách hàng mới, cần đo kỹ",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "APT-002",
    date: "2024-01-25",
    time: "14:00 - 15:00",
    type: "Tư vấn kính",
    status: "pending",
    staff: "KTV Lê Văn C",
    location: "Cửa hàng Quận 3",
    notes: "Cần tư vấn kính cận",
    createdAt: "2024-01-18T14:00:00Z",
  },
  {
    id: "APT-003",
    date: "2024-01-30",
    time: "10:30 - 11:30",
    type: "Bảo hành",
    status: "cancelled",
    staff: "KTV Phạm Thị D",
    location: "Cửa hàng Quận 5",
    notes: "Khách hàng hủy",
    createdAt: "2024-01-20T09:00:00Z",
  },
  {
    id: "APT-004",
    date: "2024-02-05",
    time: "15:30 - 16:30",
    type: "Đo khúc xạ",
    status: "completed",
    staff: "KTV Hoàng Văn E",
    location: "Cửa hàng Quận 7",
    notes: "Hoàn tất",
    createdAt: "2024-01-25T11:00:00Z",
  },
];

const availableSlots = [
  { date: "2024-01-22", time: "09:00 - 10:00", staff: "KTV Nguyễn Thị B" },
  { date: "2024-01-22", time: "10:30 - 11:30", staff: "KTV Lê Văn C" },
  { date: "2024-01-23", time: "14:00 - 15:00", staff: "KTV Phạm Thị D" },
  { date: "2024-01-23", time: "15:30 - 16:30", staff: "KTV Hoàng Văn E" },
  { date: "2024-01-24", time: "09:00 - 10:00", staff: "KTV Nguyễn Thị B" },
  { date: "2024-01-24", time: "14:00 - 15:00", staff: "KTV Lê Văn C" },
];

const serviceTypes = [
  { id: "refraction", name: "Đo khúc xạ", duration: 30, price: 100000 },
  { id: "consultation", name: "Tư vấn kính", duration: 20, price: 50000 },
  { id: "warranty", name: "Bảo hành", duration: 15, price: 0 },
  { id: "repair", name: "Sửa chữa", duration: 45, price: 200000 },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <AlertCircle className="h-4 w-4 text-orange-500" />;
    case "confirmed":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
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
      return "bg-orange-100 text-orange-800";
    case "confirmed":
      return "bg-green-100 text-green-800";
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
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [notes, setNotes] = useState("");

  const filteredAppointments = appointmentsList.filter((apt) => {
    const matchesSearch =
      apt.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.staff.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime || !selectedService || !selectedStaff) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    const newAppointment = {
      id: `APT-${Date.now()}`,
      date: selectedDate,
      time: selectedTime,
      type: serviceTypes.find((s) => s.id === selectedService)?.name || "",
      status: "pending",
      staff: selectedStaff,
      location: "Cửa hàng Quận 1",
      notes: notes,
      createdAt: new Date().toISOString(),
    };

    setAppointmentsList([newAppointment, ...appointmentsList]);
    setShowBookingModal(false);
    setSelectedDate("");
    setSelectedTime("");
    setSelectedService("");
    setSelectedStaff("");
    setNotes("");
  };

  const handleCancelAppointment = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn hủy lịch hẹn này?")) {
      setAppointmentsList(
        appointmentsList.map((apt) =>
          apt.id === id ? { ...apt, status: "cancelled" } : apt
        )
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lịch hẹn</h1>
          <p className="text-gray-600">Quản lý lịch hẹn khám mắt và dịch vụ</p>
        </div>
        <button
          onClick={() => setShowBookingModal(true)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Đặt lịch hẹn
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
              <p className="text-sm font-medium text-gray-500">Đã xác nhận</p>
              <p className="text-2xl font-semibold text-gray-900">
                {
                  appointmentsList.filter((apt) => apt.status === "confirmed")
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
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Hoàn tất</p>
              <p className="text-2xl font-semibold text-gray-900">
                {
                  appointmentsList.filter((apt) => apt.status === "completed")
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
              <option value="completed">Hoàn tất</option>
              <option value="cancelled">Đã hủy</option>
            </select>
            <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              Bộ lọc
            </button>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Lịch hẹn của tôi
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredAppointments.map((appointment) => (
            <div key={appointment.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-gray-600" />
                      </div>
                    </div>
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
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {appointment.location}
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
                  <button
                    onClick={() => setSelectedAppointment(appointment.id)}
                    className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200"
                  >
                    Chi tiết
                  </button>
                  {appointment.status === "pending" && (
                    <button
                      onClick={() => handleCancelAppointment(appointment.id)}
                      className="px-3 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200"
                    >
                      Hủy
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Slots */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Khung giờ có sẵn
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableSlots.map((slot, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {slot.date}
                    </div>
                    <div className="text-sm text-gray-500">{slot.time}</div>
                    <div className="text-sm text-gray-500">{slot.staff}</div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedDate(slot.date);
                      setSelectedTime(slot.time);
                      setSelectedStaff(slot.staff);
                      setShowBookingModal(true);
                    }}
                    className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200"
                  >
                    Đặt ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Đặt lịch hẹn mới
                    </h3>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Ngày
                          </label>
                          <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Thời gian
                          </label>
                          <select
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Chọn thời gian</option>
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
                          <select
                            value={selectedService}
                            onChange={(e) => setSelectedService(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Chọn dịch vụ</option>
                            {serviceTypes.map((service) => (
                              <option key={service.id} value={service.id}>
                                {service.name} - {service.duration} phút - ₫
                                {service.price.toLocaleString()}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            KTV
                          </label>
                          <select
                            value={selectedStaff}
                            onChange={(e) => setSelectedStaff(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Chọn KTV</option>
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
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Nhập ghi chú (tùy chọn)"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleBookAppointment}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Đặt lịch hẹn
                </button>
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                          Ngày
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {
                            appointmentsList.find(
                              (apt) => apt.id === selectedAppointment
                            )?.date
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
                            )?.time
                          }
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          KTV
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
                          Địa điểm
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {
                            appointmentsList.find(
                              (apt) => apt.id === selectedAppointment
                            )?.location
                          }
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Trạng thái
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {getStatusText(
                            appointmentsList.find(
                              (apt) => apt.id === selectedAppointment
                            )?.status || ""
                          )}
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
    </div>
  );
}
