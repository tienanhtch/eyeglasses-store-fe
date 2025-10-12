import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Eye, RefreshCw, Shield, Clock, Star, CheckCircle } from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Dịch vụ của chúng tôi
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chúng tôi cung cấp đầy đủ các dịch vụ chăm sóc mắt và kính mắt
            chuyên nghiệp, đảm bảo sức khỏe và sự hài lòng của khách hàng.
          </p>
        </div>

        {/* Main Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Đo khám khúc xạ
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Dịch vụ đo khám khúc xạ chuyên nghiệp với thiết bị hiện đại, giúp
              xác định chính xác tình trạng mắt và độ cận/viễn/loạn của khách
              hàng.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Đo khúc xạ bằng máy tự động
              </li>
              <li className="flex items-center text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Tư vấn chọn kính phù hợp
              </li>
              <li className="flex items-center text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Báo cáo chi tiết tình trạng mắt
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <RefreshCw className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Làm mới gọng kính
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Dịch vụ làm mới và bảo dưỡng gọng kính, giúp kính của bạn luôn
              trong tình trạng tốt nhất và kéo dài tuổi thọ sử dụng.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Vệ sinh và đánh bóng gọng
              </li>
              <li className="flex items-center text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Điều chỉnh độ cong và độ rộng
              </li>
              <li className="flex items-center text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Thay thế phụ kiện hỏng hóc
              </li>
            </ul>
          </div>
        </div>

        {/* Additional Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Dịch vụ bổ sung
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Bảo hành
              </h3>
              <p className="text-gray-600 text-sm">
                Chế độ bảo hành toàn diện cho tất cả sản phẩm kính mắt
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Giao hàng nhanh
              </h3>
              <p className="text-gray-600 text-sm">
                Giao hàng tận nơi trong vòng 24h tại TP.HCM
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tư vấn chuyên nghiệp
              </h3>
              <p className="text-gray-600 text-sm">
                Đội ngũ chuyên gia tư vấn phong cách và sức khỏe mắt
              </p>
            </div>
          </div>
        </div>

        {/* Process */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Quy trình dịch vụ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Đặt lịch hẹn
              </h3>
              <p className="text-gray-600 text-sm">
                Liên hệ để đặt lịch hẹn khám mắt hoặc tư vấn
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Khám và tư vấn
              </h3>
              <p className="text-gray-600 text-sm">
                Thực hiện đo khúc xạ và tư vấn chọn kính phù hợp
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Chế tác kính
              </h3>
              <p className="text-gray-600 text-sm">
                Chế tác kính theo đơn thuốc và yêu cầu của khách hàng
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Giao hàng
              </h3>
              <p className="text-gray-600 text-sm">
                Giao hàng và hướng dẫn sử dụng, bảo quản kính
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center bg-gray-900 text-white rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Cần tư vấn dịch vụ?</h2>
          <p className="text-xl text-gray-300 mb-6">
            Liên hệ với chúng tôi để được tư vấn miễn phí về các dịch vụ chăm
            sóc mắt
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:19001234"
              className="bg-white text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Gọi ngay: 1900 1234
            </a>
            <a
              href="mailto:support@quangvu.vn"
              className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-gray-900 transition-colors"
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
