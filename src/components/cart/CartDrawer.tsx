"use client";

import { useCart } from "@/contexts/CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
  const { cart, isOpen, closeCart, updateQuantity, removeItem, isLoading } =
    useCart();

  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-gray-900/30 z-[60] transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-[70] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <h2 className="text-lg font-semibold">
              Giỏ hàng ({cart?.items?.length || 0})
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {!cart || cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-gray-500 mb-2">Giỏ hàng trống</p>
              <p className="text-sm text-gray-400">
                Thêm sản phẩm để bắt đầu mua sắm
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {/* Product Image */}
                  <div className="relative w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    {item.variant.productImageUrl ? (
                      <Image
                        src={item.variant.productImageUrl}
                        alt={item.variant.productName || "Product"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <ShoppingBag className="h-8 w-8" />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {item.variant.productName}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Màu: {item.variant.color || "N/A"} • SKU:{" "}
                      {item.variant.sku}
                    </p>
                    {item.lensPackage && (
                      <p className="text-xs text-blue-600 mt-1">
                        + {item.lensPackage.name}
                      </p>
                    )}

                    {/* Price */}
                    <div className="mt-2">
                      {item.variant.salePrice ? (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-red-600">
                            {formatPrice(item.variant.salePrice)}
                          </span>
                          <span className="text-xs text-gray-400 line-through">
                            {formatPrice(item.variant.retailPrice || 0)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm font-semibold text-gray-900">
                          {formatPrice(item.variant.retailPrice || 0)}
                        </span>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => {
                          if (item.qty > 1) {
                            updateQuantity(item.id, item.qty - 1);
                          }
                        }}
                        disabled={isLoading || item.qty <= 1}
                        className="p-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.qty + 1)}
                        disabled={isLoading}
                        className="p-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        disabled={isLoading}
                        className="ml-auto p-1 text-red-600 hover:bg-red-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart && cart.items.length > 0 && (
          <div className="border-t p-4 space-y-3">
            {/* Subtotal */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Tạm tính:</span>
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(cart.subtotal)}
              </span>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-gray-900 text-white text-center py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
            >
              Thanh toán
            </Link>

            {/* View Cart Link */}
            <Link
              href="/cart"
              onClick={closeCart}
              className="block text-center text-sm text-gray-600 hover:text-gray-900"
            >
              Xem giỏ hàng
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
