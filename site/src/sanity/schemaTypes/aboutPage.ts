import { defineField, defineType } from "sanity";
import { SANITY_IMAGE_ACCEPT } from "../lib/imageAccept";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  fields: [
    defineField({ name: "hero", title: "Hero", type: "pageHero" }),

    defineField({
      name: "chapterMahe",
      title: "Chapter — MAHE",
      type: "object",
      fields: [
        defineField({ name: "chapter", title: "Chapter label", type: "string" }),
        defineField({ name: "number", title: "Number", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
        defineField({
          name: "body",
          title: "Paragraphs",
          type: "array",
          of: [{ type: "text", rows: 3 }],
        }),
        defineField({
          name: "stats",
          title: "Stats",
          type: "array",
          of: [{ type: "statItem" }],
        }),
        defineField({ name: "image", title: "Image", type: "imageWithAlt" }),
        defineField({ name: "quote", title: "Quote", type: "text", rows: 2 }),
      ],
    }),

    defineField({
      name: "chapterKmc",
      title: "Chapter — KMC",
      type: "object",
      fields: [
        defineField({ name: "chapter", title: "Chapter label", type: "string" }),
        defineField({ name: "number", title: "Number", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({
          name: "body",
          title: "Paragraphs",
          type: "array",
          of: [{ type: "text", rows: 3 }],
        }),
        defineField({
          name: "galleryLink",
          title: "Gallery link",
          type: "linkItem",
        }),
        defineField({
          name: "images",
          title: "Images",
          type: "array",
          of: [{ type: "imageWithAlt" }],
        }),
      ],
    }),

    defineField({
      name: "chapterSurgery",
      title: "Chapter — Department of Surgery",
      type: "object",
      fields: [
        defineField({ name: "chapter", title: "Chapter label", type: "string" }),
        defineField({ name: "number", title: "Number", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({
          name: "overviewLabel",
          title: "Overview label",
          type: "string",
        }),
        defineField({
          name: "overviewIntro",
          title: "Overview intro",
          type: "text",
          rows: 4,
        }),
        defineField({
          name: "pgIntro",
          title: "PG course intro",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "pgAchievements",
          title: "PG achievements",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "pgFollowUp",
          title: "PG follow-up",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "paragraphs",
          title: "Body paragraphs",
          type: "array",
          of: [{ type: "text", rows: 3 }],
        }),
        defineField({
          name: "hospitals",
          title: "Hospitals line",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "keyFeaturesLabel",
          title: "Key features label",
          type: "string",
        }),
        defineField({
          name: "keyFeatures",
          title: "Key features",
          type: "array",
          of: [{ type: "string" }],
        }),
      ],
    }),

    defineField({
      name: "chapterCutAbove",
      title: "Chapter — A Cut Above",
      type: "object",
      fields: [
        defineField({ name: "chapter", title: "Chapter label", type: "string" }),
        defineField({ name: "number", title: "Number", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({
          name: "body",
          title: "Paragraphs",
          type: "array",
          of: [{ type: "text", rows: 3 }],
        }),
        defineField({
          name: "stats",
          title: "Stats",
          type: "array",
          of: [{ type: "statItem" }],
        }),
        defineField({
          name: "logo",
          title: "Logo",
          type: "image",
          options: { hotspot: true, accept: SANITY_IMAGE_ACCEPT },
        }),
        defineField({ name: "logoAlt", title: "Logo alt", type: "string" }),
        defineField({
          name: "ctas",
          title: "Buttons",
          type: "array",
          of: [{ type: "ctaButton" }],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "About page" };
    },
  },
});
