"use client";

import { motion } from "framer-motion";
import SlotsProgressBar from "./SlotsProgressBar";
import {
  pricingTitleContainerVariants,
  pricingTitleWordVariants
} from "./pricingVariants";

const titleWords = "96 PLAZAS. NI UNA MÁS.".split(" ");
const includes = [
  "Bloqueo oficial de plaza en parrilla",
  "Formato competitivo real del campeonato",
  "Protocolo, cobertura y estructura profesional"
];

export default function PricingHeader() {
  return (
    <header className="max-w-2xl text-left">
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

      <motion.p className="mt-5 max-w-[52ch] text-sm leading-relaxed text-[#d6d6d6] sm:text-lg">
        La inscripción confirma tu acceso a una parrilla limitada y regulada por estándar de campeonato.
      </motion.p>

      <ul className="mt-6 space-y-3 text-sm leading-relaxed text-[#dadada] sm:text-[0.98rem]">
        {includes.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-[#ffd100]" fill="none" aria-hidden>
              <path d="m5 12 4 4 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <motion.p className="mt-6 text-xs font-medium uppercase tracking-[0.08em] text-[#d0d0d0] sm:text-sm">
        Cuando se completa la parrilla, se cierra definitivamente.
      </motion.p>

      <SlotsProgressBar />

      <motion.p className="mt-3 text-xs font-medium uppercase tracking-[0.08em] text-[#c6c6c6] sm:text-sm">
        Plazas limitadas a 96 pilotos.
      </motion.p>
    </header>
  );
}
