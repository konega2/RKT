"use client";

import { useRef } from "react";
import TimelineItem from "./TimelineItem";
import TimelineProgressLine from "./TimelineProgressLine";

const stages = [
  "4 Heats clasificatorios con Hot Lap individual.",
  "Semi Final con formato Long Lap estratégico.",
  "Gran Final y finales de categoría con doble Long Lap."
];

export default function CompetitionTimeline() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050505] px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:90px_90px] opacity-20" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,209,0,0.05),rgba(0,0,0,0.7)_38%,rgba(0,0,0,0.92))]" />

      <div className="relative mx-auto max-w-6xl">
        <header className="mb-12 max-w-3xl md:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffd100] sm:text-sm">
            Progresión del Campeonato
          </p>
          <h2 className="mt-3 text-3xl font-black uppercase leading-[0.95] tracking-[-0.03em] text-white sm:text-4xl md:text-5xl">
            Cada fase eleva la tensión en pista
          </h2>
          <p className="mt-4 max-w-[56ch] text-sm leading-relaxed text-[#cfcfcf] sm:text-base">
            Estructura competitiva diseñada para premiar constancia, ritmo y gestión bajo presión real.
          </p>
        </header>

        <div className="relative pl-7 md:pl-0">
          <TimelineProgressLine targetRef={sectionRef} />

          <div className="space-y-14 sm:space-y-16 md:space-y-20">
            {stages.map((title, index) => (
              <TimelineItem
                key={title}
                index={index}
                title={title}
                align={index % 2 === 0 ? "left" : "right"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}