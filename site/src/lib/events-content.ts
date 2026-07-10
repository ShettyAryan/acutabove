export const EVENTS_HERO = {
  eyebrow: "What We Run",
  title: "Our Events",
  subtitle:
    "Bridging the gap between theory and the operating theatre through meticulously curated workshops, symposiums, and our hallmark surgical conferences.",
};

export type FeaturedEvent = {
  id: string;
  title: string;
  tag: string;
  tagTone?: "light" | "primary";
  description: string;
  image: string;
  alt: string;
  href: string;
  cta: string;
  flagship?: boolean;
  subtitle?: string;
};

export const FEATURED_EVENTS: FeaturedEvent[] = [
  {
    id: "axion-2026",
    title: "AXION 2026",
    tag: "Annual",
    tagTone: "light",
    description:
      "Our premier inter-collegiate surgical quiz and workshop series designed to test the mental acuity of future surgeons.",
    image: "/images/axion.jpeg",
    alt: "A speaker presenting at a surgical conference podium",
    href: "/events#axion-2026",
    cta: "Learn More",
  },
  {
    id: "erevana",
    title: "Erevana",
    tag: "Workshop",
    tagTone: "light",
    description:
      "An intensive wet-lab experience focusing on micro-surgical techniques and advanced suturing fundamentals.",
    image: "/images/erevna.jpg",
    alt: "Hands in surgical gloves practicing technique in a wet lab",
    href: "/events#erevana",
    cta: "Learn More",
  },
  {
    id: "a-nick-of-time",
    title: "Nick of Time",
    tag: "New",
    tagTone: "primary",
    subtitle: "The Flagship Event",
    description:
      "Our flagship surgical conference — hands-on, high-stakes, exam-ready. Master the blade under pressure.",
    image: "/images/image2.jpeg",
    alt: "A packed lecture hall during a flagship surgical conference",
    href: "/event/nickoftime",
    cta: "Explore Nick of Time",
    flagship: true,
  },
];

export const EVENTS_UPDATES = {
  message:
    "New events are announced each academic year — check back or follow us for updates.",
  socials: [
    {
      label: "Visit our website",
      href: "/",
      icon: "globe" as const,
    },
    {
      label: "Share with colleagues",
      href: "/contact",
      icon: "share" as const,
    },
    {
      label: "Email the society",
      href: "mailto:hello@acutabove.org",
      icon: "mail" as const,
    },
  ],
};
