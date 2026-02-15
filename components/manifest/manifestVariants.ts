// Entrada de la sección completa: fade + slideUp muy contenido para mantener sobriedad
export const manifestSectionVariants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren"
    }
  }
};

// Frase principal dominante con escala 1.1 -> 1 para impacto emocional inicial
export const manifestTitleVariants = {
  hidden: { opacity: 0, scale: 1.1 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Contenedor del titular para animar palabra por palabra con stagger
export const manifestTitleContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06
    }
  }
};

// Palabras del titular con entrada sobria para mantener tensión contenida
export const manifestTitleWordVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Líneas secundarias en stagger para construir tensión con ritmo progresivo
export const manifestLineContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15
    }
  }
};

// Cada línea secundaria aparece con fade + slideUp suave, sin rebotes
export const manifestLineVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Fondo cinematográfico: imagen entra con scale 1.1 -> 1 y fade progresivo
export const manifestImageVariants = {
  hidden: { opacity: 0, scale: 1.1 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};