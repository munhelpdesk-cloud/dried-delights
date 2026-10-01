import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products } from "@/data/catalog";

export type CartItem = { slug: string; size: string; quantity: number };
type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (slug: string, size: string, quantity?: number) => void;
  setQuantity: (slug: string, size: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "asm-delights-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved) as CartItem[]);
    } catch { /* Keep an empty bag if browser storage is unavailable. */ }
  }, []);

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch { /* UI still works in memory. */ }
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => {
      const product = products.find((entry) => entry.slug === item.slug);
      const price = product?.sizes.find((size) => size.label === item.size)?.price ?? product?.price ?? 0;
      return sum + price * item.quantity;
    }, 0);
    return {
      items,
      count,
      subtotal,
      addItem: (slug, size, quantity = 1) => setItems((current) => {
        const match = current.find((item) => item.slug === slug && item.size === size);
        return match
          ? current.map((item) => item === match ? { ...item, quantity: item.quantity + quantity } : item)
          : [...current, { slug, size, quantity }];
      }),
      setQuantity: (slug, size, quantity) => setItems((current) => quantity <= 0
        ? current.filter((item) => !(item.slug === slug && item.size === size))
        : current.map((item) => item.slug === slug && item.size === size ? { ...item, quantity } : item)),
      clear: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used within CartProvider");
  return value;
}