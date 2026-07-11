import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "designation",
      title: "Designation / role",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "tab",
      title: "Team tab",
      type: "string",
      options: {
        list: [
          { title: "Leadership", value: "leadership" },
          { title: "Department of Surgery", value: "surgery" },
          { title: "A Cut Above Team", value: "cut-above" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first within the tab.",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [
        { field: "tab", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "designation",
      media: "image",
      tab: "tab",
    },
    prepare({ title, subtitle, media, tab }) {
      const tabLabel =
        tab === "leadership"
          ? "Leadership"
          : tab === "surgery"
            ? "Surgery"
            : tab === "cut-above"
              ? "A Cut Above"
              : tab;
      return {
        title,
        subtitle: [tabLabel, subtitle].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
