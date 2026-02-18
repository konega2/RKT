"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  confirmationScreenVariants,
  ctaBounceVariants,
  fieldRevealVariants
} from "./preregistrationVariants";

const strategicBullets = [
  "Validación oficial de piloto",
  "Control de plazas limitado a 96 inscritos",
  "Confirmación directa en panel de gestión",
  "Gestión reglamentaria centralizada"
];

const TOTAL_SLOTS = 96;

type SlotsStatsResponse = {
  ok?: boolean;
  available?: number;
};

export default function ConfirmationScreen() {
  const [availableSlots, setAvailableSlots] = useState<number>(TOTAL_SLOTS);

  useEffect(() => {
    let isMounted = true;

    const loadAvailableSlots = async () => {
      try {
        const response = await fetch("/api/preinscripciones/stats", { cache: "no-store" });
        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as SlotsStatsResponse;
        if (!isMounted || !payload.ok || typeof payload.available !== "number") {
          return;
        }

        setAvailableSlots(Math.max(0, Math.min(TOTAL_SLOTS, payload.available)));
      } catch {
        // keep fallback value
      }
    };

    loadAvailableSlots();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <motion.div
      variants={confirmationScreenVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="relative mx-auto w-full max-w-6xl rounded-md border border-[#ffffff22] bg-[#070707]/92 px-6 py-8 shadow-[0_20px_40px_rgba(0,0,0,0.7)] sm:px-8 sm:py-10 lg:px-10"
    >
      <motion.div
        className="pointer-events-none absolute inset-y-0 left-0 w-24"
        animate={{ opacity: [0.08, 0.14, 0.08], x: ["-6%", "4%", "-6%"] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-y-0 left-0 w-8 bg-[linear-gradient(90deg,rgba(255,209,0,0.35),rgba(255,209,0,0))]" />
      </motion.div>

      <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
        <div>
          <motion.p
            custom={0}
            variants={fieldRevealVariants}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ffd100] sm:text-sm"
          >
            INSCRIPCIÓN OFICIAL 2026
          </motion.p>

          <motion.h3
            custom={1}
            variants={fieldRevealVariants}
            className="mt-3 text-4xl font-black uppercase leading-[0.92] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl"
          >
            ASEGURA TU PLAZA EN LA PARRILLA
          </motion.h3>

          <motion.p
            custom={2}
            variants={fieldRevealVariants}
            className="mt-5 max-w-2xl text-sm leading-relaxed text-[#d7d7d7] sm:text-base"
          >
            El acceso al campeonato se gestiona desde el canal oficial del Kartódromo para garantizar igualdad,
            control técnico y validación deportiva.
          </motion.p>

          <motion.ul custom={3} variants={fieldRevealVariants} className="mt-6 grid gap-3">
            {strategicBullets.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-[#e7e7e7] sm:text-[0.95rem]">
                <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-sm border border-[#ffd10066] bg-[#ffd10014]">
                  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-[#ffd100]" fill="none" aria-hidden>
                    <path d="M4.5 10.5l3.2 3.2L15.5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>{item}</span>
              </li>
            ))}
          </motion.ul>

          <motion.p
            custom={4}
            variants={fieldRevealVariants}
            className="mt-5 text-xs font-semibold uppercase tracking-[0.11em] text-[#ffd100cc]"
          >
            Alta demanda: el cupo se bloquea automáticamente al completarse.
          </motion.p>

          <motion.div custom={5} variants={ctaBounceVariants} className="mt-7">
            <motion.a
              href="https://kartodromovalencia.com/pre-inscripcion/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center rounded-md bg-[#ffd100] px-6 py-4 text-sm font-black uppercase tracking-[0.08em] text-black shadow-[0_14px_0_rgba(0,0,0,0.55)] sm:text-base"
              whileHover={{ y: -3, boxShadow: "0 18px 20px rgba(255,209,0,0.2)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              IR A INSCRIPCIÓN OFICIAL
            </motion.a>
            <p className="mt-3 text-xs text-[#bbbbbb] sm:text-sm">
              Serás redirigido al formulario oficial del Kartódromo Lucas Guerrero.
            </p>
          </motion.div>
        </div>

        <motion.aside
          custom={6}
          variants={fieldRevealVariants}
          className="relative flex h-full flex-col items-center justify-center rounded-md border border-[#ffd10033] bg-[linear-gradient(160deg,#0a0a0a_0%,#141414_100%)] p-5 text-center shadow-[0_24px_42px_rgba(0,0,0,0.55)] sm:p-6"
        >
          <span className="absolute right-4 top-4 rounded-full border border-[#ffd10066] bg-[#ffd1001f] px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-[#ffe374]">
            Canal Oficial
          </span>

          <p className="pt-8 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#e1e1e1]">Cupo Reglamento 2026</p>

          <motion.div
            initial={{ scale: 0.95, opacity: 0.85 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-6xl font-black leading-none tracking-[-0.04em] text-[#ffd100] sm:text-7xl"
          >
            {availableSlots}
          </motion.div>

          <p className="mt-2 text-sm font-black uppercase tracking-[0.13em] text-white">PLAZAS DISPONIBLES</p>
          <p className="mt-1 text-xs text-[#c8c8c8]">Cupo limitado por reglamento</p>
        </motion.aside>
      </div>
    </motion.div>
  );
}
