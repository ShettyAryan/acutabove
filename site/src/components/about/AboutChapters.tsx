"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChapterMahe } from "@/components/about/ChapterMahe";
import { ChapterKmc } from "@/components/about/ChapterKmc";
import { ChapterSurgery } from "@/components/about/ChapterSurgery";
import { ChapterCutAbove } from "@/components/about/ChapterCutAbove";
import { cn } from "@/lib/utils";
import { EASE_SIGNATURE } from "@/lib/motion";
import type { AboutContent } from "@/lib/cms/about";
import {
  ABOUT_HERO,
  CHAPTER_CUT_ABOVE,
  CHAPTER_KMC,
  CHAPTER_MAHE,
  CHAPTER_SURGERY,
} from "@/lib/about-content";

type AboutChapterTab = "mahe" | "kmc" | "surgery" | "cut-above";

const CHAPTER_TABS: { id: AboutChapterTab; label: string; number: string }[] = [
  { id: "mahe", label: "About MAHE", number: "01" },
  { id: "kmc", label: "About KMC", number: "02" },
  { id: "surgery", label: "Department of Surgery", number: "03" },
  { id: "cut-above", label: "A Cut Above", number: "04" },
];

const DEFAULT_ABOUT: AboutContent = {
  hero: ABOUT_HERO,
  chapterMahe: CHAPTER_MAHE,
  chapterKmc: CHAPTER_KMC,
  chapterSurgery: CHAPTER_SURGERY,
  chapterCutAbove: CHAPTER_CUT_ABOVE,
};

export function AboutChapters({
  content = DEFAULT_ABOUT,
}: {
  content?: AboutContent;
}) {
  const [active, setActive] = useState<AboutChapterTab>("mahe");

  return (
    <div>
      <div className="sticky top-20 z-40 border-b border-outline/15 bg-background/95 backdrop-blur-md">
        <div className="mx-auto w-full max-w-container-max px-edge py-4 md:px-edge-lg md:py-5">
          <div
            role="tablist"
            aria-label="About chapters"
            className="flex flex-col gap-2 lg:flex-row lg:justify-center lg:gap-0 lg:rounded-full lg:border lg:border-outline/25 lg:bg-surface-container-low lg:p-1.5"
          >
            {CHAPTER_TABS.map((tab) => {
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(tab.id)}
                  className={cn(
                    "relative flex min-h-11 items-center justify-center gap-2 rounded-full px-4 py-3 font-body text-[0.65rem] uppercase tracking-[0.1em] transition-colors duration-300 sm:text-label sm:tracking-[0.14em] lg:flex-1 lg:px-4",
                    isActive
                      ? "bg-primary text-on-primary shadow-md shadow-primary/20 lg:bg-transparent lg:text-on-primary lg:shadow-none"
                      : "border border-outline/30 text-ink-muted hover:border-primary/40 hover:text-primary lg:border-0"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="about-chapter-tab-pill"
                      className="absolute inset-0 hidden rounded-full bg-primary shadow-md shadow-primary/20 lg:block"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                  <span className="relative z-10 opacity-60">{tab.number}</span>
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          role="tabpanel"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: EASE_SIGNATURE }}
        >
          {active === "mahe" && <ChapterMahe data={content.chapterMahe} />}
          {active === "kmc" && <ChapterKmc data={content.chapterKmc} />}
          {active === "surgery" && (
            <ChapterSurgery data={content.chapterSurgery} />
          )}
          {active === "cut-above" && (
            <ChapterCutAbove data={content.chapterCutAbove} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
