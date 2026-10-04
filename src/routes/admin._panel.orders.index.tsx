import { createFileRoute } from "@tanstack/react-router";
import { OrdersPage } from "@/components/admin-pages";

export const Route = createFileRoute("/admin/_panel/orders/")({
  head: () => ({
    meta: [
      { title: "Orders — ASM Delights Admin" },
      { name: "description", content: "Review ASM Delights orders, payments, and fulfilment status." },
      { property: "og:title", content: "Orders — ASM Delights Admin" },
      { property: "og:description", content: "ASM Delights order and fulfilment management." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OrdersPage,
});