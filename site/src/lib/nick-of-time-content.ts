export type ProgramGroup = "workshops" | "formal" | "academic";

export type NickOfTimeProgram = {
  slug: string;
  title: string;
  category: string;
  group: ProgramGroup;
  groupLabel: string;
  description: string[];
  bullets?: string[];
  theme?: string;
  image: string;
  alt: string;
  cta: string;
};

export const NICK_OF_TIME = {
  slug: "nickoftime",
  path: "/event/nickoftime",
  eventDate: "2026-11-26T09:00:00+05:30",

  hero: {
    title: "Nick of Time",
    subtitle:
      "An academic fest designed to enhance confidence, prepare undergraduates for final year exams, and bridge the gap between theory and the operating theatre.",
    registerHref: "https://forms.gle/nBqRZntG2CLn7RPb7",
    brochureHref:
      "https://drive.google.com/file/d/1Og8R6VZIAxdKXAwM6VIyvbsVjC3hd8QH/view?usp=sharing",
  },

  about: {
    title: "About Nick of Time",
    body: [
      "Nick of Time is an academic fest designed to enhance the confidence of undergraduate students and prepare them for their final year exams. Our comprehensive approach covers high-yield topics, CBME examination strategies, and features role plays by esteemed surgical faculties.",
      "Last session, we welcomed over 700 delegates from 10+ medical colleges, and this year, it's open to undergraduates from all medical colleges. The event offers students a platform for in-depth revision of surgical concepts.",
      "Our program includes clinically-oriented lectures, intraoperative videos, X-rays, instrument discussions, workshops to hone your basic suturing skills, and a simulated OSCE. The poster and paper presentation competitions provide an opportunity for students to present their research findings in the field of surgery, fostering a dynamic environment for interactive discussions and knowledge exchange.",
      "The quiz helps students fine-tune their concepts and put them to the test, whereas the ideathon helps inspire and encourage students to think out of the box and bring solutions to problems we are facing in the medical field.",
    ],
    stats: [
      { value: "700+", label: "Delegates Last Session" },
      { value: "10+", label: "Medical Colleges" },
      { value: "2", label: "Days of Learning" },
    ],
  },

  heritage: {
    title: "Preserving the Surgical Heritage",
    body: [
      "Born from the legacy of the Department of Surgery at KMC Mangalore — the first in Karnataka to establish a postgraduate programme over six decades ago — Nick of Time is more than a conference. It is a commitment to the surgeons of tomorrow.",
      "Through A Cut Above, the official surgical society of KMC Mangalore, we bridge classroom anatomy and operating-theatre precision — cultivating leaders who embody technical mastery, academic curiosity, and compassionate care.",
    ],
    image: {
      src: "/images/image1.jpeg",
      alt: "Surgical trainees practicing techniques at workshop tables",
    },
    legacyLink: { label: "Discover Our Legacy", href: "/about" },
  },

  countdown: {
    eyebrow: "Surgical Enlightenment In",
  },

  programs: {
    id: "programs",
    title: "Explore the",
    titleEmphasis: "Programme.",
    subtitle:
      "From hands-on workshops to formal lectures and competitive events — dive into each component of Nick of Time.",
    quote: "Precision in thought leads to precision in action.",
    groups: [
      { id: "workshops" as const, label: "Hands-on Workshops" },
      { id: "formal" as const, label: "Formal Events" },
      { id: "academic" as const, label: "Competitions & Academic" },
    ],
  },

  finalCta: {
    eyebrow: "The Final Countdown",
    title: "Ready to be Exam-Ready?",
    registerHref: "https://forms.gle/nBqRZntG2CLn7RPb7",
    eventsHref: "/events",
  },
};

