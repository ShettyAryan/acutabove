"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Scissors } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/about/StaggerGroup";
import {
  NICK_OF_TIME,
  programPath,
  type NickOfTimeProgram,
} from "@/lib/nick-of-time-content";
import { EASE_SIGNATURE, scaleIn } from "@/lib/motion";

function ProgramCard({ program }: { program: NickOfTimeProgram }) {
  return (
    <StaggerItem variants={scaleIn} duration={0.85}>
      <Link
        href={programPath(program.slug)}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-outline/20 bg-white shadow-sm transition-shadow duration-500 hover:shadow-lg hover:shadow-primary/5"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: EASE_SIGNATURE }}
          >
            <Image
              src={program.image}
              alt={program.alt}
              fill
              sizes="(min-width: 768px) 30vw, 90vw"
              className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
            />
          </motion.div>
          <span className="absolute left-5 top-5 font-body text-[10px] uppercase tracking-[0.22em] text-primary">
            {program.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6 md:p-7">
          <h3 className="font-display text-xl font-semibold text-ink transition-colors group-hover:text-primary md:text-2xl">
            {program.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted line-clamp-3">
            {program.description[0]}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 font-body text-label uppercase text-primary">
            Learn More
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </StaggerItem>
  );
}

type NickOfTimeProgramsProps = {
  programsList: NickOfTimeProgram[];
  content?: typeof NICK_OF_TIME.programs;
};

export function NickOfTimePrograms({
  programsList,
  content = NICK_OF_TIME.programs,
}: NickOfTimeProgramsProps) {
  return (
    <section
      id={content.id}
      className="scroll-mt-24 overflow-hidden bg-surface py-section-sm md:py-section"
    >
      <div className="mx-auto w-full max-w-container-max px-edge md:px-edge-lg">
        <Reveal amount={0.3} className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="font-display text-[2.25rem] font-bold leading-[1.1] tracking-tight text-primary sm:text-[3rem] md:text-[3.5rem]">
            {content.title}{" "}
            <span className="italic">{content.titleEmphasis}</span>
          </h2>
          <p className="mt-5 text-body-lg leading-relaxed text-ink-muted">
            {content.subtitle}
          </p>
        </Reveal>

        {content.groups.map((group) => {
          const items = programsList.filter((p) => p.group === group.id);
          return (
            <div key={group.id} className="mb-16 last:mb-0">
              <Reveal amount={0.3} className="mb-8">
                <h3 className="font-body text-label uppercase tracking-[0.22em] text-primary">
                  {group.label}
                </h3>
              </Reveal>
              <StaggerGroup
                className={`grid grid-cols-1 gap-7 ${
                  group.id === "workshops"
                    ? "md:grid-cols-2"
                    : group.id === "formal"
                      ? "max-w-2xl"
                      : "md:grid-cols-2"
                }`}
                stagger={0.1}
                amount={0.1}
              >
                {items.map((item) => (
                  <ProgramCard key={item.slug} program={item} />
                ))}
              </StaggerGroup>
            </div>
          );
        })}

        <Reveal amount={0.4} className="mt-16">
          <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
            <Scissors
              className="text-primary/30"
              size={28}
              strokeWidth={1.5}
            />
            <p className="font-display text-xl italic leading-snug text-primary md:text-2xl">
              &ldquo;{content.quote}&rdquo;
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
