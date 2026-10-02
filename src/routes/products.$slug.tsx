import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Minus, Plus, ShieldCheck, ShoppingBag, Star, Truck } from "lucide-react";
import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import { StoreShell } from "@/components/store-shell";
import { Button } from "@/components/ui/button";
import { productBySlug, products } from "@/data/catalog";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => { const product = productBySlug(params.slug); if (!product) throw notFound(); return product; },
  head: ({ loaderData }) => ({ meta: [
    { title: loaderData ? `${loaderData.name} | ASM Delights` : "Product | ASM Delights" },
    { name: "description", content: loaderData?.description ?? "Explore premium dry fruits from ASM Delights." },
    { property: "og:title", content: loaderData ? `${loaderData.name} | ASM Delights` : "Product | ASM Delights" },
    { property: "og:description", content: loaderData?.description ?? "Explore premium dry fruits from ASM Delights." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: ProductPage,
});

function ProductPage() {
  const product = Route.useLoaderData();
  const initialSize = product.sizes[0];
  const [size, setSize] = useState(initialSize);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [pin, setPin] = useState("");
  const [deliveryChecked, setDeliveryChecked] = useState(false);
  const { addItem } = useCart();
  if (!size) return null;
  const addToBag = () => { addItem(product.slug, size.label, quantity); setAdded(true); window.setTimeout(() => setAdded(false), 1800); };
  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  return <StoreShell>
    <section className="mx-auto max-w-[1360px] px-5 py-8 lg:px-10 lg:py-12">
      <nav className="mb-7 text-xs text-muted-foreground"><Link to="/shop" className="hover:text-primary">Shop</Link><span className="mx-2">/</span>{product.name}</nav>
      <div className="grid gap-9 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div><div className="aspect-square overflow-hidden rounded-md border border-border bg-secondary"><img src={product.image} alt={product.name} width={1200} height={1200} className={`h-full w-full object-cover ${product.crop}`}/></div><div className="mt-3 grid grid-cols-3 gap-2">{product.highlights.map(highlight=><div key={highlight} className="flex min-h-20 items-center gap-2 rounded-md border border-border bg-card p-3 text-[11px] font-bold text-primary sm:text-xs"><Check size={15} className="shrink-0 text-accent"/>{highlight}</div>)}</div></div>
        <div className="lg:py-2"><div className="flex items-center gap-2"><span className="rounded-sm bg-sale px-2 py-1 text-[10px] font-extrabold uppercase text-sale-foreground">{discount}% off</span><span className="flex items-center gap-1 text-xs font-bold text-rating"><Star size={13} fill="currentColor"/>4.{product.rating} ({product.reviews})</span></div><h1 className="mt-4 font-display text-4xl font-bold text-primary sm:text-5xl">{product.name}</h1><p className="mt-4 leading-7 text-muted-foreground">{product.description}</p><div className="mt-5 flex items-baseline gap-3"><p className="text-3xl font-extrabold text-primary">₹{size.price}</p><p className="text-sm text-muted-foreground line-through">₹{product.oldPrice}</p><p className="text-xs text-muted-foreground">incl. taxes</p></div>
          <div className="mt-7"><p className="mb-3 text-sm font-bold text-foreground">Choose size</p><div className="grid grid-cols-3 gap-2">{product.sizes.map(option=><Button key={option.label} type="button" variant={size.label===option.label?"default":"outline"} className="h-14 flex-col gap-0" onClick={()=>setSize(option)}><span>{option.label}</span><span className="text-[10px] opacity-75">₹{option.price}</span></Button>)}</div></div>
          <div className="mt-5 flex gap-3"><div className="flex h-12 items-center rounded-md border border-input bg-card"><Button variant="ghost" size="icon" aria-label="Decrease quantity" onClick={()=>setQuantity(value=>Math.max(1,value-1))}><Minus/></Button><span className="w-9 text-center text-sm font-bold">{quantity}</span><Button variant="ghost" size="icon" aria-label="Increase quantity" onClick={()=>setQuantity(value=>value+1)}><Plus/></Button></div><Button className="h-12 flex-1" onClick={addToBag}>{added?<><Check/>Added to bag</>:<><ShoppingBag/>Add to bag</>}</Button></div>
          <div className="mt-6 rounded-md border border-border p-4"><p className="flex items-center gap-2 text-sm font-bold text-primary"><Truck size={17}/>Check delivery</p><form onSubmit={event=>{event.preventDefault();setDeliveryChecked(true)}} className="mt-3 flex gap-2"><input value={pin} onChange={e=>setPin(e.target.value.replace(/\D/g,"").slice(0,6))} required minLength={6} inputMode="numeric" placeholder="Enter PIN code" aria-label="PIN code" className="h-10 min-w-0 flex-1 rounded-md border border-input bg-card px-3 text-sm outline-none focus:ring-1 focus:ring-ring"/><Button type="submit" variant="outline">Check</Button></form>{deliveryChecked&&<p className="mt-3 text-xs font-semibold text-primary">Delivery is available. Estimated arrival in 3–5 working days.</p>}</div>
          <div className="mt-7 grid gap-5 border-y border-border py-6 sm:grid-cols-2"><div><h2 className="text-sm font-bold text-primary">Ingredients</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{product.ingredients}</p></div><div><h2 className="text-sm font-bold text-primary">Origin</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{product.origin}</p></div></div>
          <div className="mt-6"><h2 className="font-display text-xl font-bold text-primary">Nutrition per 100g</h2><div className="mt-3 divide-y divide-border border-y border-border">{product.nutrition.map(row=><div key={row.label} className="flex justify-between py-3 text-sm"><span className="text-muted-foreground">{row.label}</span><span className="font-bold text-primary">{row.value}</span></div>)}</div></div>
          <p className="mt-6 flex items-center gap-2 text-xs font-bold text-primary"><ShieldCheck size={17} className="text-accent"/>Sealed for freshness and quality checked</p>
        </div>
      </div>
    </section>
    <section className="bg-muted py-12"><div className="mx-auto max-w-[1360px] px-5 lg:px-10"><h2 className="font-display text-2xl font-bold text-primary">You may also like</h2><div className="mt-7 grid grid-cols-2 gap-4 lg:grid-cols-4">{products.filter(item=>item.slug!==product.slug).slice(0,4).map(item=><ProductCard key={item.slug} product={item}/>)}</div></div></section>
  </StoreShell>;
}