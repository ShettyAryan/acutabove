import { client, cmsFetchOptions } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";
import { CONTENT_SOURCE_QUERY, TEAM_MEMBERS_QUERY } from "@/sanity/queries";
import { cmsImageUrl } from "@/lib/cms/image";
import {
  CUT_ABOVE_TEAM,
  DEPARTMENT_OF_SURGERY,
  LEADERSHIP,
  type TeamMember,
  type TeamTab,
} from "@/lib/team-content";
import type { SanityImageSource } from "@sanity/image-url";

const TABS: TeamTab[] = ["leadership", "surgery", "cut-above"];

const EXPECTED_TEAM_COUNT =
  LEADERSHIP.length + DEPARTMENT_OF_SURGERY.length + CUT_ABOVE_TEAM.length;

type SanityTeamMember = {
  _id: string;
  name: string;
  designation: string;
  tab: TeamTab;
  order?: number;
  image?: SanityImageSource | null;
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
    image: cmsImageUrl(doc.image, 800),
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

type RankedMember = {
  member: TeamMember;
  order: number;
  baseIndex: number;
};

/**
 * Overlay Sanity members onto static roster by name and honor `order`.
 * This keeps the safety fallback while making rank updates visible.
 */
function unionMembers(base: TeamMember[], overlayDocs: SanityTeamMember[]): TeamMember[] {
  const byName = new Map<string, RankedMember>();

  base.forEach((member, index) => {
    byName.set(member.name.trim().toLowerCase(), {
      member,
      order: index + 1000,
      baseIndex: index,
    });
  });

  overlayDocs.forEach((doc, index) => {
    const key = doc.name.trim().toLowerCase();
    const existing = byName.get(key);
    byName.set(key, {
      member: mapMember(doc),
      order: doc.order ?? existing?.order ?? index + 1000,
      baseIndex: existing?.baseIndex ?? base.length + index,
    });
  });

  return Array.from(byName.values())
    .sort((a, b) => a.order - b.order || a.baseIndex - b.baseIndex)
    .map((entry) => entry.member);
}

/**
 * Partial / stale Sanity responses must never blank the team page.
 * - Empty tabs keep the built-in roster
 * - Non-empty tabs merge built-in + Sanity by name (additions keep siblings)
 */
function mergeTeamSafe(
  docs: SanityTeamMember[]
): Record<TeamTab, TeamMember[]> {
  const result = staticAll();

  for (const tab of TABS) {
    const tabDocs = docs.filter((doc) => doc.tab === tab);
    if (tabDocs.length > 0) {
      result[tab] = unionMembers(staticMembers(tab), tabDocs);
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
