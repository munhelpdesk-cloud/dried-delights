import type { ReactNode } from "react";
import { StoreShell } from "@/components/store-shell";

export function InfoPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return <StoreShell><section className="border-b border-border bg-secondary"><div className="mx-auto max-w-4xl px-5 py-14 text-center lg:py-20"><p className="text-xs font-extrabold uppercase text-accent-foreground">{eyebrow}</p><h1 className="mt-3 font-display text-4xl font-bold text-primary sm:text-5xl">{title}</h1><p className="mx-auto mt-4 max-w-2xl leading-7 text-muted-foreground">{intro}</p></div></section><div className="mx-auto max-w-4xl px-5 py-12 lg:py-16">{children}</div></StoreShell>;
}

export function InfoSection({ title, children }: { title: string; children: ReactNode }) {
  return <section className="border-b border-border py-7 last:border-0"><h2 className="font-display text-2xl font-bold text-primary">{title}</h2><div className="mt-3 space-y-3 text-sm leading-7 text-muted-foreground">{children}</div></section>;
}