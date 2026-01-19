"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { getStores, Store } from "@/services/stores";

export default function StoresPage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStores = async () => {
      try {
        setLoading(true);
        const data = await getStores();
        setStores(data);
      } catch (err) {
        console.error("Failed to load stores:", err);
        setError("Không thể tải danh sách cửa hàng. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };
    loadStores();
  }, []);

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
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-900 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Đang tải danh sách cửa hàng...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        ) : stores.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
            <p className="text-gray-600">Chưa có cửa hàng nào.</p>
          </div>
        ) : (
          <div className="space-y-8 mb-16">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="grid grid-cols-1 gap-6 p-6">
                {/* Store Info */}
                <div>
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
                            <p className="font-medium text-gray-900">Mã cửa hàng</p>
                            <p className="text-gray-600">{store.code}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Clock className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-900">
                              Giờ mở cửa
                            </p>
                            <p className="text-gray-600">{store.openHours}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">
                          Thông tin
                        </h3>
                        <div className="space-y-2">
                          <p className="text-gray-600">
                            <span className="font-medium">Tên:</span> {store.name}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Địa chỉ:</span> {store.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          ))}
        </div>
        )}

        {/* Map Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Bản đồ cửa hàng
          </h2>
          <div className="relative w-full rounded-lg overflow-hidden" style={{ height: '600px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8168145559966!2d105.73938337584154!3d21.04001448739077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135096b31fa7abb%3A0xff645782804911af!2zVHLGsOG7nW5nIMSR4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgxJDDtG5nIMOB!5e0!3m2!1svi!2s!4v1768792247953!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bản đồ cửa hàng"
            />
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
