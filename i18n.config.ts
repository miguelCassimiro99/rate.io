export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    "pt-BR": {
      welcome: 'Hello world'
    },
  },
  plugins: {
    i18n: {
      defaultLocale: "en",
    },
  },
}));
