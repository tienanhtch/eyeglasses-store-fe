"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Heart, Share2, Minus, Plus, Check } from "lucide-react";
import { getPublicProductDetail, type PublicProduct, type PublicProductVariant } from "@/services/catalog";
import { mapPublicProductToUiProduct } from "@/utils/catalog-mappers";
import { addCartItem } from "@/services/customer/cart";
import { getCurrentUserId } from "@/utils/auth-storage";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.id as string;

  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<PublicProduct | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<PublicProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [wished, setWished] = useState(false);
  const [copied, setCopied] = useState(false);

  // Tồn kho còn lại của variant đang chọn
  const availableStock = selectedVariant?.totalAvailable ?? 0;
  const outOfStock = availableStock <= 0;

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const d = await getPublicProductDetail(slug);
        setDetail(d);
        const firstVariant = d.variants?.[0] || null;
        setSelectedVariant(firstVariant);
        setQuantity(1);
        // Ảnh đầu tiîn làm ảnh đang hiển thị
        const firstImg = d.images?.[0]?.url || null;
        setSelectedImage(firstImg);
        // Check wishlist từ localStorage
        try {
          const wl: string[] = JSON.parse(localStorage.getItem("wishlist") || "[]");
          setWished(wl.includes(d.id));
        } catch {}
      } catch (e) {
        console.error(e);
        setDetail(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  const uiProduct = useMemo(() => (detail ? mapPublicProductToUiProduct(detail) : null), [detail]);
  const images = detail?.images?.map((i) => i.url).filter(Boolean) as string[] || [];
  const mainImage = selectedImage || images[0] || uiProduct?.images?.[0] || "";

  // Toggle wishlist
  const handleWishlist = useCallback(() => {
    if (!detail) return;
    const wl: string[] = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const next = wished
      ? wl.filter((id) => id !== detail.id)
      : [...wl, detail.id];
    localStorage.setItem("wishlist", JSON.stringify(next));
    setWished(!wished);
  }, [detail, wished]);

  // Share
  const handleShare = useCallback(async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: uiProduct?.name || "", url }); } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [uiProduct]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-gray-600">Đang tải sản phẩm...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!detail || !uiProduct) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Sản phẩm không tồn tại
            </h1>
            <p className="text-gray-600">Vui lòng quay lại trang chủ</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = async () => {
    const userId = getCurrentUserId();
    if (!userId) {
      router.push("/auth/login");
      return;
    }
    if (!selectedVariant) {
      alert("Vui lòng chọn phiên bản");
      return;
    }

    try {
      await addCartItem(userId, {
        variantId: selectedVariant.id,
        qty: quantity,
      });
      router.push("/cart");
    } catch (e: any) {
      console.error(e);
      alert(e?.response?.data?.error || "Không thể thêm vào giỏ hàng");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <a href="/" className="hover:text-gray-900">
                Trang chủ
              </a>
            </li>
            <li>/</li>
            <li>
              <a href="/products/kinh-can" className="hover:text-gray-900">
                Sản phẩm
              </a>
            </li>
            <li>/</li>
            <li className="text-gray-900">{uiProduct.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Ảnh chính */}
            <div className="aspect-square relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={uiProduct.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">Không có ảnh</div>
              )}
            </div>
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.slice(0, 8).map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImage(image)}
                    className={`aspect-square relative overflow-hidden rounded border-2 transition-colors ${
                      mainImage === image ? "border-gray-900" : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${uiProduct.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {uiProduct.name}
              </h1>
              <p className="text-lg text-gray-600">{uiProduct.description}</p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-900">
                {uiProduct.price.toLocaleString("vi-VN")} VND
              </span>
              {uiProduct.originalPrice &&
                uiProduct.originalPrice > uiProduct.price && (
                  <span className="text-xl text-gray-500 line-through">
                    {uiProduct.originalPrice.toLocaleString("vi-VN")} VND
                  </span>
                )}
            </div>

            {/* Colors */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Phiên bản
              </h3>
              <div className="flex flex-wrap gap-2">
                {(detail.variants || []).map((v) => (
                  <button
                    key={v.id}
                    onClick={() => { setSelectedVariant(v); setQuantity(1); }}
                    className={`px-3 py-2 rounded-md border text-sm ${
                      selectedVariant?.id === v.id
                        ? "border-gray-900"
                        : "border-gray-300"
                    } ${
                      !v.active || (v.totalAvailable ?? 0) <= 0 ? "opacity-50 cursor-not-allowed" : "hover:border-gray-600"
                    }`}
                    disabled={!v.active || (v.totalAvailable ?? 0) <= 0}
                    title={v.sku}
                  >
                    {v.color || v.sku}
                    {(v.totalAvailable ?? 0) <= 0 && <span className="ml-1 text-xs">(Hết)</span>}
                  </button>
                ))}
              </div>
              {selectedVariant && (
                <div className="mt-2 flex items-center gap-2">
                  <p className="text-sm text-gray-600">Đã chọn: {selectedVariant.color || selectedVariant.sku}</p>
                  {outOfStock ? (
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Hết hàng</span>
                  ) : availableStock <= 5 ? (
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Còn {availableStock}</span>
                  ) : (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Còn hàng ({availableStock})</span>
                  )}
                </div>
              )}
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Số lượng
              </h3>
              <div className="flex items-center border border-gray-300 rounded-md w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={outOfStock}
                  className="p-2 hover:bg-gray-50 disabled:opacity-40"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 text-sm font-medium">{outOfStock ? 0 : quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(availableStock, quantity + 1))}
                  disabled={outOfStock || quantity >= availableStock}
                  className="p-2 hover:bg-gray-50 disabled:opacity-40"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              {!outOfStock && availableStock > 0 && (
                <p className="text-xs text-gray-500 mt-1">Tối đa: {availableStock}</p>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={outOfStock || !selectedVariant}
                className="w-full bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {outOfStock ? "Hết hàng" : "Thêm vào giỏ hàng"}
              </button>

              <div className="flex gap-3">
                <button
                  onClick={handleWishlist}
                  className={`flex-1 border py-3 px-6 rounded-md transition-colors font-medium flex items-center justify-center gap-2 ${
                    wished
                      ? "border-red-400 bg-red-50 text-red-600 hover:bg-red-100"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Heart className={`h-4 w-4 ${wished ? "fill-red-500 text-red-500" : ""}`} />
                  {wished ? "Đã yêu thích" : "Yêu thích"}
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-md hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  {copied ? <Check className="h-4 w-4 text-green-600" /> : <Share2 className="h-4 w-4" />}
                  {copied ? "Đã sao chép!" : "Chia sẻ"}
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Thông tin sản phẩm
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <strong>Chất liệu:</strong> {detail.material || "-"}
                </p>
                <p>
                  <strong>Danh mục:</strong>{" "}
                  {detail.categories?.map((c) => c.name).join(", ") || "-"}
                </p>
                <p>
                  <strong>Thương hiệu:</strong> {detail.brand || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
