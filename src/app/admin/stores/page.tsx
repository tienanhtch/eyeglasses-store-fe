"use client";

import { useState, useEffect } from "react";
import {
  getStores,
  createStore,
  updateStore,
  deleteStore,
  Store,
  StoreCreatePayload,
} from "@/services/admin/stores";
import { Plus, Edit, Trash2, X, MapPin, Phone, Clock } from "lucide-react";

export default function AdminStoresPage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingStore, setEditingStore] = useState<Store | null>(null);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    address: "",
    lat: 0,
    lng: 0,
    phone: "",
    openHours: "",
  });

  // Load stores
  const loadStores = async () => {
    try {
      setLoading(true);
      const data = await getStores();
      setStores(data);
    } catch (error) {
      console.error("Error loading stores:", error);
      alert("Không thể tải danh sách cửa hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStores();
  }, []);

  // Handle create/update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingStore) {
        // Update
        const payload: Partial<StoreCreatePayload> = {
          name: formData.name,
          address: formData.address,
          phone: formData.phone,
          openHours: formData.openHours,
          lat: formData.lat || undefined,
          lng: formData.lng || undefined,
        };
        await updateStore(editingStore.id, payload);
        alert("Cập nhật cửa hàng thành công!");
      } else {
        // Create
        const payload: StoreCreatePayload = {
          code: formData.code,
          name: formData.name,
          address: formData.address,
          phone: formData.phone,
          openHours: formData.openHours,
          lat: formData.lat || undefined,
          lng: formData.lng || undefined,
        };
        await createStore(payload);
        alert("Tạo cửa hàng thành công!");
      }
      setShowModal(false);
      setEditingStore(null);
      resetForm();
      loadStores();
    } catch (error: any) {
      console.error("Error saving store:", error);
      alert(error?.response?.data?.error || "Có lỗi xảy ra khi lưu cửa hàng");
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa cửa hàng này?")) return;
    
    try {
      await deleteStore(id);
      alert("Xóa cửa hàng thành công!");
      loadStores();
    } catch (error: any) {
      console.error("Error deleting store:", error);
      alert(error?.response?.data?.error || "Có lỗi xảy ra khi xóa cửa hàng");
    }
  };

  const resetForm = () => {
    setFormData({
      code: "",
      name: "",
      address: "",
      lat: 0,
      lng: 0,
      phone: "",
      openHours: "",
    });
  };

  // Open modal for create
  const openCreateModal = () => {
    setEditingStore(null);
    resetForm();
    setShowModal(true);
  };

  // Open modal for edit
  const openEditModal = (store: Store) => {
    setEditingStore(store);
    setFormData({
      code: store.code,
      name: store.name,
      address: store.address,
      lat: store.lat || 0,
      lng: store.lng || 0,
      phone: store.phone,
      openHours: store.openHours,
    });
    setShowModal(true);
  };

  if (loading) {
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
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Cửa hàng</h1>
          <p className="text-sm text-gray-600 mt-1">
            Quản lý danh sách cửa hàng và chi nhánh
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Thêm cửa hàng
        </button>
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.length === 0 ? (
          <div className="col-span-full flex items-center justify-center py-12 text-gray-500">
            Chưa có cửa hàng nào
          </div>
        ) : (
          stores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{store.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">Mã: {store.code}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    store.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {store.isActive ? "Hoạt động" : "Đã đóng"}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mt-0.5 text-gray-400 flex-shrink-0" />
                  <span>{store.address}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{store.phone}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>{store.openHours}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => openEditModal(store)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  Chỉnh sửa
                </button>
                <button
                  onClick={() => handleDelete(store.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  Xóa
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/30 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingStore ? "Chỉnh sửa cửa hàng" : "Thêm cửa hàng mới"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {!editingStore && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mã cửa hàng <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                      placeholder="ST001"
                    />
                  </div>
                )}

                <div className={!editingStore ? "" : "col-span-2"}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên cửa hàng <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder="Cửa hàng Quận 1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Địa chỉ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="123 Đường ABC, Quận 1, TP.HCM"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Latitude (Vĩ độ)
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    value={formData.lat || ""}
                    onChange={(e) => setFormData({ ...formData, lat: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder="10.7769"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Longitude (Kinh độ)
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    value={formData.lng || ""}
                    onChange={(e) => setFormData({ ...formData, lng: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder="106.7009"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder="0123456789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Giờ mở cửa <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.openHours}
                    onChange={(e) => setFormData({ ...formData, openHours: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder="8:00-20:00"
                  />
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
                  {editingStore ? "Cập nhật" : "Tạo mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
