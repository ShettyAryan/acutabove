import { Hero } from "@/components/home/Hero";
import { Highlights } from "@/components/home/Highlights";
import { About } from "@/components/home/About";
import { EventsPreview } from "@/components/home/EventsPreview";
import { getHomeContent } from "@/lib/cms/home";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await getHomeContent();

  return (
    <>
      <Hero content={content.hero} />
      <Highlights content={content.highlights} />
      <About content={content.about} />
      <EventsPreview content={content.eventsPreview} />
    </>
  );
}
