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
      className="rkt-carbon-surface relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-16"
      variants={pricingSectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.22 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.84)_42%,rgba(0,0,0,0.96)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_16%_18%,rgba(255,209,0,0.07),transparent_48%)]" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-24"
        animate={{ opacity: [0.06, 0.15, 0.06], x: ["4%", "-4%", "4%"] }}
        transition={{ duration: 10.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-y-0 right-0 w-8 bg-[linear-gradient(270deg,rgba(255,209,0,0.28),rgba(255,209,0,0))]" />
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#2a2a2a]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-10">
          <div>
            <PricingHeader />
            <PricingCTA showSticky={showStickyCta} />
          </div>

          <PricingCard />
        </div>
      </div>
    </motion.section>
  );
}
