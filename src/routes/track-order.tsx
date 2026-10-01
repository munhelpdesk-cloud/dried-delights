import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, CreditCard, MapPin, PackageSearch, Phone, Truck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { StoreHeader } from "@/components/store-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { findOrder, orderSteps, purchaseHistory, type Order } from "@/data/orders";
import { productBySlug } from "@/data/catalog";

export const Route = createFileRoute("/track-order")({
  head: () => ({
    meta: [
      { title: "Track Your Order | ASM Delights" },
      { name: "description", content: "Check your ASM Delights order status, delivery details and past purchases." },
      { property: "og:title", content: "Track Your Order | ASM Delights" },
      { property: "og:description", content: "Live order status, courier details and purchase history for ASM Delights customers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TrackOrderPage,
});

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found = findOrder(orderId, phone);
    setOrder(found ?? null);
    setError(found ? "" : "We couldn't find an order with these details. Please check and try again.");
  };

  return (
    <div className="min-h-screen bg-background">
      <StoreHeader />
      <main className="mx-auto max-w-[1200px] px-5 py-12 lg:px-10 lg:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-foreground/70">Order care</p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-primary md:text-5xl">Track your order</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">Enter your order number and the phone number used at checkout.</p>

        <form onSubmit={submit} className="mt-8 grid gap-3 rounded-lg border border-border bg-card p-5 md:grid-cols-[1fr_1fr_auto]">
          <Input aria-label="Order ID" placeholder="Order ID (e.g. ASM-10482)" value={orderId} onChange={(e) => setOrderId(e.target.value)} required />
          <Input aria-label="Phone number" placeholder="10-digit phone number" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          <Button type="submit"><PackageSearch /> Track order</Button>
          <p className="text-xs text-muted-foreground md:col-span-3">Demo: try <strong>ASM-10482</strong> with <strong>9876543210</strong>, or <strong>ASM-10317</strong> with <strong>9123456780</strong>.</p>
        </form>
        {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}

        {order && <OrderDetails order={order} />}
      </main>
    </div>
  );
}

function OrderDetails({ order }: { order: Order }) {
  const current = orderSteps.findIndex((s) => s.status === order.status);
  const total = order.items.reduce((s, i) => s + i.price * i.qty, 0);
  const history = purchaseHistory[order.phone] ?? [];

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      <section className="rounded-lg border border-border bg-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">Order {order.id} • Placed {order.placedOn}</p>
            <h2 className="mt-1 font-display text-2xl font-semibold text-primary">{orderSteps[current]?.label}</h2>
            <p className="mt-1 text-sm font-medium text-foreground">{order.eta}</p>
          </div>
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">{order.status === "delivered" ? "Completed" : "In transit"}</span>
        </div>

        <div className="mt-6 h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(current / (orderSteps.length - 1)) * 100}%` }} />
        </div>

        <ol className="mt-8 space-y-5">
          {order.timeline.map((step, i) => {
            const done = i <= current;
            return (
              <li key={step.status} className="flex gap-4">
                <span className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border-2 ${done ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground"}`}>
                  {done ? <Check size={14} /> : <span className="size-1.5 rounded-full bg-current" />}
                </span>
                <div>
                  <p className={`font-semibold ${done ? "text-primary" : "text-muted-foreground"}`}>{step.label}</p>
                  <p className="text-sm text-muted-foreground">{step.note}{step.at && ` • ${step.at}`}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <h3 className="mt-10 font-display text-lg font-semibold text-primary">Items in this order</h3>
        <ul className="mt-3 divide-y divide-border">
          {order.items.map((item) => {
            const p = productBySlug(item.slug);
            return (
              <li key={item.slug + item.size} className="flex items-center gap-4 py-3">
                {p && <img src={p.image} alt={item.name} className={`size-14 rounded-md object-cover ${p.crop}`} />}
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.size} × {item.qty}</p>
                </div>
                <p className="font-semibold text-primary">{inr(item.price * item.qty)}</p>
              </li>
            );
          })}
        </ul>
        <div className="flex justify-between border-t border-border pt-4 font-semibold text-primary"><span>Total</span><span>{inr(total)}</span></div>
      </section>

      <aside className="space-y-6">
        <section className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-display text-lg font-semibold text-primary">Delivery details</h3>
          <dl className="mt-4 space-y-4 text-sm">
            <Row icon={<MapPin size={16} />} label={order.customer} value={order.address} />
            <Row icon={<Truck size={16} />} label={order.courier} value={`Tracking no. ${order.awb}`} />
            <Row icon={<Phone size={16} />} label="Contact" value={`+91 ${order.phone.slice(0, 5)} ${order.phone.slice(5)}`} />
            <Row icon={<CreditCard size={16} />} label="Payment" value={order.payment} />
          </dl>
        </section>

        <section className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-display text-lg font-semibold text-primary">Your purchase history</h3>
          <ul className="mt-4 space-y-4">
            {history.map((h) => (
              <li key={h.orderId} className="border-b border-border pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between text-sm"><span className="font-semibold text-foreground">{h.orderId}</span><span className="text-muted-foreground">{h.date}</span></div>
                <p className="mt-1 text-sm text-muted-foreground">{h.items.map((i) => `${i.name} (${i.size})`).join(", ")}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-primary">{inr(h.total)}</span>
                  <Link to="/products/$slug" params={{ slug: h.items[0]?.slug ?? "" }} className="text-xs font-semibold text-primary underline underline-offset-4">Buy again</Link>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </div>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 text-accent-foreground">{icon}</span>
      <div><dt className="font-semibold text-foreground">{label}</dt><dd className="text-muted-foreground">{value}</dd></div>
    </div>
  );
}
