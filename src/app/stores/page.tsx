import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

export default function StoresPage() {
  const stores = [
    {
      id: 1,
      name: "QuangVu Store - Quận 1",
      address: "123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
      phone: "028 1234 5678",
      email: "store1@quangvu.vn",
      hours: "9:00 - 21:00",
      image: "/images/placeholder.svg",
      features: ["Đo khúc xạ", "Bảo hành", "Tư vấn chuyên nghiệp"],
    },
    {
      id: 2,
      name: "QuangVu Store - Quận 3",
      address: "456 Đường Võ Văn Tần, Quận 3, TP. Hồ Chí Minh",
      phone: "028 2345 6789",
      email: "store2@quangvu.vn",
      hours: "9:00 - 21:00",
      image: "/images/placeholder.svg",
      features: ["Làm mới gọng kính", "Giao hàng nhanh", "Tư vấn phong cách"],
    },
    {
      id: 3,
      name: "QuangVu Store - Quận 7",
      address: "789 Đường Nguyễn Thị Thập, Quận 7, TP. Hồ Chí Minh",
      phone: "028 3456 7890",
      email: "store3@quangvu.vn",
      hours: "9:00 - 21:00",
      image: "/images/placeholder.svg",
      features: ["Kính cao cấp", "Dịch vụ VIP", "Bảo hành mở rộng"],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Hệ thống cửa hàng
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Khám phá các cửa hàng QuangVu Store gần bạn và trải nghiệm dịch vụ
            chuyên nghiệp
          </p>
        </div>

        {/* Store List */}
        <div className="space-y-8 mb-16">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                {/* Store Image */}
                <div className="lg:col-span-1">
                  <div className="aspect-video relative overflow-hidden rounded-lg">
                    <img
                      src={store.image}
                      alt={store.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Store Info */}
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {store.name}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">Địa chỉ</p>
                          <p className="text-gray-600">{store.address}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">
                            Điện thoại
                          </p>
                          <p className="text-gray-600">{store.phone}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">Email</p>
                          <p className="text-gray-600">{store.email}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">
                            Giờ mở cửa
                          </p>
                          <p className="text-gray-600">{store.hours}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">
                        Dịch vụ
                      </h3>
                      <ul className="space-y-2">
                        {store.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center text-gray-600"
                          >
                            <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Bản đồ cửa hàng
          </h2>
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                Bản đồ tương tác sẽ được tích hợp tại đây
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Liên hệ tổng đài
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Hotline
              </h3>
              <p className="text-gray-600">1900 1234</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Email
              </h3>
              <p className="text-gray-600">support@quangvu.vn</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Giờ làm việc
              </h3>
              <p className="text-gray-600">8:00 - 22:00 (Hàng ngày)</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
