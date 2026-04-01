<template>
  <div
    :class="`self-stretch ${backgroundColor(
      blok.backgroundColor,
    )} flex justify-center`"
    v-editable="blok"
  >
    <div
      :class="`w-full ${
        blok.imagePadding ? 'p-4 md:p-10' : 'p-0'
      } ${rootAlignment(blok)} flex-wrap justify-between max-w-7xl`"
    >
      <div
        :class="`
          flex-1 p-6 md:p-12 lg:px-20 lg:py-25 inline-flex flex-col justify-center
          ${textAlignment(blok)}
        `"
      >
        <RichTextView :doc="blok.description"></RichTextView>
        <div class="flex gap-2 md:gap-4 flex-wrap items-center">
          <template
            :key="button._uid"
            v-for="(button, index) in blok.buttons"
          >
            <Button :blok="button"></Button>
          </template>
        </div>
      </div>
      <template v-if="blok.image">
        <div
          :class="`relative flex-1 overflow-hidden md:min-h-[650px] ${
            blok.imagePadding
              ? 'rounded-xl max-h-[60vw] min-h-[40vw] md:max-h-[800px]'
              : 'rounded-none max-h-[100%] min-h-[40vw] md:min-h-[100%]'
          } `"
        >
          <img
            :src="blok.image?.filename"
            :alt="blok.image?.alt ?? ''"
            :width="1200"
            :height="650"
            :class="`absolute h-full w-full object-cover`"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HeroContent } from '../content'
import RichTextView from '../components/RichText.vue'

import { backgroundColor } from './backgroundColorClass'
import Button from './Button.vue'
const rootAlignment = (content: HeroContent): string => {
  if (!content.image) {
    return 'flex flex-col md:flex-col'
  }
  switch (content.textAlignment) {
    case 'left':
      return 'flex flex-col md:flex-row'
    case 'right':
      return 'flex flex-col md:flex-row-reverse'
    case 'center':
      return 'flex flex-col md:flex-col'
  }
}
const textAlignment = (content: HeroContent): string => {
  if (!content.image) {
    return 'items-center'
  }
  switch (content.textAlignment) {
    case 'left':
    case 'right':
      return 'items-start'
    case 'center':
      return 'items-center'
  }
}

export type HeroProps = {
  blok: HeroContent
}

const props = defineProps<HeroProps>()
</script>
