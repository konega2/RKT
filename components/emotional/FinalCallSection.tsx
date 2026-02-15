"use client";

import { motion } from "framer-motion";

const points = [
  "Buscas competir en formato real.",
  "Te tomas el karting en serio.",
  "Quieres medirte contra pilotos exigentes."
];

export default function FinalCallSection() {
  return (
    <section className="relative overflow-hidden bg-[#030303] px-5 py-20 sm:px-8 sm:py-24 md:px-12 lg:px-16">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.96),rgba(0,0,0,0.9)_55%,rgba(0,0,0,0.97))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#2a2a2a]" />

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.28 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-5xl text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffd100] sm:text-sm">Posicionamiento</p>
        <h2 className="mt-3 text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl">
          ESTE CAMPEONATO ES PARA TI SI
        </h2>

        <div className="mt-8 space-y-4 sm:space-y-5">
          {points.map((point, index) => (
            <motion.p
              key={point}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl font-semibold leading-tight text-[#efefef] sm:text-2xl md:text-3xl"
            >
              {point}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
