"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { ShoppingCart, Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.images[0] || "/images/placeholder.jpg";
  const isOutOfStock =
    product.isOutOfStock || product.colors.every((color) => !color.isAvailable);

  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={mainImage}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              Mới
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
              Bán chạy
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
              Đã bán hết
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Colors */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-gray-500">Màu sắc:</span>
          <div className="flex gap-1">
            {product.colors.slice(0, 4).map((color) => (
              <div
                key={color.id}
                className={`w-4 h-4 rounded-full border border-gray-300 ${
                  !color.isAvailable ? "opacity-50" : ""
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-gray-500">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-semibold text-gray-900">
            {product.price.toLocaleString("vi-VN")} VND
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">
              {product.originalPrice.toLocaleString("vi-VN")} VND
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 bg-gray-900 text-white py-2 px-4 rounded-md text-center text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Xem chi tiết
          </Link>
          <button
            disabled={isOutOfStock}
            className={`p-2 rounded-md transition-colors ${
              isOutOfStock
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
