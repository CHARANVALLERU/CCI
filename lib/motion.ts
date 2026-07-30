/**
 * Motion tokens — Apple-inspired premium springs + Crawl Corp–style
 * entrance offsets (Framer sites use ~translateY(150px) + opacity:0).
 * Always pair with useReducedMotion / prefers-reduced-motion.
 */

export const springSoft = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
};

/** Slightly snappier for micro-interactions (buttons, rings). */
export const springSnappy = {
  type: "spring" as const,
  stiffness: 160,
  damping: 22,
};

/** Heavier, cinematic settle — section headlines / sticky scrub. */
export const springPremium = {
  type: "spring" as const,
  stiffness: 72,
  damping: 22,
  mass: 0.85,
};

export const revealViewport = {
  once: true,
  margin: "-12% 0px -8% 0px" as const,
  amount: 0.22 as const,
};

/** Apple-like cascade: eyebrow → title → body stagger. */
export const cascadeParent = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.04,
    },
  },
};

export const cascadeItem = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springPremium,
  },
};

/** Crawl Corp Framer pattern: larger Y travel on section mounts. */
export const sectionReveal = {
  initial: { opacity: 0, y: 56 },
  whileInView: { opacity: 1, y: 0 },
  viewport: revealViewport,
  transition: { ...springPremium, delay: 0 },
};

/** Cinematic section enter — subtle scale, no layout shift (transform only). */
export const sectionRevealCinematic = {
  initial: { opacity: 0, y: 48, scale: 0.985 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: revealViewport,
  transition: { ...springPremium, delay: 0 },
};

export const reducedReveal = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: revealViewport,
  transition: { duration: 0.35, ease: "easeOut" as const },
};

export function staggerDelay(index: number, base = 0.07) {
  return { ...springPremium, delay: index * base };
}
