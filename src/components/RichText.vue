<template>
  <div
    class="rich-text flex flex-col justify-start items-start gap-2"
    v-html="renderRichText(doc)"
  ></div>
</template>

<script setup lang="ts">
import { richTextResolver } from '@storyblok/richtext'
import type { StoryblokRichTextNode } from '@storyblok/richtext'
const renderRichText = richTextResolver<string>().render

export type RichTextProps = {
  doc: unknown
}

const props = defineProps<RichTextProps>()
</script>
