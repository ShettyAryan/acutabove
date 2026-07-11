import { urlForImage } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";

/**
 * Build a CDN URL that works for jpg / jpeg / png / webp / gif uploads.
 * `auto('format')` lets Sanity pick a browser-friendly format for next/image.
 */
export function cmsImageUrl(
  source: SanityImageSource | null | undefined,
  width = 900
): string | null {
  if (!source) return null;
  try {
    return urlForImage(source).width(width).auto("format").quality(80).url();
  } catch {
    return null;
  }
}
