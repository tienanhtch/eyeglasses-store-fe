"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";

type AuthUser = {
  fullName: string;
  email: string;
  roles: string[];
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const router = useRouter();
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const { itemCount, openCart } = useCart();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const syncUser = () => {
      const userRaw = localStorage.getItem("currentUser");
      if (userRaw) {
        try {
          const parsed = JSON.parse(userRaw) as AuthUser;
          setAuthUser(parsed);
        } catch (error) {
          console.error("Cannot parse currentUser", error);
          setAuthUser(null);
        }
      } else {
        setAuthUser(null);
      }
    };

    syncUser();

    const handleStorage = (event: StorageEvent) => {
      if (event.key === "currentUser" || event.key === "token") {
        syncUser();
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
    }
    setAuthUser(null);
    setUserMenuOpen(false);
    router.push("/");
  };

  const isAdmin = authUser?.roles?.includes("ADMIN");
  const isStaff = authUser?.roles?.includes("STAFF");
  const isCustomer = authUser?.roles?.includes("CUSTOMER");

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
            <div className="relative" ref={userMenuRef}>
              {authUser ? (
                <button
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  className="flex items-center space-x-2 rounded-full border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:border-gray-300 hover:text-gray-900"
                >
                  <div className="h-8 w-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-medium">
                    {authUser.fullName?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {authUser.fullName || "Tài khoản"}
                    </p>
                    <p className="text-xs text-gray-500">{authUser.email}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>
              ) : (
                <Link
                  href="/auth/login"
                  className="flex items-center space-x-2 rounded-full border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:border-gray-300 hover:text-gray-900"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Đăng nhập</span>
                </Link>
              )}

              {authUser && userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Bảng điều khiển Admin
                    </Link>
                  )}
                  {isStaff && (
                    <Link
                      href="/staff"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Bảng điều khiển Staff
                    </Link>
                  )}
                  {isCustomer && (
                    <>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Trang cá nhân
                      </Link>
                      <Link
                        href="/profile/addresses"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Sổ địa chỉ
                      </Link>
                      <Link
                        href="/profile#orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Đơn hàng của tôi
                      </Link>
                      <Link
                        href="/profile#appointments"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Lịch hẹn của tôi
                      </Link>
                      <Link
                        href="/appointments"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Đặt lịch
                      </Link>
                    </>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Đăng xuất
                  </button>
                </div>
              )}
            </div>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

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
