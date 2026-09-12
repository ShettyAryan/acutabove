import { client, cmsFetchOptions } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";
import { NICK_OF_TIME_PAGE_QUERY } from "@/sanity/queries";
import {
  mapImageWithAlt,
  mapImageWithAltList,
  pickString,
  pickStringArray,
  type SanityImageWithAlt,
} from "@/lib/cms/map";
import { NICK_OF_TIME } from "@/lib/nick-of-time-content";

export type NickOfTimePageContent = typeof NICK_OF_TIME & {
  aboutCollage: { src: string; alt: string }[];
};

const DEFAULT_COLLAGE = [
  { src: "/images/image1.jpeg", alt: "Nick of Time collage image 1" },
  { src: "/images/image2.jpeg", alt: "Nick of Time collage image 2" },
  { src: "/images/image3.jpeg", alt: "Nick of Time collage image 3" },
  { src: "/images/image4.jpeg", alt: "Nick of Time collage image 4" },
  { src: "/images/axion.jpeg", alt: "Nick of Time collage image 5" },
  { src: "/images/erevna.jpg", alt: "Nick of Time collage image 6" },
  { src: "/images/vertical-cut.jpeg", alt: "Nick of Time collage image 7" },
  { src: "/images/mahe.jpg", alt: "Nick of Time collage image 8" },
];

type NickDoc = {
  eventDate?: string | null;
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  brochureHref?: string | null;
  aboutTitle?: string | null;
  aboutBody?: string[] | null;
  aboutStats?: { value?: string; label?: string }[] | null;
  aboutCollage?: SanityImageWithAlt[] | null;
  heritageTitle?: string | null;
  heritageBody?: string[] | null;
  heritageImage?: SanityImageWithAlt;
  heritageLink?: { label?: string; href?: string } | null;
  countdownEyebrow?: string | null;
  programsTitle?: string | null;
  programsTitleEmphasis?: string | null;
  programsSubtitle?: string | null;
  programsQuote?: string | null;
  finalCtaEyebrow?: string | null;
  finalCtaTitle?: string | null;
  finalCtaEventsHref?: string | null;
} | null;

export async function getNickOfTimePageContent(
  registerHref: string
): Promise<NickOfTimePageContent> {
  const base: NickOfTimePageContent = {
    ...NICK_OF_TIME,
    hero: { ...NICK_OF_TIME.hero, registerHref },
    finalCta: { ...NICK_OF_TIME.finalCta, registerHref },
    aboutCollage: DEFAULT_COLLAGE,
  };

  if (!isSanityConfigured()) return base;

  try {
    const doc = await client.fetch<NickDoc>(
      NICK_OF_TIME_PAGE_QUERY,
      {},
      cmsFetchOptions
    );
    if (!doc) return base;

    const stats =
      doc.aboutStats
        ?.filter((s) => s?.value && s?.label)
        .map((s) => ({ value: s.value!.trim(), label: s.label!.trim() })) ??
      NICK_OF_TIME.about.stats;

    return {
      ...base,
      eventDate: pickString(doc.eventDate, NICK_OF_TIME.eventDate),
      hero: {
        title: pickString(doc.heroTitle, NICK_OF_TIME.hero.title),
        subtitle: pickString(doc.heroSubtitle, NICK_OF_TIME.hero.subtitle),
        registerHref,
        brochureHref: pickString(
          doc.brochureHref,
          NICK_OF_TIME.hero.brochureHref
        ),
      },
      about: {
        title: pickString(doc.aboutTitle, NICK_OF_TIME.about.title),
        body: pickStringArray(doc.aboutBody, NICK_OF_TIME.about.body),
        stats: stats.length ? stats : NICK_OF_TIME.about.stats,
      },
      aboutCollage: mapImageWithAltList(
        doc.aboutCollage,
        DEFAULT_COLLAGE,
        900
      ),
      heritage: {
        title: pickString(doc.heritageTitle, NICK_OF_TIME.heritage.title),
        body: pickStringArray(doc.heritageBody, NICK_OF_TIME.heritage.body),
        image: mapImageWithAlt(
          doc.heritageImage,
          NICK_OF_TIME.heritage.image,
          1200
        ),
        legacyLink: {
          label: pickString(
            doc.heritageLink?.label,
            NICK_OF_TIME.heritage.legacyLink.label
          ),
          href: pickString(
            doc.heritageLink?.href,
            NICK_OF_TIME.heritage.legacyLink.href
          ),
        },
      },
      countdown: {
        eyebrow: pickString(
          doc.countdownEyebrow,
          NICK_OF_TIME.countdown.eyebrow
        ),
      },
      programs: {
        ...NICK_OF_TIME.programs,
        title: pickString(doc.programsTitle, NICK_OF_TIME.programs.title),
        titleEmphasis: pickString(
          doc.programsTitleEmphasis,
          NICK_OF_TIME.programs.titleEmphasis
        ),
        subtitle: pickString(
          doc.programsSubtitle,
          NICK_OF_TIME.programs.subtitle
        ),
        quote: pickString(doc.programsQuote, NICK_OF_TIME.programs.quote),
      },
      finalCta: {
        eyebrow: pickString(
          doc.finalCtaEyebrow,
          NICK_OF_TIME.finalCta.eyebrow
        ),
        title: pickString(doc.finalCtaTitle, NICK_OF_TIME.finalCta.title),
        registerHref,
        eventsHref: pickString(
          doc.finalCtaEventsHref,
          NICK_OF_TIME.finalCta.eventsHref
        ),
      },
    };
  } catch {
    return base;
  }
}
