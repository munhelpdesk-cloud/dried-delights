import type { ReactNode } from "react";
import { StoreFooter } from "@/components/store-footer";
import { StoreHeader } from "@/components/store-header";

export function StoreShell({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-background text-foreground"><StoreHeader /><main>{children}</main><StoreFooter /></div>;
}