"use client";

import { motion } from "framer-motion";
import { pricingCardVariants } from "./pricingVariants";

export default function PricingCard() {
  return (
    <motion.article
      variants={pricingCardVariants}
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      whileHover={{ y: -4, boxShadow: "0 20px 36px rgba(0,0,0,0.72),0 0 10px rgba(255,209,0,0.12)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative w-full overflow-hidden rounded-md border border-[#ffd1003d] bg-[#0e0e0e] px-7 py-9 shadow-[0_14px_28px_rgba(0,0,0,0.64)] sm:px-9 sm:py-11"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(0,0,0,0)_42%,rgba(0,0,0,0.44)_100%)]" />
      <div className="pointer-events-none absolute inset-[3px] rounded-[5px] border border-[#ffffff10]" />
      <motion.div
        className="absolute left-0 top-0 h-px w-full origin-left bg-[#ffd100]"
        initial={{ scaleX: 0, opacity: 0.6 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="relative z-10">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#ffd100]/90 sm:text-xs">
          Inversión Oficial
        </p>

        <p className="mt-3 text-[4rem] font-black leading-none tracking-[-0.04em] text-white sm:text-[4.6rem]">225€</p>

        <div className="mt-7 rounded-md border border-[#ffffff1a] bg-[#090909] px-4 py-4">
          <div className="flex items-center justify-between text-sm font-semibold uppercase tracking-[0.09em] text-[#e7e7e7] sm:text-[0.95rem]">
            <span className="text-[#ffd100]">125€</span>
            <span>Preinscripción</span>
          </div>

          <div className="my-3 h-px w-full bg-[#ffffff1f]" />

          <div className="flex items-center justify-between text-sm font-semibold uppercase tracking-[0.09em] text-[#e7e7e7] sm:text-[0.95rem]">
            <span className="text-[#ffd100]">100€</span>
            <span>Día del evento</span>
          </div>
        </div>

        <p className="mt-5 border-t border-[#ffffff1f] pt-4 text-xs leading-relaxed text-[#cfcfcf] sm:text-sm">
          Preinscripción para confirmar plaza oficial. El pago restante se formaliza en recepción el día del evento.
        </p>
      </div>
    </motion.article>
  );
}
