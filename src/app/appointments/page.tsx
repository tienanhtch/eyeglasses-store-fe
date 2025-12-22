"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getStores, type Store } from "@/services/stores";
import {
  bookAppointment,
  cancelAppointment,
  getStoreSlots,
  listMyAppointments,
  type AppointmentSlot,
  type CustomerAppointment,
} from "@/services/customer/appointments";
import { getCurrentUserId } from "@/utils/auth-storage";
import { Calendar, Clock, MapPin, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/contexts/ToastContext";

function formatTime(ts: string) {
  return new Date(ts).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function CustomerAppointmentsPage() {
  const router = useRouter();
  const { showError, showSuccess, showWarning, showInfo } = useToast();
  const [userId, setUserId] = useState<string>("");

  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState<string>("");
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [slots, setSlots] = useState<AppointmentSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<AppointmentSlot | null>(
    null
  );
  const [note, setNote] = useState<string>("");

  const [booking, setBooking] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loadingMine, setLoadingMine] = useState(false);
  const [myAppointments, setMyAppointments] = useState<CustomerAppointment[]>(
    []
  );

  useEffect(() => {
    const id = getCurrentUserId();
    if (!id) {
      router.push("/auth/login");
      return;
    }
    setUserId(id);
  }, [router]);

  useEffect(() => {
    const loadStores = async () => {
      try {
        const data = await getStores();
        setStores(data);
        if (data.length > 0) setSelectedStoreId(data[0].id);
      } catch (e) {
        console.error(e);
        showError("Không thể tải danh sách cửa hàng");
      }
    };
    loadStores();
  }, []);

  const storeMap = useMemo(() => {
    const m = new Map<string, Store>();
    stores.forEach((s) => m.set(s.id, s));
    return m;
  }, [stores]);

  const loadSlots = async () => {
    if (!selectedStoreId || !date) return;
    try {
      setLoadingSlots(true);
      const data = await getStoreSlots(selectedStoreId, date);
      setSlots(data);
      setSelectedSlot(null);
    } catch (e: any) {
      console.error(e);
      showError(e?.response?.data?.error || "Không thể tải lịch trống");
    } finally {
      setLoadingSlots(false);
    }
  };

  const loadMine = async () => {
    if (!userId) return;
    try {
      setLoadingMine(true);
      const data = await listMyAppointments(userId);
      setMyAppointments(data);
    } catch (e: any) {
      console.error(e);
      showError(e?.response?.data?.error || "Không thể tải lịch hẹn của bạn");
    } finally {
      setLoadingMine(false);
    }
  };

  useEffect(() => {
    if (!selectedStoreId) return;
    loadSlots();
  }, [selectedStoreId, date]);

  useEffect(() => {
    if (!userId) return;
    loadMine();
  }, [userId]);

  const handleBook = async () => {
    if (!userId) return;
    if (!selectedStoreId) return showWarning("Vui lòng chọn cửa hàng");
    if (!selectedSlot) return showWarning("Vui lòng chọn khung giờ");

    try {
      setBooking(true);
      await bookAppointment({
        userId,
        storeId: selectedStoreId,
        start: selectedSlot.start,
        end: selectedSlot.end,
        note,
      });
      showSuccess("Đặt lịch thành công!");
      setNote("");
      await Promise.all([loadSlots(), loadMine()]);
    } catch (e: any) {
      console.error(e);
      showError(e?.response?.data?.error || "Không thể đặt lịch");
    } finally {
      setBooking(false);
    }
  };

  const handleCancel = async (appointmentId: string) => {
    if (!confirm("Bạn chắc chắn muốn hủy lịch hẹn này?")) return;
    try {
      await cancelAppointment(appointmentId);
      await Promise.all([loadSlots(), loadMine()]);
      showSuccess("Đã hủy lịch hẹn");
    } catch (e: any) {
      console.error(e);
      showError(e?.response?.data?.error || "Không thể hủy lịch");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Đặt lịch khám mắt
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Chọn cửa hàng, ngày và khung giờ phù hợp
            </p>
          </div>
          <button
            onClick={() => router.push("/profile#appointments")}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Về tài khoản
          </button>
        </div>

        {/* Booking */}
        <section className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Chọn lịch</h2>
          </div>

          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cửa hàng
                </label>
                <select
                  value={selectedStoreId}
                  onChange={(e) => setSelectedStoreId(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  {stores.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
                {selectedStoreId && storeMap.get(selectedStoreId) && (
                  <p className="mt-2 text-xs text-gray-600 flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {storeMap.get(selectedStoreId)?.address}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ngày
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ghi chú
                </label>
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ví dụ: Khám mắt định kỳ"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Lịch trống
              </div>
              <button
                onClick={loadSlots}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Tải lại
              </button>
            </div>

            {loadingSlots ? (
              <div className="text-gray-600">Đang tải lịch trống...</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {slots.map((s) => {
                  const active = selectedSlot?.start === s.start;
                  return (
                    <button
                      key={s.start}
                      disabled={!s.available}
                      onClick={() => setSelectedSlot(s)}
                      className={`rounded-md border px-3 py-2 text-sm flex items-center justify-center gap-2 ${
                        !s.available
                          ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                          : active
                          ? "bg-gray-900 text-white border-gray-900"
                          : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <Clock className="h-4 w-4" />
                      {formatTime(s.start)}
                    </button>
                  );
                })}
              </div>
            )}

            <button
              onClick={handleBook}
              disabled={booking || !selectedSlot || !selectedSlot.available}
              className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-60"
            >
              <Plus className="h-4 w-4" />
              {booking ? "Đang đặt..." : "Đặt lịch"}
            </button>
          </div>
        </section>

        {/* My appointments */}
        <section className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Lịch hẹn của bạn
              </h2>
              <p className="text-sm text-gray-500">Quản lý các lịch đã đặt</p>
            </div>
            <button
              onClick={loadMine}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Tải lại
            </button>
          </div>

          {loadingMine ? (
            <div className="p-6 text-gray-600">Đang tải...</div>
          ) : myAppointments.length === 0 ? (
            <div className="p-6 text-gray-600">Bạn chưa có lịch hẹn nào.</div>
          ) : (
            <div className="divide-y divide-gray-200">
              {myAppointments.map((a) => (
                <div
                  key={a.id}
                  className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {storeMap.get(a.storeId)?.name || `Store ${a.storeId}`}
                    </p>
                    <p className="mt-1 text-sm text-gray-600 flex flex-wrap gap-4">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(a.startTime).toLocaleDateString("vi-VN")}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {formatTime(a.startTime)} - {formatTime(a.endTime)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        Trạng thái: <b>{a.status}</b>
                      </span>
                    </p>
                    {a.note && (
                      <p className="mt-1 text-sm text-gray-600">
                        Ghi chú: {a.note}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCancel(a.id)}
                      className="inline-flex items-center gap-2 rounded-md border border-red-300 px-3 py-2 text-sm text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      Hủy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
