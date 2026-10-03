import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function AdminStatus({ value }: { value: string }) {
  const positive = ["Active", "Delivered", "Captured", "Paid"].includes(value);
  const warning = ["Processing", "Packed", "Out for delivery", "Pending", "Low stock"].includes(value);
  return <Badge variant="outline" className={cn("font-medium", positive && "border-chart-2/30 bg-chart-2/10 text-chart-2", warning && "border-rating/40 bg-rating/10 text-foreground", !positive && !warning && "border-destructive/30 bg-destructive/10 text-destructive")}>{value}</Badge>;
}
