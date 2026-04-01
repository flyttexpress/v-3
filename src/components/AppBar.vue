<template>
  <div
    :class="`flex flex-col sm:flex-row items-stretch self-stretch px-4 sm:px-8 md:px-20 py-4 sm:py-0 h-auto sm:h-25 border-b border-stone-900 justify-between relative bg-white z-50 ${className}`">
    <!-- Brand / Logo Side -->
    <div class="flex justify-between items-center py-3 sm:py-0">
      <NuxtLink to="/" class="flex items-center gap-1 sm:gap-1.5 focus:outline-none">
        <BrandIcon></BrandIcon>
        <div class="text-stone-900 text-lg sm:text-xl font-bold leading-6 sm:leading-7">
          BrightStart
        </div>
      </NuxtLink>

      <!-- Mobile hamburger -->
      <div class="sm:hidden flex items-center gap-2">
        <NuxtLink
          class="self-center px-4 py-2 rounded-lg inline-flex flex-col items-end gap-2.5 overflow-hidden text-right justify-center text-white text-sm font-semibold leading-tight bg-stone-900 hover:bg-stone-800"
          to="mailto:connect@brightstart.com">
          Get in touch
        </NuxtLink>
        <button aria-label="Open menu" @click="menuOpen = !menuOpen">
          <HamburgerIcon></HamburgerIcon>
        </button>
      </div>
    </div>

    <!-- Desktop Navigation -->
    <div class="hidden sm:flex flex-row items-stretch justify-start gap-6">
      <div class="flex flex-row items-stretch justify-start gap-5">

        <ClientOnly>
          <div v-if="pending" class="flex items-center gap-4 text-stone-400 text-xs">
            Loading...
          </div>
          <template v-else>
            <template :key="`desktop-${index}`" v-for="(item, index) in menuItems">
              <!-- Mega Menu Dropdown -->
              <MegaMenu v-if="item.isFolder" :title="item.title"
                :navItem="item.navItem" />

              <!-- Standard Link -->
              <NuxtLink v-else :class="`flex flex-col justify-center text-stone-900 text-sm font-semibold leading-tight transition-all duration-300 ease-in-out border-y-[3px] ${isActive(item.href)
                ? 'border-b-stone-900 border-t-transparent'
                : 'border-transparent hover:border-b-stone-300 hover:border-t-transparent'
                }`" :to="item.href">
                <span>{{ item.title }}</span>
              </NuxtLink>
            </template>
          </template>
        </ClientOnly>

      </div>

      <NuxtLink
        class="self-center px-4 py-2 rounded-lg inline-flex flex-col items-end gap-2.5 overflow-hidden text-right justify-center text-white text-sm font-semibold leading-tight bg-stone-900 hover:bg-stone-800 ml-2"
        to="mailto:connect@brightstart.com">
        Get in touch
      </NuxtLink>
    </div>

    <!-- Mobile Navigation Panel -->
    <template v-if="menuOpen">
      <div
        class="flex flex-col sm:hidden mt-2 pb-4 pt-2 gap-1 z-50 absolute top-full left-0 right-0 bg-white shadow-lg border-b border-stone-200">
        <template :key="`mobile-${index}`" v-for="(item, index) in menuItems">
          <!-- Expanding Accordion for Mobile Multi-Level Menu -->
          <details v-if="item.isFolder" class="group/mobile">
            <summary
              class="flex justify-between items-center cursor-pointer text-stone-900 hover:text-stone-800 text-base font-semibold leading-tight px-4 py-3 rounded transition-colors duration-200 list-none">
              {{ item.title }}
              <svg class="w-4 h-4 transition-transform group-open/mobile:rotate-180" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd" />
              </svg>
            </summary>
            <!-- Mobile sub-links -->
            <div class="pl-8 pr-4 py-2 flex flex-col gap-3 bg-stone-50 border-y border-stone-100">
              <NuxtLink :to="item.href" @click="menuOpen = false"
                class="font-bold text-stone-900 pb-2 border-b border-stone-200 block">
                Overview
              </NuxtLink>

              <div v-for="col in item.navItem.children" :key="col.link.uuid" class="flex flex-col gap-2">
                <NuxtLink @click="menuOpen = false" :to="resolveLink(col.link)"
                  class="font-semibold text-stone-800 block">
                  {{ col.link.name }}
                </NuxtLink>
                <div v-if="col.children.length > 0" class="flex flex-col gap-2 pl-3 mt-1 border-l-2 border-stone-200">
                  <NuxtLink v-for="sub in col.children" :key="sub.link.uuid" @click="menuOpen = false"
                    :to="resolveLink(sub.link)" class="text-sm font-medium text-stone-600 hover:text-stone-900 block">
                    {{ sub.link.name }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </details>

          <NuxtLink v-else @click="menuOpen = false" :class="`flex items-center text-stone-900 hover:text-stone-800 text-base font-semibold leading-tight px-4 py-3 rounded transition-colors duration-200 ${isActive(item.href) ? 'bg-stone-50' : ''
            }`" :to="item.href">
            <span>{{ item.title }}</span>
          </NuxtLink>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { HamburgerIcon, BrandIcon } from './icons'
import NuxtLink from '#app/components/nuxt-link'
import MegaMenu from './MegaMenu.vue'
import { useSiteNavigation } from '../composables/useSiteNavigation'

export type AppbarProps = {
  className?: string
}

const props = defineProps<AppbarProps>()
const route = useRoute()
const menuOpen = ref<boolean>(false)

const { globalStory, linksData, pending, getChildren, resolveLink } = useSiteNavigation()

// Determine if the link is active based on the current route
const isActive = (href: string) => {
  return route.path === href || (href !== '/' && (route.path.startsWith(href + '/') || route.path === href))
}

const menuItems = computed(() => {
  if (!linksData.value || !globalStory.value) return []

  const navBlocks = globalStory.value.content.items || []

  return navBlocks.map((navBlock: any) => {
    // 1. nav_folder: Opens Mega Menu
    if (navBlock.component === 'nav_folder') {
      // User specified navBlock.folder is a Single-Option property pointing to a Story Source.
      // This means navBlock.folder is simply the string UUID of the target folder.
      const targetUuid = navBlock.folder
      const matchingLink = targetUuid ? Object.values(linksData.value || {}).find((l: any) => l.uuid === targetUuid) : null

      if (matchingLink) {
        // If the selected story is explicitly a Page restricted to a folder, it's typically the `is_startpage`.
        // To grab the child pages, we look up the true parent folder ID.
        const parentIdToUse = matchingLink.is_startpage ? matchingLink.parent_id || matchingLink.id : matchingLink.id;
        
        // Grab the recursive children, but filter out the startpage itself from duplicating in the drop down view.
        let children = getChildren(parentIdToUse, 4, 1)
        if (matchingLink.is_startpage) {
           children = children.filter(c => c.link.id !== matchingLink.id)
        }

        return {
          title: navBlock.title || matchingLink.name,
          href: resolveLink(matchingLink),
          isFolder: true,
          navItem: { link: matchingLink, children }
        }
      }
      return {
        title: navBlock.title || 'Folder',
        href: '#',
        isFolder: true,
        navItem: { link: { name: navBlock.title, uuid: targetUuid, children: [] }, children: [] }
      }
    }

    // 2. nav_item: Simple standard Link
    if (navBlock.component === 'nav_item') {
      // navBlock.link is the standard Storyblok Link object
      const targetUuid = navBlock.link?.id
      const matchingLink = targetUuid ? Object.values(linksData.value || {}).find((l: any) => l.uuid === targetUuid) : null

      let href = navBlock.link?.cached_url ? `/${navBlock.link.cached_url}` : '#'
      if (matchingLink) href = resolveLink(matchingLink)

      return {
        title: navBlock.title || navBlock.name || matchingLink?.name || 'Link',
        href: href,
        isFolder: false,
        navItem: null
      }
    }

    return null
  }).filter(Boolean)
})


</script>
