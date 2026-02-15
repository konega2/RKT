"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ConfirmationScreen from "./ConfirmationScreen";
import PreRegistrationForm from "./PreRegistrationForm";
import { preRegistrationSectionVariants } from "./preregistrationVariants";

export default function PreRegistrationSection() {
  const [isConfirmedStep, setIsConfirmedStep] = useState(false);

  return (
    <motion.section
      id="reservar-plaza"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#040404] px-5 py-20 sm:px-8 sm:py-24 md:px-12 lg:px-16"
      variants={preRegistrationSectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <span id="preinscripcion" className="absolute -top-24" aria-hidden />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[#050505]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(-78deg,rgba(255,255,255,0.028)_0px,rgba(255,255,255,0.028)_1px,transparent_1px,transparent_13px)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.86),rgba(0,0,0,0.92))]" />
        <motion.div
          className="absolute top-0 h-px w-full bg-[#ffd10033]"
          animate={{ opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          // Luz lateral amarilla suave para coherencia con el universo motorsport
          className="absolute inset-y-0 left-0 w-28"
          animate={{ opacity: [0.08, 0.16, 0.08], x: ["-8%", "5%", "-8%"] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-y-0 left-0 w-10 bg-[linear-gradient(90deg,rgba(255,209,0,0.3),rgba(255,209,0,0))]" />
        </motion.div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        <header className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffd100] sm:text-sm">
            PREINSCRIPCIÓN OFICIAL
          </p>
          <h2 className="mt-3 text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl">
            ASEGURA TU POSICIÓN EN PARRILLA
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#d6d6d6] sm:text-base">
            Completa los siguientes datos para reservar provisionalmente tu plaza.
          </p>
          <p className="mt-3 text-xs font-medium text-[#cfcfcf] sm:text-sm">
            <span className="text-[#ffd100]">*</span> Campos obligatorios
          </p>
        </header>

        <AnimatePresence mode="wait">
          {isConfirmedStep ? (
            <ConfirmationScreen key="confirmation" />
          ) : (
            <PreRegistrationForm key="form" onSuccess={() => setIsConfirmedStep(true)} />
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
