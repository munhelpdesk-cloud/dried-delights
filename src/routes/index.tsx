import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Gift, PackageCheck, ShieldCheck, Star, Truck } from "lucide-react";
import heroImage from "@/assets/asm-campaign-hero.jpg";
import categoryImage from "@/assets/asm-packaging-lineup.jpg";
import giftImage from "@/assets/asm-gift-box.jpg";
import { ProductCard } from "@/components/product-card";
import { StoreShell } from "@/components/store-shell";
import { Button } from "@/components/ui/button";
import { products } from "@/data/catalog";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "ASM Delights | Premium Dry Fruits, Nuts & Gift Boxes" },
    { name: "description", content: "Shop premium almonds, cashews, pistachios, dates, healthy mixes and elegant gift boxes from ASM Delights." },
    { property: "og:title", content: "ASM Delights | Premium Dry Fruits & Gifting" },
    { property: "og:description", content: "Freshly packed premium dry fruits and thoughtful gifts delivered across India." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: HomePage,
});

const categories = [
  { name: "Almonds", slug: "nuts", pos: "object-[7%_50%]" },
  { name: "Cashews", slug: "nuts", pos: "object-[25%_50%]" },
  { name: "Pistachios", slug: "nuts", pos: "object-[43%_50%]" },
  { name: "Dates", slug: "dry-fruits", pos: "object-[61%_50%]" },
  { name: "Walnuts", slug: "nuts", pos: "object-[79%_50%]" },
  { name: "Healthy Mixes", slug: "berries-seeds", pos: "object-[96%_50%]" },
];

const assurances = [
  [ShieldCheck, "Purity checked", "Carefully selected"],
  [PackageCheck, "Freshly packed", "In careful batches"],
  [Truck, "Pan-India delivery", "Free above ₹999"],
  [BadgeCheck, "Premium quality", "Satisfaction assured"],
] as const;

