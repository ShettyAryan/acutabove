"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { StaggerGroup, StaggerItem } from "@/components/about/StaggerGroup";
import {
  NICK_OF_TIME,
  getProgramsByGroup,
  programPath,
  type NickOfTimeProgram,
} from "@/lib/nick-of-time-content";
import { EASE_SIGNATURE, fadeUp, scaleIn, wipeReveal } from "@/lib/motion";

type EventSubPageProps = {
  program: NickOfTimeProgram;
  registerHref?: string;
};

export function EventSubPage({
  program,
  registerHref = "https://forms.gle/nBqRZntG2CLn7RPb7",
}: EventSubPageProps) {
  const related = getProgramsByGroup(program.group).filter(
    (p) => p.slug !== program.slug
  );

  return (
    <>
      <section className="relative overflow-hidden bg-primary px-edge pb-12 pt-28 sm:pb-16 sm:pt-32 md:pt-40">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,219,206,0.08)_0%,transparent_70%)]"
        />
        <div className="relative z-10 mx-auto w-full max-w-container-max md:px-edge-lg">
          <Reveal onMount variants={fadeUp} duration={0.6}>
            <Link
              href={NICK_OF_TIME.path}
              className="mb-8 inline-flex items-center gap-2 font-body text-label uppercase text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to Nick of Time
            </Link>
          </Reveal>

          <p className="mb-4 font-body text-label uppercase tracking-[0.24em] text-accent">
            {program.groupLabel}
          </p>

          <Reveal onMount variants={wipeReveal} duration={1} delay={0.05}>
            <h1 className="max-w-4xl font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-white text-balance sm:text-[3rem] md:text-[3.75rem]">
              {program.title}
            </h1>
          </Reveal>

          {program.theme && (
            <Reveal onMount variants={fadeUp} duration={0.7} delay={0.25}>
              <p className="mt-5 max-w-2xl font-display text-lg italic text-accent/90">
                {program.theme}
              </p>
            </Reveal>
          )}
        </div>
      </section>

      <section className="bg-background py-section-sm md:py-section">
        <div className="mx-auto w-full max-w-container-max px-edge md:px-edge-lg">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
            <Reveal variants={scaleIn} duration={0.9} amount={0.2}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-outline/25 shadow-lg lg:sticky lg:top-28">
                <Image
                  src={program.image}
                  alt={program.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                />
              </div>
            </Reveal>

            <div>
              <StaggerGroup className="space-y-6" stagger={0.08}>
                {program.description.map((paragraph) => (
                  <StaggerItem key={paragraph.slice(0, 48)}>
                    <p className="text-body-lg leading-[1.75] text-ink-muted">
                      {paragraph}
                    </p>
                  </StaggerItem>
                ))}
              </StaggerGroup>

              {program.bullets && program.bullets.length > 0 && (
                <Reveal amount={0.3} className="mt-10">
                  <h2 className="mb-5 font-body text-label uppercase tracking-[0.2em] text-primary">
                    {program.slug === "formal-events"
                      ? "Featured Lecture Topics"
                      : "Focus Areas"}
                  </h2>
                  <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {program.bullets.map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: i * 0.05,
                          ease: EASE_SIGNATURE,
                        }}
                        className="flex gap-3 rounded-xl border border-outline/20 bg-surface-container-low px-4 py-3 text-sm text-ink-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                        />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </Reveal>
              )}

              <Reveal amount={0.4} className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button href={registerHref}>{program.cta}</Button>
                <Button
                  href={NICK_OF_TIME.path}
                  variant="ghost"
                  className="border-primary/30"
                >
                  View Full Programme
                </Button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-outline/10 bg-mint py-section-sm md:py-section">
          <div className="mx-auto w-full max-w-container-max px-edge md:px-edge-lg">
            <h2 className="mb-8 font-display text-2xl font-semibold text-ink md:text-3xl">
              More in {program.groupLabel}
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.slice(0, 3).map((item) => (
                <Link
                  key={item.slug}
                  href={programPath(item.slug)}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-outline/20 bg-white px-4 py-4 shadow-sm transition-all hover:border-primary/30 hover:shadow-md sm:px-5"
                >
                  <span className="min-w-0 flex-1 pr-2 text-left font-display text-base text-ink transition-colors group-hover:text-primary sm:text-lg">
                    {item.title}
                  </span>
                  <ArrowRight
                    size={18}
                    className="shrink-0 text-primary transition-transform group-hover:translate-x-1"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
