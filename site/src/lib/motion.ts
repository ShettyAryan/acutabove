import type { Variants } from "framer-motion";

export const EASE_SIGNATURE = [0.22, 1, 0.36, 1] as const;

/** Fade + rise. Timing is applied by the caller (see components/ui/Reveal). */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/** Wide clip-path wipe — the "incision" reveal used for the hero headline & about image. */
export const wipeReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: { clipPath: "inset(0 0% 0 0)" },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
};

/** Parent wrapper that staggers any fadeUp/fadeIn children (used with Framer's `variants` inheritance). */
export function staggerContainer(stagger = 0.12, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
  };
}
