// Entrada general de la sección: fade + slideUp para mantener narrativa elegante
export const pricingSectionVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.68,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

// Contenedor del título para animar palabras con stagger y reforzar impacto
export const pricingTitleContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.06
    }
  }
};

// Palabras del título en entrada controlada para mantener tensión elegante
export const pricingTitleWordVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Card de precio: escala desde 0.9 para destacar decisión económica clave
export const pricingCardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// CTA con micro rebote controlado, sin efecto comercial exagerado
export const pricingCtaVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 17,
      mass: 0.72,
      delay: 0.12
    }
  }
};
