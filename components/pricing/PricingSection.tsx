"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PricingCard from "./PricingCard";
import PricingCTA from "./PricingCTA";
import PricingHeader from "./PricingHeader";
import { pricingSectionVariants } from "./pricingVariants";

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const showStickyCta = useInView(sectionRef, { margin: "0px 0px -30% 0px" });

  return (
    <motion.section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#040404] px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-16"
      variants={pricingSectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.22 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.85)_42%,rgba(0,0,0,0.96)_100%)]" />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
        <PricingHeader />

        <div className="mt-10 w-full">
          <PricingCard />
          <PricingCTA showSticky={showStickyCta} />
        </div>
      </div>
    </motion.section>
  );
}
