"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type AdminView = "dashboard" | "pending" | "confirmed" | "stats" | "export";

type AdminLayoutProps = {
  activeView: AdminView;
  onChangeView: (view: AdminView) => void;
  onLogout: () => void;
  onExport: () => void;
  children: React.ReactNode;
};

const views: Array<{ key: AdminView; label: string }> = [
  { key: "dashboard", label: "Dashboard" },
  { key: "pending", label: "Preinscripciones sin confirmar" },
  { key: "confirmed", label: "Preinscripciones confirmadas" },
  { key: "stats", label: "Estadísticas" },
  { key: "export", label: "Exportar datos" }
];

export default function AdminLayout({
  activeView,
  onChangeView,
  onLogout,
  onExport,
  children
}: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="sticky top-0 z-30 border-b border-[#ffffff18] bg-[#070707f2] backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1300px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Image src="/LOGO_RKT.jpg" alt="RKT" width={120} height={60} className="h-auto w-24 sm:w-28" />
            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#ffd100] sm:text-sm">
              Panel de Gestión de Inscripciones
            </p>
          </div>

          <button
            onClick={onLogout}
            className="rounded-md border border-[#4f4f4f] px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#e7e7e7]"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1300px] grid-cols-1 gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-md border border-[#ffffff1d] bg-[#090909] p-4 shadow-[0_12px_24px_rgba(0,0,0,0.62)]">
          <nav className="space-y-2">
            {views.map((view) => (
              <motion.button
                key={view.key}
                onClick={() => {
                  if (view.key === "export") {
                    onExport();
                  }
                  onChangeView(view.key);
                }}
                whileHover={{ x: 2 }}
                className={`w-full rounded-md px-3 py-2 text-left text-xs font-semibold uppercase tracking-[0.08em] transition-colors sm:text-sm ${
                  activeView === view.key
                    ? "bg-[#ffd100] text-black"
                    : "bg-[#111] text-[#d9d9d9] hover:bg-[#171717]"
                }`}
              >
                {view.label}
              </motion.button>
            ))}
          </nav>
        </aside>

        <main>{children}</main>
      </div>
    </div>
  );
}
