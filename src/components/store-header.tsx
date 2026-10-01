import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, WandSparkles, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/asm-delights-logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";

export function StoreHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count } = useCart();
  return (
    <>
      <div className="bg-primary px-4 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-foreground sm:text-xs">
        Complimentary delivery above ₹999 <span className="mx-2 text-accent">•</span> Freshness packed with care
      </div>
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 lg:px-10">
          <Button variant="ghost" size="icon" aria-label="Open menu" onClick={() => setMenuOpen((open) => !open)} className="text-primary lg:hidden">
            {menuOpen ? <X /> : <Menu />}
          </Button>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-primary lg:flex">
            <Link to="/">Shop</Link>
            <Link to="/assistant" className="flex items-center gap-2"><WandSparkles size={16} /> Find my pick</Link>
          </nav>
          <Link to="/" aria-label="ASM Delights home" className="absolute left-1/2 -translate-x-1/2">
            <img src={logo.url} alt="ASM Delights" className="h-16 w-28 object-contain" width="112" height="64" />
          </Link>
          <div className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="icon" aria-label="Search" onClick={() => setSearchOpen((open) => !open)} className="text-primary"><Search /></Button>
            <Button variant="ghost" size="icon" asChild className="relative text-primary">
              <Link to="/cart" aria-label={`Shopping bag with ${count} items`}>
                <ShoppingBag />
                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[9px] font-bold text-accent-foreground">{count}</span>
              </Link>
            </Button>
          </div>
        </div>
        {searchOpen && <div className="border-t border-border bg-card px-5 py-4"><div className="mx-auto flex max-w-2xl items-center gap-3 border-b border-primary pb-2"><Search size={18} className="text-muted-foreground" /><input autoFocus aria-label="Search products" placeholder="Search almonds, dates, gift boxes..." className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" /><Button variant="ghost" size="icon" aria-label="Close search" onClick={() => setSearchOpen(false)}><X /></Button></div></div>}
        {menuOpen && <nav className="grid border-t border-border bg-card px-5 py-4 text-sm font-semibold text-primary lg:hidden"><Link className="border-b border-border py-3" to="/" onClick={() => setMenuOpen(false)}>Shop</Link><Link className="py-3" to="/assistant" onClick={() => setMenuOpen(false)}>Find my perfect pick</Link></nav>}
      </header>
    </>
  );
}