"use client";

import { motion } from "framer-motion";
import {
  confirmationLineVariants,
  confirmationScreenVariants,
  ctaBounceVariants,
  fieldRevealVariants
} from "./preregistrationVariants";

export default function ConfirmationScreen() {
  return (
    <motion.div
      variants={confirmationScreenVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="relative mx-auto w-full max-w-3xl rounded-md border border-[#ffffff22] bg-[#070707]/90 px-6 py-10 text-center shadow-[0_20px_40px_rgba(0,0,0,0.7)] sm:px-10"
    >
      <motion.div
        // Efecto de luz sutil para reforzar la sensación de paso oficial completado
        className="pointer-events-none absolute inset-y-0 left-0 w-24"
        animate={{ opacity: [0.08, 0.18, 0.08], x: ["-6%", "4%", "-6%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-y-0 left-0 w-8 bg-[linear-gradient(90deg,rgba(255,209,0,0.35),rgba(255,209,0,0))]" />
      </motion.div>

      <motion.h3
        custom={0}
        variants={fieldRevealVariants}
        className="text-3xl font-black uppercase leading-[0.9] tracking-[-0.03em] text-white sm:text-4xl"
      >
        PREINSCRIPCIÓN EXTERNA OBLIGATORIA
      </motion.h3>

      <motion.p
        custom={1}
        variants={fieldRevealVariants}
        className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#dddddd] sm:text-base"
      >
        Para aparecer en el panel de gestión, completa la inscripción desde la página oficial del Kartódromo Lucas Guerrero.
      </motion.p>

      <motion.div variants={confirmationLineVariants} className="mx-auto mt-6 h-px w-full max-w-sm origin-left bg-[#ffd100]" />

      <motion.div custom={2} variants={ctaBounceVariants} className="mt-8">
        <motion.a
          href="https://kartodromovalencia.com/pre-inscripcion/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-full max-w-lg items-center justify-center rounded-md bg-[#ffd100] px-6 py-4 text-sm font-black uppercase tracking-[0.08em] text-black shadow-[0_14px_0_rgba(0,0,0,0.6)] sm:text-base"
          whileHover={{ scale: 1.05, boxShadow: "0 18px 0 rgba(0,0,0,0.6)" }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          IR A LA PREINSCRIPCIÓN OFICIAL
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
