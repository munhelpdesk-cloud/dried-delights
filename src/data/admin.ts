export const adminOrders = [
  { id: "ASM-10482", customer: "Priya Sharma", date: "03 Oct 2026", total: 1727, payment: "UPI", status: "Out for delivery", items: 3, city: "Mumbai" },
  { id: "ASM-10481", customer: "Neha Kapoor", date: "03 Oct 2026", total: 2398, payment: "Card", status: "Processing", items: 2, city: "Delhi" },
  { id: "ASM-10480", customer: "Arjun Patel", date: "02 Oct 2026", total: 849, payment: "COD", status: "Packed", items: 2, city: "Ahmedabad" },
  { id: "ASM-10479", customer: "Meera Iyer", date: "02 Oct 2026", total: 1299, payment: "UPI", status: "Delivered", items: 1, city: "Bengaluru" },
  { id: "ASM-10478", customer: "Kabir Singh", date: "01 Oct 2026", total: 998, payment: "Card", status: "Delivered", items: 3, city: "Chandigarh" },
  { id: "ASM-10477", customer: "Sara Khan", date: "01 Oct 2026", total: 549, payment: "Wallet", status: "Cancelled", items: 1, city: "Pune" },
];

export const transactions = [
  { id: "TXN-884921", order: "ASM-10482", customer: "Priya Sharma", method: "UPI", amount: 1727, date: "03 Oct, 10:14 AM", status: "Captured" },
  { id: "TXN-884920", order: "ASM-10481", customer: "Neha Kapoor", method: "Visa •••• 4242", amount: 2398, date: "03 Oct, 9:42 AM", status: "Captured" },
  { id: "TXN-884919", order: "ASM-10480", customer: "Arjun Patel", method: "Cash on delivery", amount: 849, date: "02 Oct, 7:18 PM", status: "Pending" },
  { id: "TXN-884918", order: "ASM-10479", customer: "Meera Iyer", method: "UPI", amount: 1299, date: "02 Oct, 4:05 PM", status: "Captured" },
  { id: "TXN-884917", order: "ASM-10477", customer: "Sara Khan", method: "Wallet", amount: 549, date: "01 Oct, 11:30 AM", status: "Refunded" },
];

export const customers = [
  { name: "Priya Sharma", email: "priya.s@example.com", orders: 8, spent: 9842, city: "Mumbai", joined: "12 Mar 2026" },
  { name: "Rahul Mehta", email: "rahul.m@example.com", orders: 6, spent: 7210, city: "Ahmedabad", joined: "28 Apr 2026" },
  { name: "Meera Iyer", email: "meera.i@example.com", orders: 5, spent: 6495, city: "Bengaluru", joined: "05 May 2026" },
  { name: "Neha Kapoor", email: "neha.k@example.com", orders: 4, spent: 5188, city: "Delhi", joined: "19 Jun 2026" },
  { name: "Arjun Patel", email: "arjun.p@example.com", orders: 3, spent: 3377, city: "Ahmedabad", joined: "02 Jul 2026" },
];

export const revenueData = [
  { month: "Apr", revenue: 142000, orders: 182 }, { month: "May", revenue: 168000, orders: 214 },
  { month: "Jun", revenue: 155000, orders: 201 }, { month: "Jul", revenue: 196000, orders: 248 },
  { month: "Aug", revenue: 218000, orders: 273 }, { month: "Sep", revenue: 264000, orders: 328 },
  { month: "Oct", revenue: 291000, orders: 361 },
];

export const categoryData = [
  { name: "Nuts", value: 46, fill: "var(--color-chart-1)" },
  { name: "Gifting", value: 24, fill: "var(--color-chart-2)" },
  { name: "Dry fruits", value: 19, fill: "var(--color-chart-3)" },
  { name: "Seeds & berries", value: 11, fill: "var(--color-chart-4)" },
];
