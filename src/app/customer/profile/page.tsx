"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Save,
  Eye,
  EyeOff,
  Camera,
  Edit,
  Shield,
  Bell,
  CreditCard,
  Heart,
  ShoppingBag,
} from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    orders: true,
    appointments: true,
    promotions: false,
  });

  const tabs = [
    { id: "profile", name: "Thông tin cá nhân", icon: User },
    { id: "security", name: "Bảo mật", icon: Shield },
    { id: "notifications", name: "Thông báo", icon: Bell },
    { id: "preferences", name: "Tùy chọn", icon: Settings },
  ];

  const handleSave = () => {
    // Logic để lưu thông tin
    console.log("Saving profile...");
    setIsEditing(false);
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Thông tin cá nhân
          </h1>
          <p className="text-gray-600">
            Quản lý thông tin cá nhân và cài đặt tài khoản
          </p>
        </div>
        <div className="flex items-center space-x-4">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Lưu thay đổi
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Edit className="h-4 w-4 mr-2" />
              Chỉnh sửa
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">
                  Thông tin cá nhân
                </h3>
                <div className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <div className="h-20 w-20 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="h-10 w-10 text-gray-600" />
                      </div>
                      <button className="absolute bottom-0 right-0 h-6 w-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <Camera className="h-3 w-3 text-white" />
                      </button>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">
                        Nguyễn Văn A
                      </h4>
                      <p className="text-sm text-gray-500">Khách hàng VIP</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <Heart className="h-4 w-4 mr-1" />
                          12 sản phẩm yêu thích
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <ShoppingBag className="h-4 w-4 mr-1" />5 đơn hàng
                        </div>
                      </div>
                    </div>
                  </div>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Họ và tên
                        </label>
                        <input
                          type="text"
                          defaultValue="Nguyễn Văn A"
                          disabled={!isEditing}
                          className={`mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            !isEditing ? "bg-gray-50 text-gray-500" : ""
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Ngày sinh
                        </label>
                        <input
                          type="date"
                          defaultValue="1990-01-01"
                          disabled={!isEditing}
                          className={`mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            !isEditing ? "bg-gray-50 text-gray-500" : ""
                          }`}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue="nguyenvana@example.com"
                          disabled={!isEditing}
                          className={`mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            !isEditing ? "bg-gray-50 text-gray-500" : ""
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Số điện thoại
                        </label>
                        <input
                          type="tel"
                          defaultValue="0901234567"
                          disabled={!isEditing}
                          className={`mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            !isEditing ? "bg-gray-50 text-gray-500" : ""
                          }`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Địa chỉ
                      </label>
                      <textarea
                        rows={3}
                        defaultValue="123 Đường ABC, Quận 1, TP.HCM"
                        disabled={!isEditing}
                        className={`mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          !isEditing ? "bg-gray-50 text-gray-500" : ""
                        }`}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Giới tính
                        </label>
                        <select
                          disabled={!isEditing}
                          className={`mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            !isEditing ? "bg-gray-50 text-gray-500" : ""
                          }`}
                        >
                          <option value="male">Nam</option>
                          <option value="female">Nữ</option>
                          <option value="other">Khác</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Ngày tham gia
                        </label>
                        <input
                          type="text"
                          defaultValue="2023-01-01"
                          disabled
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-500"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">
                  Bảo mật
                </h3>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Mật khẩu hiện tại
                    </label>
                    <div className="mt-1 relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập mật khẩu hiện tại"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Mật khẩu mới
                    </label>
                    <input
                      type="password"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập mật khẩu mới"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Xác nhận mật khẩu mới
                    </label>
                    <input
                      type="password"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Xác nhận mật khẩu mới"
                    />
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <Shield className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">
                          Lưu ý bảo mật
                        </h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <ul className="list-disc list-inside space-y-1">
                            <li>Mật khẩu phải có ít nhất 8 ký tự</li>
                            <li>
                              Bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt
                            </li>
                            <li>Không sử dụng thông tin cá nhân</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">
                  Cài đặt thông báo
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-4">
                      Kênh thông báo
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              Email
                            </div>
                            <div className="text-sm text-gray-500">
                              Nhận thông báo qua email
                            </div>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.email}
                          onChange={(e) =>
                            handleNotificationChange("email", e.target.checked)
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Phone className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              SMS
                            </div>
                            <div className="text-sm text-gray-500">
                              Nhận thông báo qua tin nhắn
                            </div>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.sms}
                          onChange={(e) =>
                            handleNotificationChange("sms", e.target.checked)
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Bell className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              Push Notification
                            </div>
                            <div className="text-sm text-gray-500">
                              Nhận thông báo trên trình duyệt
                            </div>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.push}
                          onChange={(e) =>
                            handleNotificationChange("push", e.target.checked)
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-4">
                      Loại thông báo
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            Đơn hàng
                          </div>
                          <div className="text-sm text-gray-500">
                            Thông báo về đơn hàng và vận chuyển
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.orders}
                          onChange={(e) =>
                            handleNotificationChange("orders", e.target.checked)
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            Lịch hẹn
                          </div>
                          <div className="text-sm text-gray-500">
                            Thông báo về lịch hẹn và dịch vụ
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.appointments}
                          onChange={(e) =>
                            handleNotificationChange(
                              "appointments",
                              e.target.checked
                            )
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            Khuyến mãi
                          </div>
                          <div className="text-sm text-gray-500">
                            Thông báo về khuyến mãi và sản phẩm mới
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.promotions}
                          onChange={(e) =>
                            handleNotificationChange(
                              "promotions",
                              e.target.checked
                            )
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === "preferences" && (
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">
                  Tùy chọn
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Múi giờ
                    </label>
                    <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="Asia/Ho_Chi_Minh">
                        Asia/Ho_Chi_Minh (UTC+7)
                      </option>
                      <option value="UTC">UTC (UTC+0)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Ngôn ngữ
                    </label>
                    <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="vi">Tiếng Việt</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Định dạng ngày
                    </label>
                    <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Định dạng thời gian
                    </label>
                    <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="24">24 giờ (14:30)</option>
                      <option value="12">12 giờ (2:30 PM)</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Chế độ tối
                      </div>
                      <div className="text-sm text-gray-500">
                        Sử dụng giao diện tối
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Tự động lưu
                      </div>
                      <div className="text-sm text-gray-500">
                        Tự động lưu dữ liệu khi chỉnh sửa
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
