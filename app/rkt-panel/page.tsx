import { redirect } from "next/navigation";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getDashboardPayload } from "@/lib/preinscripcionesService";

export default async function AdminPanelPage() {
  if (!isAdminAuthenticated()) {
    redirect("/rkt-panel/login");
  }

  const payload = await getDashboardPayload();

  return <AdminDashboard initialItems={payload.items} initialStats={payload.stats} />;
}
