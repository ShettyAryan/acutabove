import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = { title: "Events" };

export default function EventsPage() {
  return (
    <PagePlaceholder
      eyebrow="What's On"
      title="Events & Conferences"
      description="Axion, A Nick of Time, Erevana, and the full workshop calendar will be listed here with registration details — send the Events design next."
    />
  );
}
