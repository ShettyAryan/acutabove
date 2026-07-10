"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StaggerGroup, StaggerItem } from "@/components/about/StaggerGroup";
import { FEATURED_EVENTS, type FeaturedEvent } from "@/lib/events-content";
import { cn } from "@/lib/utils";
import { EASE_SIGNATURE, scaleIn } from "@/lib/motion";

function EventCard({ event }: { event: FeaturedEvent }) {
  const isFlagship = event.flagship;

  return (
    <article
      id={event.id}
      className={cn(
        "group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-500",
        isFlagship
          ? "border-2 border-primary/25 shadow-xl shadow-primary/10 lg:-mt-6"
          : "border border-outline/15 hover:shadow-lg hover:shadow-primary/5"
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.8, ease: EASE_SIGNATURE }}
        >
          <Image
            src={event.image}
            alt={event.alt}
            fill
            sizes="(min-width: 1024px) 30vw, 90vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <span
          className={cn(
            "absolute top-5 font-body text-[10px] uppercase tracking-[0.2em]",
            event.tagTone === "primary"
              ? "right-5 rounded-full bg-primary px-4 py-1.5 text-white shadow-lg"
              : "left-5 rounded-sm bg-white/95 px-3 py-1.5 text-ink shadow-sm backdrop-blur-sm"
          )}
        >
          {event.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-7 md:p-8">
        <h2
          className={cn(
            "font-display text-2xl tracking-tight md:text-[1.75rem]",
            isFlagship ? "font-semibold text-primary" : "text-ink"
          )}
        >
          {event.title}
        </h2>
        {event.subtitle && (
          <p className="mt-1 font-display text-sm italic text-primary/80">
            {event.subtitle}
          </p>
        )}
        <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted md:text-base">
          {event.description}
        </p>

        {isFlagship ? (
          <Button
            href={event.href}
            icon={<ArrowRight size={16} />}
            className="mt-7 w-full sm:w-auto"
          >
            {event.cta}
          </Button>
        ) : (
          <Link
            href={event.href}
            className="group/link mt-7 inline-flex items-center gap-2 self-start font-body text-label uppercase text-primary transition-colors hover:text-primary-light"
          >
            {event.cta}
            <ArrowRight
              size={16}
              className="transition-transform group-hover/link:translate-x-1"
            />
          </Link>
        )}
      </div>
    </article>
  );
}

export function FeaturedEvents() {
  return (
    <section className="bg-background py-section-sm md:py-section">
      <div className="mx-auto w-full max-w-container-max px-edge md:px-edge-lg">
        <StaggerGroup
          className="grid grid-cols-1 items-start gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          stagger={0.14}
          amount={0.15}
        >
          {FEATURED_EVENTS.map((event) => (
            <StaggerItem
              key={event.id}
              variants={scaleIn}
              duration={0.85}
              className={cn(event.flagship && "md:order-none")}
            >
              <EventCard event={event} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
