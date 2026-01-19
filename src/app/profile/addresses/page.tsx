"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getCurrentUserId } from "@/utils/auth-storage";
import {
  createUserAddress,
  deleteUserAddress,
  getUserAddresses,
  type CreateAddressPayload,
  type UserAddress,
} from "@/services/customer/users";
import { MapPin, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/contexts/ToastContext";

export default function AddressesPage() {
  const router = useRouter();
  const toast = useToast();
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<UserAddress[]>([]);

  const [form, setForm] = useState<CreateAddressPayload>({
    recipient: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    district: "",
    ward: "",
    postalCode: "",
    country: "VN",
    isDefault: true,
  });

  useEffect(() => {
    const id = getCurrentUserId();
    if (!id) {
      router.push("/auth/login");
      return;
    }
    setUserId(id);
  }, [router]);

  const load = async (uid: string) => {
    try {
      setLoading(true);
      const data = await getUserAddresses(uid);
      setAddresses(data);
    } catch (e) {
      console.error(e);
      toast.showError("Không thể tải địa chỉ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) return;
    load(userId);
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    try {
      setSaving(true);
      await createUserAddress(userId, form);
      setForm({
        recipient: "",
        phone: "",
        line1: "",
        line2: "",
        city: "",
        district: "",
        ward: "",
        postalCode: "",
        country: "VN",
        isDefault: false,
      });
      await load(userId);
      toast.showSuccess("Đã thêm địa chỉ thành công!");
    } catch (e: any) {
      console.error(e);
      toast.showError(e?.response?.data?.error || "Không thể thêm địa chỉ");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (addressId: string) => {
    if (!userId) return;

    try {
      setDeleting(addressId);
      await deleteUserAddress(userId, addressId);
      await load(userId);
      toast.showSuccess("Đã xóa địa chỉ thành công!");
      setConfirmDelete(null);
    } catch (e: any) {
      console.error(e);
      toast.showError(e?.response?.data?.error || "Không thể xóa địa chỉ");
    } finally {
      setDeleting(null);
    }
  };

  const defaultAddress = useMemo(
    () => addresses.find((a) => a.isDefault) || addresses[0],
    [addresses]
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sổ địa chỉ</h1>
            <p className="mt-1 text-sm text-gray-600">
              Quản lý địa chỉ giao hàng / xuất hóa đơn
            </p>
          </div>
          <button
            onClick={() => router.push("/profile")}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Về trang tài khoản
          </button>
        </div>

        {/* List */}
        <section className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Địa chỉ</h2>
              <p className="text-sm text-gray-500">
                {addresses.length} địa chỉ
                {defaultAddress ? " • Có địa chỉ mặc định" : ""}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="p-6 text-gray-600">Đang tải...</div>
          ) : addresses.length === 0 ? (
            <div className="p-6 text-gray-600">Chưa có địa chỉ nào.</div>
          ) : (
            <div className="divide-y divide-gray-200">
              {addresses.map((a) => (
                <div key={a.id} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-gray-100 rounded-md">
                      <MapPin className="h-5 w-5 text-gray-700" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">
                          {a.recipient} • {a.phone}
                        </p>
                        {a.isDefault && (
                          <span className="text-xs font-medium rounded-full px-2 py-0.5 bg-green-100 text-green-800">
                            Mặc định
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-700">
                        {a.line1}
                        {a.line2 ? `, ${a.line2}` : ""}
                      </p>
                      <p className="text-sm text-gray-600">
                        {a.ward ? `${a.ward}, ` : ""}
                        {a.district}, {a.city}
                        {a.postalCode ? ` • ${a.postalCode}` : ""}
                      </p>
                    </div>
                    <button
                      onClick={() => setConfirmDelete(a.id)}
                      disabled={deleting === a.id}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                      title="Xóa địa chỉ"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Create */}
        <section className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Thêm địa chỉ mới
              </h2>
              <p className="text-sm text-gray-500">Nhập thông tin địa chỉ</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Người nhận
                </label>
                <input
                  value={form.recipient}
                  onChange={(e) => setForm({ ...form, recipient: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại
                </label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Địa chỉ (line1)
                </label>
                <input
                  value={form.line1}
                  onChange={(e) => setForm({ ...form, line1: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Địa chỉ (line2)
                </label>
                <input
                  value={form.line2 ?? ""}
                  onChange={(e) => setForm({ ...form, line2: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tỉnh/TP
                </label>
                <input
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quận/Huyện
                </label>
                <input
                  value={form.district}
                  onChange={(e) => setForm({ ...form, district: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phường/Xã
                </label>
                <input
                  value={form.ward ?? ""}
                  onChange={(e) => setForm({ ...form, ward: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mã bưu chính
                </label>
                <input
                  value={form.postalCode ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, postalCode: e.target.value })
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="isDefault"
                  type="checkbox"
                  checked={!!form.isDefault}
                  onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
                  className="h-4 w-4"
                />
                <label htmlFor="isDefault" className="text-sm text-gray-700">
                  Đặt làm mặc định
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-60"
            >
              <Plus className="h-4 w-4" />
              {saving ? "Đang lưu..." : "Thêm địa chỉ"}
            </button>
          </form>
        </section>

        {/* Delete Confirmation Modal */}
        {confirmDelete && (
          <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Xác nhận xóa địa chỉ
              </h3>
              <p className="text-gray-600 mb-6">
                Bạn có chắc chắn muốn xóa địa chỉ này? Hành động này không thể hoàn tác.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  disabled={deleting === confirmDelete}
                >
                  Hủy
                </button>
                <button
                  onClick={() => handleDelete(confirmDelete)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                  disabled={deleting === confirmDelete}
                >
                  {deleting === confirmDelete ? "Đang xóa..." : "Xóa"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}


