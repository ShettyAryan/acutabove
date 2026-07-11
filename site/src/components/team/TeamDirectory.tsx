"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TeamMemberCard } from "@/components/team/TeamMemberCard";
import {
  TEAM_TABS,
  type TeamMember,
  type TeamTab,
} from "@/lib/team-content";
import { cn } from "@/lib/utils";
import { EASE_SIGNATURE, fadeUp } from "@/lib/motion";

type TeamDirectoryProps = {
  membersByTab: Record<TeamTab, TeamMember[]>;
};

export function TeamDirectory({ membersByTab }: TeamDirectoryProps) {
  const [active, setActive] = useState<TeamTab>("leadership");
  const members = membersByTab[active] ?? [];

  return (
    <section className="bg-background py-section-sm md:py-section">
      <div className="mx-auto w-full max-w-container-max px-edge md:px-edge-lg">
        <div
          role="tablist"
          aria-label="Team categories"
          className="mx-auto mb-14 flex max-w-3xl flex-col gap-2 lg:flex-row lg:justify-center lg:gap-0 lg:rounded-full lg:border lg:border-outline/25 lg:bg-surface-container-low lg:p-1.5"
        >
          {TEAM_TABS.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "relative min-h-11 rounded-full px-4 py-3 font-body text-[0.65rem] uppercase tracking-[0.1em] transition-colors duration-300 sm:text-label sm:tracking-[0.14em] lg:px-5",
                  isActive
                    ? "bg-primary text-on-primary shadow-md shadow-primary/20 lg:bg-transparent lg:text-on-primary lg:shadow-none"
                    : "border border-outline/30 text-ink-muted hover:border-primary/40 hover:text-primary lg:border-0"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="team-tab-pill"
                    className="absolute inset-0 hidden rounded-full bg-primary shadow-md shadow-primary/20 lg:block"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            role="tabpanel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EASE_SIGNATURE }}
          >
            {members.length === 0 ? (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.7, ease: EASE_SIGNATURE }}
                className="mx-auto max-w-xl rounded-2xl border border-dashed border-primary/25 bg-mint/60 px-8 py-16 text-center"
              >
                <p className="font-display text-2xl text-ink">Coming soon</p>
                <p className="mt-4 text-body-lg leading-relaxed text-ink-muted">
                  The A Cut Above student team roster will appear here once the
                  details are finalized.
                </p>
              </motion.div>
            ) : (
              <div
                className={cn(
                  "grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:gap-8",
                  active === "leadership"
                    ? "md:grid-cols-3 xl:grid-cols-5"
                    : "md:grid-cols-3 xl:grid-cols-4"
                )}
              >
                {members.map((member, i) => (
                  <TeamMemberCard key={member.id} member={member} index={i} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
