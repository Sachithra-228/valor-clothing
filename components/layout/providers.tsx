"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartItem, Product } from "@/types/product";

type StoreContext = {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  toggleWishlist: (id: string) => void;
};

const Context = createContext<StoreContext | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("valor-cart") || "[]"));
    setWishlist(JSON.parse(localStorage.getItem("valor-wishlist") || "[]"));
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/products", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : []))
      .then(setProducts)
      .catch(() => {});
    return () => controller.abort();
  }, []);

  useEffect(() => localStorage.setItem("valor-cart", JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("valor-wishlist", JSON.stringify(wishlist)), [wishlist]);

  const value = useMemo<StoreContext>(
    () => ({
      products,
      cart,
      wishlist,
      addToCart: (item) =>
        setCart((current) => {
          const existing = current.find(
            (entry) => entry.productId === item.productId && entry.size === item.size && entry.color === item.color
          );
          if (existing) {
            return current.map((entry) => (entry === existing ? { ...entry, quantity: entry.quantity + item.quantity } : entry));
          }
          return [...current, item];
        }),
      removeFromCart: (id) => setCart((current) => current.filter((item) => item.productId !== id)),
      toggleWishlist: (id) =>
        setWishlist((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
    }),
    [products, cart, wishlist]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useStore() {
  const context = useContext(Context);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}

// Cart lines joined to their products. Lines whose product is not loaded (or no longer exists) are skipped.
export function useCartItems() {
  const { cart, products } = useStore();
  return useMemo(
    () =>
      cart.flatMap((item) => {
        const product = products.find((entry) => entry.slug === item.productId);
        return product ? [{ ...item, product }] : [];
      }),
    [cart, products]
  );
}
