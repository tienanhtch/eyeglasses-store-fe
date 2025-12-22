"use client";

import { useState, useEffect } from "react";
import {
  fetchAdminUsers,
  createAdminUser,
  lockAdminUser,
  resetPassword,
  AdminUser,
  CreateAdminUserPayload,
  getRoleId,
} from "@/services/admin/users";
import { Plus, Lock, Unlock, Key, ChevronLeft, ChevronRight, X } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [filterRole, setFilterRole] = useState<string>("");
  
  // Pagination (mock for now - API seems to return array directly)
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 20;

  const [formData, setFormData] = useState<{
    email: string;
    password: string;
    fullName: string;
    phone: string;
    roleIds: string[];
  }>({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    roleIds: [],
  });

  // Load users
  const loadUsers = async (page = 0, role?: string) => {
    try {
      setLoading(true);
      const data = await fetchAdminUsers({ page, size: pageSize, role });
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading users:", error);
      alert("Không thể tải danh sách người dùng");
      } finally {
      setLoading(false);
      }
    };

  useEffect(() => {
    loadUsers(0, filterRole || undefined);
  }, [filterRole]);

  // Handle create user
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAdminUser(formData);
      alert("Tạo người dùng thành công!");
      setShowModal(false);
      resetForm();
      loadUsers(currentPage, filterRole || undefined);
    } catch (error: any) {
      console.error("Error creating user:", error);
      alert(error?.response?.data?.message || "Có lỗi xảy ra khi tạo người dùng");
    }
  };

  // Handle lock/unlock user
  const handleToggleLock = async (userId: string, currentActive: boolean) => {
    const action = currentActive ? "khóa" : "mở khóa";
    if (!confirm(`Bạn có chắc chắn muốn ${action} tài khoản này?`)) return;

    try {
      await lockAdminUser(userId, !currentActive);
      alert(`${action.charAt(0).toUpperCase() + action.slice(1)} tài khoản thành công!`);
      loadUsers(currentPage, filterRole || undefined);
    } catch (error: any) {
      console.error("Error toggling lock:", error);
      alert(error?.response?.data?.message || "Có lỗi xảy ra");
    }
  };

  // Handle reset password
  const handleResetPassword = async (userId: string) => {
    const newPassword = prompt("Nhập mật khẩu mới:");
    if (!newPassword) return;

    try {
      await resetPassword(userId, newPassword);
      alert("Reset mật khẩu thành công!");
    } catch (error: any) {
      console.error("Error resetting password:", error);
      alert(error?.response?.data?.message || "Có lỗi xảy ra");
    }
  };

  const resetForm = () => {
      setFormData({
        email: "",
        password: "",
      fullName: "",
      phone: "",
      roleIds: [],
      });
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  const handleRoleToggle = (roleName: string) => {
    const roleId = getRoleId(roleName);
    if (!roleId) return;

    setFormData(prev => ({
      ...prev,
      roleIds: prev.roleIds.includes(roleId)
        ? prev.roleIds.filter(id => id !== roleId)
        : [...prev.roleIds, roleId],
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("vi-VN");
  };

  if (loading && users.length === 0) {
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
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Người dùng</h1>
          <p className="text-sm text-gray-600 mt-1">
            Tổng số: {users.length} người dùng
          </p>
      </div>

        <div className="flex gap-3">
          {/* Filter */}
            <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
            <option value="">Tất cả vai trò</option>
              <option value="ADMIN">Admin</option>
              <option value="STAFF">Staff</option>
            <option value="CUSTOMER">Customer</option>
            </select>

          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Thêm người dùng
            </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Người dùng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Số điện thoại
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vai trò
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày tạo
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  Chưa có người dùng nào
                </td>
              </tr>
            ) : (
              users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.phone || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {user.roles.map((role) => (
                          <span
                          key={role}
                          className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"
                        >
                          {role}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                          user.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                        }`}
                      >
                      {user.isActive ? "Hoạt động" : "Bị khóa"}
                    </span>
                    </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.createdAt ? formatDate(user.createdAt) : "-"}
                    </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button
                      onClick={() => handleToggleLock(user.id, user.isActive)}
                      className={`inline-flex items-center ${
                        user.isActive
                          ? "text-orange-600 hover:text-orange-800"
                          : "text-green-600 hover:text-green-800"
                      }`}
                      title={user.isActive ? "Khóa tài khoản" : "Mở khóa tài khoản"}
                        >
                      {user.isActive ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => handleResetPassword(user.id)}
                      className="text-purple-600 hover:text-purple-800 inline-flex items-center"
                      title="Reset mật khẩu"
                        >
                          <Key className="h-4 w-4" />
                        </button>
                    </td>
                  </tr>
              ))
            )}
              </tbody>
            </table>
      </div>

      {/* Create User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/30 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
          </button>

            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Tạo người dùng mới
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="user@example.com"
                        />
                      </div>

                      <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="password"
                          required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="••••••••"
                        />
                      </div>

                      <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Họ và tên <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Nguyễn Văn A"
                        />
                      </div>

                      <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                          Số điện thoại
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="0123456789"
                        />
                      </div>

                      <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vai trò <span className="text-red-500">*</span>
                        </label>
                <div className="space-y-2">
                  {["ADMIN", "STAFF", "CUSTOMER"].map((role) => {
                    const roleId = getRoleId(role);
                    return (
                      <label
                        key={role}
                        className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100"
                      >
                      <input
                        type="checkbox"
                          checked={roleId ? formData.roleIds.includes(roleId) : false}
                          onChange={() => handleRoleToggle(role)}
                          className="rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                      />
                        <span className="text-sm text-gray-700">{role}</span>
                      </label>
                    );
                  })}
                    </div>
                    </div>

              <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                  className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                      >
                  Tạo mới
                      </button>
                    </div>
                  </form>
          </div>
        </div>
      )}
    </div>
  );
}
