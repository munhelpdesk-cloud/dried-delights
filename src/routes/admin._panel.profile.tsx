import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/components/admin-pages";

export const Route = createFileRoute("/admin/_panel/profile")({
  head: () => ({
    meta: [
      { title: "Profile & Settings — ASM Delights Admin" },
      { name: "description", content: "Manage the ASM Delights administrator profile and preferences." },
      { property: "og:title", content: "Profile & Settings — ASM Delights Admin" },
      { property: "og:description", content: "ASM Delights administrator profile settings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProfilePage,
});