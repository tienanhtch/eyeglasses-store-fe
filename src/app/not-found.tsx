"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-gray-200">404</h1>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trang không tồn tại
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di
              chuyển.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
            >
              <Home className="h-4 w-4" />
              Về trang chủ
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại
            </button>
          </div>

          <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Có thể bạn quan tâm
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/products/kinh-can"
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h4 className="font-medium text-gray-900 mb-2">Kính cận</h4>
                <p className="text-sm text-gray-600">
                  Khám phá bộ sưu tập kính cận thời trang
                </p>
              </Link>
              <Link
                href="/services"
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h4 className="font-medium text-gray-900 mb-2">Dịch vụ</h4>
                <p className="text-sm text-gray-600">
                  Đo khúc xạ và làm mới gọng kính
                </p>
              </Link>
              <Link
                href="/about"
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h4 className="font-medium text-gray-900 mb-2">Về chúng tôi</h4>
                <p className="text-sm text-gray-600">
                  Tìm hiểu về QuangVu Store
                </p>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
