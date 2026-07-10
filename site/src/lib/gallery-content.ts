export const GALLERY_HERO = {
  eyebrow: "Moments Captured",
  title: "Gallery",
  subtitle:
    "A visual archive of workshops, conferences, and the everyday craft of surgical learning at A Cut Above.",
};

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

/** image5 is not present in /public/images — included range is 1–24 excluding 5. */
const IMAGE_NUMBERS = [
  1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
  24,
] as const;

const ALTS = [
  "Surgical residents in a hands-on training session",
  "Delegates gathered at a past conference",
  "Students practicing suturing technique",
  "A packed lecture hall during a session",
  "Workshop participants at the skills lab",
  "Faculty guiding a clinical demonstration",
  "Close-up of surgical instruments and technique",
  "Delegates networking between sessions",
  "Hands-on wet-lab practice in progress",
  "Audience during a keynote address",
  "Students collaborating on a case discussion",
  "Live demonstration of surgical technique",
  "Conference registration and welcome desk",
  "Team photo from a past Nick of Time event",
  "Simulation training under faculty supervision",
  "Poster presentation session in progress",
  "Quiz round with competing teams",
  "Instrument tray prepared for a workshop",
  "Delegates observing a clinical case",
  "Skills lab suturing practice",
  "Faculty panel during an academic session",
  "Students presenting research findings",
  "Closing moments of a surgical symposium",
];

export const GALLERY_IMAGES: GalleryImage[] = IMAGE_NUMBERS.map((n, i) => ({
  id: `image${n}`,
  src: `/images/image${n}.jpeg`,
  alt: ALTS[i] ?? `Gallery moment ${n}`,
}));
