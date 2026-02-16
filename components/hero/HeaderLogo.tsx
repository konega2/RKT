"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { headerLogoVariants } from "./heroVariants";

export default function HeaderLogo() {
  return (
    <motion.div
      // Entrada del logo con fade + slideDown para integración institucional
      variants={headerLogoVariants}
      initial="hidden"
      animate="show"
      whileHover={{ opacity: 1 }}
      className="absolute left-4 top-4 z-30 p-1 sm:left-6 sm:top-6"
    >
      <Image
        src="/LOGO_RKT.jpg"
        alt="RKT Rental Karting Trophy"
        width={144}
        height={72}
        priority
        className="h-auto w-28 object-contain opacity-90 contrast-125 saturate-95 mix-blend-multiply sm:w-36"
      />
    </motion.div>
  );
}
