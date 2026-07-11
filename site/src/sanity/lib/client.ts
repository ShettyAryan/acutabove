import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: false,
});

/** Always bypass Next.js Data Cache for CMS reads (avoids stale team/programme pages). */
export const cmsFetchOptions = {
  cache: "no-store" as const,
};
