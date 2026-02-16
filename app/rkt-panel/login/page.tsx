import { redirect } from "next/navigation";
import AdminLogin from "@/components/admin/AdminLogin";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export default function AdminLoginPage() {
  if (isAdminAuthenticated()) {
    redirect("/rkt-panel");
  }

  return <AdminLogin />;
}
