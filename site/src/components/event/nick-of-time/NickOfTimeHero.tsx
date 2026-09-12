"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { NICK_OF_TIME } from "@/lib/nick-of-time-content";
import { fadeUp, wipeReveal, EASE_SIGNATURE } from "@/lib/motion";

export function NickOfTimeHero({
  content = NICK_OF_TIME.hero,
}: {
  content?: typeof NICK_OF_TIME.hero;
}) {
  return (
    <section className="relative flex min-h-[min(72vh,100dvh)] items-center justify-center overflow-hidden bg-primary px-edge pb-16 pt-28 text-center sm:pb-20 sm:pt-32 md:min-h-[78vh] md:pt-40">
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE_SIGNATURE }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,219,206,0.1)_0%,transparent_65%)]"
      />
      <motion.div
        aria-hidden="true"
        animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 9, repeat: Infinity, ease: EASE_SIGNATURE }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(36rem,90vw)] w-[min(36rem,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        <Reveal onMount variants={wipeReveal} duration={1.2} delay={0.05}>
          <h1 className="font-display text-[2rem] font-bold uppercase leading-[1.05] tracking-[0.02em] text-accent text-balance sm:text-[3.25rem] sm:tracking-[0.06em] md:text-[4.5rem] md:tracking-[0.08em]">
            {content.title}
          </h1>
        </Reveal>

        <Reveal
          onMount
          variants={fadeUp}
          duration={0.85}
          delay={0.3}
          className="mx-auto mt-6 max-w-2xl sm:mt-8"
        >
          <p className="text-base leading-relaxed text-white/85 sm:text-body-lg">
            {content.subtitle}
          </p>
        </Reveal>

        <Reveal
          onMount
          variants={fadeUp}
          duration={0.75}
          delay={0.5}
          className="mt-8 flex w-full flex-col items-stretch gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:items-center sm:justify-center sm:gap-4"
        >
          <Button
            href={content.registerHref}
            variant="tertiary"
            className="w-full sm:w-auto"
          >
            Register Now
          </Button>
          <Button
            href={content.brochureHref}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Brochure
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
