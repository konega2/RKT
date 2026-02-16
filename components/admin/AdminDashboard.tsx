"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AdminPanelView, DashboardStats, PreRegistrationRecord } from "@/lib/adminTypes";
import AdminLayout from "./AdminLayout";
import ConfirmModal from "./ConfirmModal";
import EditModal from "./EditModal";
import PilotProfileModal from "./PilotProfileModal";
import PreRegistrationTable from "./PreRegistrationTable";
import StatsCards from "./StatsCards";
import { adminFadeVariants, adminStaggerVariants } from "./adminVariants";

type AdminDashboardProps = {
  initialItems: PreRegistrationRecord[];
  initialStats: DashboardStats;
};

type FilterState = {
  query: string;
  minAge: string;
  maxAge: string;
  sort: "newest" | "oldest";
  requireInsurance: boolean;
  requireLiability: boolean;
  requireImage: boolean;
};

const initialFilterState: FilterState = {
  query: "",
  minAge: "",
  maxAge: "",
  sort: "newest",
  requireInsurance: false,
  requireLiability: false,
  requireImage: false
};

function useDebouncedValue<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(timeoutId);
  }, [value, delay]);

  return debounced;
}

function applyFilters(items: PreRegistrationRecord[], filters: FilterState) {
  const q = filters.query.trim().toLowerCase();

  const filtered = items.filter((item) => {
    const matchesQuery =
      q.length === 0 ||
      item.fullName.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      item.identityNumber.toLowerCase().includes(q) ||
      item.phone.toLowerCase().includes(q);

    const minAgeOk = filters.minAge ? item.eventAge >= Number(filters.minAge) : true;
    const maxAgeOk = filters.maxAge ? item.eventAge <= Number(filters.maxAge) : true;
    const insuranceOk = filters.requireInsurance ? item.insuranceAccepted : true;
    const liabilityOk = filters.requireLiability ? item.liabilityAccepted : true;
    const imageOk = filters.requireImage ? item.imageAccepted : true;

    return matchesQuery && minAgeOk && maxAgeOk && insuranceOk && liabilityOk && imageOk;
  });

  return filtered.sort((a, b) => {
    const tA = new Date(a.createdAt).getTime();
    const tB = new Date(b.createdAt).getTime();
    return filters.sort === "newest" ? tB - tA : tA - tB;
  });
}

function SectionFilters({
  value,
  onChange
}: {
  value: FilterState;
  onChange: (next: FilterState) => void;
}) {
  return (
    <motion.section variants={adminFadeVariants} className="rounded-md border border-[#ffffff22] bg-[#090909] px-4 py-4 shadow-[0_12px_24px_rgba(0,0,0,0.62)]">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-5">
        <input
          value={value.query}
          onChange={(event) => onChange({ ...value, query: event.target.value })}
          placeholder="Buscar por nombre, email, DNI o teléfono"
          className="rounded-md border border-[#4f4f4f] bg-[#101010] px-3 py-2 text-sm text-white outline-none focus:border-[#ffd100] lg:col-span-2"
        />

        <input
          type="number"
          value={value.minAge}
          onChange={(event) => onChange({ ...value, minAge: event.target.value })}
          placeholder="Edad mín"
          className="rounded-md border border-[#4f4f4f] bg-[#101010] px-3 py-2 text-sm text-white outline-none focus:border-[#ffd100]"
        />

        <input
          type="number"
          value={value.maxAge}
          onChange={(event) => onChange({ ...value, maxAge: event.target.value })}
          placeholder="Edad máx"
          className="rounded-md border border-[#4f4f4f] bg-[#101010] px-3 py-2 text-sm text-white outline-none focus:border-[#ffd100]"
        />

        <select
          value={value.sort}
          onChange={(event) => onChange({ ...value, sort: event.target.value as FilterState["sort"] })}
          className="rounded-md border border-[#4f4f4f] bg-[#101010] px-3 py-2 text-sm text-white outline-none focus:border-[#ffd100]"
        >
          <option value="newest">Más reciente</option>
          <option value="oldest">Más antiguo</option>
        </select>
      </div>

      <div className="mt-3 flex flex-wrap gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-[#d4d4d4]">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={value.requireInsurance}
            onChange={(event) => onChange({ ...value, requireInsurance: event.target.checked })}
          />
          Seguro aceptado
        </label>
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={value.requireLiability}
            onChange={(event) => onChange({ ...value, requireLiability: event.target.checked })}
          />
          Responsabilidad
        </label>
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={value.requireImage}
            onChange={(event) => onChange({ ...value, requireImage: event.target.checked })}
          />
          Imagen aceptada
        </label>
      </div>
    </motion.section>
  );
}

