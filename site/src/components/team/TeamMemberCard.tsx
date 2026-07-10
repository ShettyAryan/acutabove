"use client";

import Image from "next/image";
import { User } from "lucide-react";
import { motion } from "framer-motion";
import type { TeamMember } from "@/lib/team-content";
import { EASE_SIGNATURE, fadeUp, scaleIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

type TeamMemberCardProps = {
  member: TeamMember;
  index?: number;
};

export function TeamMemberCard({ member, index = 0 }: TeamMemberCardProps) {
  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      transition={{
        duration: 0.65,
        delay: Math.min(index * 0.04, 0.35),
        ease: EASE_SIGNATURE,
      }}
      whileHover={{ y: -4 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-outline/20 bg-white shadow-sm transition-shadow duration-500 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-container-low">
        {member.image ? (
          <motion.div
            className="absolute inset-0"
            variants={scaleIn}
            transition={{ duration: 0.8, ease: EASE_SIGNATURE }}
          >
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="(min-width: 1024px) 22vw, (min-width: 640px) 40vw, 90vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-primary/5 text-primary/35">
            <User size={48} strokeWidth={1.25} />
            <span className="font-body text-[10px] uppercase tracking-[0.2em]">
              Photo forthcoming
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col px-4 py-4 text-center sm:px-5 sm:py-5">
        <h3 className="font-display text-lg leading-snug text-ink sm:text-xl md:text-[1.35rem]">
          {member.name}
        </h3>
        <p
          className={cn(
            "mt-2 font-body text-[10px] uppercase tracking-[0.1em] text-primary sm:text-[11px] sm:tracking-[0.18em]"
          )}
        >
          {member.designation}
        </p>
      </div>
    </motion.article>
  );
}
