"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ScissorCutAnimation } from "@/components/ui/ScissorCut";
import { fadeUp, scaleIn, EASE_SIGNATURE } from "@/lib/motion";
import { HOME_CONTENT, type HomeContent } from "@/lib/home-content";

export function About({
  content = HOME_CONTENT.about,
}: {
  content?: HomeContent["about"];
}) {
  return (
    <section className="overflow-hidden bg-background py-16 md:py-20">
      <div className="mx-auto w-full max-w-container-max px-edge md:px-edge-lg">
        <Reveal
          variants={fadeUp}
          duration={0.8}
          amount={0.2}
          className="mb-10 md:mb-14"
        >
          <h2 className="font-display text-headline-lg text-ink">
            {content.sectionTitle}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal className="w-full max-w-xl lg:max-w-none" amount={0.3}>
            <p className="mb-4 font-body text-label uppercase text-primary">
              {content.eyebrow}
            </p>
            <h3 className="mb-5 font-display text-headline-md text-ink text-balance">
              {content.headline}
            </h3>
            <p className="text-body-lg leading-relaxed text-ink-muted">
              {content.body}
            </p>
            <div className="mt-6 flex w-full flex-col items-stretch gap-6">
              <Link
                href={content.linkHref}
                className="group inline-flex items-center gap-3 self-start border-b-2 border-primary/20 pb-2 font-body text-label uppercase text-primary transition-colors hover:border-primary"
              >
                {content.linkLabel}
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1.5"
                />
              </Link>
              <ScissorCutAnimation
                fullWidth
                speed={1.4}
                travelDuration={6}
                threadColor="#0f5238"
                sparkColor="#ffdbce"
              />
              <Reveal
                variants={scaleIn}
                duration={0.9}
                amount={0.2}
                className="group relative aspect-[16/10] w-full overflow-hidden rounded-xl shadow-md"
              >
                <Image
                  src={content.imageSide.src}
                  alt={content.imageSide.alt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                />
              </Reveal>
            </div>
          </Reveal>

          <div className="relative w-full">
            <motion.div
              aria-hidden="true"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: EASE_SIGNATURE,
              }}
              className="absolute -right-6 -top-6 -z-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
            />

            <Reveal
              variants={scaleIn}
              duration={0.9}
              amount={0.15}
              className="group relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl shadow-2xl lg:mx-0 lg:max-w-none"
            >
              <Image
                src={content.imageMain.src}
                alt={content.imageMain.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover transition-transform duration-[1400ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-x-4 bottom-6 text-white sm:inset-x-8 sm:bottom-8">
                <p className="font-display text-lg italic leading-snug sm:text-xl md:text-2xl">
                  &ldquo;{content.quote}&rdquo;
                </p>
                <div className="mb-4 mt-4 h-1 w-14 bg-white" />
                <p className="font-body text-label uppercase text-white/80">
                  {content.caption}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
