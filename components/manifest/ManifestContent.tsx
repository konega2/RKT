"use client";

import { motion } from "framer-motion";
import {
  manifestLineContainerVariants,
  manifestLineVariants,
  manifestTitleContainerVariants,
  manifestTitleVariants,
  manifestTitleWordVariants
} from "./manifestVariants";

const lines = ["Es tensión antes del semáforo.", "Es estrategia.", "Es competir de verdad."];
const titleWords = "NO ES SOLO UNA CARRERA.".split(" ");

export default function ManifestContent() {
  return (
    <div className="relative z-20 max-w-4xl">
      <motion.div variants={manifestTitleVariants}>
        <motion.h2
          variants={manifestTitleContainerVariants}
          className="text-balance text-[2.4rem] font-black uppercase leading-[0.88] tracking-[-0.045em] text-white drop-shadow-[0_10px_18px_rgba(0,0,0,0.92)] sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {titleWords.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              variants={manifestTitleWordVariants}
              className="mr-[0.28em] inline-block"
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>
      </motion.div>

      <motion.div variants={manifestLineContainerVariants} className="mt-8 space-y-2 sm:space-y-3 md:mt-10">
        {lines.map((line) => (
          <motion.p
            key={line}
            variants={manifestLineVariants}
            className="text-base font-medium leading-relaxed text-[#e6e6e6] sm:text-xl md:text-2xl"
          >
            {line}
          </motion.p>
        ))}
      </motion.div>
    </div>
  );
}