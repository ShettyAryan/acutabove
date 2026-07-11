"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronsDown } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { wipeReveal, fadeUp, EASE_SIGNATURE } from "@/lib/motion";

const SLIDES = [
  {
    src: "/images/image1.jpeg",
    alt: "Surgical residents in a hands-on training session",
  },
  {
    src: "/images/image2.jpeg",
    alt: "Delegates gathered at a past Nick of Time conference",
  },
  {
    src: "/images/image3.jpeg",
    alt: "Students practicing suturing technique on a workshop bench",
  },
  {
    src: "/images/image4.jpeg",
    alt: "A packed lecture hall during a conference session",
  },

];

export function Hero() {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100dvh] min-h-[100svh] w-full items-center justify-center overflow-hidden bg-ink"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY, scale: bgScale }}
      >
        <AnimatePresence>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <Image
              src={SLIDES[index].src}
              alt={SLIDES[index].alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/70 via-black/45 to-black/50" />

      <div className="relative z-10 flex h-full max-w-5xl flex-col items-center justify-center px-edge pb-20 pt-20 text-center sm:pb-16">
        <Reveal variants={fadeUp} duration={0.6} amount={0.6} className="mb-5 sm:mb-8">
          <Link
            href="/event/nickoftime"
            className="group flex max-w-[min(100%,24rem)] items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 backdrop-blur-md transition-colors hover:bg-white/20 sm:max-w-none sm:gap-3 sm:px-6 sm:py-3"
          >
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-3 w-3 animate-glow-pulse rounded-full bg-white" />
            </span>
            <span className="font-body text-sm uppercase tracking-[0.16em] text-white sm:text-base sm:tracking-[0.2em]">
              Nick of Time is here
            </span>
            <ArrowRight
              size={18}
              className="shrink-0 text-white transition-transform group-hover:translate-x-1"
            />
          </Link>
        </Reveal>

        <Reveal
          variants={wipeReveal}
          duration={1.1}
          delay={0.15}
          onMount
          className="overflow-hidden"
        >
          <h1 className="font-display text-[2.75rem] leading-[0.98] tracking-tight drop-shadow-2xl text-[#FFDBCE] sm:text-[4.5rem] md:text-display-xl">
            A Cut Above
          </h1>
        </Reveal>

        <Reveal
          variants={fadeUp}
          duration={0.7}
          amount={0.6}
          delay={0.55}
          className="mx-auto mt-5 max-w-2xl sm:mt-6"
        >
          <p className="text-base text-balance leading-relaxed text-white/90 drop-shadow-lg sm:text-body-lg">
            Where precision meets purpose — the surgical society of KMC
            Mangalore, cultivating the next generation of surgical leaders
            through excellence and innovation.
          </p>
        </Reveal>

        <Reveal
          variants={fadeUp}
          duration={0.7}
          amount={0.6}
          delay={0.75}
          className="mt-8 flex w-full flex-col items-stretch gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:items-center sm:gap-4"
        >
          <Button href="/events" icon={<ArrowRight size={16} />} className="w-full sm:w-auto">
            Explore Events
          </Button>
          <Button href="/about" variant="outline" className="w-full sm:w-auto">
            About the Club
          </Button>
        </Reveal>
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/50 sm:bottom-8"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: EASE_SIGNATURE }}
        aria-hidden="true"
      >
        <ChevronsDown size={30} />
      </motion.div>
    </section>
  );
}
