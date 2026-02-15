"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { RefObject } from "react";
import { manifestImageVariants } from "./manifestVariants";

type ManifestBackgroundProps = {
  sectionRef: RefObject<HTMLElement>;
};

export default function ManifestBackground({ sectionRef }: ManifestBackgroundProps) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax sutil de imagen de fondo para reforzar profundidad cinematográfica
  const imageY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  // Parallax mínimo en viñeta para reforzar dramatismo general
  const vignetteY = useTransform(scrollYProgress, [0, 1], [8, -8]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <motion.img
        aria-hidden
        src="/imagen.png"
        alt=""
        variants={manifestImageVariants}
        style={{ y: imageY }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,209,0,0.16),rgba(0,0,0,0)_30%,rgba(0,0,0,0.45)_100%)]" />

      <motion.div
        aria-hidden
        className="absolute inset-y-0 left-0 w-48"
        animate={{ x: ["-6%", "4%", "-6%"], opacity: [0.08, 0.16, 0.08] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-y-0 left-0 w-14 bg-[linear-gradient(90deg,rgba(255,209,0,0.34),rgba(255,209,0,0))]" />
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute inset-y-0 right-0 w-40"
        animate={{ x: ["6%", "-3%", "6%"], opacity: [0.05, 0.11, 0.05] }}
        transition={{ duration: 14.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      >
        <div className="absolute inset-y-0 right-0 w-10 bg-[linear-gradient(270deg,rgba(255,209,0,0.28),rgba(255,209,0,0))]" />
      </motion.div>

      <motion.div
        aria-hidden
        style={{ y: vignetteY }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.08)_18%,rgba(0,0,0,0.9)_88%)]"
      />
    </div>
  );
}