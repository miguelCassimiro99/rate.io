// https://nuxt.com/docs/api/configuration/nuxt-config

const OPEN_GRAPH = [
  {
    hid: "og:site_name",
    property: "og:site_name",
    content: "Rate.io",
  },
  {
    hid: "og:description",
    property: "og:description",
    content:
      "Divida contas, mantenha amizades. Compartilhe facilmente custos de festas, viagens ou atividades em grupo.",
  },
  {
    hid: "og:title",
    property: "og:title",
    content: "Rate.io",
  },
  {
    hid: "og:url",
    property: "og:url",
    content: "https://rate-io.vercel.app/",
  },
  {
    hid: "og:image",
    property: "og:image",
    content: "/public/rateio-image.png",
  },
  { property: "og:updated_time", content: new Date().toISOString() },
];

export default defineNuxtConfig({
  compatibilityDate: "2024-10-15",
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
      title: "Rate.io",
      htmlAttrs: {
        lang: "pt-BR",
      },
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Divida contas, mantenha amizades. Compartilhe facilmente custos de festas, viagens ou atividades em grupo",
        },
        { hid: "author", name: "author", content: "Miguel Cassimiro" },
        {
          hid: "keywords",
          property: "keywords",
          content: "festas, roles, contas, dividir custos",
        },
        ...OPEN_GRAPH,
      ],
    },
  },

  gtag: {
    id: "G-85YM3YBRXK",
    config: {
      page_title: "Rate.io - Divida Custos, não amizades",
    },
  },

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
    prerender: {
      routes: ["/"],
    },
  },

  i18n: {
    vueI18n: "./i18n.config.ts",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },
});
