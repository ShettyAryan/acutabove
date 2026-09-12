import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutChapters } from "@/components/about/AboutChapters";
import { getAboutContent } from "@/lib/cms/about";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description:
    "From MAHE to the operating table — the story of Kasturba Medical College Mangalore, its Department of Surgery, and the A Cut Above surgical society.",
};

export default async function AboutPage() {
  const content = await getAboutContent();

  return (
    <>
      <AboutHero hero={content.hero} />
      <AboutChapters content={content} />
    </>
  );
}
