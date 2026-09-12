import { client, cmsFetchOptions } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";
import { ABOUT_PAGE_QUERY } from "@/sanity/queries";
import { cmsImageUrl } from "@/lib/cms/image";
import {
  mapImageWithAlt,
  mapImageWithAltList,
  pickString,
  pickStringArray,
  type SanityImageWithAlt,
} from "@/lib/cms/map";
import {
  ABOUT_HERO,
  CHAPTER_CUT_ABOVE,
  CHAPTER_KMC,
  CHAPTER_MAHE,
  CHAPTER_SURGERY,
} from "@/lib/about-content";

export type AboutContent = {
  hero: typeof ABOUT_HERO;
  chapterMahe: typeof CHAPTER_MAHE;
  chapterKmc: typeof CHAPTER_KMC;
  chapterSurgery: typeof CHAPTER_SURGERY;
  chapterCutAbove: typeof CHAPTER_CUT_ABOVE;
};

type AboutDoc = {
  hero?: { eyebrow?: string; title?: string; subtitle?: string } | null;
  chapterMahe?: {
    chapter?: string;
    number?: string;
    title?: string;
    subtitle?: string;
    body?: string[];
    stats?: { value?: string; label?: string }[];
    image?: SanityImageWithAlt;
    quote?: string;
  } | null;
  chapterKmc?: {
    chapter?: string;
    number?: string;
    title?: string;
    body?: string[];
    galleryLink?: { label?: string; href?: string };
    images?: SanityImageWithAlt[];
  } | null;
  chapterSurgery?: {
    chapter?: string;
    number?: string;
    title?: string;
    overviewLabel?: string;
    overviewIntro?: string;
    pgIntro?: string;
    pgAchievements?: string[];
    pgFollowUp?: string;
    paragraphs?: string[];
    hospitals?: string;
    keyFeaturesLabel?: string;
    keyFeatures?: string[];
  } | null;
  chapterCutAbove?: {
    chapter?: string;
    number?: string;
    title?: string;
    body?: string[];
    stats?: { value?: string; label?: string }[];
    logo?: unknown;
    logoAlt?: string;
    ctas?: { label?: string; href?: string; variant?: "solid" | "outline" }[];
  } | null;
} | null;

function mapStats(
  stats: { value?: string; label?: string }[] | null | undefined,
  fallback: { value: string; label: string }[]
) {
  if (!stats?.length) return fallback;
  const mapped = stats
    .filter((s) => s?.value && s?.label)
    .map((s) => ({ value: s.value!.trim(), label: s.label!.trim() }));
  return mapped.length ? mapped : fallback;
}

