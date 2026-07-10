import type { Metadata } from "next";
import { TeamHero } from "@/components/team/TeamHero";
import { TeamDirectory } from "@/components/team/TeamDirectory";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the leadership, Department of Surgery faculty, and A Cut Above team at KMC Mangalore.",
};

export default function TeamPage() {
  return (
    <>
      <TeamHero />
      <TeamDirectory />
    </>
  );
}
