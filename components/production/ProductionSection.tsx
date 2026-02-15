"use client";

import { motion } from "framer-motion";
import ProductionCard from "./ProductionCard";
import { sectionRevealVariants } from "./productionVariants";

const productionPillars = [
  {
    title: "Retransmisión en directo – Mundokart Podcast",
    description:
      "Cobertura oficial en directo con narrativa de carrera y lectura estratégica del campeonato."
  },
  {
    title: "Balance de flota por Jon del Valle",
    description:
      "Control técnico de flota para garantizar equilibrio competitivo y consistencia mecánica."
  },
  {
    title: "Comisarios experimentados",
    description:
      "Dirección de pista con criterio reglamentario para sostener orden y justicia competitiva."
  },
  {
    title: "Ceremonia de podium en todas las carreras",
    description:
      "Protocolo oficial de podium en cada manga para reforzar mérito, prestigio y cultura de campeonato."
  },
  {
    title: "Comentaristas y entrevistas",
    description:
      "Análisis post-carrera y entrevistas oficiales con pilotos protagonistas y equipo técnico."
  },
  {
    title: "Fotógrafos e invitados especiales",
    description:
      "Cobertura visual e invitados institucionales para documentar el evento con estándar profesional."
  }
];

const desktopOffsets = [
  "md:translate-y-0",
  "md:translate-y-4",
  "md:-translate-y-1",
  "md:translate-y-2",
  "md:-translate-y-3",
  "md:translate-y-1"
];

export default function ProductionSection() {
  return (
    <motion.section
      className="relative overflow-hidden bg-[#040404] px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-16"
      variants={sectionRevealVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.78)_46%,rgba(0,0,0,0.95)_100%)]" />

      <div className="relative mx-auto max-w-6xl">
        <header className="mb-10 max-w-3xl sm:mb-12 md:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffd100] sm:text-sm">
            Producción del Evento
          </p>
          <h2 className="mt-3 text-3xl font-black uppercase leading-[0.95] tracking-[-0.03em] text-white sm:text-4xl md:text-5xl">
            Estructura profesional en cada carrera
          </h2>
          <p className="mt-4 max-w-[56ch] text-sm leading-relaxed text-[#cfcfcf] sm:text-base">
            Operativa, protocolo y comunicación estructurados para un campeonato serio, estable y verificable.
          </p>
        </header>

        <motion.div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7 lg:gap-8">
          {productionPillars.map((pillar, index) => (
            <ProductionCard
              key={pillar.title}
              index={index}
              title={pillar.title}
              description={pillar.description}
              offset={desktopOffsets[index]}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}