export async function getAboutContent(): Promise<AboutContent> {
  const fallback: AboutContent = {
    hero: ABOUT_HERO,
    chapterMahe: CHAPTER_MAHE,
    chapterKmc: CHAPTER_KMC,
    chapterSurgery: CHAPTER_SURGERY,
    chapterCutAbove: CHAPTER_CUT_ABOVE,
  };

  if (!isSanityConfigured()) return fallback;

  try {
    const doc = await client.fetch<AboutDoc>(
      ABOUT_PAGE_QUERY,
      {},
      cmsFetchOptions
    );
    if (!doc) return fallback;

    const mahe = doc.chapterMahe;
    const kmc = doc.chapterKmc;
    const surgery = doc.chapterSurgery;
    const cut = doc.chapterCutAbove;

    const logoSrc = cmsImageUrl(cut?.logo as never, 400);

    return {
      hero: {
        eyebrow: pickString(doc.hero?.eyebrow, ABOUT_HERO.eyebrow),
        title: pickString(doc.hero?.title, ABOUT_HERO.title),
        subtitle: pickString(doc.hero?.subtitle, ABOUT_HERO.subtitle),
      },
      chapterMahe: {
        chapter: pickString(mahe?.chapter, CHAPTER_MAHE.chapter),
        number: pickString(mahe?.number, CHAPTER_MAHE.number),
        title: pickString(mahe?.title, CHAPTER_MAHE.title),
        subtitle: pickString(mahe?.subtitle, CHAPTER_MAHE.subtitle),
        body: pickStringArray(mahe?.body, CHAPTER_MAHE.body),
        stats: mapStats(mahe?.stats, CHAPTER_MAHE.stats),
        image: mapImageWithAlt(mahe?.image, CHAPTER_MAHE.image, 1200),
        quote: pickString(mahe?.quote, CHAPTER_MAHE.quote),
      },
      chapterKmc: {
        chapter: pickString(kmc?.chapter, CHAPTER_KMC.chapter),
        number: pickString(kmc?.number, CHAPTER_KMC.number),
        title: pickString(kmc?.title, CHAPTER_KMC.title),
        body: pickStringArray(kmc?.body, CHAPTER_KMC.body),
        galleryLink: {
          label: pickString(
            kmc?.galleryLink?.label,
            CHAPTER_KMC.galleryLink.label
          ),
          href: pickString(
            kmc?.galleryLink?.href,
            CHAPTER_KMC.galleryLink.href
          ),
        },
        images: mapImageWithAltList(kmc?.images, CHAPTER_KMC.images, 1000),
      },
      chapterSurgery: {
        chapter: pickString(surgery?.chapter, CHAPTER_SURGERY.chapter),
        number: pickString(surgery?.number, CHAPTER_SURGERY.number),
        title: pickString(surgery?.title, CHAPTER_SURGERY.title),
        overview: {
          label: pickString(
            surgery?.overviewLabel,
            CHAPTER_SURGERY.overview.label
          ),
          intro: pickString(
            surgery?.overviewIntro,
            CHAPTER_SURGERY.overview.intro
          ),
          pgCourse: {
            intro: pickString(
              surgery?.pgIntro,
              CHAPTER_SURGERY.overview.pgCourse.intro
            ),
            achievements: pickStringArray(
              surgery?.pgAchievements,
              CHAPTER_SURGERY.overview.pgCourse.achievements
            ),
            followUp: pickString(
              surgery?.pgFollowUp,
              CHAPTER_SURGERY.overview.pgCourse.followUp
            ),
          },
          paragraphs: pickStringArray(
            surgery?.paragraphs,
            CHAPTER_SURGERY.overview.paragraphs
          ),
          hospitals: pickString(
            surgery?.hospitals,
            CHAPTER_SURGERY.overview.hospitals
          ),
        },
        keyFeatures: {
          label: pickString(
            surgery?.keyFeaturesLabel,
            CHAPTER_SURGERY.keyFeatures.label
          ),
          items: pickStringArray(
            surgery?.keyFeatures,
            CHAPTER_SURGERY.keyFeatures.items
          ),
        },
      },
      chapterCutAbove: {
        chapter: pickString(cut?.chapter, CHAPTER_CUT_ABOVE.chapter),
        number: pickString(cut?.number, CHAPTER_CUT_ABOVE.number),
        title: pickString(cut?.title, CHAPTER_CUT_ABOVE.title),
        body: pickStringArray(cut?.body, CHAPTER_CUT_ABOVE.body),
        stats: mapStats(cut?.stats, CHAPTER_CUT_ABOVE.stats),
        logo: {
          src: logoSrc || CHAPTER_CUT_ABOVE.logo.src,
          alt: pickString(cut?.logoAlt, CHAPTER_CUT_ABOVE.logo.alt),
        },
        ctas:
          cut?.ctas?.filter((c) => c?.label && c?.href).map((c) => ({
            label: c.label!.trim(),
            href: c.href!.trim(),
            variant: (c.variant === "outline" ? "outline" : "solid") as
              | "solid"
              | "outline",
          })) ?? CHAPTER_CUT_ABOVE.ctas,
      },
    };
  } catch {
    return fallback;
  }
}
