// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  extends: ["@nuxt/ui-pro"],
  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "v-gsap-nuxt",
    "@nuxt/fonts",
    "@nuxt/image",
  ],
  css: ["@/assets/css/main.css"],
  colorMode: {
    preference: "light",
  },
  image: {
    imagekit: {
      baseURL: "https://ik.imagekit.io/6dh1gtderb",
    },
  },
  vgsap: {
    presets: [],
    breakpoint: 768,
    scroller: "",
    composable: true,
  },
  fonts: {
    families: [
      { name: "Alata", provider: "google", global: true, weights: ["400"] },
    ],
  },
});
