"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  Cart,
  CartItem,
  addCartItem,
  getCart,
  updateCartItem,
  removeCartItem,
} from "@/services/customer/cart";

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  itemCount: number;
  addToCart: (variantId: string, qty: number) => Promise<void>;
  buyNow: (variantId: string, qty: number) => Promise<void>;
  updateQuantity: (itemId: string, qty: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  refreshCart: () => Promise<void>;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Load userId from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserId(user.id);
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }
  }, []);

  // Load cart when userId is available
  useEffect(() => {
    if (userId) {
      refreshCart();
    }
  }, [userId]);

  const refreshCart = async () => {
    if (!userId) return;

    try {
      setIsLoading(true);
      const cartData = await getCart(userId);
      setCart(cartData);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (variantId: string, qty: number = 1) => {
    if (!userId) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
      return;
    }

    try {
      setIsLoading(true);
      const updatedCart = await addCartItem(userId, { variantId, qty });
      setCart(updatedCart);
      setIsOpen(true); // Mở drawer để xem giỏ hàng
      // Refresh lại cart để đảm bảo hiển thị đầy đủ
      await refreshCart();
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      alert("Không thể thêm sản phẩm vào giỏ hàng");
    } finally {
      setIsLoading(false);
    }
  };

  const buyNow = async (variantId: string, qty: number = 1) => {
    if (!userId) {
      alert("Vui lòng đăng nhập để mua hàng");
      return;
    }

    try {
      setIsLoading(true);
      const updatedCart = await addCartItem(userId, { variantId, qty });
      setCart(updatedCart);
      // Redirect đến trang checkout
      window.location.href = "/checkout";
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      alert("Không thể thêm sản phẩm vào giỏ hàng");
      setIsLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, qty: number) => {
    try {
      setIsLoading(true);
      const updatedCart = await updateCartItem(itemId, { qty });
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to update cart item:", error);
      alert("Không thể cập nhật số lượng");
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      setIsLoading(true);
      const updatedCart = await removeCartItem(itemId);
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to remove cart item:", error);
      alert("Không thể xóa sản phẩm");
    } finally {
      setIsLoading(false);
    }
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const itemCount = cart?.items?.reduce((sum, item) => sum + item.qty, 0) || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        itemCount,
        addToCart,
        buyNow,
        updateQuantity,
        removeItem,
        refreshCart,
        isOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
