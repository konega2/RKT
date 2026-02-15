"use client";

import { motion } from "framer-motion";
import { pricingCardVariants } from "./pricingVariants";

export default function PricingCard() {
  return (
    <motion.article
      variants={pricingCardVariants}
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      className="relative mx-auto w-full max-w-xl overflow-hidden rounded-md border border-[#ffd100cc] bg-[#060606] px-6 py-8 text-center shadow-[0_22px_0_rgba(0,0,0,0.7),0_24px_44px_rgba(0,0,0,0.75)] sm:px-8 sm:py-11"
    >
      <motion.div
        // Línea institucional de tensión que recorre el bloque al entrar en viewport
        className="absolute left-0 top-0 h-px w-full origin-left bg-[#ffd100]"
        initial={{ scaleX: 0, opacity: 0.5 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="mx-auto mb-6 max-w-md rounded-md border border-[#ffffff1e] bg-[#0a0a0a] px-4 py-3">
        <div className="flex items-center justify-between text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#d0d0d0] sm:text-xs">
          <span>Disponibilidad Oficial</span>
          <span className="text-[#ffd100]">96 plazas disponibles · 41 ya reservadas</span>
        </div>
        <div className="mt-2 h-[3px] w-full bg-[#ffffff1f]">
          <div className="h-[3px] w-[43%] bg-[#ffd100]" />
        </div>
      </div>

      <p className="text-[4.2rem] font-black leading-none tracking-[-0.04em] text-white sm:text-7xl">225€</p>

      <div className="mx-auto mt-7 max-w-sm space-y-2 border-t border-[#ffffff1f] pt-5 text-sm font-semibold uppercase tracking-[0.08em] text-[#ebebeb] sm:text-base">
        <p>
          <span className="text-[#ffd100]">125€</span> PREINSCRIPCIÓN
        </p>
        <p>
          <span className="text-[#ffd100]">100€</span> PAGO FINAL EN RECEPCIÓN
        </p>
      </div>

      <p className="mx-auto mt-6 max-w-md text-sm font-semibold leading-relaxed text-[#f1f1f1] sm:text-base">
        Cuando la parrilla se completa, se cierra definitivamente.
      </p>

      <ul className="mx-auto mt-6 max-w-md space-y-2 text-left text-xs leading-relaxed text-[#c0c0c0] sm:text-sm">
        <li>• Pago final en recepción el 3 de julio.</li>
        <li>• El día 4 no se aceptarán pagos.</li>
        <li>• Si llegas el día del evento, contacta previamente.</li>
        <li>• Sin excepciones.</li>
      </ul>
    </motion.article>
  );
}
