import { StructureBuilder } from "sanity/desk";

export const myStructure = (S) =>
  S.list()
    .title("Contenu du site")
    .items([
      S.listItem()
        .title("Landing Page")
        .schemaType("landingPage")
        .child(S.document().schemaType("landingPage").documentId("landingPage")),
    ]);
