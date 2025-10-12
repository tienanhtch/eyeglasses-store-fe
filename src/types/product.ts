export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  colors: ProductColor[];
  category: string;
  description?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  isOutOfStock?: boolean;
  sizes?: string[];
  material?: string;
  features?: string[];
}

export interface ProductColor {
  id: string;
  name: string;
  hex: string;
  image: string;
  isAvailable: boolean;
}

export interface ProductVariant {
  id: string;
  productId: string;
  colorId: string;
  sizeId?: string;
  price: number;
  originalPrice?: number;
  stock: number;
  sku: string;
  isAvailable: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  children?: Category[];
}

export interface FilterOption {
  id: string;
  name: string;
  value: string;
  count: number;
}

export interface SortOption {
  id: string;
  name: string;
  value: string;
}

export interface ProductFilters {
  category?: string;
  colors?: string[];
  sizes?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  sortBy?: string;
  search?: string;
}
