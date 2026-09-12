import { client, cmsFetchOptions } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";
import { cmsImageUrl } from "@/lib/cms/image";
import { pickString } from "@/lib/cms/map";
import { SITE_CONTENT, type SiteContent } from "@/lib/site-content";
import type { SanityImageSource } from "@sanity/image-url";

/** Default registration Google Form — used until/unless overridden in Sanity. */
export const DEFAULT_REGISTER_FORM_URL = SITE_CONTENT.registerFormUrl;

type SiteSettingsDoc = {
  siteName?: string | null;
  maheLogo?: SanityImageSource | null;
  maheLogoAlt?: string | null;
  brandLogo?: SanityImageSource | null;
  brandLogoAlt?: string | null;
  registerFormUrl?: string | null;
  email?: string | null;
  instagramUrl?: string | null;
  navLinks?: { label?: string; href?: string }[] | null;
  footerBlurb?: string | null;
  footerSocietyLinks?: { label?: string; href?: string }[] | null;
  footerResourceLinks?: { label?: string; href?: string }[] | null;
  footerAffiliation?: string | null;
  copyrightName?: string | null;
} | null;

function mapLinks(
  links: { label?: string; href?: string }[] | null | undefined,
  fallback: { label: string; href: string }[]
) {
  if (!links?.length) return fallback;
  const mapped = links
    .filter((l) => l?.label && l?.href)
    .map((l) => ({ label: l.label!.trim(), href: l.href!.trim() }));
  return mapped.length ? mapped : fallback;
}

export async function getSiteContent(): Promise<SiteContent> {
  if (!isSanityConfigured()) return SITE_CONTENT;

  try {
    const doc = await client.fetch<SiteSettingsDoc>(
      SITE_SETTINGS_QUERY,
      {},
      cmsFetchOptions
    );
    if (!doc) return SITE_CONTENT;

    const maheSrc = cmsImageUrl(doc.maheLogo, 600);
    const brandSrc = cmsImageUrl(doc.brandLogo, 200);

    return {
      siteName: pickString(doc.siteName, SITE_CONTENT.siteName),
      maheLogo: {
        src: maheSrc || SITE_CONTENT.maheLogo.src,
        alt: pickString(doc.maheLogoAlt, SITE_CONTENT.maheLogo.alt),
      },
      brandLogo: {
        src: brandSrc || SITE_CONTENT.brandLogo.src,
        alt: pickString(doc.brandLogoAlt, SITE_CONTENT.brandLogo.alt),
      },
      registerFormUrl: pickString(
        doc.registerFormUrl,
        SITE_CONTENT.registerFormUrl
      ),
      email: pickString(doc.email, SITE_CONTENT.email),
      instagramUrl: pickString(doc.instagramUrl, SITE_CONTENT.instagramUrl),
      navLinks: mapLinks(doc.navLinks, SITE_CONTENT.navLinks),
      footerBlurb: pickString(doc.footerBlurb, SITE_CONTENT.footerBlurb),
      footerSocietyLinks: mapLinks(
        doc.footerSocietyLinks,
        SITE_CONTENT.footerSocietyLinks
      ),
      footerResourceLinks: mapLinks(
        doc.footerResourceLinks,
        SITE_CONTENT.footerResourceLinks
      ),
      footerAffiliation: pickString(
        doc.footerAffiliation,
        SITE_CONTENT.footerAffiliation
      ),
      copyrightName: pickString(
        doc.copyrightName,
        SITE_CONTENT.copyrightName
      ),
    };
  } catch {
    return SITE_CONTENT;
  }
}

export async function getRegisterFormUrl(): Promise<string> {
  const site = await getSiteContent();
  return site.registerFormUrl || DEFAULT_REGISTER_FORM_URL;
}