function HomePage() {
  return (
    <StoreShell>
      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-8 lg:px-10 lg:pb-24 lg:pt-12">
        <div className="mb-7 text-center lg:mb-10">
          <p className="editorial-kicker">Curated excellence</p>
          <div className="gold-rule mx-auto mt-4 h-px w-20" />
        </div>
        <div className="relative lg:grid lg:grid-cols-12 lg:items-center">
          <div className="relative col-span-9 overflow-hidden rounded-tr-[72px] lg:rounded-tr-[140px]">
            <img src={heroImage} alt="ASM Delights premium dry fruits in maroon and gold packaging" width={1920} height={840} className="h-[460px] w-full object-cover object-[67%_center] sm:h-[560px] lg:h-[650px]" />
            <div className="absolute inset-0 bg-hero-overlay" />
            <p className="absolute left-6 top-8 max-w-[12rem] font-display text-3xl italic leading-none text-primary-foreground sm:left-10 sm:top-12 sm:max-w-sm sm:text-5xl lg:hidden">The art of thoughtful indulgence.</p>
          </div>
          <div className="relative z-10 -mt-16 ml-auto w-[88%] border-l border-t border-accent/50 bg-background p-6 sm:w-[68%] sm:p-9 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:mt-0 lg:w-full lg:p-12 xl:p-16">
            <p className="editorial-kicker">The signature collection</p>
            <h1 className="mt-4 font-display text-4xl italic leading-[0.98] text-primary sm:text-5xl lg:text-6xl xl:text-7xl">The art of thoughtful indulgence.</h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">Handpicked dry fruits, rare nuts and nourishing blends, presented with distinction and packed at their freshest.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link to="/shop">Shop the collection <ArrowRight /></Link></Button>
              <Button asChild variant="outline" size="lg"><Link to="/gifting">Discover gifting</Link></Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-4">
          {assurances.map(([Icon, title, copy], index) => (
            <div key={title} className={`flex items-center gap-3 px-5 py-6 sm:justify-center lg:py-7 ${index % 2 ? "border-l border-border" : ""} ${index > 1 ? "border-t border-border lg:border-t-0" : ""} ${index === 2 ? "lg:border-l" : ""}`}>
              <Icon size={20} strokeWidth={1.5} className="shrink-0 text-accent" />
              <div><p className="font-display text-lg text-primary">{title}</p><p className="text-[10px] uppercase tracking-wider text-muted-foreground">{copy}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 lg:px-10 lg:py-24">
        <div className="mb-10 flex items-end justify-between border-b border-border pb-5">
          <div><p className="editorial-kicker">Explore the pantry</p><h2 className="mt-2 font-display text-4xl text-primary sm:text-5xl">Shop by selection</h2></div>
          <Link to="/shop" className="hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-primary sm:flex">View all <ArrowRight size={15} /></Link>
        </div>
        <div className="hide-scrollbar flex gap-4 overflow-x-auto pb-3 sm:gap-6">
          {categories.map((category, index) => (
            <Link key={category.name} to="/collections/$category" params={{ category: category.slug }} className={`group min-w-[145px] sm:min-w-[190px] ${index % 2 ? "sm:mt-8" : ""}`}>
              <div className="aspect-[4/5] overflow-hidden border border-border bg-card"><img src={categoryImage} alt={category.name} loading="lazy" width={1800} height={1200} className={`h-full w-full scale-[3.5] object-cover ${category.pos} transition-transform duration-700 group-hover:scale-[3.62]`} /></div>
              <div className="mt-4 flex items-center justify-between border-b border-border pb-3"><p className="font-display text-xl text-primary">{category.name}</p><ArrowRight size={15} className="text-accent transition-transform duration-300 group-hover:translate-x-1" /></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-muted py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
          <div className="mb-12 grid gap-4 md:grid-cols-2 md:items-end"><div><p className="editorial-kicker">Signature selects</p><h2 className="mt-2 font-display text-4xl text-primary sm:text-5xl">Objects of good taste.</h2></div><p className="max-w-md text-sm leading-7 text-muted-foreground md:justify-self-end">Chosen for their exceptional texture, freshness and provenance—everyday essentials elevated to something memorable.</p></div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14">{products.slice(0, 8).map((product, index) => <div key={product.slug} className={index % 2 ? "lg:translate-y-7" : ""}><ProductCard product={product} /></div>)}</div>
          <div className="mt-16 text-center lg:mt-24"><Button asChild variant="outline" size="lg"><Link to="/shop">View all products <ArrowRight /></Link></Button></div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 lg:px-10 lg:py-24">
        <div className="relative lg:grid lg:grid-cols-12 lg:items-center">
          <div className="col-span-8 overflow-hidden"><img src={giftImage} alt="ASM Delights premium dry fruit gift box" loading="lazy" width={1600} height={1000} className="h-[390px] w-full object-cover sm:h-[520px] lg:h-[620px]" /></div>
          <div className="relative z-10 -mt-12 ml-auto w-[90%] border-t border-accent bg-primary p-8 text-primary-foreground sm:w-[70%] sm:p-12 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:mt-0 lg:w-full lg:p-16">
            <Gift size={22} strokeWidth={1.5} className="text-accent" />
            <p className="editorial-kicker mt-7">Bespoke gifting</p>
            <h2 className="mt-3 font-display text-4xl italic leading-none sm:text-5xl">A beautiful gesture, impeccably presented.</h2>
            <p className="mt-5 text-sm leading-7 text-primary-foreground/75">Elegant maroon and gold assortments for festivals, weddings, teams and meaningful everyday moments.</p>
            <Button asChild variant="secondary" size="lg" className="mt-8"><Link to="/gifting">Explore gift boxes <ArrowRight /></Link></Button>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-10"><div className="mb-10 text-center"><p className="editorial-kicker">Notes of appreciation</p><h2 className="mt-2 font-display text-4xl text-primary sm:text-5xl">Loved across India</h2></div><div className="grid gap-px bg-border md:grid-cols-3">{[["The almonds are crisp and genuinely fresh. The resealable pack is perfect for our breakfast shelf.","Aarav M.","Mumbai"],["Sent the Royal Gift Box to family for Diwali. It looked elegant and arrived beautifully packed.","Neha R.","Bengaluru"],["My evening snack is sorted. The trail mix feels balanced, not overly sweet.","Ritika S.","Delhi"]].map(([quote, name, city]) => <figure key={name} className="bg-card p-8 lg:p-10"><div className="flex gap-1 text-rating">{[1,2,3,4,5].map((star) => <Star key={star} size={13} fill="currentColor" />)}</div><blockquote className="mt-6 font-display text-xl italic leading-8 text-primary">“{quote}”</blockquote><figcaption className="mt-7 text-[10px] font-semibold uppercase tracking-widest text-primary">{name} <span className="font-normal text-muted-foreground">— {city}</span></figcaption></figure>)}</div></div>
      </section>

      <section className="bg-background py-16"><div className="mx-auto max-w-2xl px-5 text-center"><p className="editorial-kicker">Private list</p><h2 className="mt-3 font-display text-4xl text-primary">A little delight in your inbox.</h2><p className="mt-3 text-sm text-muted-foreground">Fresh launches, festive collections and members-only offers.</p><form onSubmit={(event) => event.preventDefault()} className="mx-auto mt-7 flex max-w-lg border-b border-primary"><input required type="email" aria-label="Email address" placeholder="Enter your email address" className="h-12 min-w-0 flex-1 bg-transparent px-1 text-sm outline-none placeholder:text-muted-foreground" /><Button type="submit" variant="ghost" className="h-12 text-primary">Subscribe <ArrowRight /></Button></form></div></section>
    </StoreShell>
  );
}