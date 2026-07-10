"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ChapterHeader, StatBlock } from "@/components/about/shared";
import { CHAPTER_MAHE } from "@/lib/about-content";
import { scaleIn } from "@/lib/motion";

export function ChapterMahe() {
  return (
    <section className="overflow-hidden bg-background py-section-sm md:py-section">
      <div className="mx-auto w-full max-w-container-max px-edge md:px-edge-lg">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal amount={0.3}>
            <ChapterHeader
              number={CHAPTER_MAHE.number}
              chapter={CHAPTER_MAHE.chapter}
              title={CHAPTER_MAHE.title}
              subtitle={CHAPTER_MAHE.subtitle}
            />
            <div className="space-y-6 text-body-lg leading-[1.75] text-ink-muted">
              {CHAPTER_MAHE.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-outline/30 pt-10 sm:flex sm:flex-wrap sm:gap-x-12">
              {CHAPTER_MAHE.stats.map((stat) => (
                <StatBlock key={stat.label} {...stat} className="text-ink" />
              ))}
            </div>
          </Reveal>

          <Reveal
            variants={scaleIn}
            duration={0.9}
            amount={0.2}
            className="group relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-2xl lg:aspect-[3/4]"
          >
            <Image
              src={CHAPTER_MAHE.image.src}
              alt={CHAPTER_MAHE.image.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover transition-transform duration-[1400ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 max-w-[85%] bg-primary p-6 text-white shadow-xl md:p-8">
              <p className="font-display text-lg italic leading-snug md:text-xl">
                &ldquo;{CHAPTER_MAHE.quote}&rdquo;
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
