import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Star, Users, Award, Heart } from "lucide-react";

export default function TheOfficePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            The Office - QuangVu Store
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Khám phá không gian làm việc hiện đại và chuyên nghiệp của chúng
            tôi, nơi tạo ra những sản phẩm kính mắt chất lượng cao
          </p>
        </div>

        {/* Office Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Không gian làm việc hiện đại
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              The Office QuangVu Store là nơi hội tụ của sự sáng tạo, chuyên
              nghiệp và đam mê với ngành kính mắt. Chúng tôi tự hào về không
              gian làm việc được thiết kế đặc biệt để phục vụ khách hàng tốt
              nhất.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-3" />
                <span className="text-gray-700">
                  Môi trường làm việc chuyên nghiệp
                </span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-500 mr-3" />
                <span className="text-gray-700">Đội ngũ nhân viên tận tâm</span>
              </div>
              <div className="flex items-center">
                <Award className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">
                  Chứng nhận chất lượng quốc tế
                </span>
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&h=600&fit=crop"
              alt="The Office - QuangVu Store"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Đặc điểm nổi bật
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tận tâm phục vụ
              </h3>
              <p className="text-gray-600 text-sm">
                Mỗi khách hàng đều nhận được sự chăm sóc tận tình và chuyên
                nghiệp
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Chất lượng cao
              </h3>
              <p className="text-gray-600 text-sm">
                Sản phẩm được kiểm định nghiêm ngặt đảm bảo chất lượng tốt nhất
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Đội ngũ chuyên gia
              </h3>
              <p className="text-gray-600 text-sm">
                Nhân viên được đào tạo chuyên sâu về kính mắt và chăm sóc mắt
              </p>
            </div>
          </div>
        </div>

        {/* Office Tour */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Tour văn phòng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Khu vực tiếp khách
              </h3>
              <p className="text-gray-600 mb-4">
                Không gian rộng rãi, thoải mái với ghế ngồi hiện đại, tạo cảm
                giác dễ chịu cho khách hàng khi chờ đợi.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Ghế ngồi êm ái</li>
                <li>• Không gian yên tĩnh</li>
                <li>• Tạp chí và tài liệu tham khảo</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Phòng đo khúc xạ
              </h3>
              <p className="text-gray-600 mb-4">
                Phòng chuyên dụng với thiết bị đo khúc xạ hiện đại, đảm bảo độ
                chính xác cao trong việc kiểm tra mắt.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Máy đo khúc xạ tự động</li>
                <li>• Ánh sáng chuẩn y tế</li>
                <li>• Thiết bị bảo mật thông tin</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center bg-gray-900 text-white rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Tham quan The Office</h2>
          <p className="text-xl text-gray-300 mb-6">
            Đặt lịch tham quan văn phòng và trải nghiệm dịch vụ chuyên nghiệp
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:19001234"
              className="bg-white text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Đặt lịch: 1900 1234
            </a>
            <a
              href="mailto:info@quangvu.vn"
              className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-gray-900 transition-colors"
            >
              Email: info@quangvu.vn
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
