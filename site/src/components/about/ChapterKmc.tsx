"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ChapterHeader } from "@/components/about/shared";
import { CHAPTER_KMC } from "@/lib/about-content";
import { scaleIn } from "@/lib/motion";

export function ChapterKmc() {
  return (
    <section className="overflow-hidden bg-mint py-section-sm md:py-section">
      <div className="mx-auto w-full max-w-container-max px-edge md:px-edge-lg">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal
            variants={scaleIn}
            duration={0.9}
            amount={0.2}
            className="order-2 grid grid-cols-2 gap-3 lg:order-1"
          >
            {CHAPTER_KMC.images.map((image, i) => (
              <div
                key={image.src}
                className={`group relative overflow-hidden rounded-2xl shadow-md ${
                  i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  className={`object-cover transition-transform duration-[1400ms] group-hover:scale-105 ${
                    i >= 2 ? "grayscale" : ""
                  }`}
                />
              </div>
            ))}
          </Reveal>

          <Reveal amount={0.3} className="order-1 lg:order-2">
            <ChapterHeader
              number={CHAPTER_KMC.number}
              chapter={CHAPTER_KMC.chapter}
              title={CHAPTER_KMC.title}
            />
            <div className="space-y-6 text-body-lg leading-[1.75] text-ink-muted">
              {CHAPTER_KMC.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <Link
              href={CHAPTER_KMC.galleryLink.href}
              className="group mt-10 inline-flex items-center gap-3 border-b-2 border-primary/20 pb-2 font-body text-label uppercase text-primary transition-colors hover:border-primary"
            >
              {CHAPTER_KMC.galleryLink.label}
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1.5"
              />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
