export const prizesSectionVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.62,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.08
    }
  }
};

export const prizeItemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.07,
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};
