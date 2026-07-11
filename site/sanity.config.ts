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
