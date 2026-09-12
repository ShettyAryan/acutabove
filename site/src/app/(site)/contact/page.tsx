import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { getContactPageContent } from "@/lib/cms/pages";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  const content = await getContactPageContent();

  return (
    <PagePlaceholder
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
    />
  );
}
