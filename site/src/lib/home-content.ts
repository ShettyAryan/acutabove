export type HomeHeroSlide = {
  src: string;
  alt: string;
};

export type HomeHighlight = {
  icon: "history" | "graduation" | "scissors" | "award";
  title: string;
  copy: string;
};

export type HomeEventPreview = {
  slug: string;
  title: string;
  date: string;
  blurb: string;
  image: string;
  alt: string;
  flagship: boolean;
  href: string;
};

export type HomeContent = {
  hero: {
    slides: HomeHeroSlide[];
    title: string;
    tagline: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    promo: { label: string; href: string };
  };
  highlights: HomeHighlight[];
  about: {
    sectionTitle: string;
    eyebrow: string;
    headline: string;
    body: string;
    linkLabel: string;
    linkHref: string;
    quote: string;
    caption: string;
    imageMain: { src: string; alt: string };
    imageSide: { src: string; alt: string };
  };
  eventsPreview: {
    title: string;
    subtitle: string;
    viewAllLabel: string;
    viewAllHref: string;
    events: HomeEventPreview[];
  };
};

export const HOME_CONTENT: HomeContent = {
  hero: {
    slides: [
      {
        src: "/images/image1.jpeg",
        alt: "Surgical residents in a hands-on training session",
      },
      {
        src: "/images/image2.jpeg",
        alt: "Delegates gathered at a past Nick of Time conference",
      },
      {
        src: "/images/image3.jpeg",
        alt: "Students practicing suturing technique on a workshop bench",
      },
      {
        src: "/images/image4.jpeg",
        alt: "A packed lecture hall during a conference session",
      },
    ],
    title: "A Cut Above",
    tagline:
      "Where precision meets purpose — the surgical society of KMC Mangalore, cultivating the next generation of surgical leaders through excellence and innovation.",
    primaryCta: { label: "Explore Events", href: "/events" },
    secondaryCta: { label: "About the Club", href: "/about" },
    promo: {
      label: "A Nick of Time is here",
      href: "/event/nickoftime",
    },
  },
  highlights: [
    {
      icon: "history",
      title: "Est. 2018",
      copy: "A legacy of clinical mentorship and academic rigor.",
    },
    {
      icon: "graduation",
      title: "Expert Lectures",
      copy: "Insights from globally recognized surgical specialists.",
    },
    {
      icon: "scissors",
      title: "Hands-on Practice",
      copy: "Refining technical skill through controlled simulations.",
    },
    {
      icon: "award",
      title: "Nick of Time",
      copy: "Our premier annual national flagship surgical conference.",
    },
  ],
  about: {
    sectionTitle: "About A Cut Above",
    eyebrow: "Our Philosophy",
    headline: "Mastering the art and science of the scalpel.",
    body: "The KMC Mangalore Surgical Society is more than a club — it is an academic sanctuary where theory meets practice. We bridge the gap between classroom anatomy and real-world surgical precision, fostering an environment of curiosity and disciplined practice.",
    linkLabel: "Read our full story",
    linkHref: "/about",
    quote: "Precision is the difference between a technician and a surgeon.",
    caption: "Established Excellence",
    imageMain: {
      src: "/images/vertical-cut.jpeg",
      alt: "A mentor guiding a resident through a surgical training session",
    },
    imageSide: {
      src: "/images/image3.jpeg",
      alt: "Students practicing suturing technique on a workshop bench",
    },
  },
  eventsPreview: {
    title: "Upcoming Calendar",
    subtitle: "Join us for a season of unmatched clinical excellence.",
    viewAllLabel: "View all events",
    viewAllHref: "/events",
    events: [
      {
        slug: "axion-2026",
        title: "Axion 2026",
        date: "Feb 2026",
        blurb: "The undergraduate surgical meet.",
        image: "/images/axion.jpeg",
        alt: "Delegates seated in an auditorium for a surgical conference",
        flagship: false,
        href: "/events",
      },
      {
        slug: "a-nick-of-time",
        title: "Nick of Time",
        date: "Registrations open",
        blurb:
          "Our annual national flagship surgical conference — the premium experience.",
        image: "/images/image2.jpeg",
        alt: "Surgical instruments laid out for a live demonstration",
        flagship: true,
        href: "/event/nickoftime",
      },
      {
        slug: "Erevna",
        title: "Erevna",
        date: "May 2026",
        blurb:
          "Specialised neuro-surgical workshop series for advanced trainees.",
        image: "/images/erevna.jpg",
        alt: "A neurosurgery workshop in progress",
        flagship: false,
        href: "/events",
      },
    ],
  },
};
