"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
  Upload,
  Gift,
  Percent,
  DollarSign,
  Truck,
  Calendar,
  Users,
  Tag,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  getPromotions,
  createPromotion,
  updatePromotion,
  togglePromotionStatus,
  deletePromotion,
  getPromotionSummary,
  Promotion,
  PromotionCreatePayload,
} from "@/services/admin/promotions";
import { useToast } from "@/contexts/ToastContext";

export default function PromotionsPage() {
  const toast = useToast();
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 20;

  // Summary state
  const [summary, setSummary] = useState({
    totalPromotions: 0,
    activePromotions: 0,
    usedCount: 0,
    expiredPromotions: 0,
  });

  // Form state
  const [formData, setFormData] = useState<Partial<PromotionCreatePayload>>({
    code: "",
    name: "",
    type: "percentage",
    value: 0,
    startDate: "",
    endDate: "",
    minOrderAmount: 0,
    maxDiscountAmount: 0,
    usageLimit: 0,
    active: true,
  });

  const loadPromotions = async (page = 0) => {
    try {
      setLoading(true);
      const response = await getPromotions(page, pageSize);
      setPromotions(response.content);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
      setCurrentPage(response.number);
    } catch (error) {
      console.error("Error loading promotions:", error);
      toast.showError("Không thể tải danh sách khuyến mãi");
    } finally {
      setLoading(false);
    }
  };

  const loadSummary = async () => {
    try {
      const data = await getPromotionSummary();
      setSummary({
        totalPromotions: data.total || 0,
        activePromotions: data.active || 0,
        usedCount: data.used || 0,
        expiredPromotions: data.expired || 0,
      });
    } catch (error) {
       // Summary API might not be fully implemented in backend yet or returns slightly different structure
       console.warn("Could not load summary", error);
    }
  };

  useEffect(() => {
    loadPromotions();
    loadSummary();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await togglePromotionStatus(id, !currentStatus);
      toast.showSuccess("Cập nhật trạng thái thành công!");
      loadPromotions(currentPage);
      loadSummary();
    } catch (error: any) {
      toast.showError(error?.response?.data?.error || "Có lỗi xảy ra");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa khuyến mãi này?")) {
      try {
        await deletePromotion(id);
        toast.showSuccess("Xóa khuyến mãi thành công!");
        loadPromotions(currentPage);
        loadSummary();
      } catch (error: any) {
        toast.showError(error?.response?.data?.error || "Có lỗi xảy ra");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: PromotionCreatePayload = {
        code: formData.code!,
        name: formData.name!,
        type: formData.type as any,
        value: Number(formData.value),
        // Append time and timezone for OffsetDateTime compatibility
        startDate: `${formData.startDate}T00:00:00Z`,
        endDate: `${formData.endDate}T23:59:59Z`,
        minOrderAmount: Number(formData.minOrderAmount) || undefined,
        maxDiscountAmount: Number(formData.maxDiscountAmount) || undefined,
        usageLimit: Number(formData.usageLimit) || undefined,
        active: formData.active,
      };

      if (editingPromotion) {
        await updatePromotion(editingPromotion.id, payload);
        toast.showSuccess("Cập nhật khuyến mãi thành công!");
      } else {
        await createPromotion(payload);
        toast.showSuccess("Tạo khuyến mãi thành công!");
      }

      setShowAddModal(false);
      setEditingPromotion(null);
      resetForm();
      loadPromotions(currentPage);
      loadSummary();
    } catch (error: any) {
      toast.showError(error?.response?.data?.error || "Có lỗi xảy ra");
    }
  };

  const resetForm = () => {
    setFormData({
      code: "",
      name: "",
      type: "percentage",
      value: 0,
      startDate: "",
      endDate: "",
      minOrderAmount: 0,
      maxDiscountAmount: 0,
      usageLimit: 0,
      active: true,
    });
  };

  const openEditModal = (promo: Promotion) => {
    setEditingPromotion(promo);
    setFormData({
      code: promo.code,
      name: promo.name,
      type: promo.type,
      value: promo.value,
      startDate: promo.startDate?.split('T')[0],
      endDate: promo.endDate?.split('T')[0],
      minOrderAmount: promo.minOrderAmount,
      maxDiscountAmount: promo.maxDiscountAmount,
      usageLimit: promo.usageLimit,
      active: promo.active,
    });
    setShowAddModal(true);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "percentage":
        return <Percent className="h-4 w-4" />;
      case "fixed":
        return <DollarSign className="h-4 w-4" />;
      case "free_shipping":
        return <Truck className="h-4 w-4" />;
      default:
        return <Gift className="h-4 w-4" />;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case "percentage":
        return "Phần trăm";
      case "fixed":
        return "Giá cố định";
      case "free_shipping":
        return "Miễn phí ship";
      default:
        return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "percentage":
        return "bg-blue-100 text-blue-800";
      case "fixed":
        return "bg-green-100 text-green-800";
      case "free_shipping":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const isExpired = (endDate: string) => {
    return new Date(endDate) < new Date();
  };

  const isPromoActive = (promo: Promotion) => {
    const now = new Date();
    const start = new Date(promo.startDate);
    const end = new Date(promo.endDate);
    return promo.active && now >= start && now <= end;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Quản lý khuyến mãi
          </h1>
          <p className="text-gray-600">
            Quản lý mã giảm giá và chương trình khuyến mãi
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              setEditingPromotion(null);
              resetForm();
              setShowAddModal(true);
            }}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm khuyến mãi
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Gift className="h-8 w-8 text-blue-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Tổng khuyến mãi
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {summary.totalPromotions}
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
              <p className="text-sm font-medium text-gray-500">
                Đang hoạt động
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {summary.activePromotions}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-purple-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Đã sử dụng</p>
              <p className="text-2xl font-semibold text-gray-900">
                {summary.usedCount}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Hết hạn</p>
              <p className="text-2xl font-semibold text-gray-900">
                {summary.expiredPromotions}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Promotions Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khuyến mãi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loại
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giá trị
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sử dụng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thời gian
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
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center">
                    Đang tải...
                  </td>
                </tr>
              ) : promotions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center">
                    Chưa có chương trình khuyến mãi nào
                  </td>
                </tr>
              ) : (
                promotions.map((promo) => (
                  <tr key={promo.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {promo.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {promo.minOrderAmount &&
                          `Đơn tối thiểu: ₫${promo.minOrderAmount.toLocaleString()}`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        <Tag className="h-3 w-3 mr-1" />
                        {promo.code}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(
                          promo.type
                        )}`}
                      >
                        {getTypeIcon(promo.type)}
                        <span className="ml-1">{getTypeText(promo.type)}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {promo.type === "percentage"
                        ? `${promo.value}%`
                        : promo.type === "fixed"
                        ? `₫${promo.value.toLocaleString()}`
                        : "Miễn phí"}
                      {promo.maxDiscountAmount && (
                        <div className="text-xs text-gray-500">
                          Tối đa: ₫{promo.maxDiscountAmount.toLocaleString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {promo.usedCount}
                        {promo.usageLimit && `/${promo.usageLimit}`}
                      </div>
                      {promo.usageLimit && (
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                          <div
                            className="bg-blue-600 h-1 rounded-full"
                            style={{
                              width: `${
                                (promo.usedCount / promo.usageLimit) * 100
                              }%`,
                            }}
                          />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {promo.startDate?.split('T')[0]}
                      </div>
                      <div className="text-xs text-gray-400">
                        đến {promo.endDate?.split('T')[0]}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            isPromoActive(promo)
                              ? "bg-green-100 text-green-800"
                              : isExpired(promo.endDate)
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {isPromoActive(promo) ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Hoạt động
                            </>
                          ) : isExpired(promo.endDate) ? (
                            <>
                              <XCircle className="h-3 w-3 mr-1" />
                              Hết hạn
                            </>
                          ) : (
                            <>
                              <Clock className="h-3 w-3 mr-1" />
                              Chưa bắt đầu
                            </>
                          )}
                        </span>
                        <button
                          onClick={() => handleToggleStatus(promo.id, promo.active)}
                          className={`text-xs ${
                            promo.active
                              ? "text-red-600 hover:text-red-900"
                              : "text-green-600 hover:text-green-900"
                          }`}
                        >
                          {promo.active ? "Tạm dừng" : "Kích hoạt"}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => openEditModal(promo)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(promo.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

       {/* Pagination */}
       {totalPages > 0 && (
        <div className="flex items-center justify-between bg-white px-6 py-3 border-t border-gray-200">
          <div className="flex items-center text-sm text-gray-700">
             Trang <span className="font-medium">{currentPage + 1}</span> / <span className="font-medium">{totalPages}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => loadPromotions(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              Trước
            </button>
            <button
              onClick={() => loadPromotions(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage >= totalPages - 1}
              className="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              Sau
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
         <div className="fixed inset-0 bg-gray-900/30 flex items-center justify-center z-[60] p-4">
           <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
             <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                {editingPromotion
                  ? "Chỉnh sửa khuyến mãi"
                  : "Thêm khuyến mãi mới"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Tên khuyến mãi <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name || ""}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập tên khuyến mãi"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Mã khuyến mãi <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.code || ""}
                      onChange={(e) => setFormData({...formData, code: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập mã khuyến mãi"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Loại khuyến mãi
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="percentage">Phần trăm</option>
                      <option value="fixed">Giá cố định</option>
                      <option value="free_shipping">Miễn phí ship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Giá trị <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.value}
                      onChange={(e) => setFormData({...formData, value: Number(e.target.value)})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập giá trị"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Đơn tối thiểu
                    </label>
                    <input
                      type="number"
                      value={formData.minOrderAmount || ""}
                      onChange={(e) => setFormData({...formData, minOrderAmount: Number(e.target.value)})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập đơn tối thiểu"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Giảm tối đa
                    </label>
                    <input
                      type="number"
                      value={formData.maxDiscountAmount || ""}
                      onChange={(e) => setFormData({...formData, maxDiscountAmount: Number(e.target.value)})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập giảm tối đa"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Ngày bắt đầu <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.startDate || ""}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Ngày kết thúc <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.endDate || ""}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Giới hạn sử dụng
                  </label>
                  <input
                    type="number"
                    value={formData.usageLimit || ""}
                    onChange={(e) => setFormData({...formData, usageLimit: Number(e.target.value)})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Để trống nếu không giới hạn"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({...formData, active: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Kích hoạt khuyến mãi ngay
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                   <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {editingPromotion ? "Cập nhật" : "Thêm mới"}
                  </button>
                </div>
              </form>
          </div>
        </div>
      )}
    </div>
  );
}
