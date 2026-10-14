// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap'
  ],

  devtools: {
    enabled: true
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  // `url` comes from the NUXT_SITE_URL env var (read by nuxt-site-config).
  site: {
    name: 'AFPro'
  },

  ui: {
    colorMode: false
  },

  runtimeConfig: {
    public: {
      affiliatePortalUrl: '',
      affiliateTermsUrl: '',
      affiliatePrivacyUrl: '',
      affiliateEmail: ''
    }
  },

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2026-06-30',

  nitro: {
    prerender: {
      routes: ['/sitemap.xml', '/robots.txt']
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  fonts: {
    families: [
      { name: 'Funnel Display', provider: 'google', weights: [600, 700, 800] },
      { name: 'Instrument Sans', provider: 'google', weights: [400, 500, 600] }
    ]
  }
})
