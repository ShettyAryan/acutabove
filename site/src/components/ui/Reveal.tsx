"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, EASE_SIGNATURE } from "@/lib/motion";

function usesClipPathReveal(variants: Variants): boolean {
  const hidden = variants.hidden;
  return (
    typeof hidden === "object" &&
    hidden !== null &&
    "clipPath" in hidden
  );
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  duration?: number;
  /** 0–1, how much of the element must be visible before it animates in. */
  amount?: number;
  /** Animate on mount instead of on scroll — for above-the-fold hero content. */
  onMount?: boolean;
  as?: "div" | "span" | "li";
};

export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  duration = 0.8,
  amount = 0.25,
  onMount = false,
  as = "div",
}: RevealProps) {
  const MotionTag =
    as === "span" ? motion.span : as === "li" ? motion.li : motion.div;

  // Clip-path reveals start fully clipped, so a non-zero `amount` threshold
  // can prevent whileInView from ever firing. Trigger as soon as the box enters.
  const viewportAmount = usesClipPathReveal(variants) ? 0 : amount;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      {...(onMount
        ? { animate: "visible" as const }
        : {
            whileInView: "visible" as const,
            viewport: { once: true, amount: viewportAmount },
          })}
      variants={variants}
      transition={{ duration, delay, ease: EASE_SIGNATURE }}
    >
      {children}
    </MotionTag>
  );
}
