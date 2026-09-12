import type { Metadata } from "next";
import { EventsHero } from "@/components/events/EventsHero";
import { FeaturedEvents } from "@/components/events/FeaturedEvents";
import { EventsUpdates } from "@/components/events/EventsUpdates";
import { getEventsPageContent } from "@/lib/cms/pages";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Events",
  description:
    "AXION 2026, Erevna, and Nick of Time — workshops, symposiums, and flagship surgical conferences from the KMC Mangalore Surgical Society.",
};

export default async function EventsPage() {
  const content = await getEventsPageContent();

  return (
    <>
      <EventsHero hero={content.hero} />
      <FeaturedEvents events={content.featuredEvents} />
      <EventsUpdates content={content.updates} />
    </>
  );
}
