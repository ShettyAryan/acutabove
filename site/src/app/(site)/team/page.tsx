import type { Metadata } from "next";
import { TeamHero } from "@/components/team/TeamHero";
import { TeamDirectory } from "@/components/team/TeamDirectory";
import { getAllTeamMembers } from "@/lib/cms/team";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the leadership, Department of Surgery faculty, and A Cut Above team at KMC Mangalore.",
};

export default async function TeamPage() {
  const membersByTab = await getAllTeamMembers();

  return (
    <>
      <TeamHero />
      <TeamDirectory membersByTab={membersByTab} />
    </>
  );
}
