"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import ManifestBackground from "./ManifestBackground";
import ManifestContent from "./ManifestContent";
import { manifestSectionVariants } from "./manifestVariants";

export default function ManifestSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <motion.section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-[#030303] px-5 py-16 sm:px-8 md:px-12 lg:px-16"
      variants={manifestSectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.22 }}
    >
      <ManifestBackground sectionRef={sectionRef} />

      <div className="relative mx-auto flex w-full max-w-6xl items-center">
        <ManifestContent />
      </div>
    </motion.section>
  );
}