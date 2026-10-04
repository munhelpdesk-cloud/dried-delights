import { createFileRoute } from "@tanstack/react-router";
import { CustomersPage } from "@/components/admin-pages";

export const Route = createFileRoute("/admin/_panel/customers")({
  head: () => ({
    meta: [
      { title: "Customers — ASM Delights Admin" },
      { name: "description", content: "Review ASM Delights customer activity and purchase value." },
      { property: "og:title", content: "Customers — ASM Delights Admin" },
      { property: "og:description", content: "ASM Delights customer directory and purchase insights." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CustomersPage,
});