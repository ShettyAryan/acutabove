import { defineField, defineType } from "sanity";

/**
 * Internal flags set by `npm run sanity:seed`.
 * When true, the site treats Sanity as the full source of truth for that area
 * (add / edit / delete). When false, CMS entries merge with the built-in
 * static content so a single Studio publish cannot wipe the rest.
 */
export const contentSource = defineType({
  name: "contentSource",
  title: "Content source",
  type: "document",
  fields: [
    defineField({
      name: "teamFromCms",
      title: "Team managed in Sanity",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "nickOfTimeProgramsFromCms",
      title: "Nick of Time programmes managed in Sanity",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    prepare() {
      return { title: "Content source flags" };
    },
  },
});
