import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BarChart3, Bell, Boxes, ChevronDown, CircleDollarSign, ExternalLink, LayoutDashboard, LogOut, Menu, PackageSearch, Search, Settings, ShoppingCart, UserRound, UsersRound } from "lucide-react";
import logo from "@/assets/asm-delights-logo.jpg.asset.json";
import { useAdmin } from "@/lib/admin-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navigation: ReadonlyArray<{
  label: string;
  to: "/admin/dashboard" | "/admin/products" | "/admin/orders" | "/admin/transactions" | "/admin/customers" | "/admin/reports" | "/admin/profile";
  icon: React.ComponentType<{ size?: number }>;
  badge?: string;
}> = [
  { label: "Overview", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Products", to: "/admin/products", icon: Boxes },
  { label: "Orders", to: "/admin/orders", icon: ShoppingCart, badge: "4" },
  { label: "Transactions", to: "/admin/transactions", icon: CircleDollarSign },
  { label: "Customers", to: "/admin/customers", icon: UsersRound },
  { label: "Reports", to: "/admin/reports", icon: BarChart3 },
  { label: "Profile & settings", to: "/admin/profile", icon: Settings },
];

function AdminNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return <div className="flex h-full flex-col bg-primary text-primary-foreground">
    <div className="flex h-20 items-center border-b border-primary-foreground/15 px-6">
      <img src={logo.url} alt="ASM Delights" className="h-14 w-24 object-contain" />
      <div className="ml-3 border-l border-primary-foreground/20 pl-3"><p className="text-[10px] font-bold uppercase text-accent">Command centre</p><p className="text-xs text-primary-foreground/70">Store administration</p></div>
    </div>
    <nav className="flex-1 space-y-1 px-3 py-6">
      <p className="px-3 pb-2 text-[10px] font-bold uppercase text-primary-foreground/50">Workspace</p>
      {navigation.map((item) => {
        const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
        return <Link key={item.to} to={item.to} onClick={onNavigate} className={cn("flex h-11 items-center gap-3 rounded-md px-3 text-sm font-semibold transition-colors", active ? "bg-accent text-accent-foreground" : "text-primary-foreground/75 hover:bg-primary-foreground/10 hover:text-primary-foreground") }>
          <item.icon size={18}/><span className="flex-1">{item.label}</span>{item.badge && <span className="rounded-full bg-primary-foreground/15 px-2 py-0.5 text-[10px]">{item.badge}</span>}
        </Link>;
      })}
    </nav>
    <div className="border-t border-primary-foreground/15 p-4"><Button variant="ghost" className="w-full justify-start text-primary-foreground/75 hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild><Link to="/"><ExternalLink/>View storefront</Link></Button></div>
  </div>;
}

export function AdminShell() {
  const { signedIn, hydrated, profile, signOut } = useAdmin();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => { if (hydrated && !signedIn) void navigate({ to: "/admin/login", replace: true }); }, [hydrated, signedIn, navigate]);
  if (!hydrated || !signedIn) return <div className="flex min-h-screen items-center justify-center bg-muted"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"/></div>;
  const initials = profile.name.split(" ").map((part) => part[0]).join("").slice(0, 2);
  const handleSignOut = () => { signOut(); void navigate({ to: "/admin/login", replace: true }); };
  return <div className="min-h-screen bg-muted/45">
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block"><AdminNav/></aside>
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}><SheetContent side="left" className="w-72 border-none p-0"><SheetTitle className="sr-only">Admin navigation</SheetTitle><AdminNav onNavigate={() => setMobileOpen(false)}/></SheetContent></Sheet>
    <div className="lg:pl-64">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur md:px-7">
        <Button size="icon" variant="ghost" className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open admin menu"><Menu/></Button>
        <div className="relative hidden max-w-md flex-1 md:block"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"/><Input className="bg-muted/50 pl-9" placeholder="Search orders, products, customers..." aria-label="Search admin"/></div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative" aria-label="Notifications"><Bell/><span className="absolute right-2 top-2 size-2 rounded-full bg-sale"/></Button>
          <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" className="h-11 gap-2 px-2"><Avatar className="size-8 bg-secondary"><AvatarFallback className="bg-secondary text-xs font-bold text-secondary-foreground">{initials}</AvatarFallback></Avatar><span className="hidden text-left sm:block"><span className="block text-xs font-bold">{profile.name}</span><span className="block text-[10px] font-normal text-muted-foreground">Administrator</span></span><ChevronDown className="hidden size-3 sm:block"/></Button></DropdownMenuTrigger><DropdownMenuContent align="end" className="w-56"><DropdownMenuLabel>My account</DropdownMenuLabel><DropdownMenuSeparator/><DropdownMenuItem asChild><Link to="/admin/profile"><UserRound/>Profile settings</Link></DropdownMenuItem><DropdownMenuItem asChild><Link to="/admin/products"><PackageSearch/>Manage inventory</Link></DropdownMenuItem><DropdownMenuSeparator/><DropdownMenuItem onSelect={handleSignOut} className="text-destructive"><LogOut/>Sign out</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
        </div>
      </header>
      <main className="px-4 py-6 md:px-7 md:py-8"><Outlet/></main>
    </div>
  </div>;
}

export function AdminPageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-1 text-[11px] font-bold uppercase text-primary">{eyebrow}</p><h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">{title}</h1><p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p></div>{action}</div>;
}

export function MetricCard({ label, value, change, icon: Icon }: { label: string; value: string; change: string; icon: React.ComponentType<{ className?: string }>; }) {
  return <div className="rounded-lg border bg-card p-5 shadow-sm"><div className="flex items-start justify-between"><div><p className="text-xs font-semibold text-muted-foreground">{label}</p><p className="mt-2 font-display text-2xl font-bold text-card-foreground">{value}</p></div><span className="flex size-10 items-center justify-center rounded-md bg-secondary text-secondary-foreground"><Icon className="size-5"/></span></div><p className="mt-3 text-xs text-muted-foreground"><span className="font-bold text-chart-2">{change}</span> vs last month</p></div>;
}
