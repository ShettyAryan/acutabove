import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventSubPage } from "@/components/event/nick-of-time/EventSubPage";
import {
  getProgramBySlug,
  NICK_OF_TIME_PROGRAMS,
} from "@/lib/nick-of-time-content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return NICK_OF_TIME_PROGRAMS.map((program) => ({
    slug: program.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) return { title: "Programme" };

  return {
    title: `${program.title} — Nick of Time`,
    description: program.description[0],
  };
}

export default async function NickOfTimeProgramPage({ params }: PageProps) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

  if (!program) notFound();

  return <EventSubPage program={program} />;
}
