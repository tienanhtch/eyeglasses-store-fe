"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Store,
  FileText,
  Users,
  Gift,
  Menu,
  X,
  LogOut,
  Eye,
  EyeOff,
} from "lucide-react";

const adminMenuItems = [
  {
    id: "dashboard",
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    id: "categories",
    name: "Danh mục",
    href: "/admin/categories",
    icon: Package,
  },
  {
    id: "products",
    name: "Sản phẩm",
    href: "/admin/products",
    icon: Package,
  },
  {
    id: "lens-packages",
    name: "Gói tròng",
    href: "/admin/lens-packages",
    icon: Eye,
  },
  {
    id: "orders",
    name: "Đơn hàng",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    id: "stores",
    name: "Cửa hàng",
    href: "/admin/stores",
    icon: Store,
  },
  {
    id: "content",
    name: "Nội dung",
    href: "/admin/content",
    icon: FileText,
  },
  {
    id: "users",
    name: "Người dùng",
    href: "/admin/users",
    icon: Users,
  },
  {
    id: "promotions",
    name: "Khuyến mãi",
    href: "/admin/promotions",
    icon: Gift,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Clear all localStorage data
    localStorage.clear();
    // Redirect to login
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Fixed position */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">QUANG VU ADMIN</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 mt-6 px-3 overflow-y-auto">
            <div className="space-y-1">
              {adminMenuItems.map((item) => {
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

          {/* Logout button */}
          <div className="p-4 border-t border-gray-200">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Đăng xuất
            </button>
          </div>
        </div>
      </div>

      {/* Main content - With left margin to account for fixed sidebar */}
      <div className="lg:ml-64">
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
              <div className="text-sm text-gray-500">
                Chào mừng,{" "}
                <span className="font-medium text-gray-900">Admin</span>
              </div>
              <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">A</span>
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
