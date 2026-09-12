import type { SanityImageSource } from "@sanity/image-url";
import { cmsImageUrl } from "@/lib/cms/image";

export type SanityImageWithAlt = {
  image?: SanityImageSource | null;
  alt?: string | null;
} | null;

export function mapImageWithAlt(
  value: SanityImageWithAlt | undefined,
  fallback: { src: string; alt: string },
  width = 1200
): { src: string; alt: string } {
  const src = cmsImageUrl(value?.image, width);
  if (!src) return fallback;
  return {
    src,
    alt: value?.alt?.trim() || fallback.alt,
  };
}

export function mapImageWithAltList(
  values: SanityImageWithAlt[] | null | undefined,
  fallback: { src: string; alt: string }[],
  width = 1200
): { src: string; alt: string }[] {
  if (!values?.length) return fallback;
  const mapped = values
    .map((value, i) => {
      const fb = fallback[i] ?? fallback[0] ?? { src: "/images/image1.jpeg", alt: "Image" };
      const src = cmsImageUrl(value?.image, width);
      if (!src) return null;
      return {
        src,
        alt: value?.alt?.trim() || fb.alt,
      };
    })
    .filter(Boolean) as { src: string; alt: string }[];
  return mapped.length ? mapped : fallback;
}

export function pickString(
  value: string | null | undefined,
  fallback: string
): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

export function pickStringArray(
  value: string[] | null | undefined,
  fallback: string[]
): string[] {
  if (!value?.length) return fallback;
  const cleaned = value.map((v) => v?.trim()).filter(Boolean) as string[];
  return cleaned.length ? cleaned : fallback;
}
