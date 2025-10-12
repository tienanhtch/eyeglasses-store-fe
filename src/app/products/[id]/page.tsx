"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { mockProducts } from "@/constants/mock-data";
import { ShoppingCart, Heart, Share2, Minus, Plus } from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = mockProducts.find((p) => p.id === productId);

  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Sản phẩm không tồn tại
            </h1>
            <p className="text-gray-600">Vui lòng quay lại trang chủ</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    // TODO: Implement add to cart
    console.log("Add to cart:", { product, selectedColor, quantity });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <a href="/" className="hover:text-gray-900">
                Trang chủ
              </a>
            </li>
            <li>/</li>
            <li>
              <a href="/products" className="hover:text-gray-900">
                Sản phẩm
              </a>
            </li>
            <li>/</li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg border border-gray-200">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square relative overflow-hidden rounded border border-gray-200"
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600">{product.description}</p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-900">
                {product.price.toLocaleString("vi-VN")} VND
              </span>
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <span className="text-xl text-gray-500 line-through">
                    {product.originalPrice.toLocaleString("vi-VN")} VND
                  </span>
                )}
            </div>

            {/* Colors */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Màu sắc
              </h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full border-2 ${
                      selectedColor?.id === color.id
                        ? "border-gray-900"
                        : "border-gray-300"
                    } ${
                      !color.isAvailable
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:border-gray-600"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    disabled={!color.isAvailable}
                    title={color.name}
                  />
                ))}
              </div>
              {selectedColor && (
                <p className="mt-2 text-sm text-gray-600">
                  Đã chọn: {selectedColor.name}
                </p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Số lượng
              </h3>
              <div className="flex items-center border border-gray-300 rounded-md w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-50"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 text-sm font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors font-medium"
              >
                Thêm vào giỏ hàng
              </button>

              <div className="flex gap-3">
                <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-md hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2">
                  <Heart className="h-4 w-4" />
                  Yêu thích
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-md hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Chia sẻ
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Thông tin sản phẩm
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <strong>Chất liệu:</strong> {product.material}
                </p>
                <p>
                  <strong>Danh mục:</strong> {product.category}
                </p>
                {product.features && (
                  <div>
                    <strong>Tính năng:</strong>
                    <ul className="list-disc list-inside ml-2">
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
