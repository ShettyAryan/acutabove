import { defineField, defineType } from "sanity";
import { SANITY_IMAGE_ACCEPT } from "../lib/imageAccept";

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    defineField({
      name: "heroSlides",
      title: "Hero slideshow",
      type: "array",
      of: [{ type: "imageWithAlt" }],
    }),
    defineField({
      name: "heroTitle",
      title: "Hero title",
      type: "string",
    }),
    defineField({
      name: "heroTagline",
      title: "Hero tagline",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroPrimaryCta",
      title: "Hero primary button",
      type: "ctaButton",
    }),
    defineField({
      name: "heroSecondaryCta",
      title: "Hero secondary button",
      type: "ctaButton",
    }),
    defineField({
      name: "heroPromo",
      title: "Hero promo chip (below buttons)",
      type: "linkItem",
    }),
    defineField({
      name: "highlights",
      title: "Highlight cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "History", value: "history" },
                  { title: "Graduation", value: "graduation" },
                  { title: "Scissors", value: "scissors" },
                  { title: "Award", value: "award" },
                ],
              },
            }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "copy", title: "Copy", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "copy" } },
        },
      ],
    }),
    defineField({
      name: "aboutSectionTitle",
      title: "About — section title",
      type: "string",
    }),
    defineField({
      name: "aboutEyebrow",
      title: "About — eyebrow",
      type: "string",
    }),
    defineField({
      name: "aboutHeadline",
      title: "About — headline",
      type: "string",
    }),
    defineField({
      name: "aboutBody",
      title: "About — body",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "aboutLink",
      title: "About — link",
      type: "linkItem",
    }),
    defineField({
      name: "aboutQuote",
      title: "About — quote",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "aboutCaption",
      title: "About — caption under quote",
      type: "string",
    }),
    defineField({
      name: "aboutImageMain",
      title: "About — main image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "aboutImageSide",
      title: "About — side image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "eventsPreviewTitle",
      title: "Events preview — title",
      type: "string",
    }),
    defineField({
      name: "eventsPreviewSubtitle",
      title: "Events preview — subtitle",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "eventsPreviewViewAll",
      title: "Events preview — view all link",
      type: "linkItem",
    }),
    defineField({
      name: "eventsPreviewCards",
      title: "Events preview cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "slug", title: "Slug / id", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "date", title: "Date label", type: "string" }),
            defineField({ name: "blurb", title: "Blurb", type: "text", rows: 2 }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true, accept: SANITY_IMAGE_ACCEPT },
            }),
            defineField({ name: "alt", title: "Alt text", type: "string" }),
            defineField({
              name: "flagship",
              title: "Flagship event",
              type: "boolean",
              initialValue: false,
            }),
            defineField({ name: "href", title: "Link", type: "string" }),
          ],
          preview: { select: { title: "title", media: "image" } },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home page" };
    },
  },
});
