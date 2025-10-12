import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Shield, RefreshCw, FileText, Users } from "lucide-react";

export default function PoliciesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Chính sách & Điều khoản
          </h1>
          <p className="text-xl text-gray-600">
            Thông tin chi tiết về các chính sách và điều khoản sử dụng dịch vụ
          </p>
        </div>

        <div className="space-y-12">
          {/* Chính sách mua hàng & bảo hành */}
          <section className="bg-gray-50 rounded-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Chính sách mua hàng & bảo hành
              </h2>
            </div>

            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Điều kiện mua hàng
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    Khách hàng phải cung cấp thông tin chính xác khi đặt hàng
                  </li>
                  <li>
                    Thanh toán được thực hiện theo các phương thức được hỗ trợ
                  </li>
                  <li>Đơn hàng sẽ được xử lý trong vòng 24-48 giờ</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Chế độ bảo hành
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Bảo hành 2 năm cho gọng kính</li>
                  <li>Bảo hành 1 năm cho tròng kính</li>
                  <li>
                    Bảo hành không áp dụng cho hư hỏng do sử dụng không đúng
                    cách
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Chính sách đổi trả */}
          <section className="bg-gray-50 rounded-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <RefreshCw className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Chính sách đổi trả
              </h2>
            </div>

            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Điều kiện đổi trả
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Đổi trả trong vòng 7 ngày kể từ ngày nhận hàng</li>
                  <li>Sản phẩm phải còn nguyên vẹn, chưa sử dụng</li>
                  <li>Giữ nguyên tem mác và bao bì gốc</li>
                  <li>Đơn hàng SALE không hỗ trợ đổi trả</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Quy trình đổi trả
                </h3>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Liên hệ hotline 1900 1234 để thông báo đổi trả</li>
                  <li>Gửi sản phẩm về địa chỉ cửa hàng</li>
                  <li>Kiểm tra và xác nhận tình trạng sản phẩm</li>
                  <li>Hoàn tiền hoặc đổi sản phẩm mới</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Hướng dẫn sử dụng */}
          <section className="bg-gray-50 rounded-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Hướng dẫn sử dụng
              </h2>
            </div>

            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Cách bảo quản kính
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Lau kính bằng vải mềm, sạch</li>
                  <li>Bảo quản trong hộp kính khi không sử dụng</li>
                  <li>Tránh để kính ở nơi có nhiệt độ cao</li>
                  <li>Không để kính tiếp xúc với hóa chất</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Lưu ý khi sử dụng
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Đeo kính đúng cách để tránh trầy xước</li>
                  <li>Vệ sinh kính thường xuyên</li>
                  <li>Kiểm tra độ cận định kỳ</li>
                  <li>Thay tròng kính khi cần thiết</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Điều khoản */}
          <section className="bg-gray-50 rounded-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Điều khoản sử dụng
              </h2>
            </div>

            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Quyền và nghĩa vụ
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Khách hàng có quyền được tư vấn và hỗ trợ</li>
                  <li>Nghĩa vụ cung cấp thông tin chính xác</li>
                  <li>Tuân thủ các quy định của cửa hàng</li>
                  <li>Thanh toán đúng hạn theo thỏa thuận</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Bảo mật thông tin
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Thông tin khách hàng được bảo mật tuyệt đối</li>
                  <li>Không chia sẻ thông tin cho bên thứ ba</li>
                  <li>Sử dụng thông tin chỉ để phục vụ khách hàng</li>
                  <li>Tuân thủ luật bảo vệ dữ liệu cá nhân</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Contact */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Cần hỗ trợ thêm?
          </h2>
          <p className="text-gray-600 mb-6">
            Nếu bạn có thắc mắc về các chính sách, vui lòng liên hệ với chúng
            tôi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:19001234"
              className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
            >
              Gọi hotline: 1900 1234
            </a>
            <a
              href="mailto:support@quangvu.vn"
              className="border border-gray-900 text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gray-900 hover:text-white transition-colors"
            >
              Email: support@quangvu.vn
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
