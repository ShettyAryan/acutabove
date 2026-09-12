"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { EASE_SIGNATURE } from "@/lib/motion";
import { HOME_CONTENT, type HomeContent } from "@/lib/home-content";

export function EventsPreview({
  content = HOME_CONTENT.eventsPreview,
}: {
  content?: HomeContent["eventsPreview"];
}) {
  return (
    <section className="bg-surface py-section-sm md:py-section">
      <div className="mx-auto w-full max-w-container-max px-edge md:px-edge-lg">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-headline-lg text-ink">
              {content.title}
            </h2>
            <p className="mt-3 text-ink-muted">{content.subtitle}</p>
          </div>
          <Link
            href={content.viewAllHref}
            className="hidden shrink-0 border-b-2 border-primary/20 pb-1 font-body text-label uppercase text-primary transition-colors hover:border-primary md:block"
          >
            {content.viewAllLabel}
          </Link>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {content.events.map((event, i) => (
            <motion.div
              key={event.slug}
              initial={{ opacity: 0, y: event.flagship ? 64 : 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: EASE_SIGNATURE,
              }}
              className={cn(event.flagship && "lg:-mt-8")}
            >
              <Link href={event.href} className="group block">
                <div
                  className={cn(
                    "relative mb-7 aspect-[3/4] overflow-hidden rounded-2xl shadow-md",
                    event.flagship && "border-4 border-primary/10 shadow-2xl"
                  )}
                >
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.8, ease: EASE_SIGNATURE }}
                  >
                    <Image
                      src={event.image}
                      alt={event.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 90vw"
                      className="object-cover"
                    />
                  </motion.div>

                  {event.flagship ? (
                    <span className="absolute right-6 top-6 animate-glow-pulse rounded-full bg-primary px-4 py-1.5 font-body text-[10px] uppercase tracking-[0.2em] text-white shadow-xl">
                      Flagship
                    </span>
                  ) : (
                    <span className="absolute left-6 top-6 rounded-full bg-white/90 px-3.5 py-1.5 font-body text-[10px] uppercase tracking-widest text-ink backdrop-blur">
                      {event.date}
                    </span>
                  )}
                </div>

                <h3
                  className={cn(
                    "font-display text-2xl transition-colors",
                    event.flagship
                      ? "font-semibold text-primary"
                      : "text-ink group-hover:text-primary"
                  )}
                >
                  {event.title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-muted">
                  {event.blurb}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <Link
          href={content.viewAllHref}
          className="mt-12 block border-b-2 border-primary/20 pb-1 text-center font-body text-label uppercase text-primary transition-colors hover:border-primary md:hidden"
        >
          {content.viewAllLabel}
        </Link>
      </div>
    </section>
  );
}
