"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { DashboardStats, PreRegistrationRecord } from "@/lib/adminTypes";
import AdminLayout from "./AdminLayout";
import ConfirmModal from "./ConfirmModal";
import EditModal from "./EditModal";
import PreRegistrationTable from "./PreRegistrationTable";
import StatsCards from "./StatsCards";
import { adminFadeVariants, adminStaggerVariants } from "./adminVariants";

type AdminDashboardProps = {
  initialItems: PreRegistrationRecord[];
  initialStats: DashboardStats;
};

type AdminView = "dashboard" | "pending" | "confirmed" | "stats" | "export";

export default function AdminDashboard({ initialItems, initialStats }: AdminDashboardProps) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [stats, setStats] = useState(initialStats);
  const [activeView, setActiveView] = useState<AdminView>("dashboard");
  const [editingItem, setEditingItem] = useState<PreRegistrationRecord | null>(null);
  const [deletingItem, setDeletingItem] = useState<PreRegistrationRecord | null>(null);

  const pendingItems = useMemo(() => items.filter((item) => item.status === "pending"), [items]);
  const confirmedItems = useMemo(() => items.filter((item) => item.status === "confirmed"), [items]);

  const syncFromServer = async () => {
    const response = await fetch("/api/preinscripciones", { cache: "no-store" });
    if (response.status === 401) {
      router.push("/rkt-panel/login");
      return;
    }

    const payload = (await response.json()) as { items: PreRegistrationRecord[]; stats: DashboardStats };
    setItems(payload.items);
    setStats(payload.stats);
  };

  const handleConfirm = async (id: string) => {
    await fetch(`/api/preinscripciones/${id}/confirmar`, {
      method: "PATCH"
    });

    await syncFromServer();
  };

  const handleDelete = async () => {
    if (!deletingItem) return;

    await fetch(`/api/preinscripciones/${deletingItem.id}`, {
      method: "DELETE"
    });

    setDeletingItem(null);
    await syncFromServer();
  };

  const handleSaveEdit = async (payload: {
    id: string;
    fullName: string;
    phone: string;
    identityNumber: string;
    eventAge: number;
  }) => {
    await fetch(`/api/preinscripciones/${payload.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: payload.fullName,
        phone: payload.phone,
        identityNumber: payload.identityNumber,
        eventAge: payload.eventAge
      })
    });

    setEditingItem(null);
    await syncFromServer();
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/rkt-panel/login");
    router.refresh();
  };

  const handleExportCsv = () => {
    const headers = ["Nombre", "Teléfono", "Identidad", "Edad", "Fecha", "Estado"];
    const rows = items.map((item) => [
      item.fullName,
      item.phone,
      item.identityNumber,
      String(item.eventAge),
      new Date(item.createdAt).toLocaleString("es-ES"),
      item.status === "confirmed" ? "Confirmada" : "Pendiente"
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell.replaceAll("\"", "\"\"")}"`).join(";"))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "rkt-preinscripciones.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout
      activeView={activeView}
      onChangeView={setActiveView}
      onLogout={handleLogout}
      onExport={handleExportCsv}
    >
      <motion.div variants={adminStaggerVariants} initial="hidden" animate="show" className="space-y-5">
        <StatsCards stats={stats} />

        {(activeView === "dashboard" || activeView === "pending") && (
          <PreRegistrationTable
            title="PREINSCRIPCIONES SIN CONFIRMAR"
            items={pendingItems}
            onConfirm={handleConfirm}
            onEdit={setEditingItem}
            onDelete={setDeletingItem}
          />
        )}

        {(activeView === "dashboard" || activeView === "confirmed") && (
          <PreRegistrationTable
            title="PREINSCRIPCIONES CONFIRMADAS"
            items={confirmedItems}
            onConfirm={handleConfirm}
            onEdit={setEditingItem}
            onDelete={setDeletingItem}
          />
        )}

        {activeView === "stats" ? (
          <motion.section variants={adminFadeVariants} className="rounded-md border border-[#ffffff22] bg-[#090909] px-5 py-5 shadow-[0_12px_24px_rgba(0,0,0,0.62)]">
            <h3 className="text-sm font-black uppercase tracking-[0.1em] text-white sm:text-base">Resumen de Ocupación</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#d6d6d6]">
              Ocupación oficial estimada sobre 96 plazas: <span className="font-semibold text-[#ffd100]">{stats.occupancyPercent}%</span>.
            </p>
          </motion.section>
        ) : null}

        {activeView === "export" ? (
          <motion.section variants={adminFadeVariants} className="rounded-md border border-[#ffffff22] bg-[#090909] px-5 py-5 shadow-[0_12px_24px_rgba(0,0,0,0.62)]">
            <h3 className="text-sm font-black uppercase tracking-[0.1em] text-white sm:text-base">Exportación Oficial</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#d6d6d6]">
              Descarga el listado completo para control documental y seguimiento de inscripciones.
            </p>
            <button
              onClick={handleExportCsv}
              className="mt-4 rounded-md bg-[#ffd100] px-4 py-2 text-xs font-black uppercase tracking-[0.08em] text-black"
            >
              Exportar CSV
            </button>
          </motion.section>
        ) : null}
      </motion.div>

      <EditModal item={editingItem} onSave={handleSaveEdit} onClose={() => setEditingItem(null)} />

      <ConfirmModal
        isOpen={Boolean(deletingItem)}
        title="Eliminar preinscripción"
        message="Esta acción eliminará definitivamente el registro seleccionado."
        confirmLabel="Eliminar"
        onConfirm={handleDelete}
        onClose={() => setDeletingItem(null)}
      />
    </AdminLayout>
  );
}
