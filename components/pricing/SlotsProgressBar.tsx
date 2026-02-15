"use client";

import { motion } from "framer-motion";
import { slotsProgressBarVariants } from "./pricingVariants";

export default function SlotsProgressBar() {
  return (
    <div className="mx-auto mt-6 w-full max-w-2xl">
      <div className="h-px w-full bg-[#ffffff1f]">
        <motion.div
          // Dibujo de barra izquierda -> derecha para expresar cierre progresivo de parrilla
          variants={slotsProgressBarVariants}
          className="h-px w-full origin-left bg-[#ffd100]"
        />
      </div>
    </div>
  );
}
