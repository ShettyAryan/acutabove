"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/about/StaggerGroup";
import { StatBlock } from "@/components/about/shared";
import { NICK_OF_TIME } from "@/lib/nick-of-time-content";
import { EASE_SIGNATURE } from "@/lib/motion";

/** Scattered collage tiles — positions are intentional “random” placements. */
const COLLAGE_LAYOUT = [
  {
    className:
      "left-[-5%] top-[4%] h-48 w-36 -rotate-[14deg] sm:h-56 sm:w-44 md:h-72 md:w-56",
  },
  {
    className:
      "right-[-4%] top-[2%] h-40 w-52 rotate-[10deg] sm:h-52 sm:w-64 md:h-64 md:w-80",
  },
  {
    className:
      "bottom-[16%] left-[-3%] h-40 w-48 rotate-[8deg] sm:h-48 sm:w-60 md:bottom-[12%] md:h-60 md:w-72",
  },
  {
    className:
      "bottom-[10%] right-[-5%] h-48 w-36 -rotate-[9deg] sm:h-56 sm:w-44 md:h-72 md:w-56",
  },
  {
    className:
      "left-[6%] top-[40%] hidden h-40 w-48 -rotate-[6deg] sm:block md:left-[2%] md:h-52 md:w-64",
  },
  {
    className:
      "right-[4%] top-[36%] hidden h-44 w-36 rotate-[12deg] sm:block md:right-[1%] md:h-56 md:w-44",
  },
  {
    className:
      "left-[16%] bottom-[2%] hidden h-36 w-44 rotate-[4deg] lg:block",
  },
  {
    className:
      "right-[14%] bottom-[1%] hidden h-36 w-48 -rotate-[7deg] lg:block",
  },
] as const;

const DEFAULT_COLLAGE = [
  { src: "/images/image1.jpeg", alt: "Nick of Time collage image 1" },
  { src: "/images/image2.jpeg", alt: "Nick of Time collage image 2" },
  { src: "/images/image3.jpeg", alt: "Nick of Time collage image 3" },
  { src: "/images/image4.jpeg", alt: "Nick of Time collage image 4" },
  { src: "/images/axion.jpeg", alt: "Nick of Time collage image 5" },
  { src: "/images/erevna.jpg", alt: "Nick of Time collage image 6" },
  { src: "/images/vertical-cut.jpeg", alt: "Nick of Time collage image 7" },
  { src: "/images/mahe.jpg", alt: "Nick of Time collage image 8" },
];

export function NickOfTimeAbout({
  content = NICK_OF_TIME.about,
  collage = DEFAULT_COLLAGE,
}: {
  content?: typeof NICK_OF_TIME.about;
  collage?: { src: string; alt: string }[];
}) {
  const tiles = COLLAGE_LAYOUT.map((layout, i) => ({
    ...layout,
    src: collage[i]?.src ?? DEFAULT_COLLAGE[i]?.src ?? "",
    alt: collage[i]?.alt ?? "",
  })).filter((tile) => tile.src);

  return (
    <section className="relative overflow-hidden bg-mint py-section-sm md:py-section">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none"
      >
        {tiles.map((tile, i) => (
          <motion.div
            key={`${tile.src}-${i}`}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: 0.9,
              delay: 0.06 * i,
              ease: EASE_SIGNATURE,
            }}
            className={`absolute overflow-hidden rounded-sm border border-white/40 shadow-md ${tile.className}`}
          >
            <Image
              src={tile.src}
              alt=""
              fill
              sizes="220px"
              className="object-cover opacity-[0.42] grayscale contrast-110"
            />
          </motion.div>
        ))}
        {/* Soft veil so copy stays readable over the collage */}
        <div className="absolute inset-0 bg-mint/55 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,244,239,0.45)_0%,transparent_72%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-container-max px-edge md:px-edge-lg">
        <Reveal amount={0.25} className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[2rem] font-bold leading-[1.1] tracking-tight text-ink text-balance sm:text-[2.75rem] md:text-[3.25rem]">
            {content.title}
          </h2>
        </Reveal>

        <StaggerGroup
          className="mx-auto mt-10 max-w-3xl space-y-6"
          stagger={0.08}
        >
          {content.body.map((paragraph) => (
            <StaggerItem key={paragraph.slice(0, 48)}>
              <p className="text-body-lg leading-[1.75] text-ink-muted">
                {paragraph}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <StaggerGroup
          className="mx-auto mt-14 flex max-w-2xl flex-wrap justify-center gap-x-12 gap-y-8 border-t border-primary/15 pt-10"
          stagger={0.1}
        >
          {content.stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <StatBlock {...stat} className="text-center text-ink" />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
