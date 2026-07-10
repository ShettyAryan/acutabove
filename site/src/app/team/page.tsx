import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = { title: "Team" };

export default function TeamPage() {
  return (
    <PagePlaceholder
      eyebrow="The People"
      title="Meet the Team"
      description="Faculty mentors, office bearers, and student coordinators will be introduced here — send the Team design whenever you're ready."
    />
  );
}
