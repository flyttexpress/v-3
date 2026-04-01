<template>
  <template v-if="blok.link?.linktype === 'url'">
    <NuxtLink
      rel="noopener noreferrer"
      :target="blok.link?.target"
      :class="classFromContent(blok)"
      :to="blok.link?.cached_url"
      v-editable="blok"
      >{{ blok.text }}</NuxtLink
    >
  </template>

  <template v-if="blok.link?.linktype === 'story'">
    <NuxtLink
      rel="noopener noreferrer"
      :target="blok.link?.target"
      :class="classFromContent(blok)"
      :to="hrefFromStoryLink(blok.link?.cached_url)"
      v-editable="blok"
      >{{ blok.text }}</NuxtLink
    >
  </template>

  <template v-if="blok.link?.linktype === 'email'">
    <NuxtLink
      :class="classFromContent(blok)"
      :to="`mailto:${blok.link?.email}`"
      v-editable="blok"
      >{{ blok.text }}</NuxtLink
    >
  </template>

  <template v-if="blok.link?.linktype === 'asset'">
    <NuxtLink
      rel="noopener noreferrer"
      :class="classFromContent(blok)"
      :to="blok.link?.cached_url"
      v-editable="blok"
      >{{ blok.text }}</NuxtLink
    >
  </template>
</template>

<script setup lang="ts">
import type { ButtonContent } from '../content'

import type {
  AssetLinkContent,
  EmailLinkContent,
  StoryLinkContent,
  UrlLinkContent,
} from '../delivery-api'
import NuxtLink from '#app/components/nuxt-link'
const classFromContent = (content: ButtonContent): string =>
  `self-center px-6 py-3 rounded-lg inline-flex flex-col items-end gap-3 overflow-hidden text-right justify-center text-sm font-semibold leading-tight transition-border duration-300 ease-in-out ${colorStyles(
    content,
  )}`
const colorStyles = (content: ButtonContent): string => {
  switch (content.color) {
    case 'primary':
      return 'bg-stone-900 hover:bg-stone-800 text-white hover:border-stone-800'
    case 'secondary':
      return 'bg-white color-stone-900 hover:bg-stone-100 hover:border-stone-900'
  }
}
/**
 * Converts a story link slug to a URL path for this application.
 * `/pages/mypage` -> `/mypage`
 * @param slugs
 */
const hrefFromStoryLink = (slugs: string): string =>
  '/' + slugs.split('/').slice(1).join('/')

export type ButtonProps = {
  blok: ButtonContent
}

const props = defineProps<ButtonProps>()
</script>
