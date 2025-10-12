import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import CollectionCategories from "@/components/product/CollectionCategories";
import { mockProducts } from "@/constants/mock-data";

export default function PhuKienPage() {
  // Filter accessories from mock data
  const accessories = mockProducts.filter(
    (product) =>
      product.category === "accessories" ||
      product.name.toLowerCase().includes("phụ kiện") ||
      product.name.toLowerCase().includes("accessories")
  );

  // Category filter data for accessories
  const categories = [
    {
      id: "view-all",
      name: "View All",
      slug: "view-all-phu-kien",
      image: "/images/placeholder.svg",
      isActive: true,
    },
    {
      id: "hop-kinh",
      name: "Hộp kính",
      slug: "hop-kinh",
      image: "/images/placeholder.svg",
      isActive: false,
    },
    {
      id: "khan-lau",
      name: "Khăn lau",
      slug: "khan-lau",
      image: "/images/placeholder.svg",
      isActive: false,
    },
    {
      id: "day-deo",
      name: "Dây đeo",
      slug: "day-deo",
      image: "/images/placeholder.svg",
      isActive: false,
    },
    {
      id: "dung-dich",
      name: "Dung dịch",
      slug: "dung-dich",
      image: "/images/placeholder.svg",
      isActive: false,
    },
    {
      id: "bao-ve",
      name: "Bảo vệ",
      slug: "bao-ve",
      image: "/images/placeholder.svg",
      isActive: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Collection Categories */}
        <CollectionCategories
          categories={categories}
          basePath="/products/phu-kien"
        />

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Phụ kiện kính mắt
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bộ sưu tập phụ kiện đa dạng để bảo vệ, làm sạch và tăng tuổi thọ cho
            kính mắt của bạn
          </p>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors">
              Tất cả
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
              Hộp kính
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
              Khăn lau
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
              Dây đeo
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
              Dung dịch vệ sinh
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {accessories.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Accessories Categories */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Danh mục phụ kiện
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Hộp kính
              </h3>
              <p className="text-gray-600 text-sm">
                Bảo vệ kính khỏi trầy xước và va đập
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-lg"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Khăn lau
              </h3>
              <p className="text-gray-600 text-sm">
                Vải mềm chuyên dụng để lau kính
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded-lg"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Dây đeo
              </h3>
              <p className="text-gray-600 text-sm">
                Giữ kính an toàn khi hoạt động
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-orange-600 rounded-lg"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Dung dịch vệ sinh
              </h3>
              <p className="text-gray-600 text-sm">
                Làm sạch và khử trùng kính
              </p>
            </div>
          </div>
        </div>

        {/* Care Guide */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Hướng dẫn chăm sóc kính
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Làm sạch hàng ngày
              </h3>
              <p className="text-gray-600 text-sm">
                Sử dụng khăn mềm và dung dịch chuyên dụng để lau kính
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-full"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Bảo quản đúng cách
              </h3>
              <p className="text-gray-600 text-sm">
                Cất kính trong hộp khi không sử dụng để tránh trầy xước
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded-full"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Kiểm tra định kỳ
              </h3>
              <p className="text-gray-600 text-sm">
                Định kỳ kiểm tra và bảo dưỡng kính tại cửa hàng
              </p>
            </div>
          </div>
        </div>

        {/* Product Care Tips */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Mẹo chăm sóc kính
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Những điều nên làm
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Lau kính bằng khăn mềm, sạch</li>
                <li>• Rửa kính bằng nước sạch trước khi lau</li>
                <li>• Cất kính trong hộp khi không dùng</li>
                <li>• Đeo kính bằng cả hai tay</li>
                <li>• Kiểm tra định kỳ tại cửa hàng</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Những điều tránh
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Không dùng áo hoặc giấy thô để lau</li>
                <li>• Tránh để kính ở nơi có nhiệt độ cao</li>
                <li>• Không để kính tiếp xúc với hóa chất</li>
                <li>• Không đeo kính bằng một tay</li>
                <li>• Tránh để kính dưới ánh nắng trực tiếp</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-900 text-white rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Cần tư vấn phụ kiện?</h2>
          <p className="text-xl text-gray-300 mb-6">
            Chúng tôi sẽ giúp bạn chọn phụ kiện phù hợp để chăm sóc kính tốt
            nhất
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:19001234"
              className="bg-white text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Tư vấn: 1900 1234
            </a>
            <a
              href="/stores"
              className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-gray-900 transition-colors"
            >
              Mua tại cửa hàng
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
