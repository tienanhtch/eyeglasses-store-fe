"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CollectionCategories from "@/components/product/CollectionCategories";
import ProductGrid from "@/components/product/ProductGrid";
import { searchPublicProducts, SearchItem } from "@/services/catalog";
import type { Product } from "@/types";

export default function PhuKienPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("view-all");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const params: any = {
          category: "phu-kien",
        };

        // Apply filters based on active category
        if (activeFilter !== "view-all") {
          // Map filter ID to search keyword
          const filterKeywordMap: { [key: string]: string } = {
            "hop-kinh": "hộp",
            "khan-lau": "khăn",
            "day-deo": "dây",
            "dung-dich": "dung dịch",
          };

          const keyword = filterKeywordMap[activeFilter];
          if (keyword) {
            params.q = keyword;
          }
        }

        const resp = await searchPublicProducts(params);

        console.log("Phụ kiện API params:", params);
        console.log("Phụ kiện API response:", resp);
        console.log("Number of items:", resp.items.length);

        // Map SearchItem to Product type
        const mappedProducts: Product[] = resp.items.map(
          (item: SearchItem) => ({
            id: item.id,
            slug: item.slug,
            name: item.name,
            category: "Phụ kiện",
            price: item.price || 0,
            originalPrice:
              item.maxPrice && item.maxPrice > (item.price || 0)
                ? item.maxPrice
                : undefined,
            images: item.thumbnail ? [item.thumbnail.url] : [],
            colors: [],
            material: item.material || undefined,
            isOutOfStock: !item.inStock,
            variantId: item.variantId || undefined,
          })
        );

        setProducts(mappedProducts);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [activeFilter]);

  // Category filter data for accessories
  const categories = [
    {
      id: "view-all",
      name: "Tất cả",
      slug: "view-all-phu-kien",
      image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=300&fit=crop",
      isActive: activeFilter === "view-all",
    },
    {
      id: "hop-kinh",
      name: "Hộp kính",
      slug: "hop-kinh",
      image: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=400&h=300&fit=crop",
      isActive: activeFilter === "hop-kinh",
    },
    {
      id: "khan-lau",
      name: "Khăn lau",
      slug: "khan-lau",
      image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop",
      isActive: activeFilter === "khan-lau",
    },
    {
      id: "day-deo",
      name: "Dây đeo",
      slug: "day-deo",
      image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=400&h=300&fit=crop",
      isActive: activeFilter === "day-deo",
    },
    {
      id: "dung-dich",
      name: "Dung dịch vệ sinh",
      slug: "dung-dich",
      image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=300&fit=crop",
      isActive: activeFilter === "dung-dich",
    },
  ];

  const handleCategoryClick = (categoryId: string) => {
    setActiveFilter(categoryId);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Collection Categories */}
        <CollectionCategories
          categories={categories}
          basePath="/products/phu-kien"
          onCategoryClick={handleCategoryClick}
        />

        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Phụ kiện kính mắt
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Bộ sưu tập phụ kiện đa dạng để bảo vệ, làm sạch và tăng tuổi thọ cho
            kính mắt của bạn
          </p>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
            <button
              onClick={() => handleCategoryClick("view-all")}
              className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md transition-colors cursor-pointer ${
                activeFilter === "view-all"
                  ? "bg-gray-900 text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => handleCategoryClick("hop-kinh")}
              className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md transition-colors cursor-pointer ${
                activeFilter === "hop-kinh"
                  ? "bg-gray-900 text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Hộp kính
            </button>
            <button
              onClick={() => handleCategoryClick("khan-lau")}
              className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md transition-colors cursor-pointer ${
                activeFilter === "khan-lau"
                  ? "bg-gray-900 text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Khăn lau
            </button>
            <button
              onClick={() => handleCategoryClick("day-deo")}
              className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md transition-colors cursor-pointer ${
                activeFilter === "day-deo"
                  ? "bg-gray-900 text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Dây đeo
            </button>
            <button
              onClick={() => handleCategoryClick("dung-dich")}
              className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md transition-colors cursor-pointer ${
                activeFilter === "dung-dich"
                  ? "bg-gray-900 text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Dung dịch vệ sinh
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <ProductGrid products={products} isLoading={loading} />

        {/* Accessories Categories */}
        <div className="mt-12 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6">
            Danh mục phụ kiện
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-lg"></div>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                Hộp kính
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Bảo vệ kính khỏi trầy xước và va đập
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-600 rounded-lg"></div>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                Khăn lau
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Vải mềm chuyên dụng để lau kính
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-600 rounded-lg"></div>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                Dây đeo
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Giữ kính an toàn khi hoạt động
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-600 rounded-lg"></div>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                Dung dịch vệ sinh
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Làm sạch và khử trùng kính
              </p>
            </div>
          </div>
        </div>

        {/* Care Guide */}
        <div className="bg-gray-50 rounded-lg p-4 sm:p-6 md:p-8 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6 sm:mb-8">
            Hướng dẫn chăm sóc kính
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full"></div>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Làm sạch hàng ngày
              </h3>
              <p className="text-gray-600 text-sm">
                Sử dụng khăn mềm và dung dịch chuyên dụng để lau kính
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-600 rounded-full"></div>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Bảo quản đúng cách
              </h3>
              <p className="text-gray-600 text-sm">
                Cất kính trong hộp khi không sử dụng để tránh trầy xước
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-600 rounded-full"></div>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
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
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6 sm:mb-8">
            Mẹo chăm sóc kính
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
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
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
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
