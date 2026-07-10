"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EASE_SIGNATURE, fadeUp, staggerContainer } from "@/lib/motion";

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
};

export function StaggerGroup({
  children,
  className,
  stagger = 0.1,
  delay = 0,
  amount = 0.2,
}: StaggerGroupProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={staggerContainer(stagger, delay)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  duration?: number;
};

export function StaggerItem({
  children,
  className,
  variants = fadeUp,
  duration = 0.7,
}: StaggerItemProps) {
  return (
    <motion.div
      variants={variants}
      transition={{ duration, ease: EASE_SIGNATURE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
