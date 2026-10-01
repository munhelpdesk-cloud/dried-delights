import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Minus, Plus, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StoreHeader } from "@/components/store-header";
import { productBySlug } from "@/data/catalog";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = productBySlug(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => ({ meta: [
    { title: loaderData ? `${loaderData.name} | ASM Delights` : "Product | ASM Delights" },
    { name: "description", content: loaderData?.description ?? "Explore premium dry fruits from ASM Delights." },
    { property: "og:title", content: loaderData ? `${loaderData.name} | ASM Delights` : "Product | ASM Delights" },
    { property: "og:description", content: loaderData?.description ?? "Explore premium dry fruits from ASM Delights." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ProductPage,
});

function ProductPage() {
  const product = Route.useLoaderData();
  const [size, setSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const addToBag = () => {
    addItem(product.slug, size.label, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return <div className="min-h-screen bg-background"><StoreHeader /><main className="mx-auto max-w-[1360px] px-5 py-8 lg:px-10 lg:py-14"><nav className="mb-7 text-xs text-muted-foreground"><Link to="/" className="hover:text-primary">Shop</Link> <span className="mx-2">/</span> {product.name}</nav><div className="grid gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16"><div><div className="aspect-square overflow-hidden rounded-md bg-secondary"><img src={product.image} alt={product.name} className={`h-full w-full scale-[1.5] object-cover ${product.crop}`} /></div><div className="mt-3 grid grid-cols-3 gap-3">{product.highlights.map((highlight) => <div key={highlight} className="flex min-h-20 items-center gap-2 rounded-md border border-border bg-card p-3 text-xs font-semibold text-primary"><Check size={15} className="shrink-0 text-accent" />{highlight}</div>)}</div></div><div className="lg:py-4"><p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">{product.badge}</p><h1 className="mt-3 font-display text-4xl font-semibold text-primary sm:text-5xl">{product.name}</h1><p className="mt-5 leading-7 text-muted-foreground">{product.description}</p><div className="mt-6 flex items-baseline gap-3"><p className="text-3xl font-bold text-primary">₹{size.price}</p><p className="text-sm text-muted-foreground">inclusive of all taxes</p></div><div className="mt-8"><p className="mb-3 text-sm font-bold text-primary">Choose a size</p><div className="grid grid-cols-3 gap-2">{product.sizes.map((option) => <Button key={option.label} type="button" variant={size.label === option.label ? "default" : "outline"} className="h-14 flex-col gap-0" onClick={() => setSize(option)}><span>{option.label}</span><span className="text-[10px] opacity-70">₹{option.price}</span></Button>)}</div></div><div className="mt-6 flex gap-3"><div className="flex h-12 items-center rounded-md border border-input bg-card"><Button type="button" variant="ghost" size="icon" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus /></Button><span className="w-10 text-center text-sm font-bold">{quantity}</span><Button type="button" variant="ghost" size="icon" aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)}><Plus /></Button></div><Button className="h-12 flex-1" onClick={addToBag}>{added ? <><Check /> Added to bag</> : <><ShoppingBag /> Add to bag</>}</Button></div><div className="mt-8 grid gap-4 border-y border-border py-6 sm:grid-cols-2"><div><p className="text-sm font-bold text-primary">Ingredients</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{product.ingredients}</p></div><div><p className="text-sm font-bold text-primary">Origin</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{product.origin}</p></div></div><div className="mt-7"><h2 className="font-display text-xl font-semibold text-primary">Nutrition per 100g</h2><div className="mt-4 divide-y divide-border border-y border-border">{product.nutrition.map((row) => <div key={row.label} className="flex justify-between py-3 text-sm"><span className="text-muted-foreground">{row.label}</span><span className="font-semibold text-primary">{row.value}</span></div>)}</div></div><div className="mt-7 rounded-md bg-secondary p-5"><p className="flex items-center gap-2 text-sm font-bold text-primary"><Truck size={18} /> Fresh delivery</p><p className="mt-2 text-sm text-muted-foreground">{product.delivery}</p><p className="mt-3 flex items-center gap-2 text-xs font-semibold text-primary"><ShieldCheck size={16} className="text-accent" /> Sealed for freshness and quality checked</p></div><div className="mt-7"><p className="text-sm font-bold text-primary">Beautiful with</p><div className="mt-3 flex flex-wrap gap-2">{product.pairings.map((pairing) => <span key={pairing} className="rounded-sm border border-border bg-card px-3 py-2 text-xs text-muted-foreground">{pairing}</span>)}</div></div></div></div></main></div>;
}