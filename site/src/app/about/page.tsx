import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { ChapterMahe } from "@/components/about/ChapterMahe";
import { ChapterKmc } from "@/components/about/ChapterKmc";
import { ChapterSurgery } from "@/components/about/ChapterSurgery";
import { ChapterCutAbove } from "@/components/about/ChapterCutAbove";

export const metadata: Metadata = {
  title: "About",
  description:
    "From MAHE to the operating table — the story of Kasturba Medical College Mangalore, its Department of Surgery, and the A Cut Above surgical society.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <ChapterMahe />
      <ChapterKmc />
      <ChapterSurgery />
      <ChapterCutAbove />
    </>
  );
}
