<template>
  <div
    :class="`flex flex-col justify-start items-start gap-4 bg-white rounded-[20px] p-4 sm:p-6 ${className}`"
    v-editable="blok"
  >
    <template v-if="blok.icon">
      <img
        class="box-content p-2 w-10 h-10 sm:w-[34px] sm:h-[34px]"
        :src="blok.icon?.filename"
        :alt="blok.icon?.alt ?? ''"
        :width="34"
        :height="34"
      />
    </template>

    <RichTextView :doc="blok.description"></RichTextView>
  </div>
</template>

<script setup lang="ts">
import type { CardContent } from '../content'

import RichTextView from '../components/RichText.vue'

export type CardProps = {
  blok: CardContent
  className?: string
}

const props = defineProps<CardProps>()
</script>
