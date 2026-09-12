/**
 * Seed: uploads site text/images into Sanity so Studio can edit everything.
 *
 * Prerequisites:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_WRITE_TOKEN  (Editor or Admin token from manage.sanity.io)
 *
 * Usage: npm run sanity:seed
 */

import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "node:fs";
import { resolve, basename } from "node:path";
import {
  CUT_ABOVE_TEAM,
  DEPARTMENT_OF_SURGERY,
  LEADERSHIP,
  TEAM_HERO,
  type TeamMember,
  type TeamTab,
} from "../src/lib/team-content";
import {
  NICK_OF_TIME,
  NICK_OF_TIME_PROGRAMS,
} from "../src/lib/nick-of-time-content";
import { HOME_CONTENT } from "../src/lib/home-content";
import { SITE_CONTENT, CONTACT_CONTENT, AXION_PAGE } from "../src/lib/site-content";
import {
  ABOUT_HERO,
  CHAPTER_CUT_ABOVE,
  CHAPTER_KMC,
  CHAPTER_MAHE,
  CHAPTER_SURGERY,
} from "../src/lib/about-content";
import {
  AXION_GALLERY_IMAGES,
  EVENTS_HERO,
  EVENTS_UPDATES,
  FEATURED_EVENTS,
} from "../src/lib/events-content";
import { GALLERY_HERO, GALLERY_IMAGES } from "../src/lib/gallery-content";

