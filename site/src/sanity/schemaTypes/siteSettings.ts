import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
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
  ],
  preview: {
    prepare() {
      return { title: "Site settings" };
    },
  },
});
