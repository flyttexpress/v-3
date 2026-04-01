<template>
  <div class="flex items-center justify-center h-full">
    <!-- Trigger Button -->
    <button
      @click="toggleMenu"
      :class="[
        'flex items-center gap-1 text-sm font-semibold leading-tight transition-all duration-300 ease-in-out border-y-[3px]',
        isOpen ? 'text-stone-900 border-b-stone-900 border-t-transparent' : 'text-stone-900 border-transparent hover:border-b-stone-300 hover:border-t-transparent',
        buttonClass
      ]"
      :aria-expanded="isOpen"
      >
      {{ title }}
      <svg
        :class="['w-4 h-4 transition-transform duration-200', isOpen ? 'rotate-180' : '']"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
      </svg>
    </button>

    <!-- Overlay to close menu on outside click -->
    <div v-if="isOpen" @click="closeMenu" class="fixed inset-0 z-40 bg-black/5 top-[100px] sm:top-[100px]"></div>

    <!-- Full Width Mega Menu Panel  -->
    <!-- Top-full ensures it sits right underneath the relative AppBar -->
    <div
      v-if="isOpen"
      class="absolute left-0 right-0 top-full w-full bg-white shadow-xl border-t border-stone-100 z-50"
    >
      <div class="px-4 sm:px-8 md:px-20 py-8 max-h-[70vh] overflow-y-auto">
        
        <!-- Header: Root Page Link -->
        <div class="mb-6 flex items-center justify-between border-b border-stone-100 pb-4">
          <h2 class="text-2xl font-bold text-stone-900">{{ title }}</h2>
          <NuxtLink
            :to="resolveLink(navItem.link)"
            @click="closeMenu"
            class="text-sm font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-50 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
          >
            Visit Overview 
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Multi-level links grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="col in navItem.children" :key="col.link.uuid" class="flex flex-col gap-4">
            <!-- Level 2 Link -->
            <NuxtLink
              :to="resolveLink(col.link)"
              @click="closeMenu"
              class="text-base font-bold text-stone-900 pb-1 border-b border-stone-100 hover:text-stone-600 transition-colors inline-block"
            >
              {{ col.link.name }}
            </NuxtLink>
            
            <!-- Level 3 -->
            <div v-if="col.children?.length > 0" class="flex flex-col gap-3">
              <div v-for="sub in col.children" :key="sub.link.uuid" class="flex flex-col gap-1.5">
                <NuxtLink
                  :to="resolveLink(sub.link)"
                  @click="closeMenu"
                  class="text-sm font-semibold text-stone-700 hover:text-stone-900 group flex items-center gap-1 transition-all"
                >
                  <span class="w-0 overflow-hidden group-hover:w-2 transition-all duration-200 text-stone-400">»</span>
                  {{ sub.link.name }}
                </NuxtLink>
                
                <!-- Level 4 -->
                <div v-if="sub.children?.length > 0" class="flex flex-col gap-1.5 pl-3 mt-1 border-l-2 border-stone-100">
                  <NuxtLink
                    v-for="deep in sub.children"
                    :key="deep.link.uuid"
                    :to="resolveLink(deep.link)"
                    @click="closeMenu"
                    class="text-sm text-stone-500 hover:text-stone-800 transition-colors"
                  >
                    {{ deep.link.name }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
          
          <div v-if="navItem.children.length === 0" class="col-span-1 sm:col-span-2 md:col-span-4 text-center py-8 text-stone-500 italic">
            No active child pages found in this section.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import type { NavItem } from '../composables/useSiteNavigation'

const props = defineProps<{
  navItem: NavItem
  title: string
  buttonClass?: string
}>()

const emit = defineEmits<{
  (e: 'openChange', isOpen: boolean): void
}>()

const isOpen = ref(false)
const route = useRoute()

const toggleMenu = () => {
  isOpen.value = !isOpen.value
  emit('openChange', isOpen.value)
}

const closeMenu = () => {
  if (isOpen.value) {
    isOpen.value = false
    emit('openChange', false)
  }
}

// Close when route changes
onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isOpen.value) closeMenu()
}

// Helper formatting method
const resolveLink = (link: { real_path?: string; path?: string; slug?: string }) => {
  let url = link.real_path || link.path || link.slug || ''
  // remove leading "pages/" or "/pages/"
  url = url.replace(/^\/?pages\//, '')
  if (!url.startsWith('/')) url = '/' + url // ensure leading slash
  return url === '/home' ? '/' : url // root mapping
}

// Watch for route changes and close
watch(
  () => route.path,
  () => {
    closeMenu()
  }
)
</script>
