"use client";

import { motion } from "framer-motion";
import { pricingCardVariants } from "./pricingVariants";

export default function PricingCard() {
  return (
    <motion.article
      variants={pricingCardVariants}
      className="mx-auto w-full max-w-xl rounded-md border border-[#ffd100cc] bg-[#060606] px-6 py-8 text-center shadow-[0_22px_0_rgba(0,0,0,0.7),0_24px_44px_rgba(0,0,0,0.75)] sm:px-8 sm:py-11"
    >
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
        Cuando la parrilla se cierra, no existe lista de espera.
      </p>

      <p className="mx-auto mt-6 max-w-md text-xs leading-relaxed text-[#bbbbbb] sm:text-sm">
        El pago final en efectivo se realiza el 3 de julio. El día 4 no se aceptan pagos.
      </p>
    </motion.article>
  );
}
