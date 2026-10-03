import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products } from "@/data/catalog";

export type AdminProduct = {
  slug: string; name: string; category: string; price: number; oldPrice: number;
  stock: number; status: "Active" | "Draft" | "Low stock"; sku: string; image: string; description: string;
};
export type AdminProfile = { name: string; email: string; phone: string; role: string; notifications: boolean };

type AdminContextValue = {
  products: AdminProduct[]; profile: AdminProfile; signedIn: boolean; hydrated: boolean;
  signIn: (email: string) => void; signOut: () => void;
  saveProduct: (product: AdminProduct) => void; deleteProduct: (slug: string) => void;
  saveProfile: (profile: AdminProfile) => void;
};

const STORAGE_PRODUCTS = "asm-admin-products";
const STORAGE_SESSION = "asm-admin-session";
const STORAGE_PROFILE = "asm-admin-profile";

const initialProducts: AdminProduct[] = products.map((product, index) => ({
  slug: product.slug,
  name: product.name,
  category: product.category,
  price: product.price,
  oldPrice: product.oldPrice,
  stock: [64, 28, 11, 37, 8, 42, 16, 53][index] ?? 20,
  status: index === 4 ? "Low stock" : "Active",
  sku: `ASM-${String(index + 101).padStart(4, "0")}`,
  image: product.image,
  description: product.description,
}));

const defaultProfile: AdminProfile = {
  name: "Yash Thakkar", email: "admin@asmdelights.com", phone: "+91 98765 43210", role: "Store Administrator", notifications: true,
};

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [adminProducts, setAdminProducts] = useState(initialProducts);
  const [profile, setProfile] = useState(defaultProfile);
  const [signedIn, setSignedIn] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedProducts = window.localStorage.getItem(STORAGE_PRODUCTS);
      const savedProfile = window.localStorage.getItem(STORAGE_PROFILE);
      setAdminProducts(savedProducts ? JSON.parse(savedProducts) : initialProducts);
      setProfile(savedProfile ? JSON.parse(savedProfile) : defaultProfile);
      setSignedIn(window.localStorage.getItem(STORAGE_SESSION) === "active");
    } catch { /* retain defaults */ }
    setHydrated(true);
  }, []);

  const value = useMemo<AdminContextValue>(() => ({
    products: adminProducts, profile, signedIn, hydrated,
    signIn: (email) => {
      const next = { ...profile, email };
      setProfile(next); setSignedIn(true);
      window.localStorage.setItem(STORAGE_SESSION, "active");
      window.localStorage.setItem(STORAGE_PROFILE, JSON.stringify(next));
    },
    signOut: () => { setSignedIn(false); window.localStorage.removeItem(STORAGE_SESSION); },
    saveProduct: (product) => setAdminProducts((current) => {
      const exists = current.some((item) => item.slug === product.slug);
      const next = exists ? current.map((item) => item.slug === product.slug ? product : item) : [product, ...current];
      window.localStorage.setItem(STORAGE_PRODUCTS, JSON.stringify(next));
      return next;
    }),
    deleteProduct: (slug) => setAdminProducts((current) => {
      const next = current.filter((item) => item.slug !== slug);
      window.localStorage.setItem(STORAGE_PRODUCTS, JSON.stringify(next));
      return next;
    }),
    saveProfile: (next) => { setProfile(next); window.localStorage.setItem(STORAGE_PROFILE, JSON.stringify(next)); },
  }), [adminProducts, profile, signedIn, hydrated]);

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
}
