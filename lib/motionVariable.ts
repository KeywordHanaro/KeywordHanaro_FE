export const ulVariants = {
  visible: {
    transition: { staggerChildren: 0.03, delayChildren: 0.05 },
  },
};
export const liVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.5,
    },
  }),
};
