import type { Metadata } from "next";
import { NickOfTimeHero } from "@/components/event/nick-of-time/NickOfTimeHero";
import { NickOfTimeAbout } from "@/components/event/nick-of-time/NickOfTimeAbout";
import { NickOfTimeHeritage } from "@/components/event/nick-of-time/NickOfTimeHeritage";
import { NickOfTimeCountdown } from "@/components/event/nick-of-time/NickOfTimeCountdown";
import { NickOfTimePrograms } from "@/components/event/nick-of-time/NickOfTimePrograms";
import { NickOfTimeFinalCta } from "@/components/event/nick-of-time/NickOfTimeFinalCta";

export const metadata: Metadata = {
  title: "A Nick of Time",
  description:
    "An academic surgical fest for undergraduate students — workshops, lectures, OSCE simulation, poster and paper presentations, ideathon, and surgical quiz by KMC Mangalore.",
};

export default function NickOfTimePage() {
  return (
    <>
      <NickOfTimeHero />
      <NickOfTimeAbout />
      <NickOfTimeHeritage />
      <NickOfTimeCountdown />
      <NickOfTimePrograms />
      <NickOfTimeFinalCta />
    </>
  );
}
