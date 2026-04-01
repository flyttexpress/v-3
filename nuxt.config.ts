// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/fonts',
    '@nuxt/eslint',
    [
      '@storyblok/nuxt',
      {
        // IMPORTANT: this makes all content public, including draft content.
        // The SDK requires the access token to be exposed to the client.
        accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
        apiOptions: {
          /** Set the correct region for your space. Learn more: https://www.storyblok.com/docs/packages/storyblok-js#example-region-parameter */
          region: 'eu',
          /** The following code is only required when creating a Storyblok space directly via the Blueprints feature. */
          endpoint: process.env.STORYBLOK_API_BASE_URL
            ? `${new URL(process.env.STORYBLOK_API_BASE_URL).origin}/v2`
            : undefined,
        },
      },
    ],
  ],
  srcDir: 'src',
  vite: {
    plugins: [tailwindcss()],
  },
  css: ['~/assets/css/tailwind.css'],
  build: {
    transpile: ['@storyblok/preview-bridge'],
  },
  runtimeConfig: {
    storyblokApiBaseUrl: process.env.STORYBLOK_API_BASE_URL,
    storyblokDeliveryApiToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
  },
  fonts: {
    provider: 'google', // sets default provider
    families: [
      {
        name: 'Inter',
        weights: ['400', '500', '800'],
        styles: ['normal', 'italic'],
        subsets: ['latin'],
        display: 'swap',
        preload: true,
      },
    ],
  },
  devServer: {
    https: {
      key: './certificates/localhost-key.pem',
      cert: './certificates/localhost.pem',
    },
  },
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
})
