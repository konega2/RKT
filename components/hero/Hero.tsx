"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import HeaderLogo from "./HeaderLogo";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import { heroRevealVariants } from "./heroVariants";

type IntroPhase = "black" | "flash" | "ready";

export default function Hero() {
  const [phase, setPhase] = useState<IntroPhase>("black");

  useEffect(() => {
    const blackTimer = window.setTimeout(() => setPhase("flash"), 400);
    const flashTimer = window.setTimeout(() => setPhase("ready"), 560);

    return () => {
      window.clearTimeout(blackTimer);
      window.clearTimeout(flashTimer);
    };
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#040404]">
      <AnimatePresence mode="wait">
        {phase !== "ready" && (
          <motion.div
            key={`phase-${phase}`}
            className="absolute inset-0 z-40"
            initial={{ opacity: 1 }}
            animate={
              phase === "black"
                ? { opacity: 1, backgroundColor: "#000000" }
                : {
                    opacity: [1, 0.55, 0],
                    backgroundColor: ["#201600", "#3a2600", "#080808"]
                  }
            }
            exit={{ opacity: 0, transition: { duration: 0.22, ease: "easeOut" } }}
            transition={{
              duration: phase === "black" ? 0.4 : 0.34,
              ease: [0.22, 1, 0.36, 1]
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "ready" && (
          <motion.div
            key="hero-ready"
            className="relative flex min-h-screen w-full items-center justify-center"
            variants={heroRevealVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeOut" } }}
          >
            <HeroBackground />
            <HeaderLogo />
            <HeroContent />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}