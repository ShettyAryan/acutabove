import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { apiVersion, dataset, projectId } from "./src/sanity/env";

const configuredProjectId = projectId || "your-project-id";

export default defineConfig({
  name: "a-cut-above",
  title: "A Cut Above",
  projectId: configuredProjectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site settings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
                  .title("Site settings")
              ),
            S.divider(),
            S.listItem()
              .title("Home page")
              .child(
                S.document()
                  .schemaType("homePage")
                  .documentId("homePage")
                  .title("Home page")
              ),
            S.listItem()
              .title("About page")
              .child(
                S.document()
                  .schemaType("aboutPage")
                  .documentId("aboutPage")
                  .title("About page")
              ),
            S.listItem()
              .title("Team page")
              .child(
                S.document()
                  .schemaType("teamPage")
                  .documentId("teamPage")
                  .title("Team page")
              ),
            S.listItem()
              .title("Events page")
              .child(
                S.document()
                  .schemaType("eventsPage")
                  .documentId("eventsPage")
                  .title("Events page")
              ),
            S.listItem()
              .title("Gallery page")
              .child(
                S.document()
                  .schemaType("galleryPage")
                  .documentId("galleryPage")
                  .title("Gallery page")
              ),
            S.listItem()
              .title("AXION page")
              .child(
                S.document()
                  .schemaType("axionPage")
                  .documentId("axionPage")
                  .title("AXION page")
              ),
            S.listItem()
              .title("Nick of Time page")
              .child(
                S.document()
                  .schemaType("nickOfTimePage")
                  .documentId("nickOfTimePage")
                  .title("Nick of Time page")
              ),
            S.listItem()
              .title("Contact page")
              .child(
                S.document()
                  .schemaType("contactPage")
                  .documentId("contactPage")
                  .title("Contact page")
              ),
            S.divider(),
            S.listItem()
              .title("Team members")
              .schemaType("teamMember")
              .child(
                S.documentTypeList("teamMember")
                  .title("Team members")
                  .defaultOrdering([{ field: "order", direction: "asc" }])
              ),
            S.listItem()
              .title("Nick of Time programmes")
              .schemaType("nickOfTimeProgram")
              .child(
                S.documentTypeList("nickOfTimeProgram")
                  .title("Nick of Time programmes")
                  .defaultOrdering([{ field: "order", direction: "asc" }])
              ),
            S.divider(),
            S.listItem()
              .title("Content source flags")
              .child(
                S.document()
                  .schemaType("contentSource")
                  .documentId("contentSource")
                  .title("Content source flags")
              ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: {
    types: schemaTypes,
  },
});
