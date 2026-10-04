import { createFileRoute } from "@tanstack/react-router";
import { ProductFormPage } from "@/components/admin-pages";

export const Route = createFileRoute("/admin/_panel/products/$slug/edit")({
  head: () => ({
    meta: [
      { title: "Edit Product — ASM Delights Admin" },
      { name: "description", content: "Update product details and inventory in ASM Delights admin." },
      { property: "og:title", content: "Edit Product — ASM Delights Admin" },
      { property: "og:description", content: "Update an ASM Delights catalog product." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: EditProductRoute,
});

function EditProductRoute() {
  const { slug } = Route.useParams();
  return <ProductFormPage slug={slug} />;
}