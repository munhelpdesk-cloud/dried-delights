import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/asm-delights-logo.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";

export function StoreHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count } = useCart();
  return (
    <>
      <div className="bg-primary px-4 py-2 text-center text-[11px] font-bold text-primary-foreground sm:text-xs">
        Free shipping above ₹999 <span className="mx-2 text-accent">•</span> Use code <strong>WELCOME10</strong> for 10% off
      </div>
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between px-4 lg:px-10">
          <Button variant="ghost" size="icon" aria-label="Open menu" onClick={() => setMenuOpen((open) => !open)} className="text-primary lg:hidden">
            {menuOpen ? <X /> : <Menu />}
          </Button>
          <nav className="hidden items-center gap-7 text-sm font-bold text-foreground lg:flex">
            <Link to="/shop" className="flex items-center gap-1">Shop <ChevronDown size={14}/></Link>
            <Link to="/collections/$category" params={{ category: "nuts" }}>Nuts</Link>
            <Link to="/collections/$category" params={{ category: "dry-fruits" }}>Dry Fruits</Link>
            <Link to="/gifting">Gifting</Link>
          </nav>
          <Link to="/" aria-label="ASM Delights home" className="absolute left-1/2 -translate-x-1/2">
            <img src={logo.url} alt="ASM Delights" className="h-[62px] w-32 object-contain" width="128" height="62" />
          </Link>
          <div className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="icon" aria-label="Search" onClick={() => setSearchOpen((open) => !open)} className="text-primary"><Search /></Button>
            <Button variant="ghost" size="icon" asChild className="hidden text-primary sm:inline-flex"><Link to="/track-order" aria-label="Track your order"><UserRound /></Link></Button>
            <Button variant="ghost" size="icon" asChild className="relative text-primary">
              <Link to="/cart" aria-label={`Shopping bag with ${count} items`}>
                <ShoppingBag />
                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[9px] font-bold text-accent-foreground">{count}</span>
              </Link>
            </Button>
          </div>
        </div>
        {searchOpen && <div className="border-t border-border bg-card px-5 py-4"><form action="/shop" className="mx-auto flex max-w-2xl items-center gap-3 border-b border-primary pb-2"><Search size={18} className="text-muted-foreground" /><input name="q" autoFocus aria-label="Search products" placeholder="Search almonds, dates, gift boxes..." className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" /><Button variant="ghost" size="icon" type="button" aria-label="Close search" onClick={() => setSearchOpen(false)}><X /></Button></form></div>}
        {menuOpen && <nav className="grid border-t border-border bg-card px-5 py-3 text-sm font-bold text-primary lg:hidden"><Link className="border-b border-border py-3" to="/shop" onClick={() => setMenuOpen(false)}>Shop all</Link><Link className="border-b border-border py-3" to="/collections/$category" params={{ category: "nuts" }} onClick={() => setMenuOpen(false)}>Nuts</Link><Link className="border-b border-border py-3" to="/collections/$category" params={{ category: "dry-fruits" }} onClick={() => setMenuOpen(false)}>Dry fruits</Link><Link className="border-b border-border py-3" to="/gifting" onClick={() => setMenuOpen(false)}>Gifting</Link><Link className="py-3" to="/track-order" onClick={() => setMenuOpen(false)}>Track order</Link></nav>}
      </header>
    </>
  );
}