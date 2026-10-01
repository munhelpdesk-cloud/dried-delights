import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronRight, Gift, Heart, Leaf, Plus, ShieldCheck, Sparkles, Truck } from "lucide-react";
import logo from "@/assets/asm-delights-logo.png.asset.json";
import heroImage from "@/assets/asm-hero-dry-fruits.jpg";
import collectionImage from "@/assets/asm-product-collection.jpg";
import { StoreHeader } from "@/components/store-header";
import { Button } from "@/components/ui/button";
import { products } from "@/data/catalog";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "ASM Delights | Premium Dry Fruits, Nuts & Gift Boxes" },
    { name: "description", content: "Shop premium almonds, cashews, pistachios, dates and curated gift boxes from ASM Delights." },
    { property: "og:title", content: "ASM Delights | Premium Dry Fruits & Gifting" },
    { property: "og:description", content: "Everyday nourishment and thoughtful gifting, handpicked for freshness." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const categories = [
  { name: "Almonds", note: "Daily crunch", crop: "object-[20%_70%]" },
  { name: "Cashews", note: "Creamy classics", crop: "object-[70%_80%]" },
  { name: "Pistachios", note: "Roasted goodness", crop: "object-[23%_15%]" },
  { name: "Dates", note: "Naturally sweet", crop: "object-[78%_12%]" },
];

function Index() {
  const { addItem } = useCart();

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <StoreHeader />

      <main id="top">
        <section className="mx-auto grid max-w-[1440px] items-center gap-6 px-5 py-8 lg:min-h-[680px] lg:grid-cols-[0.88fr_1.12fr] lg:gap-8 lg:px-10 lg:py-12">
          <div className="relative z-10 max-w-xl py-3 lg:py-10 lg:pl-8">
            <div className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-accent sm:text-xs lg:mb-5"><span className="h-px w-9 bg-accent" /> Harvested with care</div>
            <h1 className="font-display text-[2.7rem] font-semibold leading-[1.08] text-primary sm:text-6xl lg:text-[4.6rem]">Nature’s finest,<br/><span className="text-accent">chosen for you.</span></h1>
            <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground sm:mt-6 sm:text-lg sm:leading-8">From orchard-fresh almonds to indulgent dates, discover dry fruits selected for exceptional taste, texture, and everyday goodness.</p>
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-9">
              <a href="#shop" className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-4 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/15 transition-transform hover:-translate-y-0.5 sm:h-13 sm:gap-3 sm:px-7 sm:text-sm">Shop collection <ArrowRight size={17} /></a>
              <a href="#gifting" className="inline-flex h-11 items-center gap-2 rounded-md border border-accent px-4 text-xs font-bold text-primary transition-colors hover:bg-secondary sm:h-13 sm:gap-3 sm:px-7 sm:text-sm">Explore gifting <Gift size={17} /></a>
            </div>
            <div className="mt-6 hidden flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-muted-foreground sm:flex lg:mt-10"><span className="flex items-center gap-2"><Check size={15} className="text-accent" /> Quality checked</span><span className="flex items-center gap-2"><Check size={15} className="text-accent" /> Hygienically packed</span><span className="flex items-center gap-2"><Check size={15} className="text-accent" /> Pan-India delivery</span></div>
          </div>
          <div className="relative h-[260px] sm:h-[430px] lg:h-[620px]">
            <div className="absolute inset-0 overflow-hidden rounded-md border border-border/70 bg-secondary">
              <img src={heroImage} alt="A premium spread of almonds, pistachios, cashews, walnuts and dates" className="h-full w-full object-cover" width={1536} height={1152} />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/70 to-transparent p-7 pt-24 text-primary-foreground sm:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">The signature selection</p>
                <div className="mt-2 flex items-end justify-between gap-4"><h2 className="font-display text-2xl font-semibold sm:text-3xl">Five favourites. One beautiful ritual.</h2><a href="#shop" aria-label="Shop signature selection" className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground sm:flex"><ArrowRight size={19} /></a></div>
              </div>
            </div>
            <div className="absolute -bottom-4 left-4 flex items-center gap-3 rounded-md border border-border bg-card p-3 pr-5 shadow-xl sm:-left-5 sm:bottom-8"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary"><Sparkles size={18} /></span><div><p className="text-xs font-bold text-primary">Freshly packed</p><p className="text-[11px] text-muted-foreground">in small, careful batches</p></div></div>
          </div>
        </section>

        <section className="bg-primary py-6 text-primary-foreground">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-5 px-5 lg:grid-cols-4">
            {[{icon:Leaf,title:"Responsibly sourced",sub:"Selected at origin"},{icon:ShieldCheck,title:"Purity guaranteed",sub:"Quality checked"},{icon:Truck,title:"Swift delivery",sub:"Packed to stay fresh"},{icon:Gift,title:"Made for gifting",sub:"Beautifully presented"}].map(({icon:Icon,title,sub}) => <div key={title} className="flex items-center gap-3 lg:justify-center"><Icon size={21} className="shrink-0 text-accent" strokeWidth={1.6}/><div><p className="text-xs font-bold sm:text-sm">{title}</p><p className="text-[10px] text-primary-foreground/65 sm:text-xs">{sub}</p></div></div>)}
          </div>
        </section>

        <section id="categories" className="mx-auto max-w-[1360px] px-5 py-20 lg:px-10 lg:py-28">
          <div className="mb-9 flex items-end justify-between"><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">Find your favourite</p><h2 className="font-display text-3xl font-semibold text-primary sm:text-4xl">Shop by craving</h2></div><a href="#shop" className="hidden items-center gap-2 text-sm font-bold text-primary sm:flex">View all <ChevronRight size={17}/></a></div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
            {categories.map((item) => <a href="#shop" key={item.name} className="group relative aspect-[4/5] overflow-hidden rounded-md bg-secondary"><img src={collectionImage} alt={item.name} loading="lazy" width={1536} height={1024} className={`h-full w-full scale-[1.7] object-cover ${item.crop} transition-transform duration-500 group-hover:scale-[1.78]`} /><div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/5 to-transparent"/><div className="absolute inset-x-0 bottom-0 p-4 text-primary-foreground sm:p-6"><p className="font-display text-xl font-semibold sm:text-2xl">{item.name}</p><p className="mt-1 text-xs text-primary-foreground/75">{item.note}</p></div></a>)}
          </div>
        </section>

        <section id="shop" className="bg-card py-20 lg:py-28">
          <div className="mx-auto max-w-[1360px] px-5 lg:px-10">
            <div className="mb-10 text-center"><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">Loved by everyone</p><h2 className="font-display text-3xl font-semibold text-primary sm:text-4xl">Our bestselling picks</h2><p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">Wholesome pantry staples and naturally indulgent treats, packed fresh for your table.</p></div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-8 lg:grid-cols-4 lg:gap-5">
              {products.map((product) => <article key={product.name} className="group"><div className="relative aspect-square overflow-hidden rounded-md bg-secondary"><Link to="/products/$slug" params={{ slug: product.slug }} aria-label={`View ${product.name}`}><img src={collectionImage} alt={product.name} loading="lazy" width={1536} height={1024} className={`h-full w-full scale-[1.55] object-cover ${product.crop} transition-transform duration-500 group-hover:scale-[1.62]`} /></Link><span className="absolute left-3 top-3 rounded-sm bg-card/95 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-primary sm:text-[10px]">{product.badge}</span><Button variant="secondary" size="icon-sm" aria-label={`Add ${product.name} to wishlist`} className="absolute right-3 top-3 rounded-full"><Heart size={15}/></Button></div><div className="pt-4"><p className="text-xs text-muted-foreground">{product.detail}</p><Link to="/products/$slug" params={{ slug: product.slug }}><h3 className="mt-1 font-display text-sm font-semibold text-primary sm:text-base">{product.name}</h3></Link><div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="font-bold text-primary">₹{product.price} <span className="ml-1 text-xs font-normal text-muted-foreground line-through">₹{product.oldPrice}</span></p><Button variant="outline" size="sm" onClick={() => addItem(product.slug, product.sizes[0].label)}><Plus size={14}/> Add</Button></div></div></article>)}
            </div>
          </div>
        </section>

        <section id="gifting" className="mx-auto max-w-[1360px] px-5 py-20 lg:px-10 lg:py-28">
          <div className="grid overflow-hidden rounded-md bg-secondary lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[370px] lg:min-h-[520px]"><img src={heroImage} alt="Premium dry fruit gift selection" loading="lazy" width={1536} height={1152} className="absolute inset-0 h-full w-full object-cover object-center"/><div className="absolute inset-0 bg-primary/10"/></div>
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16"><p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent">Gifts with good taste</p><h2 className="font-display text-3xl font-semibold leading-tight text-primary sm:text-4xl">A thoughtful box for every celebration.</h2><p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">Curated dry-fruit assortments dressed in elegant packaging—perfect for festivals, weddings, corporate gifting, and warm everyday gestures.</p><div className="mt-8 flex items-center gap-6"><a href="#shop" className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-bold text-primary-foreground">Discover gift boxes <ArrowRight size={16}/></a><span className="hidden text-sm font-semibold text-primary sm:block">From ₹799</span></div></div>
          </div>
        </section>

        <section className="border-y border-border bg-secondary py-14"><div className="mx-auto flex max-w-3xl flex-col items-center px-5 text-center"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground"><Leaf size={20}/></span><h2 className="mt-5 font-display text-2xl font-semibold text-primary sm:text-3xl">Goodness, delivered to your inbox.</h2><p className="mt-2 text-sm text-muted-foreground">New harvests, mindful snacking ideas, and first access to festive collections.</p><form onSubmit={(e) => e.preventDefault()} className="mt-6 flex w-full max-w-lg gap-2"><input aria-label="Email address" type="email" required placeholder="Your email address" className="h-12 min-w-0 flex-1 rounded-md border border-border bg-card px-4 text-sm outline-none"/><button className="h-12 rounded-md bg-primary px-5 text-sm font-bold text-primary-foreground">Subscribe</button></form></div></section>
      </main>

      <footer className="bg-primary px-5 py-12 text-primary-foreground"><div className="mx-auto flex max-w-[1360px] flex-col items-center justify-between gap-7 border-b border-primary-foreground/15 pb-9 text-center md:flex-row md:text-left"><img src={logo.url} alt="ASM Delights" className="h-20 w-36 rounded-sm bg-secondary object-contain p-1" width="144" height="80"/><p className="max-w-sm text-sm leading-6 text-primary-foreground/65">Premium dry fruits selected with care, packed for freshness, and made for everyday delight.</p><div className="flex gap-6 text-sm font-semibold"><a href="#shop">Shop</a><a href="#gifting">Gifting</a><a href="mailto:care@asmdelights.com">Contact</a></div></div><div className="mx-auto flex max-w-[1360px] flex-col items-center justify-between gap-3 pt-7 text-xs text-primary-foreground/55 sm:flex-row"><p>© 2026 ASM Delights. All rights reserved.</p><p>Crafted for better snacking.</p></div></footer>
    </div>
  );
}
