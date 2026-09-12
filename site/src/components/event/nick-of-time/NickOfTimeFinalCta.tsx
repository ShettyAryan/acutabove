"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SutureDivider } from "@/components/layout/SutureDivider";
import { NICK_OF_TIME } from "@/lib/nick-of-time-content";
import { fadeUp, wipeReveal, EASE_SIGNATURE } from "@/lib/motion";

export function NickOfTimeFinalCta({
  content = NICK_OF_TIME.finalCta,
}: {
  content?: typeof NICK_OF_TIME.finalCta;
}) {
  return (
    <section className="relative overflow-hidden bg-primary px-edge py-section-sm text-center text-white md:py-section">
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 6, repeat: Infinity, ease: EASE_SIGNATURE }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,219,206,0.15)_0%,transparent_70%)]"
      />

      <div className="relative mx-auto max-w-3xl">
        <Reveal variants={fadeUp} duration={0.7} amount={0.5}>
          <p className="mb-8 font-body text-label uppercase tracking-[0.28em] text-accent">
            {content.eyebrow}
          </p>
        </Reveal>

        <Reveal variants={wipeReveal} duration={1} delay={0.05} amount={0}>
          <h2 className="font-display text-[2.25rem] font-bold leading-[1.08] tracking-tight text-balance sm:text-[3.25rem] md:text-[4rem]">
            {content.title}
          </h2>
        </Reveal>

        <SutureDivider tone="cream" className="my-8 sm:my-10" />

        <Reveal
          variants={fadeUp}
          duration={0.75}
          delay={0.2}
          amount={0.4}
          className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center sm:gap-4"
        >
          <Button
            href={content.registerHref}
            className="w-full bg-white text-primary shadow-none hover:bg-white/90 sm:w-auto"
          >
            Register Now
          </Button>
          <Button
            href={content.eventsHref}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Back to All Events
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
