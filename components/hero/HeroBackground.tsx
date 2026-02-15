"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const particles = [
  { left: "10%", top: "26%", size: 2, delay: 0 },
  { left: "18%", top: "56%", size: 2, delay: 0.8 },
  { left: "28%", top: "42%", size: 2, delay: 1.4 },
  { left: "44%", top: "34%", size: 3, delay: 0.5 },
  { left: "58%", top: "64%", size: 2, delay: 1.2 },
  { left: "70%", top: "46%", size: 2, delay: 0.9 },
  { left: "84%", top: "58%", size: 3, delay: 1.6 }
];

export default function HeroBackground() {
  const { scrollYProgress } = useScroll();

  // Parallax principal del asfalto para sensación de peso y volumen del suelo
  const asphaltY = useTransform(scrollYProgress, [0, 1], [0, 72]);

  // Parallax de la parrilla vertical para separar plano medio del fondo base
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -42]);

  // Microparallax de viñeta para mantener dramatismo en scroll
  const vignetteY = useTransform(scrollYProgress, [0, 1], [0, -16]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <motion.div aria-hidden style={{ y: asphaltY }} className="absolute inset-0">
        <div className="absolute inset-0 bg-[#050505]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_115%,rgba(255,210,0,0.16),rgba(0,0,0,0)_44%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(10,10,10,0)_36%,rgba(0,0,0,0.76)_100%)]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(-77deg,rgba(255,255,255,0.04)_0px,rgba(255,255,255,0.04)_1px,rgba(0,0,0,0)_1px,rgba(0,0,0,0)_12px)] opacity-80" />
      </motion.div>

      <motion.div aria-hidden style={{ y: gridY }} className="absolute inset-0">
        <div className="absolute inset-x-[8%] bottom-[14%] top-[14%] bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.11)_0px,rgba(255,255,255,0.11)_1px,transparent_1px,transparent_84px)] opacity-35" />
        <div className="absolute inset-x-[8%] bottom-[14%] top-[14%] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(0,0,0,0)_20%,rgba(255,255,255,0.02)_55%,rgba(0,0,0,0.65))] opacity-60" />
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute inset-y-0 left-0 w-44"
        animate={{ opacity: [0.14, 0.22, 0.14], x: ["-4%", "4%", "-4%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-y-0 left-0 w-10 bg-[linear-gradient(90deg,rgba(255,208,0,0.55),rgba(255,208,0,0))]" />
        <div className="absolute inset-y-0 left-10 w-10 bg-[linear-gradient(90deg,rgba(255,208,0,0.2),rgba(255,208,0,0))]" />
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute inset-y-0 right-0 w-44"
        animate={{ opacity: [0.14, 0.22, 0.14], x: ["4%", "-4%", "4%"] }}
        transition={{ duration: 12.6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <div className="absolute inset-y-0 right-0 w-10 bg-[linear-gradient(270deg,rgba(255,208,0,0.55),rgba(255,208,0,0))]" />
        <div className="absolute inset-y-0 right-10 w-10 bg-[linear-gradient(270deg,rgba(255,208,0,0.2),rgba(255,208,0,0))]" />
      </motion.div>

      <div aria-hidden className="absolute inset-0">
        {particles.map((particle, index) => (
          <motion.span
            key={`${particle.left}-${index}`}
            className="absolute rounded-full bg-[#ffe9a1]"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size
            }}
            animate={{ y: [0, -10, 0], opacity: [0.08, 0.28, 0.08] }}
            transition={{
              duration: 6.6 + index * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay
            }}
          />
        ))}
      </div>

      <motion.div
        aria-hidden
        style={{ y: vignetteY }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.02)_15%,rgba(0,0,0,0.88)_88%)]"
      />
    </div>
  );
}