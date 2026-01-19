"use client";

import { useEffect, useState, Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/product/ProductGrid";
import CollectionCategories from "@/components/product/CollectionCategories";
import { Product } from "@/types";
import { Filter, SortAsc } from "lucide-react";
import { searchPublicProducts, SearchItem } from "@/services/catalog";
import { useRouter, useSearchParams } from "next/navigation";

function KinhCanContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("view-all");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  // Additional filter states
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [selectedShapes, setSelectedShapes] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        // Build search params based on active filter
        const params: any = {
          category: "kinh-can",
          size: 50,
        };

        switch (activeFilter) {
          case "new-collection":
            params.isNew = true;
            break;
          case "best-seller":
            params.isBestSeller = true;
            break;
          case "metal":
            params.material = "Metal";
            break;
          case "oval":
            params.frameShape = "Oval";
            break;
          case "rectangle":
            params.frameShape = "Rectangle";
            break;
          case "round":
            params.frameShape = "Round";
            break;
          case "cat-eye":
            params.frameShape = "Cat Eye";
            break;
          default:
            // view-all: no additional filters
            break;
        }

        // Apply price range filters
        if (priceRange.length > 0) {
          // Get min and max from selected ranges
          const prices = priceRange.map((range) => {
            if (range === "0-2000000") return { min: 0, max: 2000000 };
            if (range === "2000000-3000000")
              return { min: 2000000, max: 3000000 };
            if (range === "3000000+") return { min: 3000000, max: 99999999 };
            return { min: 0, max: 0 };
          });
          const minPrice = Math.min(...prices.map((p) => p.min));
          const maxPrice = Math.max(...prices.map((p) => p.max));
          params.minPrice = minPrice;
          params.maxPrice = maxPrice;
        }

        // Apply frameShape filters from sidebar
        if (selectedShapes.length > 0) {
          // Use first selected shape (API doesn't support multiple frameShapes in one call)
          params.frameShape = selectedShapes[0];
        }

        const resp = await searchPublicProducts(params);

        console.log("Search API Response:", resp);
        console.log("First item inStock:", resp.items[0]?.inStock);

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
            colors: [], // No color data in search results
            category: "kinh-can",
            description: "",
            isNew: item.isNew || false,
            isBestSeller: item.isBestSeller || false,
            isOutOfStock: !item.inStock,
            material: item.material || undefined,
            variantId: item.variantId || undefined, // Add first variant ID for cart
          })
        );

        console.log("Mapped products:", mappedProducts);

        setProducts(mappedProducts);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [activeFilter, priceRange, selectedShapes]);

  // Category filter data
  const categories = [
    {
      id: "view-all",
      name: "Tất cả",
      slug: "view-all-kinh-can",
      image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=300&fit=crop",
      isActive: activeFilter === "view-all",
    },
    {
      id: "new-collection",
      name: "Bộ sưu tập mới",
      slug: "new-collection",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=300&fit=crop",
      isActive: activeFilter === "new-collection",
    },
    {
      id: "best-seller",
      name: "Bán chạy",
      slug: "best-seller-kinh-can",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
      isActive: activeFilter === "best-seller",
    },
    {
      id: "metal",
      name: "Kim loại",
      slug: "metal",
      image: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=400&h=300&fit=crop",
      isActive: activeFilter === "metal",
    },
    {
      id: "oval",
      name: "Oval",
      slug: "oval",
      image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=300&fit=crop",
      isActive: activeFilter === "oval",
    },
    {
      id: "rectangle",
      name: "Rectangle",
      slug: "rectangle",
      image: "https://images.unsplash.com/photo-1483412468200-72182dbbc544?w=400&h=300&fit=crop",
      isActive: activeFilter === "rectangle",
    },
    {
      id: "round",
      name: "Round",
      slug: "round",
      image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&h=300&fit=crop",
      isActive: activeFilter === "round",
    },
    {
      id: "cat-eye",
      name: "Cat Eye",
      slug: "cat-eye",
      image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=400&h=300&fit=crop",
      isActive: activeFilter === "cat-eye",
    },
  ];

  const handleCategoryClick = (categoryId: string) => {
    console.log("Filter clicked:", categoryId);
    setActiveFilter(categoryId);
  };

  const handleSort = (value: string) => {
    setSortBy(value);
    // TODO: Implement sorting logic
  };

  const handlePriceRangeToggle = (range: string) => {
    setPriceRange((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const handleShapeToggle = (shape: string) => {
    setSelectedShapes((prev) =>
      prev.includes(shape) ? prev.filter((s) => s !== shape) : [...prev, shape]
    );
  };

  const handleApplyFilters = () => {
    console.log("Applying filters:", { priceRange, selectedShapes });
    // Trigger reload with filters
    setActiveFilter("view-all"); // This will trigger useEffect
  };

  const handleClearFilters = () => {
    setPriceRange([]);
    setSelectedShapes([]);
    console.log("Filters cleared");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Collection Categories */}
        <CollectionCategories
          categories={categories}
          basePath="/products/kinh-can"
          onCategoryClick={handleCategoryClick}
        />

        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Kính cận thời trang
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 px-4">
            Khám phá bộ sưu tập kính cận với thiết kế hiện đại và chất lượng cao
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
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
                <h3 className="font-medium text-gray-900 mb-3">Hình dạng gọng</h3>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedShapes.includes("Oval")}
                      onChange={() => handleShapeToggle("Oval")}
                    />
                    <span className="text-sm text-gray-700">Oval</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedShapes.includes("Rectangle")}
                      onChange={() => handleShapeToggle("Rectangle")}
                    />
                    <span className="text-sm text-gray-700">Rectangle</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedShapes.includes("Round")}
                      onChange={() => handleShapeToggle("Round")}
                    />
                    <span className="text-sm text-gray-700">Round</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedShapes.includes("Cat Eye")}
                      onChange={() => handleShapeToggle("Cat Eye")}
                    />
                    <span className="text-sm text-gray-700">Cat Eye</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Giá</h3>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={priceRange.includes("0-2000000")}
                      onChange={() => handlePriceRangeToggle("0-2000000")}
                    />
                    <span className="text-sm text-gray-700">
                      Dưới 2,000,000 VND
                    </span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={priceRange.includes("2000000-3000000")}
                      onChange={() => handlePriceRangeToggle("2000000-3000000")}
                    />
                    <span className="text-sm text-gray-700">
                      2,000,000 - 3,000,000 VND
                    </span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={priceRange.includes("3000000+")}
                      onChange={() => handlePriceRangeToggle("3000000+")}
                    />
                    <span className="text-sm text-gray-700">
                      Trên 3,000,000 VND
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Xóa tất cả
              </button>
              <button
                onClick={handleApplyFilters}
                className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                Áp dụng
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <ProductGrid products={products} isLoading={loading} />
      </main>

      <Footer />
    </div>
  );
}

export default function KinhCanPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                <p className="mt-4 text-gray-600">Đang tải sản phẩm...</p>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      }
    >
      <KinhCanContent />
    </Suspense>
  );
}
