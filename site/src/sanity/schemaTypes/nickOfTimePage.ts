import { defineField, defineType } from "sanity";
import { SANITY_IMAGE_ACCEPT } from "../lib/imageAccept";

export const nickOfTimePage = defineType({
  name: "nickOfTimePage",
  title: "Nick of Time page",
  type: "document",
  fields: [
    defineField({
      name: "eventDate",
      title: "Event date (ISO)",
      type: "string",
      description: "e.g. 2026-11-26T09:00:00+05:30",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero title",
      type: "string",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero subtitle",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "brochureHref",
      title: "Brochure URL",
      type: "url",
    }),
    defineField({
      name: "aboutTitle",
      title: "About — title",
      type: "string",
    }),
    defineField({
      name: "aboutBody",
      title: "About — paragraphs",
      type: "array",
      of: [{ type: "text", rows: 3 }],
    }),
    defineField({
      name: "aboutStats",
      title: "About — stats",
      type: "array",
      of: [{ type: "statItem" }],
    }),
    defineField({
      name: "aboutCollage",
      title: "About — collage images",
      type: "array",
      of: [{ type: "imageWithAlt" }],
    }),
    defineField({
      name: "heritageTitle",
      title: "Heritage — title",
      type: "string",
    }),
    defineField({
      name: "heritageBody",
      title: "Heritage — paragraphs",
      type: "array",
      of: [{ type: "text", rows: 3 }],
    }),
    defineField({
      name: "heritageImage",
      title: "Heritage — image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "heritageLink",
      title: "Heritage — link",
      type: "linkItem",
    }),
    defineField({
      name: "countdownEyebrow",
      title: "Countdown eyebrow",
      type: "string",
    }),
    defineField({
      name: "programsTitle",
      title: "Programs — title prefix",
      type: "string",
    }),
    defineField({
      name: "programsTitleEmphasis",
      title: "Programs — title emphasis",
      type: "string",
    }),
    defineField({
      name: "programsSubtitle",
      title: "Programs — subtitle",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "programsQuote",
      title: "Programs — quote",
      type: "string",
    }),
    defineField({
      name: "finalCtaEyebrow",
      title: "Final CTA — eyebrow",
      type: "string",
    }),
    defineField({
      name: "finalCtaTitle",
      title: "Final CTA — title",
      type: "string",
    }),
    defineField({
      name: "finalCtaEventsHref",
      title: "Final CTA — events link",
      type: "string",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Nick of Time page" };
    },
  },
});
