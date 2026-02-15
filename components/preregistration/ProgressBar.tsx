"use client";

import { motion } from "framer-motion";

type ProgressBarProps = {
  progress: number;
};

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[#d4d4d4] sm:text-xs">
        <span>Estado de Preinscripción</span>
        <span className="text-[#ffd100]">{Math.round(progress)}%</span>
      </div>
      <div className="h-[5px] w-full overflow-hidden rounded-sm bg-[#ffffff1f]">
        <motion.div
          // Barra de progreso ligada a campos completados en tiempo real
          className="h-[5px] origin-left bg-[#ffd100] shadow-[0_0_10px_rgba(255,209,0,0.34)]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
