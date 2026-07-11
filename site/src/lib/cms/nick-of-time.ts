import { client, cmsFetchOptions } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";
import {
  CONTENT_SOURCE_QUERY,
  NICK_OF_TIME_PROGRAMS_QUERY,
  NICK_OF_TIME_PROGRAM_BY_SLUG_QUERY,
} from "@/sanity/queries";
import { cmsImageUrl } from "@/lib/cms/image";
import {
  NICK_OF_TIME_PROGRAMS,
  getProgramBySlug as getStaticProgramBySlug,
  type NickOfTimeProgram,
  type ProgramGroup,
} from "@/lib/nick-of-time-content";
import type { SanityImageSource } from "@sanity/image-url";

type SanityProgram = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  group: ProgramGroup;
  groupLabel: string;
  description: string[];
  bullets?: string[] | null;
  theme?: string | null;
  alt: string;
  cta: string;
  order?: number;
  image?: SanityImageSource | null;
};

type ContentSource = {
  teamFromCms?: boolean;
  nickOfTimeProgramsFromCms?: boolean;
} | null;

function mapProgram(doc: SanityProgram): NickOfTimeProgram {
  return {
    slug: doc.slug,
    title: doc.title,
    category: doc.category,
    group: doc.group,
    groupLabel: doc.groupLabel,
    description: doc.description ?? [],
    bullets: doc.bullets?.length ? doc.bullets : undefined,
    theme: doc.theme || undefined,
    image: cmsImageUrl(doc.image, 1200) || "/images/image1.jpeg",
    alt: doc.alt,
    cta: doc.cta,
  };
}

/**
 * Safe partial mode: keep every built-in programme, overlay matching Sanity
 * slugs, and append brand-new Sanity-only programmes. Prevents one Studio
 * publish from wiping the rest of the grid / subpages.
 */
function mergeProgramsSafe(docs: SanityProgram[]): NickOfTimeProgram[] {
  const sanityPrograms = docs.filter((d) => d.slug).map(mapProgram);
  const bySlug = new Map(
    NICK_OF_TIME_PROGRAMS.map((program) => [program.slug, program])
  );

  for (const program of sanityPrograms) {
    bySlug.set(program.slug, program);
  }

  const staticSlugs = new Set(NICK_OF_TIME_PROGRAMS.map((p) => p.slug));
  const ordered = NICK_OF_TIME_PROGRAMS.map(
    (program) => bySlug.get(program.slug)!
  );
  const extras = sanityPrograms.filter((p) => !staticSlugs.has(p.slug));
  return [...ordered, ...extras];
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

export async function getNickOfTimePrograms(): Promise<NickOfTimeProgram[]> {
  if (!isSanityConfigured()) {
    return NICK_OF_TIME_PROGRAMS;
  }

  try {
    const [docs, source] = await Promise.all([
      client.fetch<SanityProgram[]>(
        NICK_OF_TIME_PROGRAMS_QUERY,
        {},
        cmsFetchOptions
      ),
      getContentSource(),
    ]);

    if (!docs?.length) {
      return NICK_OF_TIME_PROGRAMS;
    }

    const mapped = docs.filter((d) => d.slug).map(mapProgram);
    const hasEveryStaticSlug = NICK_OF_TIME_PROGRAMS.every((p) =>
      mapped.some((m) => m.slug === p.slug)
    );

    // Exclusive CMS only when the full seeded programme set is present.
    if (source?.nickOfTimeProgramsFromCms && hasEveryStaticSlug) {
      return mapped;
    }

    // Partial / stale responses: never drop built-in programmes.
    return mergeProgramsSafe(docs);
  } catch {
    return NICK_OF_TIME_PROGRAMS;
  }
}

export async function getNickOfTimeProgramBySlug(
  slug: string
): Promise<NickOfTimeProgram | undefined> {
  const programs = await getNickOfTimePrograms();
  const fromList = programs.find((p) => p.slug === slug);
  if (fromList) return fromList;

  if (!isSanityConfigured()) {
    return getStaticProgramBySlug(slug);
  }

  try {
    const doc = await client.fetch<SanityProgram | null>(
      NICK_OF_TIME_PROGRAM_BY_SLUG_QUERY,
      { slug },
      cmsFetchOptions
    );
    return doc?.slug ? mapProgram(doc) : getStaticProgramBySlug(slug);
  } catch {
    return getStaticProgramBySlug(slug);
  }
}

export async function getNickOfTimeProgramSlugs(): Promise<string[]> {
  const programs = await getNickOfTimePrograms();
  return programs.map((p) => p.slug);
}
