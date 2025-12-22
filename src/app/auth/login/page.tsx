"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { login } from "@/services/auth";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      console.log("Attempting login with:", formData.email);
      const response = await login({
        email: formData.email.trim(),
        password: formData.password,
      });

      console.log("Login response:", response);

      // Backend trả về { token, user } hoặc { data: { token, user } }
      const token = response.token || response.data?.token;
      const user = response.user || response.data?.user;

      console.log("Extracted token:", token ? "exists" : "missing");
      console.log("Extracted user:", user);

      if (!token || !user) {
        throw new Error("Invalid response from server");
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
        localStorage.setItem("currentUser", JSON.stringify(user));
        console.log("Saved to localStorage");
      }

      const roles = user.roles || [];
      console.log("User roles:", roles);

      // Redirect based on role
      let redirectPath = "/";

      if (roles.includes("ADMIN")) {
        console.log("Redirecting to admin...");
        redirectPath = "/admin";
      } else if (roles.includes("STAFF")) {
        console.log("Redirecting to staff...");
        redirectPath = "/staff";
      } else {
        console.log("Redirecting to home...");
      }

      // Use window.location for immediate redirect
      window.location.href = redirectPath;
    } catch (error) {
      console.error("Login error:", error);
      let message = "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.";

      if (error instanceof AxiosError) {
        const errorData = error.response?.data as
          | { error?: string; message?: string }
          | undefined;
        if (errorData?.error) {
          message = errorData.error;
        } else if (errorData?.message) {
          message = errorData.message;
        }
      } else if (error instanceof Error) {
        message = error.message;
      }

      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Đăng nhập</h1>
            <p className="text-gray-600">
              Chào mừng bạn quay trở lại QuangVu Store
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Nhập email của bạn"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Nhập mật khẩu"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
                {errorMessage}
              </div>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-600">Ghi nhớ đăng nhập</span>
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Quên mật khẩu?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gray-900 text-white py-2 px-4 rounded-md transition-colors font-medium hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Chưa có tài khoản?{" "}
              <Link
                href="/auth/register"
                className="text-gray-900 hover:underline"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Hoặc đăng nhập với
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Google
              </button>
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Facebook
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
