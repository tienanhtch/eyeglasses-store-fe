import { api } from "@/utils/fetch-api";

export type PublicCategory = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  parentId?: string | null;
  sortOrder?: number | null;
  isActive?: boolean;
};

export type PublicProductVariant = {
  id: string;
  sku: string;
  color?: string | null;
  sizeMm?: number | null;
  bridgeMm?: number | null;
  templeMm?: number | null;
  retailPrice: number;
  salePrice?: number | null;
  active: boolean;
};

export type PublicProductImage = {
  id: string;
  url: string;
  alt?: string | null;
  sortOrder?: number | null;
};

export type PublicProductCategory = {
  id: string;
  slug: string;
  name: string;
};

export type PublicProduct = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  brand?: string | null;
  material?: string | null;
  frameShape?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  published: boolean;
  categories: PublicProductCategory[];
  variants: PublicProductVariant[];
  images: PublicProductImage[];
};

export type PublicProductsResponse = {
  products: PublicProduct[];
  timestamp: string;
};

export type PublicCategoriesResponse = {
  categories: PublicCategory[];
  timestamp: string;
};

export type SearchItem = {
  id: string;
  slug: string;
  name: string;
  brand?: string | null;
  material?: string | null;
  frameShape?: string | null;
  isNew?: boolean;
  isBestSeller?: boolean;
  price?: number | null;
  maxPrice?: number | null;
  thumbnail?: { id: string; url: string; alt?: string | null };
  inStock: boolean;
  variantId?: string | null; // First variant ID for adding to cart
  colors?: string[]; // List of available colors
};

export type SearchResponse = {
  items: SearchItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export const getPublicCategories = () => {
  return api.get<PublicCategoriesResponse>("/public/categories");
};

export const getPublicProducts = () => {
  return api.get<PublicProductsResponse>("/public/products");
};

export const getPublicProductDetail = (slug: string) => {
  return api.get<PublicProduct>(`/public/products/${slug}`);
};

export const searchPublicProducts = (params: {
  q?: string;
  category?: string;
  material?: string;
  frameShape?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  size?: number;
  sort?: string;
  direction?: "asc" | "desc";
}) => {
  const query = new URLSearchParams();
  if (params.q) query.append("q", params.q);
  if (params.category) query.append("category", params.category);
  if (params.material) query.append("material", params.material);
  if (params.frameShape) query.append("frameShape", params.frameShape);
  if (params.isNew != null) query.append("isNew", params.isNew.toString());
  if (params.isBestSeller != null) query.append("isBestSeller", params.isBestSeller.toString());
  if (params.minPrice != null) query.append("minPrice", params.minPrice.toString());
  if (params.maxPrice != null) query.append("maxPrice", params.maxPrice.toString());
  if (params.page != null) query.append("page", params.page.toString());
  if (params.size != null) query.append("size", params.size.toString());
  if (params.sort) query.append("sort", params.sort);
  if (params.direction) query.append("direction", params.direction);

  const qs = query.toString();
  return api.get<SearchResponse>(`/public/products/search${qs ? `?${qs}` : ""}`);
};


