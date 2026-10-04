import { createFileRoute } from "@tanstack/react-router";
import { ProductFormPage } from "@/components/admin-pages";

export const Route = createFileRoute("/admin/_panel/products/new")({
  head: () => ({
    meta: [
      { title: "Add Product — ASM Delights Admin" },
      { name: "description", content: "Create a new product in the ASM Delights admin catalog." },
      { property: "og:title", content: "Add Product — ASM Delights Admin" },
      { property: "og:description", content: "Create a new ASM Delights catalog product." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <ProductFormPage />,
});