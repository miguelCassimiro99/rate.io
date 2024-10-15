// https://nuxt.com/docs/api/configuration/nuxt-config

const OPEN_GRAPH = [
  {
    hid: "og:site_name",
    property: "og:site_name",
    content: "Box Box Radio",
  },
  {
    hid: "og:description",
    property: "og:description",
    content:
      "Explore the radios during the F1 sessions. In Box Box Radio you can see the transcriptions during sessions, follow more action and content. React and share with your friends. Important: the transcriptions are not official and can be not 100% correct.",
  },
  {
    hid: "og:title",
    property: "og:title",
    content: "Box Box Radio",
  },
  {
    hid: "og:url",
    property: "og:url",
    content: "https://www.boxbox-radio.com",
  },
  {
    hid: "og:image",
    property: "og:image",
    content: "https://i.imgur.com/LdzDOi7.png",
  },
  { property: "og:updated_time", content: new Date().toISOString() },
];

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@nuxt/icon",
    "@pinia/nuxt",
    "@nuxtjs/google-fonts",
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
    "nuxt-gtag",
    // "@nuxtjs/supabase",
    "@nuxthq/studio",
    "@nuxt/content",
  ],

  app: {
    head: {
      title: "Box Box Radio",
      htmlAttrs: {
        lang: "pt-BR",
      },
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Explore the radios during the F1 sessions. In Box Box Radio you can see the transcriptions during sessions, follow more action and content. React and share with your friends. Important: the transcriptions are not official and can be not 100% correct.",
        },
        { hid: "author", name: "author", content: "Miguel Cassimiro" },
        {
          hid: "keywords",
          property: "keywords",
          content: "f1, f1 radio, real-time, f1 driver, f1 nuxt",
        },
        ...OPEN_GRAPH,
      ],
    },
  },

  // gtag: {
  //   id: "G-FTN4DTQENC",
  //   config: {
  //     page_title: "Box Box Radio",
  //   },
  // },

  // runtimeConfig: {
  //   apiToken: process.env.API_TOKEN,
  //   SUPABASE_URL: process.env.SUPABASE_URL,
  //   SUPABASE_KEY: process.env.SUPABASE_KEY,
  // },

  // supabase: {
  //   redirect: false,
  // },

  tailwindcss: {
    cssPath: "~/assets/css/main.css",
    configPath: "tailwind.config",
    exposeConfig: false,
    exposeLevel: 2,
    config: {},
    injectPosition: "first",
    viewer: true,
  },

  googleFonts: {
    display: "swap",
    families: {
      Raleway: true,
      Figtree: true,
    },
  },

  nitro: {
    experimental: {
      websocket: true,
    },
  },

  i18n: {
    vueI18n: "./i18n.config.ts",
  },
});
