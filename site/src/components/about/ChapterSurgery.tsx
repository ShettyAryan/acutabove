"use client";

import { Check, Scissors } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { ChapterHeader, SectionLabel } from "@/components/about/shared";
import { CHAPTER_SURGERY } from "@/lib/about-content";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function ChapterSurgery() {
  const { overview, keyFeatures } = CHAPTER_SURGERY;

  return (
    <section className="relative overflow-hidden bg-background py-section-sm md:py-section">
      <Scissors
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 top-32 h-64 w-64 text-primary/[0.04] md:right-12 md:h-96 md:w-96"
        strokeWidth={0.75}
      />

      <div className="relative mx-auto w-full max-w-container-max px-edge md:px-edge-lg">
        <Reveal amount={0.15}>
          <ChapterHeader
            number={CHAPTER_SURGERY.number}
            chapter={CHAPTER_SURGERY.chapter}
            title={CHAPTER_SURGERY.title}
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal amount={0.2}>
            <SectionLabel>{overview.label}</SectionLabel>
            <div className="space-y-6 text-body-lg leading-[1.75] text-ink-muted">
              <p>{overview.intro}</p>

              <div className="rounded-2xl border border-primary/15 bg-primary/[0.04] p-6 md:p-8">
                <p className="text-ink">{overview.pgCourse.intro}</p>
                <ul className="mt-5 space-y-3">
                  {overview.pgCourse.achievements.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-relaxed text-ink-muted md:text-base"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-primary/10 pt-6 text-ink-muted">
                  {overview.pgCourse.followUp}
                </p>
              </div>

              {overview.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}

              <p className="rounded-xl border border-outline/30 bg-surface-container-low px-5 py-4 font-body text-sm leading-relaxed text-ink md:text-base">
                {overview.hospitals}
              </p>
            </div>
          </Reveal>

          <div>
            <Reveal amount={0.2}>
              <SectionLabel>{keyFeatures.label}</SectionLabel>
            </Reveal>
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={staggerContainer(0.08, 0.05)}
              className="space-y-3"
            >
              {keyFeatures.items.map((item) => (
                <motion.li
                  key={item}
                  variants={fadeUp}
                  className="flex gap-4 rounded-2xl border border-outline/25 bg-surface-container-low p-5 shadow-sm"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check size={16} strokeWidth={2.5} />
                  </span>
                  <span className="text-sm leading-relaxed text-ink-muted md:text-base">
                    {item}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
