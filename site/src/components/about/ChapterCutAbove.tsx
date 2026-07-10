"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ChapterHeader, StatBlock } from "@/components/about/shared";
import { CHAPTER_CUT_ABOVE } from "@/lib/about-content";
import { scaleIn } from "@/lib/motion";

export function ChapterCutAbove() {
  return (
    <section className="overflow-hidden bg-primary py-section-sm text-white md:py-section">
      <div className="mx-auto w-full max-w-container-max px-edge md:px-edge-lg">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal
            variants={scaleIn}
            duration={0.9}
            amount={0.2}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative flex aspect-square w-full max-w-sm items-center justify-center rounded-3xl border border-white/10 bg-primary-container/40 p-12 shadow-2xl">
              <Image
                src={CHAPTER_CUT_ABOVE.logo.src}
                alt={CHAPTER_CUT_ABOVE.logo.alt}
                width={280}
                height={280}
                className="h-auto w-full max-w-[220px] object-contain md:max-w-[260px]"
              />
            </div>
          </Reveal>

          <Reveal amount={0.3}>
            <ChapterHeader
              number={CHAPTER_CUT_ABOVE.number}
              chapter={CHAPTER_CUT_ABOVE.chapter}
              title={CHAPTER_CUT_ABOVE.title}
              dark
            />
            <div className="space-y-6 text-body-lg leading-[1.75] text-white/80">
              {CHAPTER_CUT_ABOVE.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-10 flex gap-12 border-t border-white/15 pt-8">
              {CHAPTER_CUT_ABOVE.stats.map((stat) => (
                <StatBlock
                  key={stat.label}
                  {...stat}
                  className="text-white"
                />
              ))}
            </div>
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
    </section>
  );
}
