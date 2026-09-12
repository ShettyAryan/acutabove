import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { getAxionPageContent } from "@/lib/cms/pages";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "AXION Gallery",
  description:
    "Photo highlights from AXION — the inter-collegiate surgical quiz and workshop series by A Cut Above.",
};

export default async function AxionGalleryPage() {
  const content = await getAxionPageContent();

  return (
    <>
      <section className="relative flex min-h-[min(44vh,100dvh)] items-center justify-center overflow-hidden bg-primary px-edge pb-12 pt-28 text-center sm:pb-16 sm:pt-32 md:min-h-[48vh] md:pt-40">
        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="font-body text-label uppercase tracking-[0.24em] text-accent">
            {content.hero.eyebrow}
          </p>
          <h1 className="mt-5 font-display text-[2.25rem] leading-[1.05] tracking-tight text-white text-balance sm:text-[3.5rem] md:text-[4rem]">
            {content.hero.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-body-lg leading-relaxed text-white/80">
            {content.hero.subtitle}
          </p>
        </div>
      </section>
      <GalleryGrid images={content.images} />
    </>
  );
}
