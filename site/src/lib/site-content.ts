export type NavLink = { label: string; href: string };

export type SiteContent = {
  siteName: string;
  maheLogo: { src: string; alt: string };
  brandLogo: { src: string; alt: string };
  registerFormUrl: string;
  email: string;
  instagramUrl: string;
  navLinks: NavLink[];
  footerBlurb: string;
  footerSocietyLinks: NavLink[];
  footerResourceLinks: NavLink[];
  footerAffiliation: string;
  copyrightName: string;
};

export const SITE_CONTENT: SiteContent = {
  siteName: "A Cut Above",
  maheLogo: {
    src: "/images/mahelogo.jpeg",
    alt: "Kasturba Medical College Mangalore, a constituent unit of MAHE Manipal",
  },
  brandLogo: {
    src: "/android-chrome-192x192.png",
    alt: "A Cut Above emblem",
  },
  registerFormUrl: "https://forms.gle/nBqRZntG2CLn7RPb7",
  email: "acutabove.2526@gmail.com",
  instagramUrl: "https://www.instagram.com/Acutabovemangalore",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Team", href: "/team" },
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
  ],
  footerBlurb:
    "The surgical society of Kasturba Medical College, Mangalore — dedicated to clinical excellence and academic mentorship.",
  footerSocietyLinks: [
    { label: "About the Club", href: "/about" },
    { label: "Team", href: "/team" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact Us", href: "/contact" },
  ],
  footerResourceLinks: [
    { label: "Case Studies", href: "/gallery" },
    { label: "Surgical Atlas", href: "/gallery" },
    { label: "Research Portal", href: "/about" },
    { label: "Events", href: "/events" },
  ],
  footerAffiliation:
    "Affiliated with Kasturba Medical College, Mangalore — a constituent unit of MAHE.",
  copyrightName: "A Cut Above Surgical Society",
};

export const CONTACT_CONTENT = {
  eyebrow: "Get in Touch",
  title: "Contact Us",
  description:
    "A contact form and society details will live here — send the Contact design whenever it's ready.",
};

export const AXION_PAGE = {
  hero: {
    eyebrow: "Event Highlights",
    title: "AXION Gallery",
    subtitle: "Moments from AXION quizzes, workshops, and academic sessions.",
  },
};
