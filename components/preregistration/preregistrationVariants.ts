// Entrada general de la sección final: fade + slideUp para mantener continuidad cinematográfica
export const preRegistrationSectionVariants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Panel principal del formulario con aparición sólida y sobria
export const formPanelVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.06
    }
  }
};

// Campos del formulario: slideUp progresivo para evitar sensación de bloque estático
export const fieldRevealVariants = {
  hidden: { opacity: 0, y: 16 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.04,
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

// Confirmación intermedia: entrada con fade + scale para cierre emocional del paso
export const confirmationScreenVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.09
    }
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.2, ease: "easeOut" }
  }
};

// Línea amarilla de confirmación: se dibuja de izquierda a derecha
export const confirmationLineVariants = {
  hidden: { scaleX: 0, opacity: 0.4 },
  show: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// CTA final con rebote controlado, serio y sin exageración
export const ctaBounceVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 250,
      damping: 18,
      mass: 0.72
    }
  }
};
