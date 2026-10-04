import { createFileRoute } from "@tanstack/react-router";
import { ProductsPage } from "@/components/admin-pages";

export const Route = createFileRoute("/admin/_panel/products/")({
  head: () => ({
    meta: [
      { title: "Manage Products — ASM Delights Admin" },
      { name: "description", content: "Add, update, and remove products from the ASM Delights admin catalog." },
      { property: "og:title", content: "Manage Products — ASM Delights Admin" },
      { property: "og:description", content: "Manage the ASM Delights product catalog and inventory." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProductsPage,
});