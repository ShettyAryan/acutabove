"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { NICK_OF_TIME } from "@/lib/nick-of-time-content";
import { fadeUp, wipeReveal, EASE_SIGNATURE } from "@/lib/motion";

export function NickOfTimeHero() {
  const { hero } = NICK_OF_TIME;

  return (
    <section className="relative flex min-h-[72vh] items-center justify-center overflow-hidden bg-primary px-edge pb-20 pt-32 text-center md:min-h-[78vh] md:pt-40">
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
        className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        <Reveal onMount variants={wipeReveal} duration={1.2} delay={0.05}>
          <h1 className="font-display text-[2.5rem] font-bold uppercase leading-[1.02] tracking-[0.06em] text-accent text-balance sm:text-[3.25rem] md:text-[4.5rem] md:tracking-[0.08em]">
            {hero.title}
          </h1>
        </Reveal>

        <Reveal
          onMount
          variants={fadeUp}
          duration={0.85}
          delay={0.3}
          className="mx-auto mt-8 max-w-2xl"
        >
          <p className="text-body-lg leading-relaxed text-white/85">
            {hero.subtitle}
          </p>
        </Reveal>

        <Reveal
          onMount
          variants={fadeUp}
          duration={0.75}
          delay={0.5}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button href={hero.registerHref} variant="tertiary">
            Register Now
          </Button>
          <Button href={hero.scheduleHref} variant="outline">
            Schedule
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
