<template>
  <div
    class="flex flex-col items-start gap-6 p-12 flex-1 rounded-[12px] bg-white"
    v-editable="blok"
  >
    <p
      class="self-stretch justify-start text-stone-900 text-base font-normal leading-normal"
    >
      “{{ blok.quote }}”
    </p>
    <div class="self-stretch flex gap-5">
      <template v-if="blok.image">
        <div
          :class="`aspect-[1/1] shrink-0 w-[44px] h-[44px] overflow-hidden rounded-full ${backgroundColor(
            blok.imageBackgroundColor,
          )}`"
        >
          <img
            class="object-cover w-full h-full"
            :src="blok.image?.filename"
            :alt="blok.image?.alt ?? ''"
            :width="100"
            :height="100"
          />
        </div>
      </template>

      <div class="flex flex-col">
        <div
          class="justify-start text-stone-900 text-base font-bold font-['Inter']"
        >
          {{ blok.name }}
        </div>
        <div
          class="justify-start text-stone-900 text-base font-normal leading-normal"
        >
          {{ blok.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TestimonialContent } from '../content'

import { backgroundColor } from './backgroundColorClass'

export type TestimonialProps = {
  blok: TestimonialContent
}

const props = defineProps<TestimonialProps>()
</script>
