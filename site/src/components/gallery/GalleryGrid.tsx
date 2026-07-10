"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY_IMAGES } from "@/lib/gallery-content";
import { EASE_SIGNATURE, fadeUp, staggerContainer } from "@/lib/motion";

export function GalleryGrid() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(() => {
    setActive((i) =>
      i === null ? null : (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
    );
  }, []);
  const next = useCallback(() => {
    setActive((i) => (i === null ? null : (i + 1) % GALLERY_IMAGES.length));
  }, []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, prev, next]);

  return (
    <section className="bg-background py-section-sm md:py-section">
      <div className="mx-auto w-full max-w-container-max px-edge md:px-edge-lg">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.02 }}
          variants={staggerContainer(0.04)}
          className="columns-1 gap-4 sm:columns-2 sm:gap-5 md:columns-3 lg:columns-4"
        >
          {GALLERY_IMAGES.map((image, index) => (
            <motion.button
              key={image.id}
              type="button"
              variants={fadeUp}
              transition={{ duration: 0.65, ease: EASE_SIGNATURE }}
              onClick={() => setActive(index)}
              className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl bg-surface-container-low text-left shadow-sm outline-none transition-shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:mb-5"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={1200}
                height={1600}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </motion.button>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={GALLERY_IMAGES[active].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-200 flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm md:p-10"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close gallery"
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
            >
              <X size={22} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 md:left-8"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 md:right-8"
            >
              <ChevronRight size={24} />
            </button>

            <motion.div
              key={GALLERY_IMAGES[active].id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: EASE_SIGNATURE }}
              className="relative flex max-h-[80vh] w-full max-w-5xl items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={GALLERY_IMAGES[active].src}
                alt={GALLERY_IMAGES[active].alt}
                width={1600}
                height={1200}
                sizes="90vw"
                className="max-h-[80vh] w-auto max-w-full object-contain"
                priority
              />
              <p className="absolute inset-x-0 -bottom-10 text-center font-body text-sm text-white/70 md:-bottom-12">
                {GALLERY_IMAGES[active].alt}
                <span className="mx-2 text-white/30">·</span>
                {active + 1} / {GALLERY_IMAGES.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
