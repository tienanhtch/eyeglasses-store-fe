import Link from "next/link";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              LIÊN HỆ
            </h3>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                <span>support@quangvu.vn</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                <span>Hotline: 1900 1234</span>
              </div>
            </div>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              THÔNG TIN
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/policies/purchase"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Chính sách mua hàng & bảo hành
                </Link>
              </li>
              <li>
                <Link
                  href="/policies/return"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Chính sách đổi trả
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/usage"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Hướng dẫn sử dụng
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Điều khoản
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">SOCIAL</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              ĐĂNG KÝ EMAIL
            </h3>
            <div className="space-y-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Nhập email của bạn"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <button className="px-4 py-2 bg-gray-900 text-white rounded-r-md hover:bg-gray-800 transition-colors">
                  GỬI
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © 2024 QuangVu Store. Tất cả quyền được bảo lưu.
            </p>
            <div className="mt-4 md:mt-0">
              <Link
                href="/careers"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                Tuyển dụng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
