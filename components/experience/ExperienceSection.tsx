"use client";

import { motion } from "framer-motion";
import ExperienceContent from "./ExperienceContent";
import ExperienceVisual from "./ExperienceVisual";
import { experienceSectionVariants } from "./experienceVariants";

export default function ExperienceSection() {
  return (
    <motion.section
      className="relative overflow-hidden bg-[#030303] px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-16"
      variants={experienceSectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.8)_45%,rgba(0,0,0,0.96)_100%)]" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
        <ExperienceVisual />
        <ExperienceContent />
      </div>
    </motion.section>
  );
}