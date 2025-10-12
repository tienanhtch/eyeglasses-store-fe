"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";

export default function CartPage() {
  const [cartItems] = useState([
    {
      id: "1",
      product: {
        id: "1",
        name: "THE RULER 07",
        price: 2550000,
        image: "/images/products/ruler-07-black.jpg",
        color: "Black",
      },
      quantity: 1,
    },
  ]);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Giỏ hàng của bạn
          </h1>
          <p className="text-gray-600">
            {cartItems.length === 0
              ? "đang trống"
              : `${cartItems.length} sản phẩm`}
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Giỏ hàng của bạn đang trống
            </h2>
            <p className="text-gray-600 mb-6">
              Hãy thêm một số sản phẩm để bắt đầu mua sắm
            </p>
            <button className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors">
              Tiếp tục mua sắm
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-lg">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 border-b border-gray-200 last:border-b-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-md flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Màu: {item.product.color}
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {item.product.price.toLocaleString("vi-VN")} VND
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button className="p-2 hover:bg-gray-50">
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-3 py-2 text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button className="p-2 hover:bg-gray-50">
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-800">
                  <strong>Lưu ý:</strong> Đơn hàng SALE không hỗ trợ đổi trả.
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Tổng tiền
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tạm tính</span>
                    <span className="text-gray-900">
                      {subtotal.toLocaleString("vi-VN")} VND
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span className="text-gray-900">
                      {shipping === 0
                        ? "Miễn phí"
                        : `${shipping.toLocaleString("vi-VN")} VND`}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-900">Tổng cộng</span>
                      <span className="text-gray-900">
                        {total.toLocaleString("vi-VN")} VND
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 transition-colors font-medium">
                  Thanh toán
                </button>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">Bạn đã có tài khoản?</p>
                  <button className="text-sm text-gray-900 hover:text-gray-700 underline">
                    Đăng nhập để thanh toán nhanh hơn
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
