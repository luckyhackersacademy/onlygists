import path from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    'nuxt-primevue',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxtjs/supabase',
    '@nuxtjs/color-mode',
    '@nuxtjs/seo',
    '@vue-email/nuxt',
    '@unlok-co/nuxt-stripe',
  ],

  css: ['primeicons/primeicons.css'],

  imports: {
    dirs: ['./composables/useMarkdown', './composables/useServices', './composables/useLogger'],
  },

  site: {
    url: process.env.SITE_URL,
  },

  ogImage: {
    fonts: ['Inter:400', 'Inter:700'],
  },

  stripe: {
    client: {
      key: process.env.STRIPE_CLIENT_KEY,
    },

    server: {
      key: process.env.STRIPE_SECRET_KEY,
    },
  },

  supabase: {
    redirect: false,
  },

  runtimeConfig: {
    stripeProudctId5BRL: process.env.STRIPE_PRODUCT_ID_5BRL,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    resendKey: process.env.RESEND_KEY,

    public: {
      nodeEnv: process.env.NODE_ENV,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      siteUrl: process.env.SITE_URL,
    },
  },

  googleFonts: {
    base64: true,
    fontsDir: 'assets/fonts',
    overwriting: true,
    families: {
      Inter: [300, 500, 800],
    },
  },

  primevue: {
    options: { unstyled: true },
    importPT: {
      as: 'lara',
      from: path.resolve(__dirname, './assets/presets/lara/'),
    },
  },
})
