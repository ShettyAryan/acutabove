import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutChapters } from "@/components/about/AboutChapters";

export const metadata: Metadata = {
  title: "About",
  description:
    "From MAHE to the operating table — the story of Kasturba Medical College Mangalore, its Department of Surgery, and the A Cut Above surgical society.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutChapters />
    </>
  );
}
