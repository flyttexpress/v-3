<template>
  <div
    class="w-96 inline-flex flex-col justify-start items-start gap-6"
    v-editable="blok"
  >
    <div
      :class="`self-stretch relative rounded-xl inline-flex justify-start items-center gap-2.5 overflow-hidden ${backgroundColor(
        blok.backgroundColor,
      )}`"
    >
      <template v-if="blok.image">
        <img
          class="translate-y-[50px] w-96 h-96 rounded-md object-contain"
          :src="blok.image?.filename"
          :alt="blok.image?.alt ?? ''"
          :width="368"
          :height="384"
        />
      </template>
    </div>
    <div class="self-stretch flex flex-col justify-start items-start">
      <div
        class="justify-start text-stone-900 text-2xl font-extrabold leading-loose"
      >
        {{ blok.name }}
      </div>
      <div
        class="self-stretch justify-start text-stone-900 text-base font-normal leading-7"
      >
        {{ blok.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TeamMemberContent } from '../content'

import { backgroundColor } from './backgroundColorClass'

type TeamMemberProps = {
  blok: TeamMemberContent
}

const props = defineProps<TeamMemberProps>()
</script>
