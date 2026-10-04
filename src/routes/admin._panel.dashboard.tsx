import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/components/admin-pages";

export const Route = createFileRoute("/admin/_panel/dashboard")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — ASM Delights" },
      { name: "description", content: "ASM Delights sales, orders, customers, and inventory overview." },
      { property: "og:title", content: "Admin Dashboard — ASM Delights" },
      { property: "og:description", content: "ASM Delights store administration overview." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DashboardPage,
});