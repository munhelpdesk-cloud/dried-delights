import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Check, ChevronRight, Menu, Search, ShoppingBag, User, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import categoryCollection from "@/assets/category-collection.jpg";
import bestsellerCollection from "@/assets/bestseller-collection.jpg";
import festiveHamper from "@/assets/festive-hamper.jpg";
import provenance from "@/assets/provenance.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Premium Dry Fruits & Festive Hampers | Mundra Dry Fruits" },
      {
        name: "description",
        content: "Shop hand-sorted almonds, cashews, dates, pistachios and premium dry-fruit hampers from Mundra Dry Fruits.",
      },
      { property: "og:title", content: "Mundra Dry Fruits — The Premium Pantry" },
      { property: "og:description", content: "Hand-sorted dry fruits and beautifully packed festive hampers, delivered fresh across India." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Storefront,
});

const categories = [
  { name: "Almonds", count: "12 varieties", position: "0% center" },
  { name: "Cashews", count: "9 varieties", position: "33.33% center" },
  { name: "Dates", count: "7 varieties", position: "66.66% center" },
  { name: "Walnuts & Pistachios", count: "10 varieties", position: "100% center" },
];

const products = [
  { name: "Royal Almonds", detail: "500g · California", price: "₹649", position: "0% 0%", badge: "Bestseller" },
  { name: "Maldive Cashews", detail: "500g · W320", price: "₹799", position: "100% 0%", badge: "Handpicked" },
  { name: "Medjool Dates", detail: "400g · Jumbo", price: "₹899", position: "0% 100%", badge: "New harvest" },
  { name: "Saffron Pistachios", detail: "300g · Roasted", price: "₹1,299", position: "100% 100%", badge: "Limited" },
];

