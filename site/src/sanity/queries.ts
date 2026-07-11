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
    registerFormUrl
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
