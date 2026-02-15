"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { RefObject } from "react";

type TimelineProgressLineProps = {
  targetRef: RefObject<HTMLElement>;
};

export default function TimelineProgressLine({ targetRef }: TimelineProgressLineProps) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 80%", "end 20%"]
  });

  // Línea de progreso: escala vertical ligada al scroll del bloque timeline
  const filledScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Intensidad del brillo amarillo en función del avance
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.9]);

  return (
    <div
      aria-hidden
      className="absolute bottom-16 left-7 top-20 w-px md:left-1/2 md:-translate-x-1/2"
    >
      <div className="absolute inset-0 bg-[#ffffff1f]" />

      <motion.div
        className="absolute inset-0 origin-top bg-[#ffd100]"
        style={{ scaleY: filledScaleY }}
      />

      <motion.div
        className="absolute inset-0 origin-top bg-[#ffd100] blur-[4px]"
        style={{ scaleY: filledScaleY, opacity: glowOpacity }}
      />
    </div>
  );
}