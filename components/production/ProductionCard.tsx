"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { productionCardVariants } from "./productionVariants";

type ProductionCardProps = {
  index: number;
  title: string;
  description: string;
  offset?: string;
};

export default function ProductionCard({
  index,
  title,
  description,
  offset = ""
}: ProductionCardProps) {
  const [isTouch, setIsTouch] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const stage = String(index + 1).padStart(2, "0");
  const technicalBullets = ["Cobertura oficial", "Supervisión técnica", "Dirección reglamentaria"];

  useEffect(() => {
    const media = window.matchMedia("(hover: none)");
    const applyMode = () => setIsTouch(media.matches);

    applyMode();
    media.addEventListener("change", applyMode);

    return () => media.removeEventListener("change", applyMode);
  }, []);

  return (
    <motion.article
      custom={index}
      variants={productionCardVariants}
      className={`group relative min-h-[380px] [perspective:1000px] md:min-h-[392px] ${offset}`}
      animate={{
        y: isHovered && !isTouch ? -6 : 0
      }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      onHoverStart={() => {
        if (!isTouch) {
          setIsHovered(true);
          setIsFlipped(true);
        }
      }}
      onHoverEnd={() => {
        if (!isTouch) {
          setIsHovered(false);
          setIsFlipped(false);
        }
      }}
      onClick={() => {
        if (isTouch) {
          setIsFlipped((prev) => !prev);
        }
      }}
    >
      <motion.div
        className="rkt-flip-core relative h-full w-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="rkt-flip-face rkt-flip-front absolute inset-0 overflow-hidden rounded-md border border-[#ffffff1f] bg-[linear-gradient(145deg,#090909_0%,#060606_62%,#0a0a0a_100%)] px-5 py-6 shadow-[0_14px_30px_rgba(0,0,0,0.62)] transition-[box-shadow,border-color] duration-500 group-hover:border-[#ffd1003f] group-hover:shadow-[0_18px_34px_rgba(0,0,0,0.74),0_0_10px_rgba(255,209,0,0.14)] sm:px-6 sm:py-7">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_85%_at_0%_0%,rgba(255,209,0,0.08),transparent_52%),linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0)_34%,rgba(0,0,0,0.5)_100%),repeating-linear-gradient(126deg,rgba(255,255,255,0.018)_0px,rgba(255,255,255,0.018)_1px,transparent_1px,transparent_11px),repeating-linear-gradient(-56deg,rgba(255,255,255,0.012)_0px,rgba(255,255,255,0.012)_1px,transparent_1px,transparent_14px)]" />
          <div className="pointer-events-none absolute inset-[3px] rounded-[5px] border border-[#ffffff14]" />
          <div className="pointer-events-none absolute right-0 top-0 h-16 w-16 bg-[linear-gradient(135deg,rgba(255,209,0,0.2)_0%,rgba(255,209,0,0)_48%)] opacity-30" />
          <div className="pointer-events-none absolute right-2 top-2 h-px w-10 rotate-[36deg] bg-[#ffd100]/30" />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.03),inset_0_-10px_24px_rgba(0,0,0,0.4)]" />

          <motion.span
            className="pointer-events-none absolute -right-1 top-[-10px] text-[7.5rem] font-black leading-none tracking-[-0.045em] text-transparent sm:text-[8.2rem]"
            animate={{ scale: isHovered && !isTouch ? 1.05 : 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <span style={{ WebkitTextStroke: "0.8px rgba(255,209,0,0.46)", opacity: 0.06 }}>{stage}</span>
          </motion.span>

          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <motion.h3
                className="text-lg font-black uppercase leading-tight tracking-[-0.01em] text-white sm:text-xl"
                animate={{
                  textShadow: isHovered && !isTouch ? "0 0 10px rgba(255,209,0,0.18)" : "0 0 0px rgba(255,209,0,0)"
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {title}
              </motion.h3>

              <div className="mt-4 h-px w-16 bg-[#ffd100]/85" />
            </div>

            <ul className="space-y-2.5 py-6 text-[0.72rem] font-medium uppercase tracking-[0.08em] text-[#cfcfcf]/60 sm:text-[0.76rem]">
              {technicalBullets.map((bullet) => (
                <li key={`${title}-${bullet}`} className="flex items-center gap-2.5">
                  <span className="h-[3px] w-[3px] rounded-full bg-[#ffd100]/80" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <motion.div
              className="pt-1"
              animate={{ y: isHovered && !isTouch ? -2 : 0, opacity: isHovered && !isTouch ? 1 : 0.9 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-3 h-px w-full bg-white/10" />
              <div className="inline-flex items-center gap-2">
                <motion.svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 text-[#ffd100]"
                  fill="none"
                  aria-hidden
                  animate={{ x: isHovered && !isTouch ? 3 : 0, opacity: isHovered && !isTouch ? 1 : 0.74 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <path d="M4 12h16M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>

                <motion.span
                  className="h-px bg-[#ffd100]"
                  animate={{ width: isHovered && !isTouch ? 40 : 20, opacity: isHovered && !isTouch ? 0.95 : 0.62 }}
                  transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                />

                <span className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-[#d7d7d7]">Ver detalles</span>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="rkt-flip-face rkt-flip-back absolute inset-0 overflow-hidden rounded-md border border-[#ffd1003f] bg-[linear-gradient(160deg,#0f0f0f_0%,#0a0a0a_58%,#131313_100%)] px-5 py-6 shadow-[0_16px_30px_rgba(0,0,0,0.72)] transition-[box-shadow,border-color] duration-500 group-hover:border-[#ffd10052] group-hover:shadow-[0_18px_34px_rgba(0,0,0,0.76),0_0_8px_rgba(255,209,0,0.12)] sm:px-6 sm:py-7">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_14%_0%,rgba(255,209,0,0.07),transparent_54%),repeating-linear-gradient(128deg,rgba(255,255,255,0.015)_0px,rgba(255,255,255,0.015)_1px,transparent_1px,transparent_12px)]" />
          <div className="pointer-events-none absolute inset-[3px] rounded-[5px] border border-[#ffffff12]" />
          <div className="pointer-events-none absolute left-5 right-5 top-6 h-px bg-white/10" />
          <div className="pointer-events-none absolute left-5 right-5 bottom-6 h-px bg-white/10" />
          <motion.div
            className="pointer-events-none absolute right-4 top-3 text-[2.6rem] font-black leading-none tracking-[-0.04em] text-transparent"
            animate={{ opacity: isHovered && !isTouch ? 0.09 : 0.06 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <span style={{ WebkitTextStroke: "0.8px rgba(255,209,0,0.42)" }}>{stage}</span>
          </motion.div>
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.03),inset_0_-8px_20px_rgba(0,0,0,0.36)]" />

          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="w-full max-w-[32ch] text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-[#ffd100]/70" />
                <span className="h-[4px] w-[4px] rounded-full bg-[#ffd100]/90" />
                <span className="h-px w-8 bg-[#ffd100]/70" />
              </div>

              <p className="mx-auto text-sm leading-relaxed text-[#e1e1e1] sm:text-[0.97rem]">{description}</p>

              <motion.div
                className="mx-auto mt-5 h-px bg-[#ffd100]/80"
                animate={{ width: isHovered && !isTouch ? 78 : 58, opacity: isHovered && !isTouch ? 0.95 : 0.72 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}