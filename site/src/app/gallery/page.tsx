import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <PagePlaceholder
      eyebrow="Moments"
      title="Gallery"
      description="Photos from past conferences, workshops, and society events will live here — send over the Gallery design whenever you have it."
    />
  );
}
