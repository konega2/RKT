// Entrada inicial de cada etapa: fade + slideUp para sensación de avance al aparecer
export const itemVariants = {
  hidden: { opacity: 0, y: 34, scale: 0.98 },
  active: {
    opacity: 1,
    y: 0,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 24,
      mass: 0.7
    }
  }
};

// Micro-animación continua para glow sutil cuando la etapa está activa
export const activeGlowTransition = {
  duration: 2.4,
  repeat: Infinity,
  ease: "easeInOut" as const
};