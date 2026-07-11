import { Hero } from "@/components/home/Hero";
import { Highlights } from "@/components/home/Highlights";
import { About } from "@/components/home/About";
import { EventsPreview } from "@/components/home/EventsPreview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Highlights />
      <About />
      <EventsPreview />
    </>
  );
}
