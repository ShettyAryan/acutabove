"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ScissorCutAnimation } from "@/components/ui/ScissorCut";
import { fadeUp, scaleIn, EASE_SIGNATURE } from "@/lib/motion";

export function About() {
  return (
    <section className="overflow-hidden bg-background py-16 md:py-20">
      <div className="mx-auto w-full max-w-container-max px-edge md:px-edge-lg">
        <Reveal
          variants={fadeUp}
          duration={0.8}
          amount={0.2}
          className="mb-10 md:mb-14"
        >
          <h2 className="font-display text-headline-lg text-ink">
            About A Cut Above
          </h2>
        </Reveal>

        <div className="grid grid-cols-1  gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal className="w-full max-w-xl lg:max-w-none" amount={0.3}>
            <p className="mb-4 font-body text-label uppercase text-primary">
              Our Philosophy
            </p>
            <h3 className="mb-5 font-display text-headline-md text-ink text-balance">
              Mastering the art and science of the scalpel.
            </h3>
            <p className="text-body-lg leading-relaxed text-ink-muted">
              The KMC Mangalore Surgical Society is more than a club — it is an
              academic sanctuary where theory meets practice. We bridge the gap
              between classroom anatomy and real-world surgical precision,
              fostering an environment of curiosity and disciplined practice.
             
            </p>
            <div className="mt-6 flex w-full flex-col items-stretch gap-6">
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 self-start border-b-2 border-primary/20 pb-2 font-body text-label uppercase text-primary transition-colors hover:border-primary"
              >
                Read our full story
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1.5"
                />
              </Link>
              <ScissorCutAnimation
                fullWidth
                speed={1.4}
                travelDuration={6}
                threadColor="#0f5238"
                sparkColor="#ffdbce"
              />
              <Reveal
                variants={scaleIn}
                duration={0.9}
                amount={0.2}
                className="group relative aspect-[16/10] w-full overflow-hidden rounded-xl shadow-md"
              >
                <Image
                  src="/images/image3.jpeg"
                  alt="Students practicing suturing technique on a workshop bench"
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                />
              </Reveal>
            </div>
          </Reveal>

          <div className="relative w-full">
            <motion.div
              aria-hidden="true"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: EASE_SIGNATURE,
              }}
              className="absolute -right-6 -top-6 -z-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
            />

            <Reveal
              variants={scaleIn}
              duration={0.9}
              amount={0.15}
              className="group relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl shadow-2xl lg:mx-0 lg:max-w-none"
            >
              <Image
                src="/images/vertical-cut.jpeg"
                alt="A mentor guiding a resident through a surgical training session"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover transition-transform duration-[1400ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-x-4 bottom-6 text-white sm:inset-x-8 sm:bottom-8">
                <p className="font-display text-lg italic leading-snug sm:text-xl md:text-2xl">
                  &ldquo;Precision is the difference between a technician and a
                  surgeon.&rdquo;
                </p>
                <div className="mb-4 mt-4 h-1 w-14 bg-white" />
                <p className="font-body text-label uppercase text-white/80">
                  Established Excellence
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
