"use client";

import { motion } from "framer-motion";
import { activeGlowTransition, itemVariants } from "./timelineVariants";

type TimelineItemProps = {
  index: number;
  title: string;
  align: "left" | "right";
};

export default function TimelineItem({ index, title, align }: TimelineItemProps) {
  const stage = String(index + 1).padStart(2, "0");

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2">
      <div
        className={`relative ${align === "left" ? "md:col-start-1 md:pr-14" : "md:col-start-2 md:pl-14"}`}
      >
        <motion.article
          // La etapa se activa cada vez que vuelve a entrar en viewport
          variants={itemVariants}
          initial="hidden"
          whileInView="active"
          viewport={{ once: false, amount: 0.45 }}
          className="relative rounded-md border border-[#ffffff22] bg-[#070707]/80 px-5 py-6 shadow-[0_12px_24px_rgba(0,0,0,0.62)] backdrop-blur-[1px]"
        >
          <motion.span
            // Glow activo muy sutil para marcar etapa vigente sin exceso visual
            className="absolute inset-0 rounded-md border border-[#ffd10033]"
            animate={{ opacity: [0.2, 0.46, 0.2] }}
            transition={activeGlowTransition}
          />

          <span className="pointer-events-none absolute -top-7 right-2 text-6xl font-black leading-none tracking-[-0.05em] text-transparent sm:text-7xl md:right-4 md:text-8xl">
            <span style={{ WebkitTextStroke: "1px rgba(255,209,0,0.55)" }}>{stage}</span>
          </span>

          <h3 className="relative z-10 max-w-[30ch] text-lg font-black uppercase leading-tight tracking-[-0.01em] text-white sm:text-xl">
            {title}
          </h3>
        </motion.article>

        <div className="absolute left-[1.72rem] top-8 hidden h-3 w-3 -translate-x-1/2 rounded-full border border-[#ffd100aa] bg-[#0b0b0b] md:block md:left-auto md:top-10 md:w-3 md:translate-x-0" />

        {align === "left" ? (
          <div className="absolute right-0 top-10 hidden h-px w-14 bg-[#ffd10066] md:block" />
        ) : (
          <div className="absolute left-0 top-10 hidden h-px w-14 bg-[#ffd10066] md:block" />
        )}
      </div>
    </div>
  );
}