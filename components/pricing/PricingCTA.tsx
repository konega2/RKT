"use client";

import { AnimatePresence, motion } from "framer-motion";
import { pricingCtaVariants } from "./pricingVariants";

type PricingCTAProps = {
  showSticky: boolean;
};

export default function PricingCTA({ showSticky }: PricingCTAProps) {
  return (
    <>
      <motion.div variants={pricingCtaVariants} className="mt-9 flex flex-col items-start gap-4 pb-24 md:pb-0">
        <motion.a
          href="#reservar-plaza"
          className="inline-flex w-full max-w-[440px] items-center justify-center rounded-md bg-[#ffd100] px-8 py-5 text-center text-sm font-black uppercase tracking-[0.1em] text-black shadow-[0_14px_0_rgba(0,0,0,0.62)] sm:text-base"
          whileHover={{
            y: -2,
            scale: 1.02,
            boxShadow: "0 16px 0 rgba(0,0,0,0.62),0 0 12px rgba(255,209,0,0.22)",
            filter: "brightness(1.03)"
          }}
          whileTap={{ scale: 0.99 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          RESERVAR PLAZA EN PARRILLA
        </motion.a>

        <a href="tel:+34640112356" className="text-sm font-semibold tracking-[0.06em] text-[#f1f1f1] sm:text-base">
          +34 640 112 356
        </a>
      </motion.div>

      <AnimatePresence>
        {showSticky && (
          <motion.div
            variants={pricingCtaVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: 18, transition: { duration: 0.22, ease: "easeOut" } }}
            className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#ffffff1a] bg-[#050505f2] p-3 backdrop-blur-sm md:hidden"
          >
            <motion.a
              href="#reservar-plaza"
              className="inline-flex w-full items-center justify-center rounded-md bg-[#ffd100] px-4 py-4 text-center text-xs font-black uppercase tracking-[0.08em] text-black shadow-[0_10px_0_rgba(0,0,0,0.58)]"
              whileTap={{ scale: 0.98 }}
            >
              RESERVAR PLAZA EN PARRILLA
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
