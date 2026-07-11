"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NICK_OF_TIME } from "@/lib/nick-of-time-content";
import { EASE_SIGNATURE } from "@/lib/motion";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(targetMs: number): TimeLeft {
  const diff = Math.max(0, targetMs - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function CountdownUnit({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center sm:flex-none">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: EASE_SIGNATURE }}
        className="font-display text-[1.65rem] tabular-nums tracking-tight text-white sm:text-4xl md:text-6xl"
      >
        {pad(value)}
      </motion.span>
      <span className="mt-2 font-body text-[9px] uppercase tracking-[0.1em] text-white/50 sm:mt-3 sm:text-[10px] sm:tracking-[0.28em]">
        {label}
      </span>
      <span
        aria-hidden="true"
        className="mt-2 h-0.5 w-5 rounded-full bg-tertiary sm:mt-3 sm:w-8"
      />
    </div>
  );
}

export function NickOfTimeCountdown() {
  const targetMs = new Date(NICK_OF_TIME.eventDate).getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    getTimeLeft(targetMs)
  );

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  return (
    <section className="bg-ink py-section-sm text-white md:py-section">
      <div className="mx-auto w-full max-w-container-max px-edge md:px-edge-lg">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE_SIGNATURE }}
          className="mb-12 text-center font-body text-label uppercase tracking-[0.28em] text-white/55"
        >
          {NICK_OF_TIME.countdown.eyebrow}
        </motion.p>

        <div className="mx-auto flex w-full max-w-3xl items-start justify-between gap-1 sm:justify-center sm:gap-6 md:gap-10">
          <CountdownUnit value={timeLeft.days} label="Days" />
          <span
            aria-hidden="true"
            className="mt-2 hidden h-12 w-px shrink-0 bg-white/15 sm:mt-3 sm:block sm:h-16"
          />
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <span
            aria-hidden="true"
            className="mt-2 hidden h-12 w-px shrink-0 bg-white/15 sm:mt-3 sm:block sm:h-16"
          />
          <CountdownUnit value={timeLeft.minutes} label="Mins" />
          <span
            aria-hidden="true"
            className="mt-2 hidden h-12 w-px shrink-0 bg-white/15 sm:mt-3 sm:block sm:h-16"
          />
          <CountdownUnit value={timeLeft.seconds} label="Secs" />
        </div>
      </div>
    </section>
  );
}
