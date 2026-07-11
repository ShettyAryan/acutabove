import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventSubPage } from "@/components/event/nick-of-time/EventSubPage";
import {
  getNickOfTimeProgramBySlug,
  getNickOfTimeProgramSlugs,
} from "@/lib/cms/nick-of-time";
import { getRegisterFormUrl } from "@/lib/cms/site-settings";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const slugs = await getNickOfTimeProgramSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = await getNickOfTimeProgramBySlug(slug);
  if (!program) return { title: "Programme" };

  return {
    title: `${program.title} — Nick of Time`,
    description: program.description[0],
  };
}

export default async function NickOfTimeProgramPage({ params }: PageProps) {
  const { slug } = await params;
  const [program, registerHref] = await Promise.all([
    getNickOfTimeProgramBySlug(slug),
    getRegisterFormUrl(),
  ]);

  if (!program) notFound();

  return <EventSubPage program={program} registerHref={registerHref} />;
}
