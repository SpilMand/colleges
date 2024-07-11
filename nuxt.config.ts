// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';
import eslintPlugin from 'vite-plugin-eslint';

export default defineNuxtConfig({
  // devServer: {
  //   port: 8000
  // },
  ssr: false,
  debug: true,
  vite: {
    plugins: [eslintPlugin()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "@/assets/styles/tools/_mixins.scss";
          `,
        },
      },
    },
  },

  image: {
    format: ['webp'],
    presets: {
      cover: {
        modifiers: {
          fit: 'cover',
          format: 'png',
        },
      },
    },
  },

  // https://github.com/cpreston321/nuxt-swiper
  modules: [
    'nuxt-swiper',
    'nuxt-icons',
    '@pinia/nuxt',
    '@nuxt/image',
    '@vueuse/nuxt',
    'nuxt-gtag',
    'vue-yandex-maps/nuxt',
    '@vueuse/nuxt',
  ],

  yandexMaps: {
    apikey: '604ec3a8-1483-4e5f-9b48-10cbfb63555e',
  },

  app: {
    head: {
      title: '',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'keywords', name: 'keywords', content: '' },
        { name: 'theme-color', content: '#fff' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'icon',
          sizes: '32x32',
          href: '/favicon-32x32.png',
          type: 'image/png',
        },
        { rel: 'apple-icon-precomposed', href: '/apple-icon-precomposed.png' },
        { rel: 'apple-touch-icon', href: '/apple-icon.png' },
        { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-icon-57x57.png' },
        { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-icon-60x60.png' },
        { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-icon-72x72.png' },
        { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-icon-76x76.png' },
        { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-icon-114x114.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-icon-120x120.png' },
        { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-icon-144x144.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-icon-152x152.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon-180x180.png' },
        { rel: 'apple-touch-icon', sizes: '1024x102', href: '/apple-icon-1024x1024.png' },
      ],
    },
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/styles/main.scss'],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    global: true,
    // order matters: https://github.com/nuxt/nuxt/issues/15135#issuecomment-1397372680
    dirs: ['~/components/molecules', '~/components/atoms', '~/components/sections'],
  },

  runtimeConfig: {
    public: {
      siteURL: process.env.SITE_URL,
      baseURL: process.env.NUXT_ENV_API_URL,
      fbPixel: process.env.SITE_FB_PIXEL,
      s3UrlBacket: process.env.NUXT_ENV_S3BACKET,
      gtag: {
        id: process.env.NUXT_PUBLIC_GTAG_ID,
      },
    },
  },
});