function loadEnvLocal() {
  const envPath = resolve(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return;
  const text = readFileSync(envPath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const publicDir = resolve(process.cwd(), "public");
const assetCache = new Map<string, { _type: "reference"; _ref: string }>();

function sleep(ms: number) {
  return new Promise((resolveSleep) => setTimeout(resolveSleep, ms));
}

async function uploadImage(
  publicPath: string | null | undefined
): Promise<
  | { _type: "image"; asset: { _type: "reference"; _ref: string } }
  | undefined
> {
  if (!publicPath) return undefined;
  const cached = assetCache.get(publicPath);
  if (cached) {
    return { _type: "image", asset: cached };
  }

  const filePath = resolve(publicDir, publicPath.replace(/^\//, ""));
  if (!existsSync(filePath)) {
    console.warn(`  skip missing image: ${publicPath}`);
    return undefined;
  }

  const buffer = readFileSync(filePath);
  const filename = basename(filePath);
  let lastError: unknown;

  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const asset = await client.assets.upload("image", buffer, { filename });
      const ref = { _type: "reference" as const, _ref: asset._id };
      assetCache.set(publicPath, ref);
      await sleep(150);
      return { _type: "image", asset: ref };
    } catch (err) {
      lastError = err;
      const wait = attempt * 800;
      console.warn(
        `  retry upload (${attempt}/5) ${publicPath} in ${wait}ms…`
      );
      await sleep(wait);
    }
  }

  throw lastError;
}

async function imageWithAlt(src: string, alt: string) {
  const image = await uploadImage(src);
  if (!image) return undefined;
  return { _type: "imageWithAlt" as const, image, alt };
}

async function imagesWithAlt(items: { src: string; alt: string }[]) {
  const out = [];
  for (const item of items) {
    const mapped = await imageWithAlt(item.src, item.alt);
    if (mapped) out.push(mapped);
  }
  return out;
}

async function seedTeam() {
  const groups: { tab: TeamTab; members: TeamMember[] }[] = [
    { tab: "leadership", members: LEADERSHIP },
    { tab: "surgery", members: DEPARTMENT_OF_SURGERY },
    { tab: "cut-above", members: CUT_ABOVE_TEAM },
  ];

  for (const { tab, members } of groups) {
    for (let i = 0; i < members.length; i++) {
      const member = members[i];
      const id = `teamMember.${member.id}`;
      const image = await uploadImage(member.image);
      await client.createOrReplace({
        _id: id,
        _type: "teamMember",
        name: member.name,
        designation: member.designation,
        tab,
        order: i,
        ...(image ? { image } : {}),
      });
      console.log(`  team: ${member.name}`);
    }
  }
}

async function seedPrograms() {
  for (let i = 0; i < NICK_OF_TIME_PROGRAMS.length; i++) {
    const program = NICK_OF_TIME_PROGRAMS[i];
    const id = `nickOfTimeProgram.${program.slug}`;
    const image = await uploadImage(program.image);
    if (!image) {
      console.warn(`  skip programme (no image): ${program.slug}`);
      continue;
    }
    await client.createOrReplace({
      _id: id,
      _type: "nickOfTimeProgram",
      title: program.title,
      slug: { _type: "slug", current: program.slug },
      category: program.category,
      group: program.group,
      groupLabel: program.groupLabel,
      description: program.description,
      ...(program.bullets ? { bullets: program.bullets } : {}),
      ...(program.theme ? { theme: program.theme } : {}),
      image,
      alt: program.alt,
      cta: program.cta,
      order: i,
    });
    console.log(`  programme: ${program.title}`);
  }
}

async function seedSiteSettings() {
  const maheLogo = await uploadImage(SITE_CONTENT.maheLogo.src);
  const brandLogo = await uploadImage(SITE_CONTENT.brandLogo.src);
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: SITE_CONTENT.siteName,
    ...(maheLogo ? { maheLogo } : {}),
    maheLogoAlt: SITE_CONTENT.maheLogo.alt,
    ...(brandLogo ? { brandLogo } : {}),
    brandLogoAlt: SITE_CONTENT.brandLogo.alt,
    registerFormUrl: SITE_CONTENT.registerFormUrl,
    email: SITE_CONTENT.email,
    instagramUrl: SITE_CONTENT.instagramUrl,
    navLinks: SITE_CONTENT.navLinks,
    footerBlurb: SITE_CONTENT.footerBlurb,
    footerSocietyLinks: SITE_CONTENT.footerSocietyLinks,
    footerResourceLinks: SITE_CONTENT.footerResourceLinks,
    footerAffiliation: SITE_CONTENT.footerAffiliation,
    copyrightName: SITE_CONTENT.copyrightName,
  });
  console.log("  site settings");
}

async function seedHomePage() {
  const h = HOME_CONTENT;
  const heroSlides = await imagesWithAlt(h.hero.slides);
  const aboutImageMain = await imageWithAlt(
    h.about.imageMain.src,
    h.about.imageMain.alt
  );
  const aboutImageSide = await imageWithAlt(
    h.about.imageSide.src,
    h.about.imageSide.alt
  );
  const eventsPreviewCards = [];
  for (const event of h.eventsPreview.events) {
    const image = await uploadImage(event.image);
    if (!image) continue;
    eventsPreviewCards.push({
      slug: event.slug,
      title: event.title,
      date: event.date,
      blurb: event.blurb,
      image,
      alt: event.alt,
      flagship: event.flagship,
      href: event.href,
    });
  }

  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    heroSlides,
    heroTitle: h.hero.title,
    heroTagline: h.hero.tagline,
    heroPrimaryCta: h.hero.primaryCta,
    heroSecondaryCta: h.hero.secondaryCta,
    heroPromo: h.hero.promo,
    highlights: h.highlights,
    aboutSectionTitle: h.about.sectionTitle,
    aboutEyebrow: h.about.eyebrow,
    aboutHeadline: h.about.headline,
    aboutBody: h.about.body,
    aboutLink: { label: h.about.linkLabel, href: h.about.linkHref },
    aboutQuote: h.about.quote,
    aboutCaption: h.about.caption,
    ...(aboutImageMain ? { aboutImageMain } : {}),
    ...(aboutImageSide ? { aboutImageSide } : {}),
    eventsPreviewTitle: h.eventsPreview.title,
    eventsPreviewSubtitle: h.eventsPreview.subtitle,
    eventsPreviewViewAll: {
      label: h.eventsPreview.viewAllLabel,
      href: h.eventsPreview.viewAllHref,
    },
    eventsPreviewCards,
  });
  console.log("  home page");
}

