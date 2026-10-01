export type OrderStatus = "placed" | "packed" | "shipped" | "out_for_delivery" | "delivered";

export type OrderItem = { slug: string; name: string; size: string; qty: number; price: number };

export type Order = {
  id: string;
  phone: string;
  customer: string;
  placedOn: string;
  status: OrderStatus;
  eta: string;
  courier: string;
  awb: string;
  address: string;
  payment: string;
  items: OrderItem[];
  timeline: { status: OrderStatus; label: string; at?: string; note: string }[];
};

const steps: { status: OrderStatus; label: string }[] = [
  { status: "placed", label: "Order placed" },
  { status: "packed", label: "Freshly packed" },
  { status: "shipped", label: "Shipped" },
  { status: "out_for_delivery", label: "Out for delivery" },
  { status: "delivered", label: "Delivered" },
];

export const orderSteps = steps;

export const orders: Order[] = [
  {
    id: "ASM-10482",
    phone: "9876543210",
    customer: "Priya Sharma",
    placedOn: "28 Sep 2026",
    status: "out_for_delivery",
    eta: "Today, by 7:00 PM",
    courier: "BlueDart Express",
    awb: "BD7741029384",
    address: "402, Sapphire Residency, Linking Road, Bandra West, Mumbai 400050",
    payment: "Paid via UPI",
    items: [
      { slug: "california-almonds", name: "California Almonds", size: "500g", qty: 2, price: 649 },
      { slug: "whole-cashews-w320", name: "Whole Cashews W320", size: "250g", qty: 1, price: 429 },
    ],
    timeline: [
      { status: "placed", label: "Order placed", at: "28 Sep, 10:14 AM", note: "Payment confirmed" },
      { status: "packed", label: "Freshly packed", at: "28 Sep, 4:40 PM", note: "Nitrogen-sealed at our Mundra facility" },
      { status: "shipped", label: "Shipped", at: "29 Sep, 9:05 AM", note: "Handed to BlueDart Express" },
      { status: "out_for_delivery", label: "Out for delivery", at: "1 Oct, 8:30 AM", note: "Your courier partner is on the way" },
      { status: "delivered", label: "Delivered", note: "Expected today" },
    ],
  },
  {
    id: "ASM-10317",
    phone: "9123456780",
    customer: "Rahul Mehta",
    placedOn: "18 Sep 2026",
    status: "delivered",
    eta: "Delivered on 22 Sep 2026",
    courier: "Delhivery",
    awb: "DL55290017732",
    address: "B-12, Satellite Road, Ahmedabad 380015",
    payment: "Cash on delivery",
    items: [{ slug: "whole-cashews-w320", name: "Whole Cashews W320", size: "1kg", qty: 1, price: 1499 }],
    timeline: [
      { status: "placed", label: "Order placed", at: "18 Sep, 7:22 PM", note: "Order confirmed" },
      { status: "packed", label: "Freshly packed", at: "19 Sep, 11:10 AM", note: "Quality checked and sealed" },
      { status: "shipped", label: "Shipped", at: "19 Sep, 6:00 PM", note: "Handed to Delhivery" },
      { status: "out_for_delivery", label: "Out for delivery", at: "22 Sep, 9:15 AM", note: "Out with local partner" },
      { status: "delivered", label: "Delivered", at: "22 Sep, 1:42 PM", note: "Received by Rahul" },
    ],
  },
];

/** Previous purchases per phone number, used for the "product history" section. */
export const purchaseHistory: Record<string, { orderId: string; date: string; items: OrderItem[]; total: number }[]> = {
  "9876543210": [
    { orderId: "ASM-10482", date: "28 Sep 2026", items: orders[0].items, total: 1727 },
    { orderId: "ASM-09876", date: "02 Aug 2026", items: [{ slug: "california-almonds", name: "California Almonds", size: "1kg", qty: 1, price: 1199 }], total: 1199 },
    { orderId: "ASM-09104", date: "15 Jun 2026", items: [{ slug: "whole-cashews-w320", name: "Whole Cashews W320", size: "500g", qty: 1, price: 799 }], total: 799 },
  ],
  "9123456780": [
    { orderId: "ASM-10317", date: "18 Sep 2026", items: orders[1].items, total: 1499 },
  ],
};

export const findOrder = (id: string, phone: string) =>
  orders.find((o) => o.id.toLowerCase() === id.trim().toLowerCase() && o.phone === phone.replace(/\D/g, "").slice(-10));
