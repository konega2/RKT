"use client";

import { motion } from "framer-motion";
import { productionCardVariants } from "./productionVariants";

type ProductionCardProps = {
  index: number;
  title: string;
  description: string;
  offset?: string;
};

export default function ProductionCard({
  index,
  title,
  description,
  offset = ""
}: ProductionCardProps) {
  const stage = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      custom={index}
      variants={productionCardVariants}
      className={`group relative overflow-hidden rounded-md border border-[#ffffff1f] bg-[#070707] px-5 py-6 shadow-[0_14px_28px_rgba(0,0,0,0.62)] sm:px-6 sm:py-7 ${offset}`}
      whileHover={{
        scale: 1.02,
        y: -2,
        borderColor: "rgba(255,209,0,0.42)",
        boxShadow: "0 18px 30px rgba(0,0,0,0.76),0 0 10px rgba(255,209,0,0.12)"
      }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
    >
      <span className="pointer-events-none absolute right-3 top-2 text-6xl font-black leading-none tracking-[-0.04em] text-transparent opacity-40 sm:text-7xl">
        <span style={{ WebkitTextStroke: "1px rgba(255,209,0,0.38)" }}>{stage}</span>
      </span>

      <motion.div
        // Detalle amarillo fino para marcar rigor y jerarquía visual del bloque
        className="mb-4 h-px w-14 bg-[#ffd100]"
        animate={{ opacity: [0.45, 0.9, 0.45] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      />

      <h3 className="relative z-10 text-lg font-black uppercase leading-tight tracking-[-0.01em] text-white sm:text-xl">
        {title}
      </h3>
      <p className="relative z-10 mt-3 max-w-[34ch] text-sm leading-relaxed text-[#d7d7d7] sm:text-[0.95rem]">
        {description}
      </p>
    </motion.article>
  );
}