async function seedAboutPage() {
  const maheImage = await imageWithAlt(
    CHAPTER_MAHE.image.src,
    CHAPTER_MAHE.image.alt
  );
  const kmcImages = await imagesWithAlt(CHAPTER_KMC.images);
  const cutLogo = await uploadImage(CHAPTER_CUT_ABOVE.logo.src);

  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    hero: ABOUT_HERO,
    chapterMahe: {
      chapter: CHAPTER_MAHE.chapter,
      number: CHAPTER_MAHE.number,
      title: CHAPTER_MAHE.title,
      subtitle: CHAPTER_MAHE.subtitle,
      body: CHAPTER_MAHE.body,
      stats: CHAPTER_MAHE.stats,
      ...(maheImage ? { image: maheImage } : {}),
      quote: CHAPTER_MAHE.quote,
    },
    chapterKmc: {
      chapter: CHAPTER_KMC.chapter,
      number: CHAPTER_KMC.number,
      title: CHAPTER_KMC.title,
      body: CHAPTER_KMC.body,
      galleryLink: CHAPTER_KMC.galleryLink,
      images: kmcImages,
    },
    chapterSurgery: {
      chapter: CHAPTER_SURGERY.chapter,
      number: CHAPTER_SURGERY.number,
      title: CHAPTER_SURGERY.title,
      overviewLabel: CHAPTER_SURGERY.overview.label,
      overviewIntro: CHAPTER_SURGERY.overview.intro,
      pgIntro: CHAPTER_SURGERY.overview.pgCourse.intro,
      pgAchievements: CHAPTER_SURGERY.overview.pgCourse.achievements,
      pgFollowUp: CHAPTER_SURGERY.overview.pgCourse.followUp,
      paragraphs: CHAPTER_SURGERY.overview.paragraphs,
      hospitals: CHAPTER_SURGERY.overview.hospitals,
      keyFeaturesLabel: CHAPTER_SURGERY.keyFeatures.label,
      keyFeatures: CHAPTER_SURGERY.keyFeatures.items,
    },
    chapterCutAbove: {
      chapter: CHAPTER_CUT_ABOVE.chapter,
      number: CHAPTER_CUT_ABOVE.number,
      title: CHAPTER_CUT_ABOVE.title,
      body: CHAPTER_CUT_ABOVE.body,
      stats: CHAPTER_CUT_ABOVE.stats,
      ...(cutLogo ? { logo: cutLogo } : {}),
      logoAlt: CHAPTER_CUT_ABOVE.logo.alt,
      ctas: CHAPTER_CUT_ABOVE.ctas,
    },
  });
  console.log("  about page");
}

async function seedEventsPage() {
  const featuredEvents = [];
  for (const event of FEATURED_EVENTS) {
    const image = await uploadImage(event.image);
    if (!image) continue;
    featuredEvents.push({
      id: event.id,
      title: event.title,
      tag: event.tag,
      tagTone: event.tagTone,
      subtitle: event.subtitle,
      description: event.description,
      image,
      alt: event.alt,
      href: event.href,
      cta: event.cta,
      flagship: event.flagship ?? false,
    });
  }

  await client.createOrReplace({
    _id: "eventsPage",
    _type: "eventsPage",
    hero: EVENTS_HERO,
    featuredEvents,
    updatesMessage: EVENTS_UPDATES.message,
    updatesSocials: EVENTS_UPDATES.socials,
  });
  console.log("  events page");
}

async function seedGalleryPage() {
  const images = await imagesWithAlt(GALLERY_IMAGES);

  await client.createOrReplace({
    _id: "galleryPage",
    _type: "galleryPage",
    hero: GALLERY_HERO,
    images,
  });
  console.log("  gallery page");
}

