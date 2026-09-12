"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ChapterHeader, StatBlock } from "@/components/about/shared";
import { StaggerGroup, StaggerItem } from "@/components/about/StaggerGroup";
import { CHAPTER_MAHE } from "@/lib/about-content";
import { EASE_SIGNATURE, fadeRight } from "@/lib/motion";

export function ChapterMahe({
  data = CHAPTER_MAHE,
}: {
  data?: typeof CHAPTER_MAHE;
}) {
  return (
    <section className="overflow-hidden bg-background py-section-sm md:py-section">
      <div className="mx-auto w-full max-w-container-max px-edge md:px-edge-lg">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <ChapterHeader
              number={data.number}
              chapter={data.chapter}
              title={data.title}
              subtitle={data.subtitle}
            />
            <StaggerGroup className="space-y-6" stagger={0.08}>
              {data.body.map((paragraph) => (
                <StaggerItem key={paragraph.slice(0, 40)}>
                  <p className="text-body-lg leading-[1.75] text-ink-muted">
                    {paragraph}
                  </p>
                </StaggerItem>
              ))}
            </StaggerGroup>
            <StaggerGroup
              className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 border-t border-outline/30 pt-10 sm:flex sm:flex-wrap sm:gap-x-12"
              stagger={0.1}
              delay={0.05}
            >
              {data.stats.map((stat) => (
                <StaggerItem key={stat.label}>
                  <StatBlock {...stat} className="text-ink" />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          <Reveal
            variants={fadeRight}
            duration={1}
            amount={0.15}
            className="group relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-2xl lg:aspect-[3/4]"
          >
            <Image
              src={data.image.src}
              alt={data.image.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover transition-transform duration-[1400ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: 0.35, ease: EASE_SIGNATURE }}
              className="absolute bottom-0 left-0 max-w-[85%] bg-primary p-6 text-white shadow-xl md:p-8"
            >
              <p className="font-display text-lg italic leading-snug md:text-xl">
                &ldquo;{data.quote}&rdquo;
              </p>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
