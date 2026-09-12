import type { Metadata } from "next";
import { NickOfTimeHero } from "@/components/event/nick-of-time/NickOfTimeHero";
import { NickOfTimeAbout } from "@/components/event/nick-of-time/NickOfTimeAbout";
import { NickOfTimeHeritage } from "@/components/event/nick-of-time/NickOfTimeHeritage";
import { NickOfTimeCountdown } from "@/components/event/nick-of-time/NickOfTimeCountdown";
import { NickOfTimePrograms } from "@/components/event/nick-of-time/NickOfTimePrograms";
import { NickOfTimeFinalCta } from "@/components/event/nick-of-time/NickOfTimeFinalCta";
import { getNickOfTimePrograms } from "@/lib/cms/nick-of-time";
import { getNickOfTimePageContent } from "@/lib/cms/nick-of-time-page";
import { getRegisterFormUrl } from "@/lib/cms/site-settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Nick of Time",
  description:
    "An academic surgical fest for undergraduate students — workshops, lectures, OSCE simulation, poster and paper presentations, ideathon, and surgical quiz by KMC Mangalore.",
};

export default async function NickOfTimePage() {
  const registerHref = await getRegisterFormUrl();
  const [programsList, content] = await Promise.all([
    getNickOfTimePrograms(),
    getNickOfTimePageContent(registerHref),
  ]);

  return (
    <>
      <NickOfTimeHero content={content.hero} />
      <NickOfTimeAbout
        content={content.about}
        collage={content.aboutCollage}
      />
      <NickOfTimeHeritage content={content.heritage} />
      <NickOfTimeCountdown
        eventDate={content.eventDate}
        content={content.countdown}
      />
      <NickOfTimePrograms
        programsList={programsList}
        content={content.programs}
      />
      <NickOfTimeFinalCta content={content.finalCta} />
    </>
  );
}