export default function AdminDashboard({ initialItems, initialStats }: AdminDashboardProps) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [stats, setStats] = useState(initialStats);
  const [activeView, setActiveView] = useState<AdminPanelView>("dashboard");
  const [editingItem, setEditingItem] = useState<PreRegistrationRecord | null>(null);
  const [deletingItem, setDeletingItem] = useState<PreRegistrationRecord | null>(null);
  const [selectedPilot, setSelectedPilot] = useState<PreRegistrationRecord | null>(null);
  const [compactTable, setCompactTable] = useState(false);

  const [pendingFilters, setPendingFilters] = useState<FilterState>(initialFilterState);
  const [confirmedFilters, setConfirmedFilters] = useState<FilterState>(initialFilterState);

  const debouncedPendingFilters = useDebouncedValue(pendingFilters, 300);
  const debouncedConfirmedFilters = useDebouncedValue(confirmedFilters, 300);

  const pendingItems = useMemo(() => items.filter((item) => item.status === "pending"), [items]);
  const confirmedItems = useMemo(() => items.filter((item) => item.status === "confirmed"), [items]);

  const filteredPendingItems = useMemo(
    () => applyFilters(pendingItems, debouncedPendingFilters),
    [pendingItems, debouncedPendingFilters]
  );

  const filteredConfirmedItems = useMemo(
    () => applyFilters(confirmedItems, debouncedConfirmedFilters),
    [confirmedItems, debouncedConfirmedFilters]
  );

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
    const sourceRows =
      activeView === "pending"
        ? filteredPendingItems
        : activeView === "confirmed" || activeView === "pilots"
          ? filteredConfirmedItems
          : items;

    const headers = ["Nombre", "Teléfono", "Identidad", "Edad", "Fecha", "Estado"];
    const rows = sourceRows.map((item) => [
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
    >
      <motion.div variants={adminStaggerVariants} initial="hidden" animate="show" className="space-y-5">
        {activeView === "dashboard" ? <StatsCards stats={stats} /> : null}

        {activeView === "pending" ? (
          <>
            <SectionFilters value={pendingFilters} onChange={setPendingFilters} />
            <div className="flex justify-end">
              <button
                onClick={() => setCompactTable((prev) => !prev)}
                className="rounded-md border border-[#4f4f4f] px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-[#e7e7e7]"
              >
                {compactTable ? "Modo normal" : "Modo compacto"}
              </button>
            </div>
            <PreRegistrationTable
              section="pending"
              title="PREINSCRIPCIONES PENDIENTES"
              items={filteredPendingItems}
              onConfirm={handleConfirm}
              onEdit={setEditingItem}
              onDelete={setDeletingItem}
              compact={compactTable}
            />
          </>
        ) : null}

        {activeView === "confirmed" ? (
          <>
            <SectionFilters value={confirmedFilters} onChange={setConfirmedFilters} />
            <div className="flex justify-end">
              <button
                onClick={() => setCompactTable((prev) => !prev)}
                className="rounded-md border border-[#4f4f4f] px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-[#e7e7e7]"
              >
                {compactTable ? "Modo normal" : "Modo compacto"}
              </button>
            </div>
            <PreRegistrationTable
              section="confirmed"
              title="PREINSCRIPCIONES CONFIRMADAS"
              items={filteredConfirmedItems}
              onConfirm={handleConfirm}
              onEdit={setEditingItem}
              onDelete={setDeletingItem}
              onViewPilot={setSelectedPilot}
              compact={compactTable}
            />
          </>
        ) : null}

        {activeView === "pilots" ? (
          <PreRegistrationTable
            section="pilots"
            title="PILOTOS CONFIRMADOS"
            items={filteredConfirmedItems}
            onConfirm={handleConfirm}
            onEdit={setEditingItem}
            onDelete={setDeletingItem}
            onViewPilot={setSelectedPilot}
            compact={compactTable}
          />
        ) : null}

        {activeView === "stats" ? (
          <motion.section variants={adminFadeVariants} className="rounded-md border border-[#ffffff22] bg-[#090909] px-5 py-5 shadow-[0_12px_24px_rgba(0,0,0,0.62)]">
            <h3 className="text-sm font-black uppercase tracking-[0.1em] text-white sm:text-base">Estadísticas del Campeonato</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#d6d6d6]">
              Confirmadas: <span className="font-semibold text-[#ffd100]">{stats.confirmed}</span> · Pendientes: <span className="font-semibold text-[#ffd100]">{stats.pending}</span> · Ocupación: <span className="font-semibold text-[#ffd100]">{stats.occupancyPercent}%</span>.
            </p>
          </motion.section>
        ) : null}

        {activeView === "export" ? (
          <motion.section variants={adminFadeVariants} className="rounded-md border border-[#ffffff22] bg-[#090909] px-5 py-5 shadow-[0_12px_24px_rgba(0,0,0,0.62)]">
            <h3 className="text-sm font-black uppercase tracking-[0.1em] text-white sm:text-base">Exportación Oficial</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#d6d6d6]">
              Descarga CSV por sección activa para control documental y operación interna.
            </p>
            <button
              onClick={handleExportCsv}
              className="mt-4 rounded-md bg-[#ffd100] px-4 py-2 text-xs font-black uppercase tracking-[0.08em] text-black"
            >
              Exportar CSV sección actual
            </button>
          </motion.section>
        ) : null}

        {activeView === "settings" ? (
          <motion.section variants={adminFadeVariants} className="rounded-md border border-[#ffffff22] bg-[#090909] px-5 py-5 shadow-[0_12px_24px_rgba(0,0,0,0.62)]">
            <h3 className="text-sm font-black uppercase tracking-[0.1em] text-white sm:text-base">Configuración</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#d6d6d6]">Sección reservada para parámetros operativos y reglas del campeonato.</p>
          </motion.section>
        ) : null}
      </motion.div>

      <EditModal item={editingItem} onSave={handleSaveEdit} onClose={() => setEditingItem(null)} />

      <PilotProfileModal item={selectedPilot} onClose={() => setSelectedPilot(null)} onRefresh={syncFromServer} />

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
