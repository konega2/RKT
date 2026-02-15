"use client";

import { motion } from "framer-motion";
import { pricingCardVariants } from "./pricingVariants";

export default function PricingCard() {
  return (
    <motion.article
      variants={pricingCardVariants}
      className="mx-auto w-full max-w-xl rounded-md border border-[#ffd100cc] bg-[#060606] px-6 py-8 text-center shadow-[0_22px_0_rgba(0,0,0,0.7),0_24px_44px_rgba(0,0,0,0.75)] sm:px-8 sm:py-11"
    >
      <div className="mx-auto mb-6 max-w-md rounded-md border border-[#ffffff1e] bg-[#0a0a0a] px-4 py-3">
        <div className="flex items-center justify-between text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#d0d0d0] sm:text-xs">
          <span>Parrilla Total</span>
          <span className="text-[#ffd100]">96 / 96</span>
        </div>
        <div className="mt-2 h-[3px] w-full bg-[#ffffff1f]">
          <div className="h-[3px] w-full bg-[#ffd100]" />
        </div>
      </div>

      <p className="text-6xl font-black leading-none tracking-[-0.035em] text-white sm:text-7xl">225€</p>

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
        <li>• El día 4 no se aceptan pagos.</li>
        <li>• Si llegas el día del evento, contacta previamente.</li>
      </ul>
    </motion.article>
  );
}
