import { createFileRoute } from "@tanstack/react-router";
import { ReportsPage } from "@/components/admin-pages";

export const Route = createFileRoute("/admin/_panel/reports")({
  head: () => ({
    meta: [
      { title: "Reports & Analytics — ASM Delights Admin" },
      { name: "description", content: "Review ASM Delights sales trends, category demand, and store performance." },
      { property: "og:title", content: "Reports & Analytics — ASM Delights Admin" },
      { property: "og:description", content: "ASM Delights sales and performance reports." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ReportsPage,
});