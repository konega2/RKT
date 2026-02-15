"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { visualRevealVariants } from "./experienceVariants";

export default function ExperienceVisual() {
  const visualRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ["start end", "end start"]
  });

  // Parallax leve en capa de luz para sensación de profundidad sin exceso
  const lightY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  // Parallax mínimo en reflejos del asfalto
  const reflectionY = useTransform(scrollYProgress, [0, 1], [10, -12]);

  return (
    <motion.div
      ref={visualRef}
      variants={visualRevealVariants}
      className="order-1 md:order-2"
    >
      <motion.div
        className="relative h-[20rem] overflow-hidden rounded-md border border-[#ffffff22] bg-[#070707] shadow-[0_16px_34px_rgba(0,0,0,0.72)] sm:h-[23rem] md:h-[26rem]"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 240, damping: 22 }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.75)_50%,rgba(0,0,0,0.9))]" />

        <motion.div
          aria-hidden
          style={{ y: lightY }}
          className="absolute -left-8 top-[14%] h-24 w-[70%] bg-[linear-gradient(90deg,rgba(255,209,0,0.3),rgba(255,209,0,0))] blur-[1px]"
        />
        <motion.div
          aria-hidden
          style={{ y: lightY }}
          className="absolute -right-8 top-[30%] h-20 w-[58%] bg-[linear-gradient(270deg,rgba(255,209,0,0.22),rgba(255,209,0,0))]"
        />

        <motion.div
          aria-hidden
          style={{ y: reflectionY }}
          className="absolute bottom-0 left-0 right-0 h-[48%] bg-[repeating-linear-gradient(-76deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_13px)]"
        />

        <div className="absolute inset-x-8 top-[38%] h-px bg-[#ffffff3b]" />

        <div className="absolute bottom-5 left-6 right-6 text-sm font-semibold uppercase tracking-[0.15em] text-[#ffe38d] sm:text-base">
          Silencio en parrilla · tensión previa a la salida
        </div>
      </motion.div>
    </motion.div>
  );
}