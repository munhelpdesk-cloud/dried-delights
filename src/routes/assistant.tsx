import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, WandSparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/assistant")({
  head: () => ({ meta: [
    { title: "Find My Perfect Pick | ASM Delights" },
    { name: "description", content: "Get personalised dry-fruit and recipe pairing recommendations from ASM Delights." },
    { property: "og:title", content: "Find My Perfect Pick | ASM Delights" },
    { property: "og:description", content: "Describe your needs or recipe and discover fitting ASM Delights products." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: AssistantPage,
});

function AssistantPage() {
  return <main className="flex min-h-screen items-center justify-center bg-background px-5 text-center"><div className="max-w-lg"><WandSparkles className="mx-auto mb-5 text-accent" size={32} /><h1 className="font-display text-4xl font-semibold text-primary">Find my perfect pick</h1><p className="mt-4 leading-7 text-muted-foreground">The personalised shopping assistant is being prepared.</p><Button asChild className="mt-7"><Link to="/"><ArrowLeft /> Back to shop</Link></Button></div></main>;
}