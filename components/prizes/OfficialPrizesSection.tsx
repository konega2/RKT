"use client";

import { motion } from "framer-motion";
import { prizeItemVariants, prizesSectionVariants } from "./prizesVariants";

const prizeGroups = [
  {
    title: "Podios Heats y Semi Final",
    description: "Reconocimiento oficial por rendimiento en fases clasificatorias y semifinales."
  },
  {
    title: "Trofeos en todas las Finales",
    description: "Entrega protocolaria en cada final con estándar institucional de campeonato."
  },
  {
    title: "Top 5 Clasificación General",
    description: "Premiación a regularidad y consistencia competitiva durante todo el evento."
  },
  {
    title: "Categorías Master / Junior / Femenina",
    description: "Reconocimientos específicos por categoría para reforzar mérito y equidad deportiva."
  }
];

export default function OfficialPrizesSection() {
  const featuredPrize = prizeGroups[0];
  const secondaryPrizes = prizeGroups.slice(1);

  return (
    <motion.section
      className="rkt-carbon-surface relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-16"
      variants={prizesSectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.22 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.94),rgba(0,0,0,0.78)_45%,rgba(0,0,0,0.95))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#2a2a2a]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[#2a2a2a]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_4%,rgba(255,209,0,0.07),transparent_46%),radial-gradient(ellipse_at_88%_14%,rgba(255,255,255,0.03),transparent_52%)]" />

      <div className="relative mx-auto max-w-6xl">
        <header className="mb-10 max-w-4xl sm:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffd100] sm:text-sm">
            Distinciones Oficiales
          </p>
          <h2 className="mt-3 text-3xl font-black uppercase leading-[0.94] tracking-[-0.03em] text-white sm:text-4xl md:text-5xl">
            PREMIOS OFICIALES DEL CAMPEONATO
          </h2>
          <p className="mt-4 max-w-[58ch] text-sm leading-relaxed text-[#d0d0d0] sm:text-base">
            Reconocimiento institucional por mérito competitivo, regularidad y rendimiento en todas las fases.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:grid-rows-[minmax(0,1fr)] lg:gap-7">
          <motion.article
            key={featuredPrize.title}
            custom={0}
            variants={prizeItemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            whileHover={{
              y: -4,
              borderColor: "rgba(255,209,0,0.58)",
              boxShadow: "0 22px 34px rgba(0,0,0,0.8),0 0 14px rgba(255,209,0,0.2)"
            }}
            transition={{ type: "spring", stiffness: 250, damping: 22 }}
            className="group relative overflow-hidden rounded-md border border-[#ffffff26] bg-[#080808f0] px-6 py-7 shadow-[0_16px_28px_rgba(0,0,0,0.7)] sm:px-7 sm:py-8 lg:col-span-7 lg:min-h-[380px]"
          >
            <div className="pointer-events-none absolute inset-0 opacity-55 bg-[radial-gradient(120%_90%_at_12%_6%,rgba(255,209,0,0.12),transparent_52%),linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0)_40%,rgba(0,0,0,0.5)_100%),repeating-linear-gradient(126deg,rgba(255,255,255,0.02)_0px,rgba(255,255,255,0.02)_1px,transparent_1px,transparent_12px)]" />
            <div className="pointer-events-none absolute inset-[3px] rounded-[5px] border border-[#ffffff14]" />
            <motion.span
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-28 bg-[#ffd100]"
              animate={{ x: [0, 88, 0], opacity: [0.38, 0.9, 0.38] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-[2px] bg-[linear-gradient(180deg,rgba(255,209,0,0.06),rgba(255,209,0,0.92)_24%,rgba(255,209,0,0.1)_76%,rgba(255,209,0,0.04))]"
              animate={{ opacity: [0.45, 0.92, 0.45] }}
              transition={{ duration: 2.9, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#ffd100]/90 sm:text-xs">
                  Distinción de Liderazgo
                </p>
                <h3 className="mt-3 max-w-[24ch] text-2xl font-black uppercase leading-tight tracking-[-0.02em] text-white sm:text-[1.8rem]">
                  {featuredPrize.title}
                </h3>
                <div className="mt-4 h-px w-20 bg-[#ffd100]" />
                <p className="mt-5 max-w-[52ch] text-sm leading-relaxed text-[#d9d9d9] sm:text-[1rem]">
                  {featuredPrize.description}
                </p>
              </div>

              <div className="mt-7 flex items-end justify-between gap-5">
                <div className="inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#cfcfcf]">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#ffd100]" fill="none" aria-hidden>
                    <path d="M4 12h16M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Reconocimiento principal
                </div>

                <div className="flex items-end gap-1.5">
                  <span className="h-5 w-2 rounded-t-sm bg-[#ffd100]/35" />
                  <span className="h-8 w-2 rounded-t-sm bg-[#ffd100]/7" />
                  <span className="h-11 w-2 rounded-t-sm bg-[#ffd100]/58" />
                  <span className="h-7 w-2 rounded-t-sm bg-[#ffd100]/42" />
                </div>
              </div>
            </div>
          </motion.article>

          <div className="grid grid-cols-1 gap-5 lg:col-span-5 lg:grid-rows-3 lg:gap-4">
            {secondaryPrizes.map((item, index) => (
              <motion.article
                key={item.title}
                custom={index + 1}
                variants={prizeItemVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                whileHover={{
                  y: -3,
                  borderColor: "rgba(255,209,0,0.46)",
                  boxShadow: "0 16px 28px rgba(0,0,0,0.76),0 0 9px rgba(255,209,0,0.15)"
                }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="group relative overflow-hidden rounded-md border border-[#ffffff21] bg-[#090909f0] px-5 py-5 shadow-[0_12px_22px_rgba(0,0,0,0.64)]"
              >
                <div className="pointer-events-none absolute inset-0 opacity-50 bg-[linear-gradient(180deg,rgba(255,255,255,0.045)_0%,rgba(0,0,0,0)_42%,rgba(0,0,0,0.42)_100%)]" />
                <div className="pointer-events-none absolute inset-[2px] rounded-[5px] border border-[#ffffff10]" />
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-20 bg-[#ffd100]"
                  animate={{ x: [0, 42, 0], opacity: [0.28, 0.8, 0.28] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: index * 0.18 }}
                />

                <div className="relative z-10 mb-3 h-px w-12 bg-[#ffd100]" />
                <h3 className="text-base font-black uppercase leading-tight tracking-[-0.01em] text-white sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#d4d4d4]">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
