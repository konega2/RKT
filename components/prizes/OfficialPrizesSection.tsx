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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {prizeGroups.map((item, index) => (
            <motion.article
              key={item.title}
              custom={index}
              variants={prizeItemVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              whileHover={{
                y: -4,
                borderColor: "rgba(255,209,0,0.48)",
                boxShadow: "0 18px 30px rgba(0,0,0,0.78),0 0 10px rgba(255,209,0,0.16)"
              }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="group relative overflow-hidden rounded-md border border-[#ffffff22] bg-[#080808f0] px-5 py-6 shadow-[0_12px_24px_rgba(0,0,0,0.66)] sm:px-6 sm:py-7"
            >
              <div className="pointer-events-none absolute inset-0 opacity-45 bg-[linear-gradient(180deg,rgba(255,255,255,0.045)_0%,rgba(0,0,0,0)_42%,rgba(0,0,0,0.42)_100%)]" />
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 w-[2px] bg-[linear-gradient(180deg,rgba(255,209,0,0.05),rgba(255,209,0,0.85)_26%,rgba(255,209,0,0.08)_74%,rgba(255,209,0,0.04))]"
                animate={{ opacity: [0.45, 0.9, 0.45] }}
                transition={{ duration: 2.7, repeat: Infinity, ease: "easeInOut", delay: index * 0.12 }}
              />
              <motion.span
                aria-hidden
                className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-24 bg-[#ffd100]"
                animate={{ x: [0, 56, 0], opacity: [0.3, 0.82, 0.3] }}
                transition={{ duration: 3.3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
              />

              <div className="relative z-10 mb-3 h-px w-14 bg-[#ffd100]" />
              <h3 className="text-lg font-black uppercase leading-tight tracking-[-0.01em] text-white sm:text-xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#d4d4d4] sm:text-base">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
