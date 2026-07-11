import { client, cmsFetchOptions } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";
import { CONTENT_SOURCE_QUERY, TEAM_MEMBERS_QUERY } from "@/sanity/queries";
import {
  CUT_ABOVE_TEAM,
  DEPARTMENT_OF_SURGERY,
  LEADERSHIP,
  type TeamMember,
  type TeamTab,
} from "@/lib/team-content";

const TABS: TeamTab[] = ["leadership", "surgery", "cut-above"];

const EXPECTED_TEAM_COUNT =
  LEADERSHIP.length + DEPARTMENT_OF_SURGERY.length + CUT_ABOVE_TEAM.length;

type SanityTeamMember = {
  _id: string;
  name: string;
  designation: string;
  tab: TeamTab;
  order?: number;
  imageUrl?: string | null;
};

type ContentSource = {
  teamFromCms?: boolean;
  nickOfTimeProgramsFromCms?: boolean;
} | null;

function mapMember(doc: SanityTeamMember): TeamMember {
  return {
    id: doc._id,
    name: doc.name,
    designation: doc.designation,
    image: doc.imageUrl || null,
  };
}

function staticMembers(tab: TeamTab): TeamMember[] {
  switch (tab) {
    case "leadership":
      return LEADERSHIP;
    case "surgery":
      return DEPARTMENT_OF_SURGERY;
    case "cut-above":
      return CUT_ABOVE_TEAM;
  }
}

function staticAll(): Record<TeamTab, TeamMember[]> {
  return {
    leadership: LEADERSHIP,
    surgery: DEPARTMENT_OF_SURGERY,
    "cut-above": CUT_ABOVE_TEAM,
  };
}

function bucketsFromSanity(
  docs: SanityTeamMember[]
): Record<TeamTab, TeamMember[]> {
  const buckets: Record<TeamTab, TeamMember[]> = {
    leadership: [],
    surgery: [],
    "cut-above": [],
  };
  for (const doc of docs) {
    if (doc.tab in buckets) {
      buckets[doc.tab].push(mapMember(doc));
    }
  }
  return buckets;
}

/** Overlay Sanity members onto the static roster by name; append new names. */
function unionMembers(
  base: TeamMember[],
  overlay: TeamMember[]
): TeamMember[] {
  const byName = new Map(
    base.map((member) => [member.name.trim().toLowerCase(), member])
  );
  for (const member of overlay) {
    byName.set(member.name.trim().toLowerCase(), member);
  }

  const seen = new Set<string>();
  const result: TeamMember[] = [];

  for (const member of base) {
    const key = member.name.trim().toLowerCase();
    result.push(byName.get(key)!);
    seen.add(key);
  }

  for (const member of overlay) {
    const key = member.name.trim().toLowerCase();
    if (!seen.has(key)) {
      result.push(member);
      seen.add(key);
    }
  }

  return result;
}

/**
 * Partial / stale Sanity responses must never blank the team page.
 * - Empty tabs keep the built-in roster
 * - Non-empty tabs merge built-in + Sanity by name (additions keep siblings)
 */
function mergeTeamSafe(
  docs: SanityTeamMember[]
): Record<TeamTab, TeamMember[]> {
  const fromSanity = bucketsFromSanity(docs);
  const result = staticAll();

  for (const tab of TABS) {
    if (fromSanity[tab].length > 0) {
      result[tab] = unionMembers(staticMembers(tab), fromSanity[tab]);
    }
  }

  return result;
}

function looksLikeFullTeamRoster(docs: SanityTeamMember[]): boolean {
  const buckets = bucketsFromSanity(docs);
  const everyTabPopulated = TABS.every((tab) => buckets[tab].length > 0);
  return everyTabPopulated && docs.length >= EXPECTED_TEAM_COUNT;
}

async function getContentSource(): Promise<ContentSource> {
  try {
    return await client.fetch<ContentSource>(
      CONTENT_SOURCE_QUERY,
      {},
      cmsFetchOptions
    );
  } catch {
    return null;
  }
}

export async function getAllTeamMembers(): Promise<
  Record<TeamTab, TeamMember[]>
> {
  if (!isSanityConfigured()) {
    return staticAll();
  }

  try {
    const [docs, source] = await Promise.all([
      client.fetch<SanityTeamMember[]>(
        TEAM_MEMBERS_QUERY,
        {},
        cmsFetchOptions
      ),
      getContentSource(),
    ]);

    if (!docs?.length) {
      return staticAll();
    }

    // Only treat Sanity as exclusive source of truth when the full roster
    // is present. A single Studio publish / stale cache must not wipe tabs.
    if (source?.teamFromCms && looksLikeFullTeamRoster(docs)) {
      return bucketsFromSanity(docs);
    }

    return mergeTeamSafe(docs);
  } catch {
    return staticAll();
  }
}

export async function getTeamMembers(tab: TeamTab): Promise<TeamMember[]> {
  const all = await getAllTeamMembers();
  return all[tab] ?? staticMembers(tab);
}
