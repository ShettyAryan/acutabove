"use client";

import { motion } from "framer-motion";
import { ChevronsDown } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SutureDivider } from "@/components/layout/SutureDivider";
import { ABOUT_HERO } from "@/lib/about-content";
import { fadeUp, wipeReveal, EASE_SIGNATURE } from "@/lib/motion";

export function AboutHero() {
  return (
    <section className="relative flex min-h-[72vh] items-center justify-center overflow-hidden bg-primary px-edge pb-20 pt-32 text-center md:min-h-[78vh] md:pt-40">
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE_SIGNATURE }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,219,206,0.08)_0%,transparent_70%)]"
      />
      <motion.div
        aria-hidden="true"
        animate={{ scale: [1, 1.08, 1], opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 8, repeat: Infinity, ease: EASE_SIGNATURE }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        <Reveal onMount variants={fadeUp} duration={0.7} className="mb-6">
          <p className="font-body text-label uppercase tracking-[0.24em] text-accent">
            {ABOUT_HERO.eyebrow}
          </p>
        </Reveal>

        <Reveal onMount variants={wipeReveal} duration={1.1} delay={0.1}>
          <h1 className="font-display text-[2.75rem] leading-[1.02] tracking-tight text-white text-balance sm:text-[3.5rem] md:text-[4.25rem]">
            {ABOUT_HERO.title}
          </h1>
        </Reveal>

        <Reveal
          onMount
          variants={fadeUp}
          duration={0.8}
          delay={0.35}
          className="mx-auto mt-8 max-w-2xl"
        >
          <p className="text-body-lg leading-relaxed text-white/80">
            {ABOUT_HERO.subtitle}
          </p>
        </Reveal>

        <Reveal onMount variants={fadeUp} duration={0.7} delay={0.55}>
          <SutureDivider tone="cream" className="mt-12" />
        </Reveal>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/40"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: EASE_SIGNATURE }}
        aria-hidden="true"
      >
        <ChevronsDown size={28} />
      </motion.div>
    </section>
  );
}
