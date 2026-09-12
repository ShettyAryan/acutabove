"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ChapterHeader } from "@/components/about/shared";
import { StaggerGroup, StaggerItem } from "@/components/about/StaggerGroup";
import { CHAPTER_KMC } from "@/lib/about-content";
import { EASE_SIGNATURE, fadeLeft, scaleIn, staggerContainer } from "@/lib/motion";

export function ChapterKmc({
  data = CHAPTER_KMC,
}: {
  data?: typeof CHAPTER_KMC;
}) {
  return (
    <section className="overflow-hidden bg-mint py-section-sm md:py-section">
      <div className="mx-auto w-full max-w-container-max px-edge md:px-edge-lg">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer(0.1, 0.1)}
            className="order-2 grid grid-cols-2 gap-3 lg:order-1"
          >
            {data.images.map((image, i) => (
              <motion.div
                key={image.src}
                variants={scaleIn}
                transition={{ duration: 0.75, ease: EASE_SIGNATURE }}
                whileHover={{ y: -4 }}
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
              </motion.div>
            ))}
          </motion.div>

          <div className="order-1 lg:order-2">
            <ChapterHeader
              number={data.number}
              chapter={data.chapter}
              title={data.title}
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
            <Reveal variants={fadeLeft} duration={0.7} delay={0.2} amount={0.4}>
              <Link
                href={data.galleryLink.href}
                className="group mt-10 inline-flex items-center gap-3 border-b-2 border-primary/20 pb-2 font-body text-label uppercase text-primary transition-colors hover:border-primary"
              >
                {data.galleryLink.label}
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
