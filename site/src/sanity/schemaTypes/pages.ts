import { defineField, defineType } from "sanity";
import { SANITY_IMAGE_ACCEPT } from "../lib/imageAccept";

export const eventsPage = defineType({
  name: "eventsPage",
  title: "Events page",
  type: "document",
  fields: [
    defineField({ name: "hero", title: "Hero", type: "pageHero" }),
    defineField({
      name: "featuredEvents",
      title: "Featured events",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "id", title: "Id", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "tag", title: "Tag", type: "string" }),
            defineField({
              name: "tagTone",
              title: "Tag tone",
              type: "string",
              options: {
                list: [
                  { title: "Light", value: "light" },
                  { title: "Primary", value: "primary" },
                ],
              },
            }),
            defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true, accept: SANITY_IMAGE_ACCEPT },
            }),
            defineField({ name: "alt", title: "Alt text", type: "string" }),
            defineField({ name: "href", title: "Link", type: "string" }),
            defineField({ name: "cta", title: "CTA label", type: "string" }),
            defineField({
              name: "flagship",
              title: "Flagship",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: { select: { title: "title", media: "image" } },
        },
      ],
    }),
    defineField({
      name: "updatesMessage",
      title: "Updates message",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "updatesSocials",
      title: "Updates links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "URL / path", type: "string" }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Globe", value: "globe" },
                  { title: "Share", value: "share" },
                  { title: "Mail", value: "mail" },
                ],
              },
            }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Events page" };
    },
  },
});

export const galleryPage = defineType({
  name: "galleryPage",
  title: "Gallery page",
  type: "document",
  fields: [
    defineField({ name: "hero", title: "Hero", type: "pageHero" }),
    defineField({
      name: "images",
      title: "Gallery images",
      type: "array",
      of: [{ type: "imageWithAlt" }],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Gallery page" };
    },
  },
});

export const axionPage = defineType({
  name: "axionPage",
  title: "AXION page",
  type: "document",
  fields: [
    defineField({ name: "hero", title: "Hero", type: "pageHero" }),
    defineField({
      name: "images",
      title: "Gallery images",
      type: "array",
      of: [{ type: "imageWithAlt" }],
    }),
  ],
  preview: {
    prepare() {
      return { title: "AXION page" };
    },
  },
});

export const teamPage = defineType({
  name: "teamPage",
  title: "Team page",
  type: "document",
  fields: [
    defineField({ name: "hero", title: "Hero", type: "pageHero" }),
  ],
  preview: {
    prepare() {
      return { title: "Team page" };
    },
  },
});

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    prepare() {
      return { title: "Contact page" };
    },
  },
});
