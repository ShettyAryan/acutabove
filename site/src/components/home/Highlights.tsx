"use client";

import { motion } from "framer-motion";
import { History, GraduationCap, Scissors, Award } from "lucide-react";
import { fadeUp, staggerContainer, EASE_SIGNATURE } from "@/lib/motion";
import {
  HOME_CONTENT,
  type HomeContent,
  type HomeHighlight,
} from "@/lib/home-content";

const ICON_MAP = {
  history: History,
  graduation: GraduationCap,
  scissors: Scissors,
  award: Award,
} as const;

export function Highlights({
  content = HOME_CONTENT.highlights,
}: {
  content?: HomeContent["highlights"];
}) {
  return (
    <section className="border-y border-outline/10 bg-surface py-20">
      <div className="mx-auto w-full max-w-container-max px-edge md:px-edge-lg">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.12)}
          className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-4"
        >
          {content.map((item: HomeHighlight) => {
            const Icon = ICON_MAP[item.icon] ?? History;
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                transition={{ duration: 0.7, ease: EASE_SIGNATURE }}
                whileHover={{ y: -6 }}
                className="group flex flex-col items-center rounded-2xl border border-outline/20 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-lg hover:shadow-primary/5 sm:p-9"
              >
                <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/8 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Icon size={28} strokeWidth={1.75} />
                </span>
                <h3 className="font-display text-2xl text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {item.copy}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
