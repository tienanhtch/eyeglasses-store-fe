"use client";

import { useState } from "react";
import {
  Settings,
  Bell,
  Shield,
  CreditCard,
  Heart,
  ShoppingBag,
  User,
  LogOut,
  Trash2,
  AlertTriangle,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const tabs = [
    { id: "account", name: "Tài khoản", icon: User },
    { id: "notifications", name: "Thông báo", icon: Bell },
    { id: "privacy", name: "Quyền riêng tư", icon: Shield },
    { id: "billing", name: "Thanh toán", icon: CreditCard },
    { id: "danger", name: "Nguy hiểm", icon: AlertTriangle },
  ];

  const handleDeleteAccount = () => {
    // Logic để xóa tài khoản
    console.log("Deleting account...");
    setShowDeleteModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cài đặt</h1>
          <p className="text-gray-600">Quản lý cài đặt tài khoản và tùy chọn</p>
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
            {/* Account Tab */}
            {activeTab === "account" && (
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">
                  Thông tin tài khoản
                </h3>
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <User className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">
                          Thông tin tài khoản
                        </h3>
                        <div className="mt-2 text-sm text-blue-700">
                          <p>Email: nguyenvana@example.com</p>
                          <p>Số điện thoại: 0901234567</p>
                          <p>Ngày tham gia: 01/01/2023</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          Thay đổi mật khẩu
                        </h4>
                        <p className="text-sm text-gray-500">
                          Cập nhật mật khẩu để bảo mật tài khoản
                        </p>
                      </div>
                      <button className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200">
                        Thay đổi
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          Xác thực 2 bước
                        </h4>
                        <p className="text-sm text-gray-500">
                          Thêm lớp bảo mật cho tài khoản
                        </p>
                      </div>
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                        Bật
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          Liên kết tài khoản
                        </h4>
                        <p className="text-sm text-gray-500">
                          Kết nối với Google, Facebook
                        </p>
                      </div>
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                        Quản lý
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">
                  Cài đặt thông báo
                </h3>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          Thông báo email
                        </h4>
                        <p className="text-sm text-gray-500">
                          Nhận thông báo qua email
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          Thông báo SMS
                        </h4>
                        <p className="text-sm text-gray-500">
                          Nhận thông báo qua tin nhắn
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          Thông báo đẩy
                        </h4>
                        <p className="text-sm text-gray-500">
                          Nhận thông báo trên trình duyệt
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          Thông báo đơn hàng
                        </h4>
                        <p className="text-sm text-gray-500">
                          Cập nhật về đơn hàng và vận chuyển
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          Thông báo khuyến mãi
                        </h4>
                        <p className="text-sm text-gray-500">
                          Thông báo về khuyến mãi và sản phẩm mới
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === "privacy" && (
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">
                  Quyền riêng tư
                </h3>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          Hiển thị thông tin công khai
                        </h4>
                        <p className="text-sm text-gray-500">
                          Cho phép người khác xem thông tin cơ bản
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          Chia sẻ dữ liệu với bên thứ ba
                        </h4>
                        <p className="text-sm text-gray-500">
                          Cho phép chia sẻ dữ liệu để cải thiện dịch vụ
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          Theo dõi hoạt động
                        </h4>
                        <p className="text-sm text-gray-500">
                          Cho phép theo dõi để cá nhân hóa trải nghiệm
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      Quyền riêng tư dữ liệu
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Bạn có quyền yêu cầu xuất, xóa hoặc sửa đổi dữ liệu cá
                      nhân của mình.
                    </p>
                    <div className="flex space-x-4">
                      <button className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200">
                        Xuất dữ liệu
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                        Yêu cầu xóa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Billing Tab */}
            {activeTab === "billing" && (
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">
                  Thanh toán
                </h3>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          Phương thức thanh toán
                        </h4>
                        <p className="text-sm text-gray-500">
                          Quản lý thẻ tín dụng và ví điện tử
                        </p>
                      </div>
                      <button className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200">
                        Quản lý
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          Lịch sử thanh toán
                        </h4>
                        <p className="text-sm text-gray-500">
                          Xem lịch sử giao dịch và hóa đơn
                        </p>
                      </div>
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                        Xem
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          Địa chỉ thanh toán
                        </h4>
                        <p className="text-sm text-gray-500">
                          Cập nhật địa chỉ thanh toán mặc định
                        </p>
                      </div>
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                        Cập nhật
                      </button>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-md p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <CreditCard className="h-5 w-5 text-green-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">
                          Tài khoản thanh toán
                        </h3>
                        <div className="mt-2 text-sm text-green-700">
                          <p>Thẻ chính: **** **** **** 1234</p>
                          <p>Ngày hết hạn: 12/25</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Danger Tab */}
            {activeTab === "danger" && (
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">
                  Khu vực nguy hiểm
                </h3>
                <div className="space-y-6">
                  <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                          Cảnh báo
                        </h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>
                            Các hành động trong khu vực này không thể hoàn tác.
                          </p>
                          <p>Vui lòng cân nhắc kỹ trước khi thực hiện.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-red-200 rounded-md">
                      <div>
                        <h4 className="text-sm font-medium text-red-900">
                          Xóa tài khoản
                        </h4>
                        <p className="text-sm text-red-600">
                          Xóa vĩnh viễn tài khoản và tất cả dữ liệu
                        </p>
                      </div>
                      <button
                        onClick={() => setShowDeleteModal(true)}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                      >
                        Xóa tài khoản
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          Đăng xuất tất cả thiết bị
                        </h4>
                        <p className="text-sm text-gray-500">
                          Đăng xuất khỏi tất cả thiết bị đã đăng nhập
                        </p>
                      </div>
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Xóa tài khoản
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Bạn có chắc chắn muốn xóa tài khoản? Hành động này không
                        thể hoàn tác. Tất cả dữ liệu của bạn sẽ bị xóa vĩnh
                        viễn.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Xóa tài khoản
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
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
