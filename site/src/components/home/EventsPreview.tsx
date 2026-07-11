"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { EASE_SIGNATURE } from "@/lib/motion";

const EVENTS = [
  {
    slug: "axion-2026",
    title: "Axion 2026",
    date: "Feb 2026",
    blurb: "The international undergraduate surgical meet.",
    image:
      "/images/axion.jpeg",
    alt: "Delegates seated in an auditorium for a surgical conference",
    flagship: false,
  },
  {
    slug: "a-nick-of-time",
    title: "Nick of Time",
    date: "Registrations open",
    blurb:
      "Our annual flagship surgical conference — the premium experience.",
    image:
      "/images/image2.jpeg",
    alt: "Surgical instruments laid out for a live demonstration",
    flagship: true,
  },
  {
    slug: "Erevna",
    title: "Erevna",
    date: "May 2026",
    blurb: "Specialised neuro-surgical workshop series for advanced trainees.",
    image:
      "/images/erevna.jpg",
    alt: "A neurosurgery workshop in progress",
    flagship: false,
  },
];

export function EventsPreview() {
  return (
    <section className="bg-surface py-section-sm md:py-section">
      <div className="mx-auto w-full max-w-container-max px-edge md:px-edge-lg">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-headline-lg text-ink">
              Upcoming Calendar
            </h2>
            <p className="mt-3 text-ink-muted">
              Join us for a season of unmatched clinical excellence.
            </p>
          </div>
          <Link
            href="/events"
            className="hidden shrink-0 border-b-2 border-primary/20 pb-1 font-body text-label uppercase text-primary transition-colors hover:border-primary md:block"
          >
            View all events
          </Link>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {EVENTS.map((event, i) => (
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
              <Link
                href={
                  event.flagship ? "/event/nickoftime" : "/events"
                }
                className="group block"
              >
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
          href="/events"
          className="mt-12 block border-b-2 border-primary/20 pb-1 text-center font-body text-label uppercase text-primary transition-colors hover:border-primary md:hidden"
        >
          View all events
        </Link>
      </div>
    </section>
  );
}
