import { client, cmsFetchOptions } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";
import { HOME_PAGE_QUERY } from "@/sanity/queries";
import { cmsImageUrl } from "@/lib/cms/image";
import {
  mapImageWithAlt,
  mapImageWithAltList,
  pickString,
  type SanityImageWithAlt,
} from "@/lib/cms/map";
import {
  HOME_CONTENT,
  type HomeContent,
  type HomeHighlight,
} from "@/lib/home-content";
import type { SanityImageSource } from "@sanity/image-url";

type HomeDoc = {
  heroSlides?: SanityImageWithAlt[] | null;
  heroTitle?: string | null;
  heroTagline?: string | null;
  heroPrimaryCta?: { label?: string; href?: string } | null;
  heroSecondaryCta?: { label?: string; href?: string } | null;
  heroPromo?: { label?: string; href?: string } | null;
  highlights?: {
    icon?: HomeHighlight["icon"] | null;
    title?: string | null;
    copy?: string | null;
  }[] | null;
  aboutSectionTitle?: string | null;
  aboutEyebrow?: string | null;
  aboutHeadline?: string | null;
  aboutBody?: string | null;
  aboutLink?: { label?: string; href?: string } | null;
  aboutQuote?: string | null;
  aboutCaption?: string | null;
  aboutImageMain?: SanityImageWithAlt;
  aboutImageSide?: SanityImageWithAlt;
  eventsPreviewTitle?: string | null;
  eventsPreviewSubtitle?: string | null;
  eventsPreviewViewAll?: { label?: string; href?: string } | null;
  eventsPreviewCards?: {
    slug?: string | null;
    title?: string | null;
    date?: string | null;
    blurb?: string | null;
    image?: SanityImageSource | null;
    alt?: string | null;
    flagship?: boolean | null;
    href?: string | null;
  }[] | null;
} | null;

export async function getHomeContent(): Promise<HomeContent> {
  if (!isSanityConfigured()) return HOME_CONTENT;

  try {
    const doc = await client.fetch<HomeDoc>(
      HOME_PAGE_QUERY,
      {},
      cmsFetchOptions
    );
    if (!doc) return HOME_CONTENT;
    const base = HOME_CONTENT;

    const slides = mapImageWithAltList(doc.heroSlides, base.hero.slides, 1920);

    const highlights =
      doc.highlights?.filter((h) => h?.title && h?.copy).map((h) => ({
        icon: (h.icon || "history") as HomeHighlight["icon"],
        title: h.title!.trim(),
        copy: h.copy!.trim(),
      })) ?? base.highlights;

    const eventCards =
      doc.eventsPreviewCards
        ?.map((card, i) => {
          const fb = base.eventsPreview.events[i] ?? base.eventsPreview.events[0];
          const src = cmsImageUrl(card.image, 900);
          if (!card.title || !src) return null;
          return {
            slug: pickString(card.slug, fb.slug),
            title: card.title.trim(),
            date: pickString(card.date, fb.date),
            blurb: pickString(card.blurb, fb.blurb),
            image: src,
            alt: pickString(card.alt, fb.alt),
            flagship: Boolean(card.flagship),
            href: pickString(card.href, fb.href),
          };
        })
        .filter(Boolean) ?? base.eventsPreview.events;

    return {
      hero: {
        slides,
        title: pickString(doc.heroTitle, base.hero.title),
        tagline: pickString(doc.heroTagline, base.hero.tagline),
        primaryCta: {
          label: pickString(
            doc.heroPrimaryCta?.label,
            base.hero.primaryCta.label
          ),
          href: pickString(
            doc.heroPrimaryCta?.href,
            base.hero.primaryCta.href
          ),
        },
        secondaryCta: {
          label: pickString(
            doc.heroSecondaryCta?.label,
            base.hero.secondaryCta.label
          ),
          href: pickString(
            doc.heroSecondaryCta?.href,
            base.hero.secondaryCta.href
          ),
        },
        promo: {
          label: pickString(doc.heroPromo?.label, base.hero.promo.label),
          href: pickString(doc.heroPromo?.href, base.hero.promo.href),
        },
      },
      highlights: highlights.length ? highlights : base.highlights,
      about: {
        sectionTitle: pickString(doc.aboutSectionTitle, base.about.sectionTitle),
        eyebrow: pickString(doc.aboutEyebrow, base.about.eyebrow),
        headline: pickString(doc.aboutHeadline, base.about.headline),
        body: pickString(doc.aboutBody, base.about.body),
        linkLabel: pickString(doc.aboutLink?.label, base.about.linkLabel),
        linkHref: pickString(doc.aboutLink?.href, base.about.linkHref),
        quote: pickString(doc.aboutQuote, base.about.quote),
        caption: pickString(doc.aboutCaption, base.about.caption),
        imageMain: mapImageWithAlt(
          doc.aboutImageMain,
          base.about.imageMain,
          1200
        ),
        imageSide: mapImageWithAlt(
          doc.aboutImageSide,
          base.about.imageSide,
          1200
        ),
      },
      eventsPreview: {
        title: pickString(doc.eventsPreviewTitle, base.eventsPreview.title),
        subtitle: pickString(
          doc.eventsPreviewSubtitle,
          base.eventsPreview.subtitle
        ),
        viewAllLabel: pickString(
          doc.eventsPreviewViewAll?.label,
          base.eventsPreview.viewAllLabel
        ),
        viewAllHref: pickString(
          doc.eventsPreviewViewAll?.href,
          base.eventsPreview.viewAllHref
        ),
        events: (eventCards as HomeContent["eventsPreview"]["events"]).length
          ? (eventCards as HomeContent["eventsPreview"]["events"])
          : base.eventsPreview.events,
      },
    };
  } catch {
    return HOME_CONTENT;
  }
}
