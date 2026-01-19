"use client";

import { useState, useEffect } from "react";
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
import { useToast } from "@/contexts/ToastContext";
import {
  getLensPackages,
  createLensPackage,
  updateLensPackage,
  deleteLensPackage,
  updateLensPackageStatus,
  LensPackage,
  LensPackageCreatePayload,
} from "@/services/admin/lensPackages";

export default function LensPackagesPage() {
  const toast = useToast();
  const [packages, setPackages] = useState<LensPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [editingPackage, setEditingPackage] = useState<LensPackage | null>(null);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    index: 1.5,
    retailPrice: 0,
    salePrice: 0,
    coating: "",
    description: "",
    minSph: -10,
    maxSph: 8,
    minCyl: -6,
    maxCyl: 0,
  });

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && pkg.active) ||
      (statusFilter === "inactive" && !pkg.active);
    return matchesSearch && matchesStatus;
  });

  // Load lens packages
  const loadPackages = async () => {
    try {
      setLoading(true);
      const data = await getLensPackages();
      setPackages(data);
    } catch (error) {
      console.error("Error loading lens packages:", error);
      toast.showError("Không thể tải danh sách gói tròng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  useEffect(() => {
    if (editingPackage) {
      setFormData({
        code: editingPackage.code,
        name: editingPackage.name,
        index: editingPackage.refractiveIdx,
        retailPrice: editingPackage.retailPrice,
        salePrice: editingPackage.salePrice || 0,
        coating: editingPackage.features || "",
        description: "", // Description not in GET response yet?
        minSph: editingPackage.minSph,
        maxSph: editingPackage.maxSph,
        minCyl: editingPackage.minCyl,
        maxCyl: editingPackage.maxCyl,
      });
      setShowAddModal(true);
    }
  }, [editingPackage]);

  // Handle toggle status
  const handleToggleStatus = async (id: string, currentActive: boolean) => {
    try {
      await updateLensPackageStatus(id, !currentActive);
      toast.showSuccess("Cập nhật trạng thái thành công!");
      loadPackages();
    } catch (error: any) {
      console.error("Error updating status:", error);
      toast.showError(error?.response?.data?.error || "Có lỗi xảy ra");
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      await deleteLensPackage(id);
      toast.showSuccess("Xóa gói tròng thành công!");
      setConfirmDelete(null);
      loadPackages();
    } catch (error: any) {
      console.error("Error deleting package:", error);
      toast.showError(error?.response?.data?.error || "Có lỗi xảy ra khi xóa");
    }
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: LensPackageCreatePayload = {
        code: formData.code,
        name: formData.name,
        brand: "",
        material: "",
        refractiveIdx: formData.index,
        retailPrice: formData.retailPrice,
        salePrice: formData.salePrice || undefined,
        features: formData.coating ? formData.coating.split(",").map(c => c.trim()) : [],
        description: formData.description || undefined,
        minSph: formData.minSph,
        maxSph: formData.maxSph,
        minCyl: formData.minCyl,
        maxCyl: formData.maxCyl,
      };

      if (editingPackage) {
        await updateLensPackage(editingPackage.id, payload);
        toast.showSuccess("Cập nhật gói tròng thành công!");
      } else {
        await createLensPackage(payload);
        toast.showSuccess("Tạo gói tròng thành công!");
      }

      setShowAddModal(false);
      setEditingPackage(null);
      resetForm();
      loadPackages();
    } catch (error: any) {
      console.error("Error saving package:", error);
      toast.showError(error?.response?.data?.error || "Có lỗi xảy ra khi lưu");
    }
  };

  const resetForm = () => {
    setFormData({
      code: "",
      name: "",
      index: 1.5,
      retailPrice: 0,
      salePrice: 0,
      coating: "",
      description: "",
      minSph: -10,
      maxSph: 8,
      minCyl: -6,
      maxCyl: 0,
    });
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
                  <p className="text-sm text-gray-500 mb-2">{pkg.code}</p>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        pkg.active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {pkg.active ? (
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
                    onClick={() => setConfirmDelete(pkg.id)}
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
                  <span className="text-sm text-gray-500">Chiết suất:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {pkg.refractiveIdx}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Giá bán lẻ:</span>
                  <span className="text-sm font-bold text-blue-600">
                    ₫{pkg.retailPrice?.toLocaleString()}
                  </span>
                </div>
                {pkg.salePrice && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Giá KM:</span>
                    <span className="text-sm font-bold text-red-600">
                      ₫{pkg.salePrice.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500 mb-2">Tính năng:</div>
                <div className="flex flex-wrap gap-1">
                  {pkg.features ? (
                    pkg.features.split(",").map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {feature.trim()}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400">Không có</span>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500 mb-2">
                  Thông số kỹ thuật:
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-gray-500">SPH:</div>
                    <div className="font-medium">
                      {pkg.minSph} đến {pkg.maxSph}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">CYL:</div>
                    <div className="font-medium">
                      {pkg.minCyl} đến {pkg.maxCyl}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleToggleStatus(pkg.id, pkg.active)}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    pkg.active
                      ? "bg-red-50 text-red-700 hover:bg-red-100"
                      : "bg-green-50 text-green-700 hover:bg-green-100"
                  }`}
                >
                  {pkg.active ? "Tạm dừng" : "Kích hoạt"}
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
                    <form id="lens-package-form" onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Mã gói tròng
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.code}
                            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                            placeholder="LP001"
                            disabled={!!editingPackage}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Tên gói tròng
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập tên gói tròng"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Chiết suất
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            required
                            value={formData.index}
                            onChange={(e) => setFormData({ ...formData, index: parseFloat(e.target.value) })}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="1.5"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Giá bán lẻ
                          </label>
                          <input
                            type="number"
                            required
                            value={formData.retailPrice}
                            onChange={(e) => setFormData({ ...formData, retailPrice: parseFloat(e.target.value) })}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập giá"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Giá khuyến mãi (tùy chọn)
                        </label>
                        <input
                          type="number"
                          value={formData.salePrice}
                          onChange={(e) => setFormData({ ...formData, salePrice: parseFloat(e.target.value) })}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Nhập giá khuyến mãi"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Mô tả
                        </label>
                        <textarea
                          rows={3}
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                          value={formData.coating}
                          onChange={(e) => setFormData({ ...formData, coating: e.target.value })}
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
                            step="0.25"
                            value={formData.minSph}
                            onChange={(e) => setFormData({ ...formData, minSph: parseFloat(e.target.value) })}
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
                            step="0.25"
                            value={formData.maxSph}
                            onChange={(e) => setFormData({ ...formData, maxSph: parseFloat(e.target.value) })}
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
                            step="0.25"
                            value={formData.maxCyl}
                            onChange={(e) => setFormData({ ...formData, maxCyl: parseFloat(e.target.value) })}
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
                  type="submit"
                  form="lens-package-form"
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

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Xác nhận xóa gói tròng
            </h3>
            <p className="text-gray-600 mb-6">
              Bạn có chắc chắn muốn xóa gói tròng này? Hành động này không thể hoàn tác.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
