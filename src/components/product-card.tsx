import { Link } from "@tanstack/react-router";
import { Heart, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/catalog";
import { useCart } from "@/lib/cart";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const firstSize = product.sizes[0];
  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

  return (
    <article className="group min-w-0">
      <div className="relative aspect-[4/5] overflow-hidden border border-border bg-card">
        <Link to="/products/$slug" params={{ slug: product.slug }} aria-label={`View ${product.name}`}>
          <img src={product.image} alt={product.name} loading="lazy" width={1200} height={1200} className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035] ${product.crop}`} />
        </Link>
        <span className="absolute left-0 top-0 bg-primary px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-widest text-primary-foreground">{discount}% off</span>
        <Button variant="secondary" size="icon-sm" aria-label={`Save ${product.name}`} className="absolute right-2 top-2 rounded-full"><Heart /></Button>
      </div>
      <div className="pt-3">
        <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-rating"><Star size={11} fill="currentColor" /><span>4.{product.rating}</span><span className="font-normal text-muted-foreground">({product.reviews})</span></div>
        <Link to="/products/$slug" params={{ slug: product.slug }}><h3 className="mt-1 line-clamp-2 min-h-10 font-display text-lg leading-5 text-primary sm:text-xl">{product.name}</h3></Link>
        <p className="mt-1 line-clamp-1 text-[11px] text-muted-foreground">{product.detail}</p>
        <div className="mt-3 flex items-end justify-between gap-2">
          <p className="text-sm font-semibold text-primary">₹{product.price} <span className="text-[10px] font-normal text-muted-foreground line-through">₹{product.oldPrice}</span></p>
          <Button size="sm" disabled={!firstSize} onClick={() => firstSize && addItem(product.slug, firstSize.label)}><Plus /> Add</Button>
        </div>
      </div>
    </article>
  );
}