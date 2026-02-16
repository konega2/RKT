"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type SlotsStats = {
  totalSlots: number;
  confirmed: number;
  available: number;
  occupancyPercent: number;
};

const FALLBACK_TOTAL = 96;

export default function SlotsProgressBar() {
  const [stats, setStats] = useState<SlotsStats>({
    totalSlots: FALLBACK_TOTAL,
    confirmed: 0,
    available: FALLBACK_TOTAL,
    occupancyPercent: 0
  });

  useEffect(() => {
    let isMounted = true;

    async function loadStats() {
      try {
        const response = await fetch("/api/preinscripciones/stats", { cache: "no-store" });
        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as
          | ({ ok: true } & SlotsStats)
          | { ok: false; message?: string };

        if (!isMounted || !payload.ok) {
          return;
        }

        setStats({
          totalSlots: payload.totalSlots,
          confirmed: payload.confirmed,
          available: payload.available,
          occupancyPercent: payload.occupancyPercent
        });
      } catch {
        // Mantiene fallback silencioso en caso de error de red.
      }
    }

    loadStats();
    const intervalId = window.setInterval(loadStats, 30000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  const progressWidth = useMemo(
    () => `${Math.max(0, Math.min(100, stats.occupancyPercent))}%`,
    [stats.occupancyPercent]
  );

  return (
    <div className="mt-5 w-full max-w-xl rounded-md border border-[#ffffff1a] bg-[#0b0b0b] px-4 py-3">
      <div className="mb-2 flex items-center justify-between text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#c9c9c9] sm:text-[0.68rem]">
        <span>Disponibilidad Oficial</span>
        <span className="text-[#ffd100]">{stats.available} disponibles</span>
      </div>

      <div className="h-[4px] w-full overflow-hidden rounded-full bg-[#ffffff17]">
        <motion.div
          className="h-[4px] origin-left rounded-full bg-[#ffd100]"
          initial={{ width: 0, opacity: 0.45 }}
          whileInView={{ width: progressWidth, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between text-[0.58rem] font-medium uppercase tracking-[0.12em] text-[#a8a8a8] sm:text-[0.64rem]">
        <span>{stats.confirmed} confirmadas</span>
        <span>{stats.totalSlots} total</span>
      </div>
    </div>
  );
}
