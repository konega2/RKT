// Entrada de la sección completa: fade + slideUp al entrar al viewport
export const experienceSectionVariants = {
  hidden: { opacity: 0, y: 34 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren"
    }
  }
};

// Contenedor del título para stagger por palabras
export const titleContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08
    }
  }
};

// Palabras del título con entrada sólida y sobria
export const titleWordVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.46,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Subtítulo principal con aparición posterior al título
export const subtitleVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Frases tipo bullet con delay progresivo para construir emoción en lectura
export const phraseVariants = {
  hidden: { opacity: 0, y: 14 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.34 + index * 0.12,
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

// Ventana visual entra con scale 1.05 -> 1 para impacto cinematográfico controlado
export const visualRevealVariants = {
  hidden: { opacity: 0, scale: 1.05 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.78,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};