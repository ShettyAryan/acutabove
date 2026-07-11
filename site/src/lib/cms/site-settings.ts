import { client, cmsFetchOptions } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";

/** Default registration Google Form — used until/unless overridden in Sanity. */
export const DEFAULT_REGISTER_FORM_URL =
  "https://forms.gle/nBqRZntG2CLn7RPb7";

type SiteSettingsDoc = {
  registerFormUrl?: string | null;
} | null;

export async function getRegisterFormUrl(): Promise<string> {
  if (!isSanityConfigured()) {
    return DEFAULT_REGISTER_FORM_URL;
  }

  try {
    const settings = await client.fetch<SiteSettingsDoc>(
      SITE_SETTINGS_QUERY,
      {},
      cmsFetchOptions
    );
    const url = settings?.registerFormUrl?.trim();
    return url || DEFAULT_REGISTER_FORM_URL;
  } catch {
    return DEFAULT_REGISTER_FORM_URL;
  }
}
