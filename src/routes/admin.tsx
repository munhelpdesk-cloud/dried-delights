import { Outlet, createFileRoute } from "@tanstack/react-router";
import { AdminProvider } from "@/lib/admin-store";
export const Route = createFileRoute("/admin")({ component: AdminRoot });
function AdminRoot() { return <AdminProvider><Outlet/></AdminProvider>; }