function Storefront() {
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="overflow-hidden bg-primary text-primary-foreground">
        <div className="flex w-max animate-pantry-marquee whitespace-nowrap py-2.5 text-[11px] uppercase">
          {[0, 1].map((set) => (
            <div className="flex" key={set} aria-hidden={set === 1}>
              <span className="px-8">Free shipping over ₹999</span>
              <span className="px-8 text-accent">Festive hampers now open</span>
              <span className="px-8">Single-origin, hand-sorted daily</span>
            </div>
          ))}
        </div>
      </div>

      <header className="relative z-40 border-b border-border bg-background/95">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
          <div className="flex h-20 items-center justify-between">
            <a href="#top" className="flex items-center gap-3" aria-label="Mundra Dry Fruits home">
              <span className="grid size-10 place-items-center rounded-lg bg-primary font-display text-lg font-bold text-accent">M</span>
              <span className="font-display text-lg font-bold lg:text-xl">Mundra <span className="text-destructive">Dry Fruits</span></span>
            </a>
            <nav className="hidden items-center gap-8 text-sm lg:flex" aria-label="Main navigation">
              <a href="#shop" className="transition-colors hover:text-destructive">Shop</a>
              <a href="#categories" className="transition-colors hover:text-destructive">Categories</a>
              <a href="#gifting" className="transition-colors hover:text-destructive">Gifting</a>
              <a href="#story" className="transition-colors hover:text-destructive">Our Story</a>
            </nav>
            <div className="flex items-center gap-1 sm:gap-2">
              <Button variant="ghost" size="icon" aria-label="Search" onClick={() => setSearchOpen((value) => !value)}><Search /></Button>
              <Button variant="ghost" size="icon" aria-label="Account" className="hidden sm:inline-flex"><User /></Button>
              <Button variant="ghost" size="icon" aria-label={`Cart with ${cartCount} items`} className="relative">
                <ShoppingBag />
                {cartCount > 0 && <span className="absolute right-0 top-0 grid size-4 place-items-center rounded-full bg-destructive text-[9px] font-semibold text-destructive-foreground">{cartCount}</span>}
              </Button>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((value) => !value)}>
                {menuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
          {searchOpen && (
            <div className="pb-4">
              <label htmlFor="site-search" className="sr-only">Search products</label>
              <div className="flex items-center gap-3 border-b border-primary pb-2">
                <Search className="size-4" />
                <input id="site-search" autoFocus placeholder="Search almonds, dates, hampers…" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
              </div>
            </div>
          )}
          {menuOpen && (
            <nav className="grid gap-1 border-t border-border py-3 lg:hidden" aria-label="Mobile navigation">
              {["Shop", "Categories", "Gifting", "Our Story"].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(" ", "")}`} onClick={() => setMenuOpen(false)} className="py-2 text-sm font-medium">{item}</a>
              ))}
            </nav>
          )}
          <nav className="hidden items-center gap-7 pb-4 text-[13px] font-medium text-muted-foreground lg:flex" aria-label="Product categories">
            {["Almonds", "Cashews", "Walnuts", "Dates", "Dried Fruits", "Seeds & Nuts", "Hampers"].map((item) => <a href="#categories" key={item} className="transition-colors hover:text-destructive">{item}</a>)}
          </nav>
        </div>
      </header>

      <section id="top" className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-16 lg:grid-cols-12 lg:px-10 lg:py-24">
          <div className="animate-pantry-rise lg:col-span-7">
            <p className="mb-5 text-xs uppercase text-accent">The Festive Pantry · 2026</p>
            <h1 className="max-w-[18ch] text-balance font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">A hamper that opens like a festival.</h1>
            <p className="mt-6 max-w-[48ch] text-pretty text-base text-primary-foreground/75 sm:text-lg">Single-origin almonds, premium cashews and Medjool dates, hand-sorted and packed in small batches. Layered, generous, and made for sharing.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild variant="gold" size="shop"><a href="#shop">Shop the collection <ChevronRight /></a></Button>
              <Button asChild variant="pantryGhost" size="shop"><a href="#gifting">Build a hamper</a></Button>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-5">
              <div><dt className="font-display text-2xl text-accent">4.9</dt><dd className="mt-1 text-xs text-primary-foreground/60">12,400 reviews</dd></div>
              <div><dt className="font-display text-2xl text-accent">38</dt><dd className="mt-1 text-xs text-primary-foreground/60">single origins</dd></div>
              <div><dt className="font-display text-2xl text-accent">48h</dt><dd className="mt-1 text-xs text-primary-foreground/60">fresh dispatch</dd></div>
            </dl>
          </div>
          <div className="animate-pantry-rise lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              {products.map((product, index) => (
                <article key={product.name} className={`overflow-hidden rounded-lg border border-primary-foreground/10 bg-primary-foreground/5 ${index % 2 ? "mt-8" : ""}`}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={bestsellerCollection} alt="" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" style={{ objectPosition: product.position }} />
                  </div>
                  <div className="p-4"><p className="text-[11px] uppercase text-accent">{product.badge}</p><h2 className="mt-1 font-display text-base">{product.name}</h2><p className="mt-1 text-sm text-primary-foreground/60">{product.price}</p></div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="bg-background">
        <div className="mx-auto max-w-[1440px] px-5 py-16 lg:px-10 lg:py-20">
          <SectionTitle eyebrow="Browse the pantry" title="Every shelf, sorted by hand" action="View all" />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
            {categories.map((category) => (
              <a key={category.name} href="#shop" className="group block">
                <div className="aspect-[4/5] overflow-hidden rounded-lg bg-muted">
                  <img src={categoryCollection} alt={category.name} loading="lazy" width={1600} height={1200} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ objectPosition: category.position }} />
                </div>
                <h3 className="mt-4 font-display text-base sm:text-lg">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="shop" className="bg-background">
        <div className="mx-auto max-w-[1440px] px-5 pb-16 lg:px-10 lg:pb-24">
          <SectionTitle eyebrow="Bestsellers" title="The ones that sell out first" action="Shop all" />
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-5">
            {products.map((product) => (
              <article className="group" key={product.name}>
                <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                  <img src={bestsellerCollection} alt={product.name} loading="lazy" width={1600} height={1600} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ objectPosition: product.position }} />
                  <span className="absolute left-3 top-3 rounded bg-background/90 px-2 py-1 text-[10px] font-semibold uppercase text-foreground">{product.badge}</span>
                </div>
                <div className="mt-4 flex items-start justify-between gap-2">
                  <div><h3 className="font-display text-base leading-tight sm:text-lg">{product.name}</h3><p className="mt-1 text-xs text-muted-foreground sm:text-sm">{product.detail}</p></div>
                  <p className="shrink-0 font-display text-base sm:text-lg">{product.price}</p>
                </div>
                <Button variant="pantry" className="mt-4 w-full" onClick={() => setCartCount((count) => count + 1)}><ShoppingBag /> Add to cart</Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="gifting" className="bg-destructive text-destructive-foreground">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-20">
          <div className="aspect-square overflow-hidden rounded-lg"><img src={festiveHamper} alt="Premium festive dry-fruit hamper" loading="lazy" width={1200} height={1200} className="h-full w-full object-cover" /></div>
          <div>
            <p className="mb-4 text-xs uppercase text-accent">Gifting</p>
            <h2 className="max-w-[40ch] text-balance font-display text-3xl lg:text-4xl">The festive hamper, packed like a celebration</h2>
            <p className="mt-5 max-w-[48ch] text-pretty text-destructive-foreground/80">A layered box of almonds, cashews, dates, pistachios and saffron, tied with a gold ribbon and a handwritten note. Ready to send across India.</p>
            <div className="mt-7 flex flex-wrap gap-3"><Button variant="cream" size="shop">Build a hamper</Button><Button variant="ghost" size="shop" className="text-destructive-foreground hover:bg-destructive-foreground/10 hover:text-accent">See all hampers</Button></div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-14 sm:grid-cols-3 lg:px-10">
          {[['Hand-sorted daily','Every batch is carefully inspected before it reaches your door.'],['Sourced for flavour','We select for size, aroma, texture and the character of each harvest.'],['Sealed for freshness','Protective packs keep natural flavour and crunch intact.']].map(([title, copy]) => (
            <div key={title} className="border-l-2 border-accent pl-5"><h3 className="font-display text-lg">{title}</h3><p className="mt-2 max-w-[40ch] text-pretty text-sm text-muted-foreground">{copy}</p></div>
          ))}
        </div>
      </section>

      <section id="story" className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-16 lg:grid-cols-12 lg:gap-14 lg:px-10 lg:py-20">
          <div className="lg:col-span-5"><img src={provenance} alt="Almonds being sorted by hand" loading="lazy" width={1008} height={1264} className="aspect-[4/5] w-full rounded-lg object-cover" /></div>
          <div className="lg:col-span-7">
            <p className="mb-4 text-xs uppercase text-accent">Provenance</p>
            <h2 className="max-w-[40ch] text-balance font-display text-3xl lg:text-4xl">From trusted growers to your table</h2>
            <p className="mt-5 max-w-[52ch] text-pretty text-primary-foreground/75">We work closely with growers and specialist suppliers to select each batch at its best. The result is simple: honest ingredients, careful sorting and freshness you can taste.</p>
            <blockquote className="mt-8 border-l-2 border-accent pl-5"><p className="font-display text-lg italic text-primary-foreground/90">“Premium isn’t a label. It’s the care you can see in every handful.”</p><cite className="mt-3 block text-sm not-italic text-primary-foreground/55">— The Mundra family</cite></blockquote>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-[1440px] px-5 py-16 lg:px-10 lg:py-20">
          <div className="rounded-xl bg-primary px-6 py-12 text-center text-primary-foreground lg:px-16">
            {subscribed ? (
              <div className="mx-auto flex max-w-md flex-col items-center"><Check className="mb-4 size-8 text-accent" /><h2 className="font-display text-2xl">You’re on the pantry list.</h2><p className="mt-2 text-sm text-primary-foreground/70">Watch your inbox for seasonal arrivals.</p></div>
            ) : (
              <><p className="mb-4 text-xs uppercase text-accent">The Pantry Letter</p><h2 className="mx-auto max-w-[40ch] text-balance font-display text-3xl lg:text-4xl">Seasonal drops, before they sell out</h2><p className="mx-auto mt-4 max-w-[48ch] text-pretty text-primary-foreground/70">One email a month. New origins, hampers and a recipe from our kitchen.</p><form onSubmit={subscribe} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"><label htmlFor="newsletter" className="sr-only">Email address</label><input id="newsletter" required type="email" placeholder="you@email.com" className="min-w-0 flex-1 rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground outline-none placeholder:text-primary-foreground/40 focus:border-accent" /><Button variant="gold" type="submit" size="shop">Subscribe</Button></form></>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground/70">
        <div className="mx-auto max-w-[1440px] px-5 py-14 lg:px-10">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><div><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-lg bg-accent font-display font-bold text-accent-foreground">M</span><span className="font-display text-xl text-primary-foreground">Mundra Dry Fruits</span></div><p className="mt-4 max-w-[40ch] text-pretty text-sm">Premium dry fruits, carefully sorted and packed fresh.</p></div><nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm"><a href="#shop">Shop</a><a href="#gifting">Gifting</a><a href="#story">Our Story</a><a href="mailto:hello@mundradryfruits.com">Contact</a></nav></div>
          <div className="mt-10 flex flex-col justify-between gap-3 border-t border-primary-foreground/10 pt-6 text-xs text-primary-foreground/45 sm:flex-row"><p>© 2026 Mundra Dry Fruits. All rights reserved.</p><p>Made with care in India</p></div>
        </div>
      </footer>
    </main>
  );
}

function SectionTitle({ eyebrow, title, action }: { eyebrow: string; title: string; action: string }) {
  return <div className="mb-10 flex items-end justify-between"><div><p className="mb-3 text-xs uppercase text-destructive">{eyebrow}</p><h2 className="max-w-[40ch] text-balance font-display text-3xl lg:text-4xl">{title}</h2></div><a href="#shop" className="hidden items-center gap-1 text-sm font-medium transition-colors hover:text-destructive sm:inline-flex">{action}<ChevronRight className="size-4" /></a></div>;
}