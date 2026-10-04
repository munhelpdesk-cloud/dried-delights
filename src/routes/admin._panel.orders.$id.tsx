import { createFileRoute } from "@tanstack/react-router";
import { OrderDetailPage } from "@/components/admin-pages";

export const Route = createFileRoute("/admin/_panel/orders/$id")({
  head: () => ({
    meta: [
      { title: "Order Details — ASM Delights Admin" },
      { name: "description", content: "Review an ASM Delights order and its fulfilment details." },
      { property: "og:title", content: "Order Details — ASM Delights Admin" },
      { property: "og:description", content: "ASM Delights order details and status." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OrderRoute,
});

function OrderRoute() {
  const { id } = Route.useParams();
  return <OrderDetailPage id={id} />;
}