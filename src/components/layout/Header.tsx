"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Search, Menu, X, User } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 tracking-wider"
            >
              QUANG VU
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/the-office"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              The Office
            </Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-gray-900 transition-colors flex items-center">
                Sản phẩm
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-1">
                  <Link
                    href="/products/kinh-can"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Kính cận
                  </Link>
                  <Link
                    href="/products/kinh-ram"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Kính râm
                  </Link>
                  <Link
                    href="/products/phu-kien"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Phụ kiện
                  </Link>
                </div>
              </div>
            </div>
            <Link
              href="/about"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Về QuangVu
            </Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-gray-900 transition-colors flex items-center">
                Dịch vụ
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-1">
                  <Link
                    href="/services"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Đo khám khúc xạ
                  </Link>
                  <Link
                    href="/services"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Làm mới gọng kính
                  </Link>
                </div>
              </div>
            </div>
            <Link
              href="/stores"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Cửa hàng
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* User */}
            <Link
              href="/auth/login"
              className="p-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <User className="h-5 w-5" />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/the-office"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900"
              >
                The Office
              </Link>
              <div className="px-3 py-2">
                <span className="text-gray-700 font-medium">Sản phẩm</span>
                <div className="ml-4 mt-2 space-y-1">
                  <Link
                    href="/products/kinh-can"
                    className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Kính cận
                  </Link>
                  <Link
                    href="/products/kinh-ram"
                    className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Kính râm
                  </Link>
                  <Link
                    href="/products/phu-kien"
                    className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Phụ kiện
                  </Link>
                </div>
              </div>
              <Link
                href="/about"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900"
              >
                Về QuangVu
              </Link>
              <div className="px-3 py-2">
                <span className="text-gray-700 font-medium">Dịch vụ</span>
                <div className="ml-4 mt-2 space-y-1">
                  <Link
                    href="/services"
                    className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Đo khám khúc xạ
                  </Link>
                  <Link
                    href="/services"
                    className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Làm mới gọng kính
                  </Link>
                </div>
              </div>
              <Link
                href="/stores"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900"
              >
                Cửa hàng
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
