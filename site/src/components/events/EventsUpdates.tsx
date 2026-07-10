"use client";

import { Globe, Mail, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { EVENTS_UPDATES } from "@/lib/events-content";
import { fadeUp, staggerContainer } from "@/lib/motion";

const ICONS = {
  globe: Globe,
  share: Share2,
  mail: Mail,
} as const;

export function EventsUpdates() {
  return (
    <section className="border-t border-outline/10 bg-mint py-section-sm md:py-section">
      <div className="mx-auto w-full max-w-container-max px-edge text-center md:px-edge-lg">
        <Reveal variants={fadeUp} duration={0.8} amount={0.4}>
          <p className="mx-auto max-w-2xl font-display text-xl italic leading-relaxed text-primary text-balance md:text-2xl">
            &ldquo;{EVENTS_UPDATES.message}&rdquo;
          </p>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={staggerContainer(0.1, 0.2)}
          className="mt-10 flex items-center justify-center gap-5"
        >
          {EVENTS_UPDATES.socials.map(({ label, href, icon }) => {
            const Icon = ICONS[icon];
            return (
              <motion.div key={label} variants={fadeUp}>
                <Link
                  href={href}
                  aria-label={label}
                  className="group flex h-12 w-12 items-center justify-center rounded-full bg-tertiary text-on-tertiary shadow-md shadow-tertiary/20 transition-transform duration-300 hover:scale-110"
                >
                  <Icon
                    size={18}
                    strokeWidth={1.75}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
