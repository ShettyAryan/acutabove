import { defineQuery } from "next-sanity";

export const TEAM_MEMBERS_QUERY = defineQuery(`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    designation,
    tab,
    order,
    image
  }
`);

export const CONTENT_SOURCE_QUERY = defineQuery(`
  *[_id == "contentSource"][0]{
    teamFromCms,
    nickOfTimeProgramsFromCms
  }
`);

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_id == "siteSettings"][0]{
    siteName,
    maheLogo,
    maheLogoAlt,
    brandLogo,
    brandLogoAlt,
    registerFormUrl,
    email,
    instagramUrl,
    navLinks[]{ label, href },
    footerBlurb,
    footerSocietyLinks[]{ label, href },
    footerResourceLinks[]{ label, href },
    footerAffiliation,
    copyrightName
  }
`);

export const HOME_PAGE_QUERY = defineQuery(`
  *[_id == "homePage"][0]{
    heroSlides[]{ image, alt },
    heroTitle,
    heroTagline,
    heroPrimaryCta,
    heroSecondaryCta,
    heroPromo,
    highlights[]{ icon, title, copy },
    aboutSectionTitle,
    aboutEyebrow,
    aboutHeadline,
    aboutBody,
    aboutLink,
    aboutQuote,
    aboutCaption,
    aboutImageMain{ image, alt },
    aboutImageSide{ image, alt },
    eventsPreviewTitle,
    eventsPreviewSubtitle,
    eventsPreviewViewAll,
    eventsPreviewCards[]{
      slug, title, date, blurb, image, alt, flagship, href
    }
  }
`);

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_id == "aboutPage"][0]{
    hero,
    chapterMahe{
      chapter, number, title, subtitle, body, stats,
      image{ image, alt }, quote
    },
    chapterKmc{
      chapter, number, title, body, galleryLink,
      images[]{ image, alt }
    },
    chapterSurgery{
      chapter, number, title, overviewLabel, overviewIntro,
      pgIntro, pgAchievements, pgFollowUp, paragraphs, hospitals,
      keyFeaturesLabel, keyFeatures
    },
    chapterCutAbove{
      chapter, number, title, body, stats, logo, logoAlt, ctas
    }
  }
`);

export const TEAM_PAGE_QUERY = defineQuery(`
  *[_id == "teamPage"][0]{ hero }
`);

export const EVENTS_PAGE_QUERY = defineQuery(`
  *[_id == "eventsPage"][0]{
    hero,
    featuredEvents[]{
      id, title, tag, tagTone, subtitle, description,
      image, alt, href, cta, flagship
    },
    updatesMessage,
    updatesSocials[]{ label, href, icon }
  }
`);

export const GALLERY_PAGE_QUERY = defineQuery(`
  *[_id == "galleryPage"][0]{
    hero,
    images[]{ image, alt }
  }
`);

export const AXION_PAGE_QUERY = defineQuery(`
  *[_id == "axionPage"][0]{
    hero,
    images[]{ image, alt }
  }
`);

export const CONTACT_PAGE_QUERY = defineQuery(`
  *[_id == "contactPage"][0]{
    eyebrow, title, description
  }
`);

export const NICK_OF_TIME_PAGE_QUERY = defineQuery(`
  *[_id == "nickOfTimePage"][0]{
    eventDate,
    heroTitle,
    heroSubtitle,
    brochureHref,
    aboutTitle,
    aboutBody,
    aboutStats,
    aboutCollage[]{ image, alt },
    heritageTitle,
    heritageBody,
    heritageImage{ image, alt },
    heritageLink,
    countdownEyebrow,
    programsTitle,
    programsTitleEmphasis,
    programsSubtitle,
    programsQuote,
    finalCtaEyebrow,
    finalCtaTitle,
    finalCtaEventsHref
  }
`);

export const NICK_OF_TIME_PROGRAMS_QUERY = defineQuery(`
  *[_type == "nickOfTimeProgram"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    category,
    group,
    groupLabel,
    description,
    bullets,
    theme,
    alt,
    cta,
    order,
    image
  }
`);

export const NICK_OF_TIME_PROGRAM_BY_SLUG_QUERY = defineQuery(`
  *[_type == "nickOfTimeProgram" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    group,
    groupLabel,
    description,
    bullets,
    theme,
    alt,
    cta,
    order,
    image
  }
`);

export const NICK_OF_TIME_PROGRAM_SLUGS_QUERY = defineQuery(`
  *[_type == "nickOfTimeProgram" && defined(slug.current)][].slug.current
`);
