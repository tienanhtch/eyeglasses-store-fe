import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Users, Award, Heart, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Về QuangVu Store
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chúng tôi cam kết mang đến những sản phẩm kính mắt chất lượng cao
            với thiết kế hiện đại, phù hợp với mọi phong cách và nhu cầu của
            khách hàng.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sứ mệnh</h2>
            <p className="text-gray-600 leading-relaxed">
              QuangVu Store được thành lập với sứ mệnh mang đến những sản phẩm
              kính mắt cao cấp, giúp khách hàng thể hiện phong cách cá nhân và
              bảo vệ đôi mắt một cách tối ưu. Chúng tôi tin rằng mỗi người đều
              xứng đáng có được những sản phẩm chất lượng tốt nhất.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tầm nhìn</h2>
            <p className="text-gray-600 leading-relaxed">
              Trở thành thương hiệu kính mắt hàng đầu tại Việt Nam, được khách
              hàng tin tưởng và yêu mến. Chúng tôi hướng tới việc mở rộng thị
              trường và mang sản phẩm chất lượng cao đến với nhiều khách hàng
              hơn nữa.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Giá trị cốt lõi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Chất lượng
              </h3>
              <p className="text-gray-600 text-sm">
                Cam kết mang đến sản phẩm chất lượng cao với vật liệu tốt nhất
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tận tâm
              </h3>
              <p className="text-gray-600 text-sm">
                Phục vụ khách hàng với sự tận tâm và chuyên nghiệp
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Cộng đồng
              </h3>
              <p className="text-gray-600 text-sm">
                Xây dựng cộng đồng khách hàng trung thành và hài lòng
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tin cậy
              </h3>
              <p className="text-gray-600 text-sm">
                Xây dựng niềm tin thông qua sự minh bạch và trung thực
              </p>
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Câu chuyện của chúng tôi
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-600 leading-relaxed mb-6">
              QuangVu Store được thành lập từ niềm đam mê với thời trang và sự
              quan tâm đến sức khỏe đôi mắt. Chúng tôi hiểu rằng kính mắt không
              chỉ là một phụ kiện mà còn là một phần quan trọng trong cuộc sống
              hàng ngày.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Với đội ngũ chuyên nghiệp và kinh nghiệm nhiều năm trong ngành,
              chúng tôi đã và đang mang đến những sản phẩm kính mắt chất lượng
              cao, phù hợp với mọi lứa tuổi và phong cách.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Từ những ngày đầu thành lập, chúng tôi đã cam kết mang đến trải
              nghiệm mua sắm tốt nhất cho khách hàng, với dịch vụ tư vấn chuyên
              nghiệp và chế độ bảo hành uy tín.
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Liên hệ với chúng tôi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Địa chỉ
              </h3>
              <p className="text-gray-600">
                123 Đường ABC, Quận 1<br />
                TP. Hồ Chí Minh, Việt Nam
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Điện thoại
              </h3>
              <p className="text-gray-600">
                Hotline: 1900 1234
                <br />
                Mobile: 0901 234 567
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Email
              </h3>
              <p className="text-gray-600">
                support@quangvu.vn
                <br />
                info@quangvu.vn
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
