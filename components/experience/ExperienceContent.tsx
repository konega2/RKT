"use client";

import { motion } from "framer-motion";
import {
  phraseVariants,
  subtitleVariants,
  titleContainerVariants,
  titleWordVariants
} from "./experienceVariants";

const titleWords = "NO ES SOLO UNA CARRERA".split(" ");

const phrases = [
  "Parrilla con briefing previo y concentración total.",
  "Ritmo competitivo real en cada heat.",
  "Celebración oficial en cada final."
];

export default function ExperienceContent() {
  return (
    <div className="order-2 md:order-1">
      <motion.h2
        variants={titleContainerVariants}
        className="text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl"
      >
        {titleWords.map((word, index) => (
          <motion.span key={`${word}-${index}`} variants={titleWordVariants} className="mr-[0.28em] inline-block">
            {word}
          </motion.span>
        ))}
      </motion.h2>

      <motion.p
        variants={subtitleVariants}
        className="mt-5 max-w-[44ch] text-base leading-relaxed text-[#f0f0f0] sm:text-lg"
      >
        Es tensión en cada curva. Es estrategia. Es respeto. Es competir de verdad.
      </motion.p>

      <motion.p
        variants={subtitleVariants}
        className="mt-4 max-w-[50ch] text-sm leading-relaxed text-[#d2d2d2] sm:text-base"
      >
        Desde la parrilla hasta el podium, cada fase del RKT está diseñada para que vivas una experiencia real de campeonato.
      </motion.p>

      <div className="mt-8 space-y-3">
        {phrases.map((phrase, index) => (
          <motion.p
            key={phrase}
            custom={index}
            variants={phraseVariants}
            className="border-l border-[#ffd10066] pl-4 text-sm font-medium leading-relaxed text-[#e6e6e6] sm:text-base"
          >
            {phrase}
          </motion.p>
        ))}
      </div>
    </div>
  );
}