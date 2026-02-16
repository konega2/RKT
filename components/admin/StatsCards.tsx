"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DashboardStats } from "@/lib/adminTypes";
import { adminFadeVariants } from "./adminVariants";

type StatsCardsProps = {
  stats: DashboardStats;
};

function useCountUp(target: number) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let animationFrame = 0;
    const duration = 700;
    const startedAt = performance.now();

    const tick = (time: number) => {
      const progress = Math.min((time - startedAt) / duration, 1);
      setValue(Math.round(target * progress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    animationFrame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrame);
  }, [target]);

  return value;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const total = useCountUp(stats.total);
  const confirmed = useCountUp(stats.confirmed);
  const pending = useCountUp(stats.pending);
  const occupancy = useCountUp(Math.round(stats.occupancyPercent));

  const cards = [
    { label: "Total solicitudes", value: total },
    { label: "Confirmadas", value: confirmed },
    { label: "Pendientes", value: pending },
    { label: "% Ocupación (96)", value: `${occupancy}%` }
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <motion.article
          key={card.label}
          variants={adminFadeVariants}
          className="rounded-md border border-[#ffffff22] bg-[#0a0a0a] px-4 py-4 shadow-[0_12px_24px_rgba(0,0,0,0.62)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#cfcfcf]">{card.label}</p>
          <p className="mt-2 text-3xl font-black tracking-[-0.02em] text-white">{card.value}</p>
        </motion.article>
      ))}
    </div>
  );
}
