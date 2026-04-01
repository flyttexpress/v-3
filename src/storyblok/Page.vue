<template>
  <div
    class="flex flex-col items-stretch"
    v-editable="blok"
  >
    <AppBar></AppBar
    ><template
      :key="index"
      v-for="(content, index) in blok.body"
    >
      <Content :blok="content"></Content> </template
    ><Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import AppBar from '../components/AppBar.vue'
import Footer from '../components/Footer.vue'
import Content from './Content.vue'
import type { PageContent } from '../content'

export type PageProps = {
  blok: PageContent
}

const props = defineProps<PageProps>()
</script>
