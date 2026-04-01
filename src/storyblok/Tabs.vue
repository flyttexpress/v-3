<template>
  <div
    class="self-stretch flex justify-center bg-white px-4 py-8 sm:px-8 sm:py-16 md:px-20 md:py-24"
    v-editable="blok"
  >
    <div
      class="flex-1 flex flex-col justify-start items-center gap-8 md:gap-14 max-w-7xl"
    >
      <div class="self-stretch flex flex-col justify-start items-center gap-2">
        <RichTextView :doc="blok.description"></RichTextView>
      </div>
      <div class="self-stretch flex flex-col items-stretch gap-4 md:gap-5">
        <div
          class="self-stretch p-1 bg-white rounded-lg outline-1 outline-offset-[-1px] outline-stone-900 inline-flex justify-start items-center gap-2"
        >
          <template
            :key="tab._uid"
            v-for="(tab, index) in blok.tabs"
          >
            <button
              @click="async (_event) => (currentTabUid = tab._uid)"
              :class="`flex-1 py-2 text-sm sm:py-3 sm:text-base md:py-4 ${
                currentTabUid === tab._uid
                  ? 'bg-stone-800 text-white'
                  : 'bg-transparent text-stone-800 '
              } rounded-lg flex justify-center items-center gap-0.5`"
              v-editable="tab"
            >
              <div class="justify-center text-base font-bold leading-snug">
                {{ tab.title }}
              </div>
            </button>
          </template>
        </div>
        <template
          :key="content._uid"
          v-for="(content, index) in blok.tabs.find(
            (tab) => tab._uid === currentTabUid,
          )?.content"
        >
          <div
            class="rounded-xl md:rounded-3xl overflow-hidden flex flex-col items-stretch gap-2"
          >
            <Content :blok="content"></Content>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { TabsContent } from '../content'
import Content from './Content.vue'
import RichTextView from '../components/RichText.vue'

export type TabsProps = {
  blok: TabsContent
}

const props = defineProps<TabsProps>()
const currentTabUid = ref(props.blok.tabs[0]?._uid)
</script>
