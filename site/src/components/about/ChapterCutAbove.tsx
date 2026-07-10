"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ChapterHeader, StatBlock } from "@/components/about/shared";
import { StaggerGroup, StaggerItem } from "@/components/about/StaggerGroup";
import { CHAPTER_CUT_ABOVE } from "@/lib/about-content";
import { EASE_SIGNATURE, fadeLeft, scaleIn } from "@/lib/motion";

export function ChapterCutAbove() {
  return (
    <section className="overflow-hidden bg-primary py-section-sm text-white md:py-section">
      <div className="mx-auto w-full max-w-container-max px-edge md:px-edge-lg">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal
            variants={scaleIn}
            duration={1}
            amount={0.2}
            className="flex justify-center lg:justify-start"
          >
            <motion.div
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="relative flex aspect-square w-full max-w-sm items-center justify-center rounded-3xl border border-white/10 bg-primary-container/40 p-12 shadow-2xl"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: EASE_SIGNATURE }}
              >
                <Image
                  src={CHAPTER_CUT_ABOVE.logo.src}
                  alt={CHAPTER_CUT_ABOVE.logo.alt}
                  width={280}
                  height={280}
                  className="h-auto w-full max-w-[220px] object-contain md:max-w-[260px]"
                />
              </motion.div>
            </motion.div>
          </Reveal>

          <div>
            <ChapterHeader
              number={CHAPTER_CUT_ABOVE.number}
              chapter={CHAPTER_CUT_ABOVE.chapter}
              title={CHAPTER_CUT_ABOVE.title}
              dark
            />
            <StaggerGroup className="space-y-6" stagger={0.08}>
              {CHAPTER_CUT_ABOVE.body.map((paragraph) => (
                <StaggerItem key={paragraph.slice(0, 40)}>
                  <p className="text-body-lg leading-[1.75] text-white/80">
                    {paragraph}
                  </p>
                </StaggerItem>
              ))}
            </StaggerGroup>
            <StaggerGroup
              className="mt-10 flex flex-wrap gap-8 border-t border-white/15 pt-8 sm:gap-12"
              stagger={0.12}
              delay={0.05}
            >
              {CHAPTER_CUT_ABOVE.stats.map((stat) => (
                <StaggerItem key={stat.label}>
                  <StatBlock {...stat} className="text-white" />
                </StaggerItem>
              ))}
            </StaggerGroup>
            <Reveal variants={fadeLeft} duration={0.75} delay={0.15} amount={0.4}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                {CHAPTER_CUT_ABOVE.ctas.map((cta) =>
                  cta.variant === "solid" ? (
                    <Button
                      key={cta.href}
                      href={cta.href}
                      className="bg-white text-primary shadow-none hover:bg-white/90"
                    >
                      {cta.label}
                    </Button>
                  ) : (
                    <Button key={cta.href} href={cta.href} variant="outline">
                      {cta.label}
                    </Button>
                  )
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
