<template>
  <div :class="`flex flex-col items-stretch min-h-screen ${className ?? ''}`">
    <AppBarView></AppBarView>
    <div
      class="flex-1 self-stretch px-20 pt-24 flex flex-col justify-between items-center gap-12"
    >
      <div class="flex flex-col justify-start items-center gap-6">
        <div class="flex flex-col justify-start items-center gap-2">
          <h1 class="justify-start text-stone-900 text-8xl font-extrabold">
            Uh-oh!
          </h1>
          <h2
            class="justify-start text-stone-900 text-2xl font-bold leading-10"
          >
            500 error
          </h2>
          <p
            class="text-center justify-start text-stone-900 text-lg font-normal leading-7"
          >
            Something went wrong at our end. We are trying to fix the problem.
          </p>
          <p
            class="text-center justify-start text-stone-900 text-lg font-normal leading-7"
          >
            Please try again at a later stage.
          </p>
        </div>
        <NuxtLink
          class="px-6 py-3 rounded-[10px] flex flex-col justify-start items-center gap-3 overflow-hidden justify-center text-white text-lg font-semibold leading-relaxed bg-stone-900 hover:bg-stone-800"
          to="/"
        >
          Back to Home
        </NuxtLink>
      </div>
      <img
        src="/404.png"
        alt="A confused dog with glasses and a knitted sweater."
        class="object-cover translate-x-[-60px]"
        :width="504"
        :height="288"
      />
    </div>
    <FooterView></FooterView>
  </div>
</template>

<script setup lang="ts">
import AppBarView from './AppBar.vue'
import FooterView from './Footer.vue'
import NuxtLink from '#app/components/nuxt-link'

export type ErrorPageProps = {
  className?: string
}

const props = defineProps<ErrorPageProps>()
</script>
