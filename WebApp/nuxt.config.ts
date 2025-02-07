// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  extends: ['@nuxt/ui-pro'],
  modules: ['@nuxt/ui',  'v-gsap-nuxt', '@nuxt/fonts'],
  css: [
    '@/assets/css/main.css'
  ],
  vgsap: {
    presets: [],
    breakpoint: 768,
    scroller: '',
    composable: true
  },
  fonts: {
    families: [
      { name: 'Alata', provider: 'google', global: true, weights: ['400'] },
    ],
  }
})