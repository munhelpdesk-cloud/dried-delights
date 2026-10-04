import { createFileRoute } from "@tanstack/react-router";
import { TransactionsPage } from "@/components/admin-pages";

export const Route = createFileRoute("/admin/_panel/transactions")({
  head: () => ({
    meta: [
      { title: "Transactions — ASM Delights Admin" },
      { name: "description", content: "Track ASM Delights payments, pending collections, and refunds." },
      { property: "og:title", content: "Transactions — ASM Delights Admin" },
      { property: "og:description", content: "ASM Delights payment transaction ledger." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TransactionsPage,
});