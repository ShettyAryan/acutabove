"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "tertiary" | "ghost";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-primary text-on-primary shadow-lg shadow-primary/20 hover:bg-primary-light",
  outline:
    "border border-white/40 text-white backdrop-blur-sm hover:bg-white hover:text-primary",
  tertiary:
    "bg-tertiary text-on-tertiary shadow-lg shadow-tertiary/20 hover:brightness-110",
  ghost:
    "border border-outline/60 text-ink hover:border-primary/60 hover:text-primary",
};

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
  onClick?: () => void;
} & Omit<HTMLMotionProps<"button">, "onClick">;

export function Button({
  children,
  href,
  variant = "primary",
  className,
  icon,
  onClick,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-body text-label uppercase transition-colors duration-300 sm:px-9 sm:py-4",
    VARIANT_CLASSES[variant],
    className
  );

  const content = (
    <motion.span
      className={classes}
      whileHover={{ y: -3 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {children}
      {icon}
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block" onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      className={classes}
      onClick={onClick}
      whileHover={{ y: -3 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      {...rest}
    >
      {children}
      {icon}
    </motion.button>
  );
}
