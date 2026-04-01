<template>
  <div
    class="self-stretch px-5 py-10 md:px-20 md:py-24 bg-neutral-100 items-center flex flex-col"
    v-editable="blok"
  >
    <div class="max-w-6xl flex flex-col gap-10">
      <div
        class="self-stretch flex-1 inline-flex flex-col justify-center items-start gap-2"
      >
        <RichTextView :doc="blok.description"></RichTextView>
      </div>
      <div
        class="self-stretch flex justify-start items-stretch gap-4 md:gap-6 flex-col md:flex-row"
      >
        <template
          :key="card._uid"
          v-for="(card, index) in blok.cards"
        >
          <Card :blok="card"></Card>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CardsContent } from '../content'

import Card from './Card.vue'
import RichTextView from '../components/RichText.vue'

export type CardsProps = {
  blok: CardsContent
}

const props = defineProps<CardsProps>()
</script>
