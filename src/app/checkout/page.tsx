"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getCurrentUserId } from "@/utils/auth-storage";
import { getCart, type Cart } from "@/services/customer/cart";
import {
  checkout,
  type CheckoutPayload,
  type Order,
} from "@/services/customer/orders";
import { getUserAddresses, type UserAddress } from "@/services/customer/users";
import { getStores, type Store } from "@/services/stores";

export default function CheckoutPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");

  const [cart, setCart] = useState<Cart | null>(null);
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [stores, setStores] = useState<Store[]>([]);

  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  const [payload, setPayload] = useState<CheckoutPayload>({
    fulfillment: "DELIVERY",
    shippingAddressId: null,
    billingAddressId: null,
    storeId: null,
  });

  useEffect(() => {
    const id = getCurrentUserId();
    if (!id) {
      router.push("/auth/login");
      return;
    }
    setUserId(id);
  }, [router]);

  useEffect(() => {
    const load = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        const [cartData, addrData, storeData] = await Promise.all([
          getCart(userId),
          getUserAddresses(userId),
          getStores(),
        ]);
        setCart(cartData);
        setAddresses(addrData);
        setStores(storeData);

        const defaultAddr = addrData.find((a) => a.isDefault) || addrData[0];
        setPayload((p) => ({
          ...p,
          shippingAddressId: defaultAddr?.id ?? null,
          billingAddressId: defaultAddr?.id ?? null,
          storeId: storeData[0]?.id ?? null,
        }));
      } catch (e: any) {
        console.error(e);
        alert(e?.response?.data?.error || "Không thể tải dữ liệu checkout");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [userId]);

  const canPlace = useMemo(() => {
    if (!cart) return false;
    if (!cart.items || cart.items.length === 0) return false;
    if (payload.fulfillment === "DELIVERY") {
      return !!payload.shippingAddressId;
    }
    if (payload.fulfillment === "PICKUP") {
      return !!payload.storeId;
    }
    return false;
  }, [cart, payload]);

  const handlePlace = async () => {
    if (!userId) return;
    if (!canPlace) return;
    try {
      setPlacing(true);
      const order = await checkout(userId, payload);
      setPlacedOrder(order);
      alert("Đặt hàng thành công!");
    } catch (e: any) {
      console.error(e);
      alert(e?.response?.data?.error || "Không thể tạo đơn hàng");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Thanh toán</h1>
            <p className="mt-1 text-sm text-gray-600">
              Chọn địa chỉ, hình thức nhận hàng và xác nhận đơn
            </p>
          </div>
          <button
            onClick={() => router.push("/cart")}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Quay lại giỏ hàng
          </button>
        </div>

        {loading ? (
          <div className="text-gray-600">Đang tải...</div>
        ) : placedOrder ? (
          <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">
              Đơn hàng đã tạo
            </h2>
            <p className="text-sm text-gray-700">
              Mã đơn: <b>{placedOrder.orderNo}</b>
            </p>
            <p className="text-sm text-gray-700">
              Tổng tiền: <b>{placedOrder.grandTotal?.toLocaleString("vi-VN")} ₫</b>
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => router.push("/profile#orders")}
                className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Xem trong đơn hàng của tôi
              </button>
              <button
                onClick={() => router.push("/")}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Về trang chủ
              </button>
            </div>
          </section>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <section className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Thông tin nhận hàng
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hình thức nhận hàng
                    </label>
                    <select
                      value={payload.fulfillment}
                      onChange={(e) =>
                        setPayload((p) => ({
                          ...p,
                          fulfillment: e.target.value as "DELIVERY" | "PICKUP",
                        }))
                      }
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                    >
                      <option value="DELIVERY">Giao hàng</option>
                      <option value="PICKUP">Nhận tại cửa hàng</option>
                    </select>
                  </div>

                  {payload.fulfillment === "DELIVERY" ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Địa chỉ giao hàng
                      </label>
                      <select
                        value={payload.shippingAddressId ?? ""}
                        onChange={(e) =>
                          setPayload((p) => ({
                            ...p,
                            shippingAddressId: e.target.value || null,
                            billingAddressId: e.target.value || null,
                          }))
                        }
                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                      >
                        <option value="">-- Chọn địa chỉ --</option>
                        {addresses.map((a) => (
                          <option key={a.id} value={a.id}>
                            {a.recipient} • {a.phone} • {a.line1}
                          </option>
                        ))}
                      </select>
                      <p className="mt-2 text-xs text-gray-600">
                        Chưa có địa chỉ?{" "}
                        <button
                          onClick={() => router.push("/profile/addresses")}
                          className="underline"
                        >
                          Thêm địa chỉ
                        </button>
                      </p>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Chọn cửa hàng
                      </label>
                      <select
                        value={payload.storeId ?? ""}
                        onChange={(e) =>
                          setPayload((p) => ({ ...p, storeId: e.target.value || null }))
                        }
                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                      >
                        <option value="">-- Chọn cửa hàng --</option>
                        {stores.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </section>

              <section className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Sản phẩm trong giỏ
                  </h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {cart?.items?.map((it) => (
                    <div key={it.id} className="p-6 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {it.variant.productName || it.variant.sku}
                        </p>
                        <p className="text-sm text-gray-600">
                          Màu: {it.variant.color || "-"} • SL: {it.qty}
                        </p>
                        {it.lensPackage && (
                          <p className="text-sm text-gray-600">
                            Tròng: {it.lensPackage.name}
                          </p>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        {it.lineTotal?.toLocaleString("vi-VN")} ₫
                      </p>
                    </div>
                  ))}
                  {cart?.items?.length === 0 && (
                    <div className="p-6 text-gray-600">Giỏ hàng đang trống.</div>
                  )}
                </div>
              </section>
            </div>

            <aside className="lg:col-span-1">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-24 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Tóm tắt</h2>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tạm tính</span>
                  <span className="text-gray-900">
                    {cart?.subtotal?.toLocaleString("vi-VN")} ₫
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  Phí ship/thuế sẽ được backend tính khi tạo đơn.
                </p>
                <button
                  onClick={handlePlace}
                  disabled={!canPlace || placing}
                  className="w-full rounded-md bg-gray-900 py-3 text-white font-medium hover:bg-gray-800 disabled:opacity-60"
                >
                  {placing ? "Đang tạo đơn..." : "Đặt hàng"}
                </button>
              </div>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}


