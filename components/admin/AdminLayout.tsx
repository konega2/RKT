"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AdminPanelView } from "@/lib/adminTypes";

type AdminLayoutProps = {
  activeView: AdminPanelView;
  onChangeView: (view: AdminPanelView) => void;
  onLogout: () => void;
  children: React.ReactNode;
};

const views: Array<{ key: AdminPanelView; label: string; icon: JSX.Element }> = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
        <path d="M4 12h7V4H4v8Zm0 8h7v-6H4v6Zm9 0h7V12h-7v8Zm0-16v6h7V4h-7Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    key: "pending",
    label: "Preinscripciones Pendientes",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
        <path d="M12 7v5l3 3m7-3a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    key: "confirmed",
    label: "Preinscripciones Confirmadas",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
        <path d="m5 12 4 4 10-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    key: "pilots",
    label: "Pilotos",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
        <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm-10 14a6 6 0 1 1 12 0H6Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    key: "stats",
    label: "Estadísticas",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
        <path d="M5 19V9m7 10V5m7 14v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    key: "export",
    label: "Exportaciones",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
        <path d="M12 4v11m0 0 4-4m-4 4-4-4M4 20h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    key: "settings",
    label: "Configuración",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
        <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm8-3.5-1.7-.6a6.96 6.96 0 0 0-.5-1.2l.8-1.6-1.8-1.8-1.6.8c-.4-.2-.8-.4-1.2-.5L12 4h-2l-.6 1.7c-.4.1-.8.3-1.2.5l-1.6-.8-1.8 1.8.8 1.6c-.2.4-.4.8-.5 1.2L4 12v2l1.7.6c.1.4.3.8.5 1.2l-.8 1.6 1.8 1.8 1.6-.8c.4.2.8.4 1.2.5L10 20h2l.6-1.7c.4-.1.8-.3 1.2-.5l1.6.8 1.8-1.8-.8-1.6c.2-.4.4-.8.5-1.2L20 14v-2Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
];

export default function AdminLayout({
  activeView,
  onChangeView,
  onLogout,
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

      <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[240px_1fr]">
        <aside className="rounded-md border border-[#ffffff1d] bg-[#090909] p-3 shadow-[0_12px_24px_rgba(0,0,0,0.62)]">
          <nav className="space-y-1.5">
            {views.map((view) => (
              <motion.button
                key={view.key}
                onClick={() => onChangeView(view.key)}
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[0.68rem] font-semibold uppercase tracking-[0.08em] transition-colors sm:text-xs ${
                  activeView === view.key
                    ? "bg-[#facc15] text-black"
                    : "bg-[#111] text-[#d9d9d9] hover:bg-[#171717]"
                }`}
              >
                {view.icon}
                <span>{view.label}</span>
              </motion.button>
            ))}
          </nav>
        </aside>

        <main>
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
