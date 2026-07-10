"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/about/StaggerGroup";
import { NICK_OF_TIME } from "@/lib/nick-of-time-content";
import { fadeRight, scaleIn } from "@/lib/motion";

export function NickOfTimeHeritage() {
  const { heritage } = NICK_OF_TIME;

  return (
    <section className="overflow-hidden bg-background py-section-sm md:py-section">
      <div className="mx-auto w-full max-w-container-max px-edge md:px-edge-lg">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal
            variants={scaleIn}
            duration={0.9}
            amount={0.2}
            className="group relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-outline/30 shadow-lg lg:aspect-[5/4]"
          >
            <Image
              src={heritage.image.src}
              alt={heritage.image.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover grayscale transition-all duration-[1400ms] group-hover:grayscale-0"
            />
          </Reveal>

          <div>
            <Reveal variants={fadeRight} duration={0.85} amount={0.25}>
              <h2 className="font-display text-[2.25rem] font-bold leading-[1.1] tracking-tight text-ink text-balance sm:text-[2.75rem] md:text-[3.25rem]">
                {heritage.title}
              </h2>
            </Reveal>
            <StaggerGroup className="mt-8 space-y-6" stagger={0.1}>
              {heritage.body.map((paragraph) => (
                <StaggerItem key={paragraph.slice(0, 40)}>
                  <p className="text-body-lg leading-[1.75] text-ink-muted">
                    {paragraph}
                  </p>
                </StaggerItem>
              ))}
            </StaggerGroup>
            <Reveal variants={fadeRight} duration={0.7} delay={0.15} amount={0.4}>
              <Link
                href={heritage.legacyLink.href}
                className="group mt-10 inline-flex items-center gap-3 border-b-2 border-primary/20 pb-2 font-body text-label uppercase text-primary transition-colors hover:border-primary"
              >
                {heritage.legacyLink.label}
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1.5"
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
