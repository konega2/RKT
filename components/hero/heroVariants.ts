// Variantes de entrada principal del hero: fade + scale para revelar el escenario
export const heroRevealVariants = {
  hidden: { opacity: 0, scale: 1.05 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Variantes del título con staggerChildren para entrada palabra por palabra
export const titleContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.08
    }
  }
};

// Palabras del título con spring fuerte para impacto visual inicial
export const titleWordVariants = {
  hidden: { opacity: 0, y: 56, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 430,
      damping: 18,
      mass: 0.65
    }
  }
};

// El año entra separado, más tarde y con mayor escala para dominar jerarquía visual
export const dominantYearVariants = {
  hidden: { opacity: 0, y: 28, scale: 1.2 },
  show: {
    opacity: 0.9,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 320,
      damping: 20,
      delay: 0.24
    }
  }
};

// Subtítulo con delay de 0.2 después del bloque principal del título
export const subtitleVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.52,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Botón entra último con rebote leve para cerrar la secuencia de entrada
export const buttonEntryVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 290,
      damping: 15,
      delay: 0.34,
      mass: 0.7
    }
  }
};

// Línea amarilla fina animada bajo el título para reforzar tensión de salida
export const accentLineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.75,
      delay: 0.16,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Logo oficial: entrada fade + slideDown, sobria y sin rebote
export const headerLogoVariants = {
  hidden: { opacity: 0, y: -18 },
  show: {
    opacity: 0.8,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};