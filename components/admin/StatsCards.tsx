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

  const confirmedRatio = stats.total > 0 ? Math.max(12, (stats.confirmed / stats.total) * 100) : 12;
  const pendingRatio = stats.total > 0 ? Math.max(12, (stats.pending / stats.total) * 100) : 12;

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <motion.article
            key={card.label}
            variants={adminFadeVariants}
            className="rounded-md border border-[#ffffff22] bg-[#0a0a0a] px-4 py-4 shadow-[0_12px_24px_rgba(0,0,0,0.62)]"
          >
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[#cfcfcf]">{card.label}</p>
            <p className="mt-2 text-3xl font-black tracking-[-0.02em] text-white">{card.value}</p>
          </motion.article>
        ))}
      </div>

      <motion.article variants={adminFadeVariants} className="rounded-md border border-[#ffffff22] bg-[#090909] px-5 py-5 shadow-[0_12px_24px_rgba(0,0,0,0.62)]">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#d3d3d3]">Ocupación oficial</p>
          <p className="text-xs font-black uppercase tracking-[0.12em] text-[#ffd100]">{stats.occupancyPercent}%</p>
        </div>

        <div className="mt-3 h-[6px] w-full overflow-hidden rounded-full bg-[#ffffff1a]">
          <motion.div
            className="h-[6px] rounded-full bg-[#ffd100]"
            initial={{ width: 0 }}
            animate={{ width: `${stats.occupancyPercent}%` }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-md border border-[#ffffff1a] bg-[#0d0d0d] px-4 py-4">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[#cfcfcf]">Confirmadas vs Pendientes</p>

            <div className="mt-4 space-y-3">
              <div>
                <div className="mb-1 flex items-center justify-between text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[#d6d6d6]">
                  <span>Confirmadas</span>
                  <span className="text-[#ffd100]">{stats.confirmed}</span>
                </div>
                <div className="h-[5px] rounded-full bg-[#ffffff17]">
                  <motion.div
                    className="h-[5px] rounded-full bg-[#ffd100]"
                    initial={{ width: 0 }}
                    animate={{ width: `${confirmedRatio}%` }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[#d6d6d6]">
                  <span>Pendientes</span>
                  <span>{stats.pending}</span>
                </div>
                <div className="h-[5px] rounded-full bg-[#ffffff17]">
                  <motion.div
                    className="h-[5px] rounded-full bg-[#f3f3f3]"
                    initial={{ width: 0 }}
                    animate={{ width: `${pendingRatio}%` }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-md border border-[#ffffff1a] bg-[#0d0d0d] px-4 py-4">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[#cfcfcf]">Lectura operativa</p>
            <p className="mt-3 text-sm leading-relaxed text-[#d4d4d4]">
              El Dashboard resume exclusivamente la situación global de ocupación y gestión; los filtros y el análisis operativo se realizan por sección.
            </p>
          </div>
        </div>
      </motion.article>
    </section>
  );
}
