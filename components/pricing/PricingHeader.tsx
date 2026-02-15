"use client";

import { motion } from "framer-motion";
import SlotsProgressBar from "./SlotsProgressBar";
import {
  pricingTitleContainerVariants,
  pricingTitleWordVariants
} from "./pricingVariants";

const titleWords = "96 PLAZAS. NI UNA MÁS.".split(" ");

export default function PricingHeader() {
  return (
    <header className="mx-auto max-w-4xl text-center">
      <motion.p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ffd100] sm:text-sm">
        INSCRIPCIÓN OFICIAL 2026
      </motion.p>

      <motion.h2
        variants={pricingTitleContainerVariants}
        className="mt-3 text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl"
      >
        {titleWords.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            variants={pricingTitleWordVariants}
            className="mr-[0.28em] inline-block"
          >
            {word}
          </motion.span>
        ))}
      </motion.h2>

      <motion.p className="mt-4 text-sm leading-relaxed text-[#d6d6d6] sm:text-lg">
        Cuando se completa la parrilla, se cierra el acceso.
      </motion.p>

      <SlotsProgressBar />

      <motion.p className="mt-3 text-xs font-medium uppercase tracking-[0.08em] text-[#c6c6c6] sm:text-sm">
        Plazas limitadas por reglamento. No hay ampliaciones.
      </motion.p>
    </header>
  );
}
