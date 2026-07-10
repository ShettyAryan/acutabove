"use client";

import { motion } from "framer-motion";
import { History, GraduationCap, Scissors, Award } from "lucide-react";
import { fadeUp, staggerContainer, EASE_SIGNATURE } from "@/lib/motion";

const HIGHLIGHTS = [
  {
    icon: History,
    title: "Est. 2018",
    copy: "A legacy of clinical mentorship and academic rigor.",
  },
  {
    icon: GraduationCap,
    title: "Expert Lectures",
    copy: "Insights from globally recognized surgical specialists.",
  },
  {
    icon: Scissors,
    title: "Hands-On Practice",
    copy: "Refining technical skill through controlled simulations.",
  },
  {
    icon: Award,
    title: "Nick of Time",
    copy: "Our premier annual flagship surgical conference.",
  },
];

export function Highlights() {
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
          {HIGHLIGHTS.map(({ icon: Icon, title, copy }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              transition={{ duration: 0.7, ease: EASE_SIGNATURE }}
              whileHover={{ y: -6 }}
              className="group flex flex-col items-center rounded-2xl border border-outline/20 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-lg hover:shadow-primary/5 sm:p-9"
            >
              <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/8 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Icon size={28} strokeWidth={1.75} />
              </span>
              <h3 className="font-display text-2xl text-ink">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {copy}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
