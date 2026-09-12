import { client, cmsFetchOptions } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";
import {
  AXION_PAGE_QUERY,
  CONTACT_PAGE_QUERY,
  EVENTS_PAGE_QUERY,
  GALLERY_PAGE_QUERY,
  TEAM_PAGE_QUERY,
} from "@/sanity/queries";
import { cmsImageUrl } from "@/lib/cms/image";
import { pickString, type SanityImageWithAlt } from "@/lib/cms/map";
import {
  AXION_GALLERY_IMAGES,
  EVENTS_HERO,
  EVENTS_UPDATES,
  FEATURED_EVENTS,
  type FeaturedEvent,
} from "@/lib/events-content";
import {
  GALLERY_HERO,
  GALLERY_IMAGES,
  type GalleryImage,
} from "@/lib/gallery-content";
import { TEAM_HERO } from "@/lib/team-content";
import { AXION_PAGE, CONTACT_CONTENT } from "@/lib/site-content";
import type { SanityImageSource } from "@sanity/image-url";

export type EventsPageContent = {
  hero: typeof EVENTS_HERO;
  featuredEvents: FeaturedEvent[];
  updates: typeof EVENTS_UPDATES;
};

export type GalleryPageContent = {
  hero: typeof GALLERY_HERO;
  images: GalleryImage[];
};

export type AxionPageContent = {
  hero: typeof AXION_PAGE.hero;
  images: GalleryImage[];
};

function mapGalleryImages(
  values: SanityImageWithAlt[] | null | undefined,
  fallback: GalleryImage[]
): GalleryImage[] {
  if (!values?.length) return fallback;
  const mapped = values
    .map((value, i) => {
      const fb = fallback[i] ?? {
        id: `img-${i}`,
        src: "/images/image1.jpeg",
        alt: "Gallery image",
      };
      const src = cmsImageUrl(value?.image, 1200);
      if (!src) return null;
      return {
        id: fb.id,
        src,
        alt: value?.alt?.trim() || fb.alt,
      };
    })
    .filter(Boolean) as GalleryImage[];
  return mapped.length ? mapped : fallback;
}

export async function getTeamPageHero() {
  if (!isSanityConfigured()) return TEAM_HERO;
  try {
    const doc = await client.fetch<{
      hero?: { eyebrow?: string; title?: string; subtitle?: string };
    } | null>(TEAM_PAGE_QUERY, {}, cmsFetchOptions);
    if (!doc?.hero) return TEAM_HERO;
    return {
      eyebrow: pickString(doc.hero.eyebrow, TEAM_HERO.eyebrow),
      title: pickString(doc.hero.title, TEAM_HERO.title),
      subtitle: pickString(doc.hero.subtitle, TEAM_HERO.subtitle),
    };
  } catch {
    return TEAM_HERO;
  }
}

