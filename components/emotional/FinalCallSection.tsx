"use client";

import { motion } from "framer-motion";

const points = [
  {
    title: "Mentalidad de piloto",
    text: "Compites para progresar, no para dar una vuelta suelta sin objetivo."
  },
  {
    title: "Compromiso con el reglamento",
    text: "Valoras orden, criterio deportivo y decisiones técnicas consistentes."
  },
  {
    title: "Ambición competitiva real",
    text: "Quieres medirte con parrillas exigentes y sostener rendimiento todo el campeonato."
  }
];

export default function FinalCallSection() {
  return (
    <section className="rkt-carbon-surface relative overflow-hidden px-5 py-20 sm:px-8 sm:py-24 md:px-12 lg:px-16">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.95),rgba(0,0,0,0.82)_55%,rgba(0,0,0,0.97))]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_84%_16%,rgba(255,209,0,0.08),transparent_46%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#2a2a2a]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[#2a2a2a]" />

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.28 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-6xl"
      >
        <div className="grid gap-8 rounded-md border border-[#ffffff1f] bg-[#070707e8] p-6 shadow-[0_16px_36px_rgba(0,0,0,0.68)] sm:p-8 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:gap-10 lg:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffd100] sm:text-sm">Qualifier</p>
            <h2 className="mt-3 text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-5xl">
              ESTE CAMPEONATO ES PARA TI SI
            </h2>
            <p className="mt-5 max-w-[38ch] text-sm leading-relaxed text-[#cecece] sm:text-base">
              Aquí no vienes a participar por inercia: vienes a competir con criterio, constancia y nivel de pista.
            </p>
          </div>

          <div className="space-y-4">
            {points.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-3 rounded-md border border-[#ffffff1a] bg-[#0a0a0a] px-4 py-4 sm:px-5"
              >
                <div className="mt-0.5 shrink-0">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#ffd100]" fill="none" aria-hidden>
                    <path d="m5 12 4 4 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.05em] text-white sm:text-[0.94rem]">{point.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#d8d8d8] sm:text-[0.94rem]">{point.text}</p>
                </div>
              </motion.div>
            ))}

            <div className="pt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#ffd100]/90 sm:text-[0.8rem]">
              Si te reconoces aquí, este es tu sitio en parrilla.
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
