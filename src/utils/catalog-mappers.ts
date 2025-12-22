import type { Product, ProductColor } from "@/types/product";
import type { PublicProduct } from "@/services/catalog";

const COLOR_HEX: Record<string, string> = {
  đen: "#111827",
  den: "#111827",
  black: "#111827",
  trắng: "#F9FAFB",
  trang: "#F9FAFB",
  white: "#F9FAFB",
  xám: "#6B7280",
  xam: "#6B7280",
  gray: "#6B7280",
  grey: "#6B7280",
  xanh: "#2563EB",
  blue: "#2563EB",
  đỏ: "#DC2626",
  do: "#DC2626",
  red: "#DC2626",
  vàng: "#F59E0B",
  vang: "#F59E0B",
  yellow: "#F59E0B",
  nâu: "#92400E",
  nau: "#92400E",
  brown: "#92400E",
};

function colorToHex(name?: string | null) {
  if (!name) return "#9CA3AF";
  const key = name.trim().toLowerCase();
  return COLOR_HEX[key] || "#9CA3AF";
}

function getPriceRange(p: PublicProduct) {
  const variants = p.variants || [];
  if (variants.length === 0) return { price: 0, originalPrice: undefined as number | undefined };
  const saleCandidates = variants
    .map((v) => (v.salePrice != null ? Number(v.salePrice) : null))
    .filter((x): x is number => typeof x === "number");
  const retailCandidates = variants.map((v) => Number(v.retailPrice)).filter((x) => !Number.isNaN(x));

  const price = (saleCandidates.length ? Math.min(...saleCandidates) : Math.min(...retailCandidates)) || 0;
  const originalPrice = retailCandidates.length ? Math.min(...retailCandidates) : undefined;
  return { price, originalPrice: originalPrice && originalPrice > price ? originalPrice : undefined };
}

export function mapPublicProductToUiProduct(p: PublicProduct): Product {
  const images = (p.images || []).map((i) => i.url).filter(Boolean);
  const { price, originalPrice } = getPriceRange(p);

  const colors: ProductColor[] = (p.variants || []).map((v) => ({
    id: v.id,
    name: v.color || v.sku,
    hex: colorToHex(v.color),
    image: images[0] || "/images/placeholder.jpg",
    isAvailable: !!v.active,
  }));

  const firstCategory = p.categories?.[0]?.name || "";

  return {
    id: p.slug, // FE routing đang dùng /products/[id] với slug
    name: p.name,
    price,
    originalPrice,
    images: images.length ? images : ["/images/placeholder.jpg"],
    colors: colors.length ? colors : [{
      id: p.id,
      name: "Default",
      hex: "#9CA3AF",
      image: images[0] || "/images/placeholder.jpg",
      isAvailable: true,
    }],
    category: firstCategory,
    description: p.description ?? undefined,
    material: p.material ?? undefined,
    isOutOfStock: colors.length ? colors.every((c) => !c.isAvailable) : false,
  };
}


