export const ABOUT_HERO = {
  eyebrow: "Our Story",
  title: "From MAHE to the Operating Table",
  subtitle:
    "An academic lineage of excellence, craftsmanship, and surgical innovation within the heart of Mangalore.",
};

export const CHAPTER_MAHE = {
  chapter: "Chapter One",
  number: "01",
  title: "Manipal Academy of Higher Education",
  subtitle: "An Institution of Eminence · Deemed to be University",
  body: [
    "Formerly known as Manipal University, MAHE — established in June 1953 — is a place born of one man's dream: our founder Dr. Tonse Madhav Ananth Pai, Padma Shri awardee, a visionary, educationist, and philanthropist.",
    "Manipal, once a barren hillock in South Karnataka, is now India's largest higher education and research township, home to thirty institutions. MAHE is an inspiring leader in the field of education, research, and healthcare.",
    "The University is accredited with Grade A++ by the National Assessment and Accreditation Council (NAAC) and ranks 3rd in the National Institutional Ranking Framework (NIRF).",
    "With its heritage of excellence in higher education and research, MAHE was granted the status of Institution of Eminence by the MHRD, Government of India, in 2020.",
  ],
  stats: [
    { value: "1953", label: "Established" },
    { value: "A++", label: "NAAC Grade" },
    { value: "3rd", label: "NIRF Ranking" },
    { value: "2020", label: "Institution of Eminence" },
  ],
  image: {
    src: "/images/mahe.jpg",
    alt: "The Manipal Academy of Higher Education campus at night",
  },
  quote:
    "Excellence in education is the foundation upon which every great institution is built.",
};

export const CHAPTER_KMC = {
  chapter: "Chapter Two",
  number: "02",
  title: "KMC Mangalore Legacy",
  body: [
    "Kasturba Medical College (KMC), Mangalore, was established in 1995, and since then has grown into one of the most sought-after colleges in India, offering a wide variety of medical courses.",
    "KMC Mangalore is an institution that strives to encourage research in the scientific field, with several of its students being selected each year for the prestigious ICMR grant.",
    "It has a vast library of research publications conducted by the institution's faculty and students, with a mission to be a center of academic excellence that furthers scientific development.",
  ],
  galleryLink: { label: "View Gallery", href: "/gallery" },
  images: [
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
      src: "/images/vertical-cut.jpeg",
      alt: "A mentor guiding a resident through a surgical training session",
    },
  ],
};

export const CHAPTER_SURGERY = {
  chapter: "Chapter Three",
  number: "03",
  title: "Department of Surgery",
  overview: {
    label: "Overview",
    intro:
      "The Department of Surgery is well engaged in teaching activities pertaining to undergraduate medical courses as well as postgraduate training in surgery. The 30-member strong teaching team conducts theory classes, seminars, practical clinical teaching and operative surgery training using audiovisual and IT gadgets. The department has acquired computers, handy cam, and digital cameras for recording clinical meeting and also an endo trainer for imparting basic laparoscopic skills.",
    pgCourse: {
      intro:
        "The Master of Surgery postgraduate course was started in March 1962 under the leadership of Late Prof. M. P. Pai. This was an achievement because:",
      achievements: [
        "It was the very first PG Course that was started in the State of Karnataka.",
        "The College was at that time only 9 years old but was recognized by the Indian & British Medical Council.",
      ],
      followUp:
        "From March 1964 onwards — well trained general surgeons have been sent forth year after year to earn a good standing in society and the medical fraternity as efficient teachers, competent surgeons & super specialists, all of whom have been keeping the banner of KMC aloft and flying both in India & abroad.",
    },
    paragraphs: [
      "The department provides a comprehensive spectrum of services, tailored towards accurate diagnosis and management of all surgical conditions in an inpatient as well as outpatient setting. An increasing proportion of procedures are now performed in our ambulatory surgery centre where suitable patients are not required to be admitted to the hospital following their operation and can be discharged on the same day (Day Care).",
      "A variety of surgical procedures are carried out at the Department of General Surgery. These include operations on breast, thyroid, hernia, salivary glands, gastrointestinal tract, liver, pancreas and spleen. The department also handles all the surgical emergencies and abdominal trauma. The consultants are highly skilled and experienced and are supported by a dedicated team of junior staff. The operation theatres are well equipped with most modern instruments like Harmonic scalpel, Ligasure etc.",
      "The department is one of the first to start laparoscopic surgery, commonly known as \"Keyhole surgery\". Hundreds of procedures have been carried out with excellent results. It is endowed with modern equipment like 3 Chip Camera, High-Resolution Monitor and laparoscopic Harmonic Scalpel and Ligasure which makes surgery simple and safe.",
    ],
    hospitals:
      "This department is spread over in three hospitals — Govt. Wenlock Hospital, KMC Hospital Attavar, KMC Hospital Ambedkar Circle.",
  },
  keyFeatures: {
    label: "Key Features",
    items: [
      "Oldest private medical school in the country",
      "First private medical school to start surgical training program in India",
      "First surgical department in a private medical school to conduct CME program",
      "8 surgical units distributed in both Government aided hospital and private hospital establishment",
      "Students of both national and international origin",
      "Strong alumni presence in varied fields, both in the country and abroad",
      "First to perform open-heart surgery in Mangalore",
    ],
  },
};

export const CHAPTER_CUT_ABOVE = {
  chapter: "Chapter Four",
  number: "04",
  title: "A Cut Above",
  body: [
    "The Department of Surgery at KMC, Mangalore, was the first in the state of Karnataka to establish a postgraduate program over 60 years ago.",
    "It takes pride in providing high-quality academic and clinical training to both undergraduate and postgraduate students while actively facilitating research. The aim is to provide state-of-the-art surgical care to patients from all around Mangalore.",
    "A Cut Above is the official surgical society of Kasturba Medical College, Mangalore — a student-led community founded in 2018 to bridge the gap between classroom anatomy and real-world surgical precision.",
    "Through flagship conferences like Nick of Time, hands-on workshops, and mentorship from faculty and senior residents, we cultivate the next generation of surgical leaders who embody both technical mastery and academic curiosity.",
  ],
  stats: [
    { value: "200+", label: "Members Joined" },
    { value: "2018", label: "Year Established" },
  ],
  logo: {
    src: "/android-chrome-512x512.png",
    alt: "A Cut Above society emblem",
  },
  ctas: [
    { label: "Meet the Team", href: "/team", variant: "solid" as const },
    { label: "Explore Events", href: "/events", variant: "outline" as const },
  ],
};