export const NICK_OF_TIME_PROGRAMS: NickOfTimeProgram[] = [
  {
    slug: "laparoscopic-simulation",
    title: "Laparoscopic Simulation",
    category: "Workshop",
    group: "workshops",
    groupLabel: "Hands-on Workshops",
    description: [
      "The laparoscopic simulation workshop offers participants an immersive, hands-on introduction to the fundamentals of minimally invasive surgery. Guided by experienced faculty, attendees will gain practical exposure to laparoscopic instrumentation, camera navigation, depth perception, hand-eye coordination, and essential operative techniques using simulation-based training modules.",
      "Designed to bridge the gap between theory and clinical practice.",
    ],
    image: "/images/image20.jpeg",
    alt: "Students practicing laparoscopic simulation techniques",
    cta: "Register for Workshop",
  },
  {
    slug: "bowel-vascular-anastomosis",
    title: "Bowel and Vascular Anastomosis Technique",
    category: "Workshop",
    group: "workshops",
    groupLabel: "Hands-on Workshops",
    description: [
      "Master the principles and techniques of surgical anastomosis through an immersive, hands-on workshop designed to bridge theory with practice. Experience hands-on training in bowel and vascular anastomosis using realistic wet-lab specimens, facilitated by Ethicon.",
      "This session is designed to help participants refine their suturing techniques, improve tissue handling skills, and gain practical insights into surgical anastomosis in a supervised learning environment.",
    ],
    image: "/images/vertical-cut.jpeg",
    alt: "Hands practicing vascular anastomosis technique",
    cta: "Register for Workshop",
  },
  {
    slug: "appendix-protocol",
    title: "Appendix Protocol",
    category: "Workshop",
    group: "workshops",
    groupLabel: "Hands-on Workshops",
    description: [
      "While performing an appendectomy simulation, build a strong foundation in relevant essential surgical skills through this interactive, hands-on workshop focused on suturing techniques and secure knot tying.",
      "Participants will practice on specially designed DIY simulation models that closely replicate real tissue handling, allowing them to develop precision, dexterity, and confidence in a realistic learning environment. Under expert guidance, attendees will master proper instrument handling, needle control, tissue approximation, and knot security — fundamental skills required for every aspiring surgeon.",
    ],
    bullets: ["Suturing Techniques", "Secure Knot Tying", "Appendectomy Simulation"],
    image: "/images/image3.jpeg",
    alt: "Suturing and knot tying practice on simulation models",
    cta: "Register for Workshop",
  },
  {
    slug: "basic-suturing",
    title: "Skills Lab: Basic Suturing",
    category: "Workshop",
    group: "workshops",
    groupLabel: "Hands-on Workshops",
    description: [
      "Develop your surgical skills in this hands-on workshop designed for MBBS students. Learn the fundamentals of instrument handling, knot tying, and tissue handling. Practice essential suturing techniques on simulation models under expert guidance.",
      "Understand the indications and handling of commonly used suture materials. Gain confidence through supervised, step-by-step practical training. Strengthen your procedural skills in a safe and interactive learning environment.",
      "This workshop is ideal for students interested in surgery or looking to enhance their clinical competence. Leave with a solid foundation in one of the most essential skills in surgical practice.",
    ],
    image: "/images/image1.jpeg",
    alt: "MBBS students learning basic suturing in the skills lab",
    cta: "Register for Workshop",
  },
  {
    slug: "formal-events",
    title: "Formal Events",
    category: "Lectures",
    group: "formal",
    groupLabel: "Formal Events",
    description: [
      "These sessions will not only revise fundamental principles but also offer clinical correlations critical for both examinations and practical use.",
      "The list of speakers will be announced on our official Instagram page. The faculty members will be joining us from various esteemed institutions.",
    ],
    bullets: [
      "Ulcer and Swelling",
      "Varicose Veins",
      "Neck and Thyroid",
      "Peripheral Vascular Disease",
      "Operative Surgeries — Lap Cholecystectomy and Appendicectomy",
      "Breast",
      "Mass Abdomen",
      "Groin: Inguinal Hernia",
    ],
    image: "/images/image4.jpeg",
    alt: "Faculty delivering a clinically-oriented surgical lecture",
    cta: "View Schedule",
  },
  {
    slug: "poster-presentation",
    title: "Poster Presentation",
    category: "Academic",
    group: "academic",
    groupLabel: "Competitions & Academic",
    description: [
      "Showcase your research and clinical insights through an engaging poster presentation. Present case reports in a visually impactful format. Interact with faculty, judges, and fellow students during the evaluation session.",
      "Develop your scientific communication and presentation skills. Receive valuable feedback from experienced clinicians and academicians. Explore innovative ideas and recent advances in surgical sciences.",
      "Open to all MBBS students with an interest in academic research. A great platform to learn, network, and gain recognition for your work.",
    ],
    image: "/images/image1.jpeg",
    alt: "Students presenting research posters at a medical conference",
    cta: "Submit Poster",
  },
  {
    slug: "paper-presentation",
    title: "Paper Presentation",
    category: "Academic",
    group: "academic",
    groupLabel: "Competitions & Academic",
    description: [
      "Present your research and case studies before an expert panel. Strengthen your scientific communication and public speaking skills. Share evidence-based findings and engage in meaningful academic discussions.",
      "Receive constructive feedback from experienced faculty members. Learn from diverse presentations by fellow participants. Enhance your understanding of research methodology and critical appraisal.",
      "Open to MBBS students with a passion for academic excellence. An excellent opportunity to showcase your work and contribute to surgical learning.",
    ],
    image: "/images/image11.jpeg",
    alt: "A student presenting a research paper before faculty",
    cta: "Submit Paper",
  },
  {
    slug: "ideathon",
    title: "Ideathon",
    category: "Innovation",
    group: "academic",
    groupLabel: "Competitions & Academic",
    theme: "Think beyond textbooks — innovate for the future of healthcare.",
    description: [
      "Think beyond textbooks and tackle real-world challenges in healthcare and surgery. Collaborate with peers to develop innovative, practical solutions. Brainstorm creative ideas that address clinical and surgical problems.",
      "Present your concepts before an expert panel for evaluation. Enhance your teamwork, problem-solving, and critical thinking skills. Receive valuable feedback to refine and strengthen your ideas.",
      "Open to all MBBS students with an innovative mindset. Turn your ideas into impactful solutions for the future of healthcare.",
    ],
    image: "/images/image13.jpeg",
    alt: "Students collaborating on healthcare innovation ideas",
    cta: "Register Team",
  },
  {
    slug: "surgical-quiz",
    title: "Surgical Quiz",
    category: "Competition",
    group: "academic",
    groupLabel: "Competitions & Academic",
    description: [
      "Test your surgical knowledge in an exciting and competitive quiz designed for fourth-year MBBS students. Challenge yourself with clinically oriented questions based on undergraduate surgery.",
      "Topics include general surgery, trauma, surgical anatomy, instruments, and common procedures. Compete against peers in multiple engaging rounds. Sharpen your clinical reasoning and decision-making skills.",
      "Learn through an interactive and intellectually stimulating experience. Showcase your knowledge and teamwork under time pressure. A perfect event to prepare, compete, and celebrate the spirit of surgery.",
    ],
    image: "/images/axion.jpeg",
    alt: "Students competing in a surgical quiz round",
    cta: "Join Team",
  },
];

export function getProgramBySlug(slug: string): NickOfTimeProgram | undefined {
  return NICK_OF_TIME_PROGRAMS.find((p) => p.slug === slug);
}

export function getProgramsByGroup(group: ProgramGroup): NickOfTimeProgram[] {
  return NICK_OF_TIME_PROGRAMS.filter((p) => p.group === group);
}

export function programPath(slug: string) {
  return `/event/nickoftime/${slug}`;
}
