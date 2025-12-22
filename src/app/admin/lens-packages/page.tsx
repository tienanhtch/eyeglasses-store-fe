"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  MoreVertical,
  Filter,
  Download,
  Upload,
  Package,
  DollarSign,
  Settings,
} from "lucide-react";
import { mockLensPackages } from "@/constants/admin-mock-data";

export default function LensPackagesPage() {
  const [packages, setPackages] = useState(mockLensPackages);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState<any>(null);

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.material.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && pkg.isActive) ||
      (statusFilter === "inactive" && !pkg.isActive);
    return matchesSearch && matchesStatus;
  });

  const handleToggleStatus = (id: string) => {
    setPackages(
      packages.map((pkg) =>
        pkg.id === id ? { ...pkg, isActive: !pkg.isActive } : pkg
      )
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa gói tròng này?")) {
      setPackages(packages.filter((pkg) => pkg.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Quản lý gói tròng
          </h1>
          <p className="text-gray-600">
            Quản lý các gói tròng kính và thông số kỹ thuật
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </button>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm gói tròng
          </button>
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
                placeholder="Tìm kiếm gói tròng..."
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
              <option value="active">Đang hoạt động</option>
              <option value="inactive">Không hoạt động</option>
            </select>
            <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              Bộ lọc
            </button>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{pkg.brand}</p>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        pkg.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {pkg.isActive ? (
                        <>
                          <Eye className="h-3 w-3 mr-1" />
                          Hoạt động
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-3 w-3 mr-1" />
                          Tạm dừng
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setEditingPackage(pkg)}
                    className="text-blue-600 hover:text-blue-900 p-1"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(pkg.id)}
                    className="text-red-600 hover:text-red-900 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600 p-1">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Chất liệu:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {pkg.material}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Chiết suất:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {pkg.index}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Giá:</span>
                  <span className="text-sm font-bold text-blue-600">
                    ₫{pkg.price.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500 mb-2">Lớp phủ:</div>
                <div className="flex flex-wrap gap-1">
                  {pkg.coating.map((coat, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {coat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500 mb-2">
                  Thông số kỹ thuật:
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <div className="text-gray-500">SPH:</div>
                    <div className="font-medium">
                      {pkg.specifications.sphRange.min} đến{" "}
                      {pkg.specifications.sphRange.max}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">CYL:</div>
                    <div className="font-medium">
                      {pkg.specifications.cylRange.min} đến{" "}
                      {pkg.specifications.cylRange.max}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">AXIS:</div>
                    <div className="font-medium">
                      {pkg.specifications.axisRange.min}° đến{" "}
                      {pkg.specifications.axisRange.max}°
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleToggleStatus(pkg.id)}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    pkg.isActive
                      ? "bg-red-50 text-red-700 hover:bg-red-100"
                      : "bg-green-50 text-green-700 hover:bg-green-100"
                  }`}
                >
                  {pkg.isActive ? "Tạm dừng" : "Kích hoạt"}
                </button>
                <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100">
                  Xem chi tiết
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white px-6 py-3 border-t border-gray-200">
        <div className="flex items-center text-sm text-gray-700">
          Hiển thị <span className="font-medium">1</span> đến{" "}
          <span className="font-medium">{filteredPackages.length}</span> trong{" "}
          <span className="font-medium">{filteredPackages.length}</span> kết quả
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

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-900/30 transition-opacity" />
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full relative z-10">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      {editingPackage
                        ? "Chỉnh sửa gói tròng"
                        : "Thêm gói tròng mới"}
                    </h3>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Tên gói tròng
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập tên gói tròng"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Thương hiệu
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập thương hiệu"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Chất liệu
                          </label>
                          <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Plastic</option>
                            <option>Polycarbonate</option>
                            <option>Trivex</option>
                            <option>High Index</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Chiết suất
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="1.5"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Giá
                        </label>
                        <input
                          type="number"
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Nhập giá"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Mô tả
                        </label>
                        <textarea
                          rows={3}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Nhập mô tả gói tròng"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Lớp phủ (cách nhau bằng dấu phẩy)
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Chống tia UV, Chống trầy, Chống phản quang"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            SPH Min
                          </label>
                          <input
                            type="number"
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="-10"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            SPH Max
                          </label>
                          <input
                            type="number"
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="+8"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            CYL Max
                          </label>
                          <input
                            type="number"
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="-6"
                          />
                        </div>
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
                  {editingPackage ? "Cập nhật" : "Thêm mới"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingPackage(null);
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
