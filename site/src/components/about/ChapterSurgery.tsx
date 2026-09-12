"use client";

import { Check, Scissors } from "lucide-react";
import { motion } from "framer-motion";
import { ChapterHeader, SectionLabel } from "@/components/about/shared";
import { StaggerGroup, StaggerItem } from "@/components/about/StaggerGroup";
import { CHAPTER_SURGERY } from "@/lib/about-content";
import {
  EASE_SIGNATURE,
  fadeUp,
  scaleIn,
  staggerContainer,
} from "@/lib/motion";

export function ChapterSurgery({
  data = CHAPTER_SURGERY,
}: {
  data?: typeof CHAPTER_SURGERY;
}) {
  const { overview, keyFeatures } = data;

  return (
    <section className="relative overflow-hidden bg-background py-section-sm md:py-section">
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, rotate: -8 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: EASE_SIGNATURE }}
        className="pointer-events-none absolute -right-8 top-32 md:right-12"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: EASE_SIGNATURE }}
        >
          <Scissors
            className="h-64 w-64 text-primary/[0.04] md:h-96 md:w-96"
            strokeWidth={0.75}
          />
        </motion.div>
      </motion.div>

      <div className="relative mx-auto w-full max-w-container-max px-edge md:px-edge-lg">
        <ChapterHeader
          number={data.number}
          chapter={data.chapter}
          title={data.title}
        />

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <SectionLabel>{overview.label}</SectionLabel>
            <StaggerGroup className="space-y-6" stagger={0.08}>
              <StaggerItem>
                <p className="text-body-lg leading-[1.75] text-ink-muted">
                  {overview.intro}
                </p>
              </StaggerItem>

              <StaggerItem variants={scaleIn} duration={0.85}>
                <div className="rounded-2xl border border-primary/15 bg-primary/[0.04] p-6 md:p-8">
                  <p className="text-ink">{overview.pgCourse.intro}</p>
                  <motion.ul
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={staggerContainer(0.08, 0.15)}
                    className="mt-5 space-y-3"
                  >
                    {overview.pgCourse.achievements.map((item) => (
                      <motion.li
                        key={item}
                        variants={fadeUp}
                        transition={{ duration: 0.6, ease: EASE_SIGNATURE }}
                        className="flex gap-3 text-sm leading-relaxed text-ink-muted md:text-base"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                        />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                  <p className="mt-6 border-t border-primary/10 pt-6 text-ink-muted">
                    {overview.pgCourse.followUp}
                  </p>
                </div>
              </StaggerItem>

              {overview.paragraphs.map((paragraph) => (
                <StaggerItem key={paragraph.slice(0, 48)}>
                  <p className="text-body-lg leading-[1.75] text-ink-muted">
                    {paragraph}
                  </p>
                </StaggerItem>
              ))}

              <StaggerItem variants={scaleIn} duration={0.75}>
                <p className="rounded-xl border border-outline/30 bg-surface-container-low px-5 py-4 font-body text-sm leading-relaxed text-ink md:text-base">
                  {overview.hospitals}
                </p>
              </StaggerItem>
            </StaggerGroup>
          </div>

          <div>
            <SectionLabel>{keyFeatures.label}</SectionLabel>
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
                  transition={{ duration: 0.65, ease: EASE_SIGNATURE }}
                  whileHover={{ x: 4 }}
                  className="flex gap-4 rounded-2xl border border-outline/25 bg-surface-container-low p-5 shadow-sm transition-shadow hover:shadow-md"
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