export async function getEventsPageContent(): Promise<EventsPageContent> {
  const fallback: EventsPageContent = {
    hero: EVENTS_HERO,
    featuredEvents: FEATURED_EVENTS,
    updates: EVENTS_UPDATES,
  };
  if (!isSanityConfigured()) return fallback;

  try {
    const doc = await client.fetch<{
      hero?: { eyebrow?: string; title?: string; subtitle?: string };
      featuredEvents?: {
        id?: string;
        title?: string;
        tag?: string;
        tagTone?: "light" | "primary";
        subtitle?: string;
        description?: string;
        image?: SanityImageSource;
        alt?: string;
        href?: string;
        cta?: string;
        flagship?: boolean;
      }[];
      updatesMessage?: string;
      updatesSocials?: {
        label?: string;
        href?: string;
        icon?: "globe" | "share" | "mail";
      }[];
    } | null>(EVENTS_PAGE_QUERY, {}, cmsFetchOptions);

    if (!doc) return fallback;

    const featured =
      doc.featuredEvents
        ?.map((event, i) => {
          const fb = FEATURED_EVENTS[i] ?? FEATURED_EVENTS[0];
          const src = cmsImageUrl(event.image, 1200);
          if (!event.title || !src) return null;
          return {
            id: pickString(event.id, fb.id),
            title: event.title.trim(),
            tag: pickString(event.tag, fb.tag),
            tagTone: event.tagTone || fb.tagTone,
            subtitle: event.subtitle || fb.subtitle,
            description: pickString(event.description, fb.description),
            image: src,
            alt: pickString(event.alt, fb.alt),
            href: pickString(event.href, fb.href),
            cta: pickString(event.cta, fb.cta),
            flagship: event.flagship ?? fb.flagship,
          } satisfies FeaturedEvent;
        })
        .filter(Boolean) ?? FEATURED_EVENTS;

    const socials =
      doc.updatesSocials
        ?.filter((s) => s?.label && s?.href)
        .map((s) => ({
          label: s.label!.trim(),
          href: s.href!.trim(),
          icon: (s.icon || "globe") as "globe" | "share" | "mail",
        })) ?? EVENTS_UPDATES.socials;

    return {
      hero: {
        eyebrow: pickString(doc.hero?.eyebrow, EVENTS_HERO.eyebrow),
        title: pickString(doc.hero?.title, EVENTS_HERO.title),
        subtitle: pickString(doc.hero?.subtitle, EVENTS_HERO.subtitle),
      },
      featuredEvents: (featured as FeaturedEvent[]).length
        ? (featured as FeaturedEvent[])
        : FEATURED_EVENTS,
      updates: {
        message: pickString(doc.updatesMessage, EVENTS_UPDATES.message),
        socials: socials.length ? socials : EVENTS_UPDATES.socials,
      },
    };
  } catch {
    return fallback;
  }
}

export async function getGalleryPageContent(): Promise<GalleryPageContent> {
  const fallback = { hero: GALLERY_HERO, images: GALLERY_IMAGES };
  if (!isSanityConfigured()) return fallback;
  try {
    const doc = await client.fetch<{
      hero?: { eyebrow?: string; title?: string; subtitle?: string };
      images?: SanityImageWithAlt[];
    } | null>(GALLERY_PAGE_QUERY, {}, cmsFetchOptions);
    if (!doc) return fallback;
    return {
      hero: {
        eyebrow: pickString(doc.hero?.eyebrow, GALLERY_HERO.eyebrow),
        title: pickString(doc.hero?.title, GALLERY_HERO.title),
        subtitle: pickString(doc.hero?.subtitle, GALLERY_HERO.subtitle),
      },
      images: mapGalleryImages(doc.images, GALLERY_IMAGES),
    };
  } catch {
    return fallback;
  }
}

export async function getAxionPageContent(): Promise<AxionPageContent> {
  const fallback = {
    hero: AXION_PAGE.hero,
    images: AXION_GALLERY_IMAGES,
  };
  if (!isSanityConfigured()) return fallback;
  try {
    const doc = await client.fetch<{
      hero?: { eyebrow?: string; title?: string; subtitle?: string };
      images?: SanityImageWithAlt[];
    } | null>(AXION_PAGE_QUERY, {}, cmsFetchOptions);
    if (!doc) return fallback;
    return {
      hero: {
        eyebrow: pickString(doc.hero?.eyebrow, AXION_PAGE.hero.eyebrow),
        title: pickString(doc.hero?.title, AXION_PAGE.hero.title),
        subtitle: pickString(doc.hero?.subtitle, AXION_PAGE.hero.subtitle),
      },
      images: mapGalleryImages(doc.images, AXION_GALLERY_IMAGES),
    };
  } catch {
    return fallback;
  }
}

export async function getContactPageContent() {
  if (!isSanityConfigured()) return CONTACT_CONTENT;
  try {
    const doc = await client.fetch<{
      eyebrow?: string;
      title?: string;
      description?: string;
    } | null>(CONTACT_PAGE_QUERY, {}, cmsFetchOptions);
    if (!doc) return CONTACT_CONTENT;
    return {
      eyebrow: pickString(doc.eyebrow, CONTACT_CONTENT.eyebrow),
      title: pickString(doc.title, CONTACT_CONTENT.title),
      description: pickString(doc.description, CONTACT_CONTENT.description),
    };
  } catch {
    return CONTACT_CONTENT;
  }
}
