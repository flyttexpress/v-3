<template>
  <div
    class="flex flex-col items-center self-stretch gap-[60px] px-5 pt-[60px] pb-[100px] bg-neutral-100 sm:gap-[60px] sm:px-20 sm:pt-[60px] sm:pb-[100px]"
    v-editable="blok"
  >
    <div class="flex flex-col gap-2 sm:gap-4">
      <h2
        class="flex-1 text-center text-3xl leading-[38px] tracking-[-0.3px] font-extrabold text-[#1F1F1F] font-inter sm:text-[60px] sm:leading-[72px] sm:tracking-[-0.6px]"
      >
        {{ blok.title }}
      </h2>
      <p
        class="self-stretch text-center text-base leading-6 text-[#44474A] font-inter font-normal sm:text-[18px] sm:leading-[28px]"
      >
        {{ blok.description }}
      </p>
    </div>
    <div
      class="self-stretch flex justify-start items-stretch gap-4 md:gap-6 flex-col md:flex-row"
    >
      <template
        :key="index"
        v-for="(testimonial, index) in blok.testimonials"
      >
        <Content :blok="testimonial"></Content>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import Content from './Content.vue'
import type { TestimonialsContent } from '../content'

export type TestimonialsProps = {
  blok: TestimonialsContent
}

const props = defineProps<TestimonialsProps>()
</script>
