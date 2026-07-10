import type { Metadata } from "next";
import { EventsHero } from "@/components/events/EventsHero";
import { FeaturedEvents } from "@/components/events/FeaturedEvents";
import { EventsUpdates } from "@/components/events/EventsUpdates";

export const metadata: Metadata = {
  title: "Events",
  description:
    "AXION 2026, Erevana, and Nick of Time — workshops, symposiums, and flagship surgical conferences from the KMC Mangalore Surgical Society.",
};

export default function EventsPage() {
  return (
    <>
      <EventsHero />
      <FeaturedEvents />
      <EventsUpdates />
    </>
  );
}
