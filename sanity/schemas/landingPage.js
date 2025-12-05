export default {
  name: "landingPage",
  type: "document",
  title: "Landing Page",

  fields: [
    {
      name: "introTitle",
      type: "string",
      title: "Titre d’introduction",
    },
    {
      name: "introText",
      type: "text",
      title: "Texte d’introduction",
    },
    {
      name: "introImage",
      type: "image",
      title: "Image d’introduction",
    },

    // --- Transition forêt ---
    {
      name: "transitionForestText",
      type: "text",
      title: "Transition vers la forêt",
    },

    // --- Chapitre 1 ---
    {
      name: "chapter1Title",
      type: "string",
      title: "Chapitre 1 – Titre",
    },
    {
      name: "chapter1Text",
      type: "text",
      title: "Chapitre 1 – Texte",
    },
    {
      name: "chapter1Image",
      type: "image",
      title: "Chapitre 1 – Image principale",
    },
    {
      name: "chapter1Gallery",
      type: "array",
      title: "Galerie Écrin de Verdure",
      of: [{ type: "image" }],
    },
    {
      name: "chapter1PurchaseLink",
      type: "url",
      title: "Lien d’achat",
    },

    // --- Transition rouge ---
    {
      name: "transitionRedText",
      type: "text",
      title: "Transition vers Rouge Éternel",
    },

    // --- Chapitre 2 ---
    {
      name: "chapter2Title",
      type: "string",
      title: "Chapitre 2 – Titre",
    },
    {
      name: "chapter2Text",
      type: "text",
      title: "Chapitre 2 – Texte",
    },
    {
      name: "chapter2Image",
      type: "image",
      title: "Chapitre 2 – Image principale",
    },
    {
      name: "chapter2Gallery",
      type: "array",
      title: "Galerie Rouge Éternel",
      of: [{ type: "image" }],
    },

    // --- Contact ---
    {
      name: "whatsapp",
      type: "string",
      title: "Lien WhatsApp",
    },
    {
      name: "emailReceiver",
      type: "string",
      title: "Email de réception",
    },
  ],
};
