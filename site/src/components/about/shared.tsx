import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function ChapterEyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-5 font-body text-label uppercase tracking-[0.2em]",
        className
      )}
    >
      {children}
    </p>
  );
}

export function ChapterHeader({
  number,
  chapter,
  title,
  subtitle,
  className,
  dark = false,
}: {
  number: string;
  chapter: string;
  title: string;
  subtitle?: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div className={cn("mb-10", className)}>
      <div className="mb-6 flex items-center gap-4 md:gap-5">
        <span
          aria-hidden="true"
          className={cn(
            "font-display text-5xl leading-none md:text-6xl",
            dark ? "text-white/15" : "text-primary/15"
          )}
        >
          {number}
        </span>
        <ChapterEyebrow
          className={cn("mb-0", dark ? "text-accent" : "text-primary/70")}
        >
          {chapter}
        </ChapterEyebrow>
      </div>
      {subtitle && (
        <p
          className={cn(
            "mb-4 font-body text-sm uppercase tracking-[0.18em]",
            dark ? "text-accent" : "text-primary"
          )}
        >
          {subtitle}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-[2.75rem] font-bold leading-[1.06] tracking-tight text-balance sm:text-[3.25rem] md:text-[4rem] md:leading-[1.05] md:tracking-[-0.02em]",
          dark ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
    </div>
  );
}

export function SectionLabel({
  children,
  className,
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <h3
      className={cn(
        "mb-5 font-body text-label uppercase tracking-[0.2em]",
        dark ? "text-accent" : "text-primary",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function StatBlock({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="font-display text-3xl tracking-tight md:text-4xl">
        {value}
      </span>
      <span className="font-body text-[10px] uppercase tracking-[0.22em] opacity-70">
        {label}
      </span>
    </div>
  );
}
