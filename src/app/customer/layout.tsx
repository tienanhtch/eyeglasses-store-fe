"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  ShoppingBag,
  User,
  Settings,
  Menu,
  X,
  LogOut,
  Bell,
  Search,
  ShoppingCart,
  Heart,
} from "lucide-react";

const customerMenuItems = [
  {
    id: "dashboard",
    name: "Dashboard",
    href: "/customer",
    icon: LayoutDashboard,
  },
  {
    id: "appointments",
    name: "Lịch hẹn",
    href: "/customer/appointments",
    icon: Calendar,
  },
  {
    id: "orders",
    name: "Đơn hàng",
    href: "/customer/orders",
    icon: ShoppingBag,
  },
  {
    id: "profile",
    name: "Thông tin cá nhân",
    href: "/customer/profile",
    icon: User,
  },
  {
    id: "settings",
    name: "Cài đặt",
    href: "/customer/settings",
    icon: Settings,
  },
];

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">QUANG VU</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {customerMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon
                    className={`mr-3 h-5 w-5 ${
                      isActive
                        ? "text-gray-900"
                        : "text-gray-400 group-hover:text-gray-500"
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Quick Actions */}
        <div className="mt-6 px-3">
          <div className="space-y-1">
            <Link
              href="/products/kinh-can"
              className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors"
            >
              <ShoppingBag className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
              Mua sắm
            </Link>
            <Link
              href="/customer/wishlist"
              className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors"
            >
              <Heart className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
              Yêu thích
            </Link>
          </div>
        </div>

        {/* Logout button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors">
            <LogOut className="mr-3 h-5 w-5" />
            Đăng xuất
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Cart */}
              <Link
                href="/customer/cart"
                className="p-2 text-gray-400 hover:text-gray-600 relative"
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                  2
                </span>
              </Link>

              {/* User profile */}
              <div className="flex items-center space-x-3">
                <div className="text-sm text-gray-500">
                  Chào mừng,{" "}
                  <span className="font-medium text-gray-900">Khách hàng</span>
                </div>
                <div className="h-8 w-8 bg-green-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-green-700">K</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
