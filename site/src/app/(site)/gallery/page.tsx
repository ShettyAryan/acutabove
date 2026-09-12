import type { Metadata } from "next";
import { GalleryHero } from "@/components/gallery/GalleryHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { getGalleryPageContent } from "@/lib/cms/pages";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from workshops, conferences, and society events at A Cut Above — the surgical society of KMC Mangalore.",
};

export default async function GalleryPage() {
  const content = await getGalleryPageContent();

  return (
    <>
      <GalleryHero hero={content.hero} />
      <GalleryGrid images={content.images} />
    </>
  );
}
