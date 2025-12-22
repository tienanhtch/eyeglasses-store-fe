"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Package,
  CreditCard,
  Eye,
} from "lucide-react";
import { getCurrentUserId } from "@/utils/auth-storage";
import { getStores, type Store } from "@/services/stores";
import { getUserAddresses, getUserProfile, type UserAddress, type UserProfile } from "@/services/customer/users";
import { listOrders, getOrderDetail, type Order } from "@/services/customer/orders";
import { listMyAppointments, type CustomerAppointment } from "@/services/customer/appointments";

const currencyFormatter = new Intl.NumberFormat("vi-VN");

export default function ProfilePage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [appointments, setAppointments] = useState<CustomerAppointment[]>([]);
  const [stores, setStores] = useState<Store[]>([]);

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<Order | null>(null);
  const [loadingOrderDetail, setLoadingOrderDetail] = useState(false);

  useEffect(() => {
    const id = getCurrentUserId();
    if (!id) {
      router.push("/auth/login");
      return;
    }
    setUserId(id);
  }, [router]);

  const storeMap = useMemo(() => {
    const m = new Map<string, Store>();
    stores.forEach((s) => m.set(s.id, s));
    return m;
  }, [stores]);

  const defaultAddress = useMemo(
    () => addresses.find((a) => a.isDefault) || addresses[0],
    [addresses]
  );

  const loadAll = async (uid: string) => {
    try {
      setLoading(true);
      const [p, a, o, ap, s] = await Promise.all([
        getUserProfile(uid),
        getUserAddresses(uid),
        listOrders(uid),
        listMyAppointments(uid),
        getStores(),
      ]);
      setProfile(p);
      setAddresses(a);
      setOrders(o);
      setAppointments(ap);
      setStores(s);
    } catch (e: any) {
      console.error(e);
      alert(e?.response?.data?.error || "Không thể tải dữ liệu tài khoản");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) return;
    loadAll(userId);
  }, [userId]);

  const orderStatusMeta = (status: string) => {
    switch (status) {
      case "PAID":
        return {
          label: "Đã thanh toán",
          color: "bg-green-100 text-green-800",
          icon: <CheckCircle className="h-4 w-4 text-green-600" />,
        };
      case "PENDING":
        return {
          label: "Chờ xử lý",
          color: "bg-yellow-100 text-yellow-800",
          icon: <Clock className="h-4 w-4 text-yellow-600" />,
        };
      case "FAILED":
        return {
          label: "Thất bại",
          color: "bg-red-100 text-red-800",
          icon: <AlertCircle className="h-4 w-4 text-red-600" />,
        };
      default:
        return {
          label: status,
          color: "bg-gray-100 text-gray-800",
          icon: <Package className="h-4 w-4 text-gray-600" />,
        };
    }
  };

  const appointmentStatusMeta = (status: string) => {
    switch (status) {
      case "BOOKED":
        return {
          label: "Đã đặt",
          color: "bg-blue-100 text-blue-800",
          icon: <CheckCircle className="h-4 w-4 text-blue-600" />,
        };
      case "CHECKED_IN":
        return {
          label: "Đã check-in",
          color: "bg-indigo-100 text-indigo-800",
          icon: <CheckCircle className="h-4 w-4 text-indigo-600" />,
        };
      case "CANCELLED":
        return {
          label: "Đã hủy",
          color: "bg-gray-100 text-gray-800",
          icon: <AlertCircle className="h-4 w-4 text-gray-600" />,
        };
      case "COMPLETED":
        return {
          label: "Hoàn thành",
          color: "bg-green-100 text-green-800",
          icon: <CheckCircle className="h-4 w-4 text-green-600" />,
        };
      default:
        return {
          label: status,
          color: "bg-gray-100 text-gray-800",
          icon: <AlertCircle className="h-4 w-4 text-gray-600" />,
        };
    }
  };

  const openOrderDetail = async (oid: string) => {
    try {
      setSelectedOrderId(oid);
      setSelectedOrderDetail(null);
      setLoadingOrderDetail(true);
      const detail = await getOrderDetail(oid);
      setSelectedOrderDetail(detail);
    } catch (e: any) {
      console.error(e);
      alert(e?.response?.data?.error || "Không thể tải chi tiết đơn hàng");
    } finally {
      setLoadingOrderDetail(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {loading ? (
          <div className="text-gray-600">Đang tải...</div>
        ) : !profile ? (
          <div className="text-gray-600">Không tìm thấy thông tin tài khoản.</div>
        ) : (
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tài khoản của bạn</h1>
          <p className="text-gray-600">
            Quản lý thông tin cá nhân, đơn hàng và lịch hẹn tại Quang Vũ
          </p>
        </div>
        <div className="flex gap-3">
          <a
            href="#orders"
            className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Đơn hàng
          </a>
          <a
            href="#appointments"
            className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Lịch hẹn
          </a>
          <button
            onClick={() => router.push("/profile/addresses")}
            className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Địa chỉ
          </button>
        </div>
      </header>

      <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gray-900 text-white flex items-center justify-center text-2xl font-semibold">
            {profile.fullName?.charAt(0) || "U"}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {profile.fullName}
            </h2>
            <p className="text-gray-500">
              Thành viên từ{" "}
              {profile.createdAt
                ? new Date(profile.createdAt).toLocaleDateString("vi-VN")
                : "-"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-sm font-medium text-gray-900">{profile.email}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Số điện thoại</p>
              <p className="text-sm font-medium text-gray-900">{profile.phone}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Địa chỉ mặc định</p>
              <p className="text-sm font-medium text-gray-900">
                {defaultAddress
                  ? `${defaultAddress.line1}, ${defaultAddress.district}, ${defaultAddress.city}`
                  : "Chưa có địa chỉ"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Tổng đơn hàng</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">{orders.length}</p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Lịch hẹn sắp tới</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">{appointments.length}</p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Tổng chi tiêu</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              ₫
              {currencyFormatter.format(
                orders.reduce((sum, order) => sum + (order.grandTotal || 0), 0)
              )}
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Địa chỉ</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {currencyFormatter.format(addresses.length)}
            </p>
          </div>
        </div>
      </section>

      <section id="orders" className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Đơn hàng gần đây</h2>
            <p className="text-sm text-gray-500">Theo dõi trạng thái và chi tiết đơn hàng</p>
          </div>
          <button
            onClick={() => router.push("/cart")}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Đi tới giỏ hàng
          </button>
        </div>
        <div className="divide-y divide-gray-200">
          {orders.length === 0 ? (
            <div className="p-6 text-gray-600">Bạn chưa có đơn hàng nào.</div>
          ) : (
          orders.map((order) => {
            const status = orderStatusMeta(order.status);
            return (
              <div key={order.id} className="p-6 hover:bg-gray-50">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-sm font-semibold text-gray-900">
                        #{order.orderNo}
                      </h3>
                      {status && (
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${status.color}`}>
                          {status.icon}
                          {status.label}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-4 w-4" />{" "}
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString("vi-VN")
                          : "-"}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Package className="h-4 w-4" /> {order.items?.length || 0} sản phẩm
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <CreditCard className="h-4 w-4" /> ₫{currencyFormatter.format(order.grandTotal || 0)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => openOrderDetail(order.id)}
                    className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <Eye className="h-4 w-4" />
                    Xem chi tiết
                  </button>
                </div>
              </div>
            );
          })) }
        </div>
      </section>

      <section id="appointments" className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Lịch hẹn sắp tới</h2>
            <p className="text-sm text-gray-500">Chuẩn bị cho các dịch vụ sắp tới của bạn</p>
          </div>
          <button
            onClick={() => router.push("/appointments")}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Đặt lịch mới
          </button>
        </div>
        <div className="divide-y divide-gray-200">
          {appointments.length === 0 ? (
            <div className="p-6 text-gray-600">Bạn chưa có lịch hẹn nào.</div>
          ) : (
          appointments.map((appointment) => {
            const status = appointmentStatusMeta(appointment.status);
            return (
              <div key={appointment.id} className="p-6 hover:bg-gray-50">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-sm font-semibold text-gray-900">
                        {storeMap.get(appointment.storeId)?.name || "Lịch hẹn"}
                      </h3>
                      {status && (
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${status.color}`}>
                          {status.icon}
                          {status.label}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-4 w-4" />{" "}
                        {new Date(appointment.startTime).toLocaleDateString("vi-VN")}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-4 w-4" />{" "}
                        {new Date(appointment.startTime).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}{" "}
                        -{" "}
                        {new Date(appointment.endTime).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                      <span className="inline-flex items-center gap-1">Trạng thái: <b>{appointment.status}</b></span>
                    </div>
                    {appointment.note && (
                      <p className="mt-2 text-sm text-gray-600">
                        Ghi chú: {appointment.note}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => router.push("/appointments")}
                    className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Quản lý
                  </button>
                </div>
              </div>
            );
          })) }
        </div>
      </section>

      {selectedOrderId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 px-4 py-6">
          <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Chi tiết đơn hàng
                </h3>
                <p className="text-sm text-gray-500">
                  Thông tin chi tiết sản phẩm và thanh toán
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedOrderId(null);
                  setSelectedOrderDetail(null);
                }}
                className="rounded-full border border-gray-200 p-2 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-6 px-6 py-6">
              {loadingOrderDetail || !selectedOrderDetail ? (
                <div className="text-gray-600">Đang tải chi tiết...</div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500">Mã đơn</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedOrderDetail.orderNo}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Ngày đặt</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(selectedOrderDetail.createdAt).toLocaleString("vi-VN")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Trạng thái</p>
                      <p className="text-sm font-medium text-gray-900">
                        {orderStatusMeta(selectedOrderDetail.status).label}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tổng tiền</p>
                      <p className="text-sm font-medium text-gray-900">
                        ₫{currencyFormatter.format(selectedOrderDetail.grandTotal || 0)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">Sản phẩm</p>
                    <div className="mt-3 space-y-3">
                      {selectedOrderDetail.items?.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between rounded-md border border-gray-200 px-4 py-3"
                        >
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {item.nameSnapshot}
                            </p>
                            <p className="text-sm text-gray-500">
                              SKU: {item.skuSnapshot} • SL: {item.qty}
                            </p>
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            ₫{currencyFormatter.format(item.lineTotal || 0)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="flex justify-end border-t border-gray-200 px-6 py-4">
              <button
                onClick={() => {
                  setSelectedOrderId(null);
                  setSelectedOrderDetail(null);
                }}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
      )}
      </main>

      <Footer />
    </div>
  );
}


