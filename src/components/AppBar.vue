<template>
  <div
    :class="`flex flex-col sm:flex-row items-stretch self-stretch px-4 sm:px-8 md:px-20 py-4 sm:py-0 h-auto  sm:h-25 border-b border-stone-900 justify-between overflow-hidden ${className}`"
  >
    <div class="flex justify-between items-center py-3 sm:py-0">
      <div class="flex items-center gap-1 sm:gap-1.5">
        <BrandIcon></BrandIcon>
        <div
          class="text-stone-900 text-lg sm:text-xl font-bold leading-6 sm:leading-7"
        >
          BrightStart
        </div>
      </div>
      <div class="sm:hidden flex items-center gap-2">
        <NuxtLink
          class="self-center px-4 py-2 rounded-lg inline-flex flex-col items-end gap-2.5 overflow-hidden text-right justify-center text-white text-sm font-semibold leading-tight bg-stone-900 hover:bg-stone-800"
          to="mailto:connect@brightstart.com"
        >
          Get in touch </NuxtLink
        ><button
          aria-label="Open menu"
          @click="async (_event) => (menuOpen = !menuOpen)"
        >
          <HamburgerIcon></HamburgerIcon>
        </button>
      </div>
    </div>
    <div class="hidden sm:flex flex-row items-stretch justify-start gap-6">
      <div class="flex flex-row items-stretch relative justify-start gap-4">
        <template
          :key="tab.href"
          v-for="(tab, index) in tabs"
        >
          <NuxtLink
            :class="`flex items-center text-stone-900 text-sm font-semibold leading-tight transition-border duration-300 ease-in-out border-y-[3px] ${
              path === tab.href
                ? 'border-b-stone-900 border-t-transparent'
                : ' border-transparent'
            }`"
            :to="tab.href"
            ><span>{{ tab.label }}</span></NuxtLink
          >
        </template>
      </div>
      <NuxtLink
        class="self-center px-4 py-2 rounded-lg inline-flex flex-col items-end gap-2.5 overflow-hidden text-right justify-center text-white text-sm font-semibold leading-tight bg-stone-900 hover:bg-stone-800"
        to="mailto:connect@brightstart.com"
      >
        Get in touch
      </NuxtLink>
    </div>
    <template v-if="menuOpen">
      <div
        class="flex flex-col sm:hidden mt-2 gap-2 z-50 absolute top-[72px] left-0 right-0 bg-white shadow-lg"
      >
        <template
          :key="tab.href"
          v-for="(tab, index) in tabs"
        >
          <NuxtLink
            :onClick="(_event) => (menuOpen = false)"
            :class="`flex items-center text-stone-900 hover:text-stone-800 text-base font-semibold leading-tight px-2 py-2 rounded transition-colors duration-200 ${
              path === tab.href ? 'bg-stone-100' : ''
            }`"
            :to="tab.href"
            ><span>{{ tab.label }}</span></NuxtLink
          >
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { HamburgerIcon, BrandIcon } from './icons'
import NuxtLink from '#app/components/nuxt-link'
const tabs = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Services',
    href: '/services',
  },
  {
    label: 'About',
    href: '/about',
  },
]

export type AppbarProps = {
  className?: string
}

const props = defineProps<AppbarProps>()
const path = ref<string | undefined>(undefined)
const menuOpen = ref<boolean>(false)

onMounted(() => {
  path.value = window.location.pathname
})
</script>