async function seedAxionPage() {
  const images = await imagesWithAlt(AXION_GALLERY_IMAGES);

  await client.createOrReplace({
    _id: "axionPage",
    _type: "axionPage",
    hero: AXION_PAGE.hero,
    images,
  });
  console.log("  axion page");
}

async function seedTeamPage() {
  await client.createOrReplace({
    _id: "teamPage",
    _type: "teamPage",
    hero: TEAM_HERO,
  });
  console.log("  team page");
}

async function seedContactPage() {
  await client.createOrReplace({
    _id: "contactPage",
    _type: "contactPage",
    ...CONTACT_CONTENT,
  });
  console.log("  contact page");
}

async function seedNickOfTimePage() {
  const collageDefaults = [
    { src: "/images/image1.jpeg", alt: "Nick of Time collage image 1" },
    { src: "/images/image2.jpeg", alt: "Nick of Time collage image 2" },
    { src: "/images/image3.jpeg", alt: "Nick of Time collage image 3" },
    { src: "/images/image4.jpeg", alt: "Nick of Time collage image 4" },
    { src: "/images/axion.jpeg", alt: "Nick of Time collage image 5" },
    { src: "/images/erevna.jpg", alt: "Nick of Time collage image 6" },
    { src: "/images/vertical-cut.jpeg", alt: "Nick of Time collage image 7" },
    { src: "/images/mahe.jpg", alt: "Nick of Time collage image 8" },
  ];
  const aboutCollage = await imagesWithAlt(collageDefaults);
  const heritageImage = await imageWithAlt(
    NICK_OF_TIME.heritage.image.src,
    NICK_OF_TIME.heritage.image.alt
  );

  await client.createOrReplace({
    _id: "nickOfTimePage",
    _type: "nickOfTimePage",
    eventDate: NICK_OF_TIME.eventDate,
    heroTitle: NICK_OF_TIME.hero.title,
    heroSubtitle: NICK_OF_TIME.hero.subtitle,
    brochureHref: NICK_OF_TIME.hero.brochureHref,
    aboutTitle: NICK_OF_TIME.about.title,
    aboutBody: NICK_OF_TIME.about.body,
    aboutStats: NICK_OF_TIME.about.stats,
    aboutCollage,
    heritageTitle: NICK_OF_TIME.heritage.title,
    heritageBody: NICK_OF_TIME.heritage.body,
    ...(heritageImage ? { heritageImage } : {}),
    heritageLink: NICK_OF_TIME.heritage.legacyLink,
    countdownEyebrow: NICK_OF_TIME.countdown.eyebrow,
    programsTitle: NICK_OF_TIME.programs.title,
    programsTitleEmphasis: NICK_OF_TIME.programs.titleEmphasis,
    programsSubtitle: NICK_OF_TIME.programs.subtitle,
    programsQuote: NICK_OF_TIME.programs.quote,
    finalCtaEyebrow: NICK_OF_TIME.finalCta.eyebrow,
    finalCtaTitle: NICK_OF_TIME.finalCta.title,
    finalCtaEventsHref: NICK_OF_TIME.finalCta.eventsHref,
  });
  console.log("  nick of time page");
}

async function seedContentSourceFlags() {
  await client.createOrReplace({
    _id: "contentSource",
    _type: "contentSource",
    teamFromCms: true,
    nickOfTimeProgramsFromCms: true,
  });
  console.log("  content source flags");
}

async function main() {
  console.log(`Seeding Sanity project ${projectId} / ${dataset}…`);
  console.log("Site settings:");
  await seedSiteSettings();
  console.log("Pages:");
  await seedHomePage();
  await seedAboutPage();
  await seedTeamPage();
  await seedEventsPage();
  await seedGalleryPage();
  await seedAxionPage();
  await seedNickOfTimePage();
  await seedContactPage();
  console.log("Team members:");
  await seedTeam();
  console.log("Nick of Time programmes:");
  await seedPrograms();
  console.log("Flags:");
  await seedContentSourceFlags();
  console.log("Done. Open /studio to edit.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
