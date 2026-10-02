import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/asm-delights-logo.jpg.asset.json";

const shopLinks = [
  { label: "Shop all", to: "/shop" as const },
  { label: "Dry fruits", to: "/collections/$category" as const, params: { category: "dry-fruits" } },
  { label: "Nuts", to: "/collections/$category" as const, params: { category: "nuts" } },
  { label: "Gift boxes", to: "/gifting" as const },
];

export function StoreFooter() {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:px-10">
        <div><img src={logo.url} alt="ASM Delights" width={168} height={96} className="h-24 w-44 rounded-sm bg-card object-contain p-1" /><p className="mt-4 max-w-sm text-sm leading-6 text-footer-muted">Premium dry fruits, nuts and thoughtful gifts, selected for purity and packed fresh.</p><div className="mt-5 flex gap-3"><span className="flex size-9 items-center justify-center rounded-full border border-footer-line"><Instagram size={16}/></span><span className="flex size-9 items-center justify-center rounded-full border border-footer-line"><Mail size={16}/></span></div></div>
        <div><h3 className="text-sm font-extrabold uppercase">Shop</h3><ul className="mt-4 space-y-3 text-sm text-footer-muted">{shopLinks.map((item) => <li key={item.label}>{"params" in item ? <Link to={item.to} params={item.params}>{item.label}</Link> : <Link to={item.to}>{item.label}</Link>}</li>)}</ul></div>
        <div><h3 className="text-sm font-extrabold uppercase">Help</h3><ul className="mt-4 space-y-3 text-sm text-footer-muted"><li><Link to="/track-order">Track order</Link></li><li><Link to="/contact">Contact us</Link></li><li><Link to="/faq">FAQs</Link></li><li><Link to="/shipping-returns">Shipping & returns</Link></li></ul></div>
        <div><h3 className="text-sm font-extrabold uppercase">Get in touch</h3><ul className="mt-4 space-y-4 text-sm text-footer-muted"><li className="flex gap-3"><Mail size={17} className="mt-0.5 shrink-0 text-accent"/>care@asmdelights.com</li><li className="flex gap-3"><Phone size={17} className="mt-0.5 shrink-0 text-accent"/>Customer care, Monday–Saturday</li><li className="flex gap-3"><MapPin size={17} className="mt-0.5 shrink-0 text-accent"/>Delivering across India</li></ul></div>
      </div>
      <div className="border-t border-footer-line"><div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-5 text-xs text-footer-muted sm:flex-row sm:items-center sm:justify-between lg:px-10"><p>© 2026 ASM Delights. All rights reserved.</p><div className="flex gap-5"><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div></div></div>
    </footer>
  );
}