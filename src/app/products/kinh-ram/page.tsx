"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CollectionCategories from "@/components/product/CollectionCategories";
import ProductGrid from "@/components/product/ProductGrid";
import { searchPublicProducts, SearchItem } from "@/services/catalog";
import type { Product } from "@/types";

export default function KinhRamPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("view-all");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        // Build search params based on active filter
        const params: any = {
          category: "kinh-ram",
          size: 50,
        };

        switch (activeFilter) {
          case "aviator":
            params.frameShape = "Aviator";
            break;
          case "wayfarer":
            params.frameShape = "Wayfarer";
            break;
          case "round":
            params.frameShape = "Round";
            break;
          case "cat-eye":
            params.frameShape = "Cat Eye";
            break;
          case "oval":
            params.frameShape = "Oval";
            break;
          default:
            // view-all: no additional filters
            break;
        }

        const resp = await searchPublicProducts(params);

        // Map SearchItem to Product type
        const mappedProducts: Product[] = resp.items.map(
          (item: SearchItem) => ({
            id: item.id,
            slug: item.slug,
            name: item.name,
            price: item.price || 0,
            originalPrice:
              item.maxPrice && item.maxPrice > (item.price || 0)
                ? item.maxPrice
                : undefined,
            images: item.thumbnail ? [item.thumbnail.url] : [],
            colors: [],
            category: "kinh-ram",
            description: "",
            isNew: item.isNew || false,
            isBestSeller: item.isBestSeller || false,
            isOutOfStock: !item.inStock,
            material: item.material || undefined,
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

  // Category filter data for sunglasses
  const categories = [
    {
      id: "view-all",
      name: "Tất cả",
      slug: "view-all-kinh-ram",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=300&fit=crop",
      isActive: activeFilter === "view-all",
    },
    {
      id: "aviator",
      name: "Aviator",
      slug: "aviator",
      image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&h=300&fit=crop",
      isActive: activeFilter === "aviator",
    },
    {
      id: "wayfarer",
      name: "Wayfarer",
      slug: "wayfarer",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
      isActive: activeFilter === "wayfarer",
    },
    {
      id: "round",
      name: "Round",
      slug: "round",
      image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=400&h=300&fit=crop",
      isActive: activeFilter === "round",
    },
    {
      id: "cat-eye",
      name: "Cat Eye",
      slug: "cat-eye",
      image: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=400&h=300&fit=crop",
      isActive: activeFilter === "cat-eye",
    },
    {
      id: "oval",
      name: "Oval",
      slug: "oval",
      image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=300&fit=crop",
      isActive: activeFilter === "oval",
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
          basePath="/products/kinh-ram"
          onCategoryClick={handleCategoryClick}
        />

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Kính râm thời trang
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bộ sưu tập kính râm đa dạng với thiết kế hiện đại, bảo vệ mắt khỏi
            tia UV và tôn lên phong cách cá nhân
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors">
              Tất cả
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
              Kính râm nam
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
              Kính râm nữ
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
              Kính thể thao
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
              Kính cao cấp
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <ProductGrid products={products} isLoading={loading} />

        {/* Features Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Tại sao chọn kính râm QuangVu?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Bảo vệ UV 100%
              </h3>
              <p className="text-gray-600 text-sm">
                Lớp phủ chống tia UV cao cấp bảo vệ mắt khỏi tác hại của ánh
                nắng
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-full"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Thiết kế thời trang
              </h3>
              <p className="text-gray-600 text-sm">
                Phong cách hiện đại, phù hợp với mọi trang phục và dịp sử dụng
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded-full"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Chất liệu cao cấp
              </h3>
              <p className="text-gray-600 text-sm">
                Gọng và tròng kính được làm từ vật liệu chất lượng cao, bền đẹp
              </p>
            </div>
          </div>
        </div>

        {/* Care Instructions */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Hướng dẫn bảo quản kính râm
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Cách sử dụng
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Đeo kính khi ra nắng để bảo vệ mắt</li>
                <li>• Không đeo kính trong nhà hoặc nơi tối</li>
                <li>• Kiểm tra độ bảo vệ UV trước khi mua</li>
                <li>• Chọn kích thước phù hợp với khuôn mặt</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Bảo quản
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Cất kính trong hộp khi không sử dụng</li>
                <li>• Lau kính bằng vải mềm, sạch</li>
                <li>• Tránh để kính ở nơi có nhiệt độ cao</li>
                <li>• Không để kính tiếp xúc với hóa chất</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-900 text-white rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Cần tư vấn chọn kính râm?</h2>
          <p className="text-xl text-gray-300 mb-6">
            Đội ngũ chuyên gia của chúng tôi sẽ giúp bạn chọn được chiếc kính
            râm phù hợp nhất
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:19001234"
              className="bg-white text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Tư vấn miễn phí: 1900 1234
            </a>
            <a
              href="/stores"
              className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-gray-900 transition-colors"
            >
              Tìm cửa hàng gần nhất
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
