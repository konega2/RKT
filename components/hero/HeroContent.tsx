"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  accentLineVariants,
  buttonEntryVariants,
  dominantYearVariants,
  subtitleVariants,
  titleContainerVariants,
  titleWordVariants
} from "./heroVariants";

const words = "RKT – Rental Karting Trophy".split(" ");

export default function HeroContent() {
  return (
    <div className="relative z-20 mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-5 py-12 sm:px-8 md:px-12 lg:px-14">
      <motion.span
        // Año dominante en capa propia, ligeramente detrás del bloque principal
        variants={dominantYearVariants}
        initial="hidden"
        animate="show"
        className="pointer-events-none absolute right-3 top-[26%] z-10 text-[5.2rem] font-black leading-none tracking-[-0.04em] text-[#ffe070]/80 drop-shadow-[0_12px_26px_rgba(0,0,0,0.8)] sm:text-[6.6rem] md:right-4 md:top-[24%] md:text-[8.2rem] lg:right-[-2%] lg:top-[22%] lg:text-[10.4rem]"
        style={{ WebkitTextStroke: "1px rgba(255,209,0,0.5)" }}
      >
        2026
      </motion.span>

      <motion.div
        className="relative z-20 max-w-5xl md:ml-0 md:max-w-4xl lg:translate-x-[-2.5%]"
        variants={titleContainerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h1 className="text-balance text-[2.15rem] font-black uppercase leading-[0.92] tracking-[-0.04em] text-white drop-shadow-[0_10px_14px_rgba(0,0,0,0.95)] sm:text-5xl md:text-left md:text-6xl lg:text-7xl">
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              variants={titleWordVariants}
              className="mr-[0.32em] inline-block"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          className="mt-4 flex justify-center md:justify-start"
          variants={accentLineVariants}
        >
          <motion.span
            className="block h-[2px] w-[180px] origin-left bg-[#ffd100] sm:w-[230px] md:w-[280px]"
            animate={{
              opacity: [0.45, 0.85, 0.45],
              boxShadow: [
                "0 0 0px rgba(255,209,0,0)",
                "0 0 10px rgba(255,209,0,0.32)",
                "0 0 0px rgba(255,209,0,0)"
              ]
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        <motion.p
          key="hero-subtitle"
          className="relative z-20 mt-7 text-center text-sm font-semibold uppercase tracking-[0.18em] text-[#ffe16f] sm:text-base md:text-left"
          variants={subtitleVariants}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, y: 8, transition: { duration: 0.3, ease: "easeOut" } }}
        >
          <span className="text-white">96 PLAZAS</span>
          <span className="mx-2 text-[#ffd100]">·</span>
          <span>COMUNIDAD VALENCIANA</span>
        </motion.p>
      </AnimatePresence>

      <AnimatePresence>
        <motion.div
          key="hero-cta"
          className="relative z-20 mt-8"
          variants={buttonEntryVariants}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, y: 10, transition: { duration: 0.3, ease: "easeOut" } }}
        >
          <motion.a
            href="#preinscripcion"
            className="inline-flex items-center justify-center rounded-md border border-[#ffe169] bg-[#ffd100] px-6 py-3 text-sm font-black uppercase tracking-[0.1em] text-black shadow-[0_12px_0_rgba(0,0,0,0.55)] sm:px-8 sm:py-3.5 sm:text-base"
            whileHover={{
              scale: 1.05,
              y: -2,
              boxShadow: "0 0 18px rgba(255,209,0,0.35),0 12px 0 rgba(0,0,0,0.55)"
            }}
            whileTap={{ scale: 0.96 }}
            animate={{
              boxShadow: [
                "0 12px 0 rgba(0,0,0,0.55)",
                "0 0 14px rgba(255,209,0,0.26),0 12px 0 rgba(0,0,0,0.55)",
                "0 12px 0 rgba(0,0,0,0.55)"
              ]
            }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          >
            PREINSCRÍBETE AHORA
          </motion.a>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}