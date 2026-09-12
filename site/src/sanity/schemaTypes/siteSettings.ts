import { defineField, defineType } from "sanity";
import { SANITY_IMAGE_ACCEPT } from "../lib/imageAccept";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site / brand name",
      type: "string",
      initialValue: "A Cut Above",
    }),
    defineField({
      name: "maheLogo",
      title: "MAHE / college logo",
      type: "image",
      options: { hotspot: true, accept: SANITY_IMAGE_ACCEPT },
    }),
    defineField({
      name: "maheLogoAlt",
      title: "MAHE logo alt text",
      type: "string",
    }),
    defineField({
      name: "brandLogo",
      title: "Brand emblem",
      type: "image",
      options: { hotspot: true, accept: SANITY_IMAGE_ACCEPT },
    }),
    defineField({
      name: "brandLogoAlt",
      title: "Brand emblem alt text",
      type: "string",
    }),
    defineField({
      name: "registerFormUrl",
      title: "Register form URL",
      type: "url",
      description:
        "Google Form (or any URL) used by every Register / Register Now button on the site.",
      validation: (rule) =>
        rule.required().uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "email",
      title: "Society email",
      type: "string",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "navLinks",
      title: "Navbar links",
      type: "array",
      of: [{ type: "linkItem" }],
    }),
    defineField({
      name: "footerBlurb",
      title: "Footer blurb",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "footerSocietyLinks",
      title: "Footer — Society links",
      type: "array",
      of: [{ type: "linkItem" }],
    }),
    defineField({
      name: "footerResourceLinks",
      title: "Footer — Resource links",
      type: "array",
      of: [{ type: "linkItem" }],
    }),
    defineField({
      name: "footerAffiliation",
      title: "Footer affiliation line",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "copyrightName",
      title: "Copyright name",
      type: "string",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site settings" };
    },
  },
});
