import { defineField, defineType } from "sanity";

export const nickOfTimeProgram = defineType({
  name: "nickOfTimeProgram",
  title: "Nick of Time programme",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category label",
      type: "string",
      description: 'Shown on the card (e.g. "Workshop", "Lectures").',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "group",
      title: "Programme group",
      type: "string",
      options: {
        list: [
          { title: "Hands-on Workshops", value: "workshops" },
          { title: "Formal Events", value: "formal" },
          { title: "Competitions & Academic", value: "academic" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "groupLabel",
      title: "Group label",
      type: "string",
      description: "Display label for the group (usually matches the group name).",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description paragraphs",
      type: "array",
      of: [{ type: "text", rows: 4 }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "bullets",
      title: "Bullet points",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "theme",
      title: "Theme line",
      type: "string",
      description: "Optional highlight line (e.g. Ideathon theme).",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Image alt text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cta",
      title: "CTA button label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first within the group.",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [
        { field: "group", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image",
      group: "group",
    },
    prepare({ title, subtitle, media, group }) {
      return {
        title,
        subtitle: [group, subtitle].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
