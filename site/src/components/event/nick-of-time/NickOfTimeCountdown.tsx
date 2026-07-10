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
  large = false,
}: {
  value: number;
  label: string;
  large?: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: EASE_SIGNATURE }}
        className={`font-display tabular-nums tracking-tight text-white ${
          large ? "text-6xl md:text-7xl" : "text-5xl md:text-6xl"
        }`}
      >
        {pad(value)}
      </motion.span>
      <span className="mt-3 font-body text-[10px] uppercase tracking-[0.28em] text-white/50">
        {label}
      </span>
      <span
        aria-hidden="true"
        className="mt-3 h-0.5 w-8 rounded-full bg-tertiary"
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

        <div className="flex flex-col items-center gap-10">
          <div className="flex w-full max-w-3xl items-center justify-center gap-6 md:gap-10">
            <CountdownUnit value={timeLeft.days} label="Days" />
            <span
              aria-hidden="true"
              className="hidden h-16 w-px bg-white/15 md:block"
            />
            <CountdownUnit value={timeLeft.hours} label="Hours" />
            <span
              aria-hidden="true"
              className="hidden h-16 w-px bg-white/15 md:block"
            />
            <CountdownUnit value={timeLeft.minutes} label="Mins" />
          </div>
          <CountdownUnit value={timeLeft.seconds} label="Secs" large />
        </div>
      </div>
    </section>
  );
}
