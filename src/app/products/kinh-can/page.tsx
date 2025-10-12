"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/product/ProductGrid";
import CollectionCategories from "@/components/product/CollectionCategories";
import { mockProducts } from "@/constants/mock-data";
import { Product } from "@/types";
import { Filter, SortAsc } from "lucide-react";

export default function KinhCanPage() {
  const [products] = useState<Product[]>(
    mockProducts.filter((p) => p.category === "Kính cận")
  );
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  // Category filter data
  const categories = [
    {
      id: "view-all",
      name: "View All",
      slug: "view-all-kinh-can",
      image: "/images/placeholder.svg",
      isActive: true,
    },
    {
      id: "new-collection",
      name: "New Collection",
      slug: "new-collection",
      image: "/images/placeholder.svg",
      isActive: false,
    },
    {
      id: "best-seller",
      name: "Best seller",
      slug: "best-seller-kinh-can",
      image: "/images/placeholder.svg",
      isActive: false,
    },
    {
      id: "metal",
      name: "Metal",
      slug: "metal",
      image: "/images/placeholder.svg",
      isActive: false,
    },
    {
      id: "big-size",
      name: "Big Size",
      slug: "big-size",
      image: "/images/placeholder.svg",
      isActive: false,
    },
    {
      id: "medium-size",
      name: "Medium Size",
      slug: "medium-size",
      image: "/images/placeholder.svg",
      isActive: false,
    },
    {
      id: "small-size",
      name: "Small Size",
      slug: "small-size",
      image: "/images/placeholder.svg",
      isActive: false,
    },
  ];

  const handleSort = (value: string) => {
    setSortBy(value);
    // TODO: Implement sorting logic
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Collection Categories */}
        <CollectionCategories
          categories={categories}
          basePath="/products/kinh-can"
        />

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Kính cận thời trang
          </h1>
          <p className="text-lg text-gray-600">
            Khám phá bộ sưu tập kính cận với thiết kế hiện đại và chất lượng cao
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-4 w-4" />
              Bộ lọc
            </button>

            <div className="text-sm text-gray-600">
              {products.length} sản phẩm
            </div>
          </div>

          <div className="flex items-center gap-2">
            <SortAsc className="h-4 w-4 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <option value="featured">Nổi bật</option>
              <option value="bestseller">Bán chạy nhất</option>
              <option value="name-asc">Thứ tự bảng chữ cái (từ A-Z)</option>
              <option value="name-desc">Thứ tự bảng chữ cái (từ Z-A)</option>
              <option value="price-asc">Giá (từ thấp đến cao)</option>
              <option value="price-desc">Giá (từ cao xuống thấp)</option>
              <option value="date-asc">Ngày (từ cũ đến mới)</option>
              <option value="date-desc">Ngày (từ mới đến cũ)</option>
            </select>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Màu sắc</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="w-6 h-6 bg-black rounded-full border border-gray-300 cursor-pointer" />
                  <div className="w-6 h-6 bg-gray-500 rounded-full border border-gray-300 cursor-pointer" />
                  <div className="w-6 h-6 bg-blue-500 rounded-full border border-gray-300 cursor-pointer" />
                  <div className="w-6 h-6 bg-green-500 rounded-full border border-gray-300 cursor-pointer" />
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Kích thước</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-700">Big Size</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-700">Medium Size</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-700">Small Size</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Giá</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-700">
                      Dưới 2,000,000 VND
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-700">
                      2,000,000 - 3,000,000 VND
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-700">
                      Trên 3,000,000 VND
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                Xóa tất cả
              </button>
              <button className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors">
                Áp dụng
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <ProductGrid products={products} />
      </main>

      <Footer />
    </div>
  );
}
