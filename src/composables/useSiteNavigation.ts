import { useStoryblokApi, useAsyncData, computed, useRuntimeConfig } from '#imports'

export interface StoryblokLink {
  id: number
  uuid: string
  name: string
  parent_id: number | null
  is_folder: boolean
  published: boolean
  is_startpage: boolean
  position: number
  slug: string
  path: string | null
  real_path: string
}

export interface NavItem {
  link: StoryblokLink
  children: NavItem[]
}

export const useSiteNavigation = () => {
  const storyblokApi = useStoryblokApi()
  const config = useRuntimeConfig()
  const version = config.public.storyblokPreview ? 'draft' : 'published'
  // 1. Fetch the Global config story (Assumes slug is 'global' or 'config')
  // This will return undefined if not configured yet, but it provides the infrastructure.
  const { data: globalStory, pending: globalPending } = useAsyncData('global-config', async () => {
    try {
      const { data } = await storyblokApi.get('cdn/stories/global/global', { version, resolve_links: 'url' })
      return data.story
    } catch {
      console.log('could not find global config story at global/global');
      return null
    }
  })

  // 2. Fetch all links to build the tree and the mega menu
  // Hint: this will return all links but we only need those inside pages/
  const { data: linksData, pending: linksPending } = useAsyncData('site-links', async () => {
    try {
      const { data } = await storyblokApi.get('cdn/links', { version, starts_with: 'pages/' })
      return data.links as Record<string, StoryblokLink>
    } catch {
      console.error('Failed to fetch site links from Storyblok')
      return {} as Record<string, StoryblokLink>
    }
  })

  // Recursive function to get children of a specific link up to a max level
  const getChildren = (parentId: number, maxLevels = 4, currentLevel = 1): NavItem[] => {
    if (!linksData.value || currentLevel > maxLevels) return []
    
    const children = Object.values(linksData.value)
      .filter((l) => l.parent_id === parentId)
      // Hide standard folder sub-folders if they are startpages (usually it's root page of folder. Keep it simple and filter out duplicates where slug is pure root).
      .sort((a, b) => a.position - b.position)

    return children.map((child) => ({
      link: child,
      children: getChildren(child.id, maxLevels, currentLevel + 1)
    }))
  }

  // Helper to resolve link path accurately, stripping the 'pages/' folder component
  const resolveLink = (link: StoryblokLink) => {
    let url = link.real_path || link.path || link.slug || ''
    // remove leading "pages/" or "/pages/"
    url = url.replace(/^\/?pages\//, '')
    if (!url.startsWith('/')) url = '/' + url // ensure leading slash
    return url === '/home' ? '/' : url // ensure root maps to '/' properly instead of '/home' if needed
  }

  return {
    globalStory,
    linksData,
    getChildren,
    resolveLink,
    pending: computed(() => globalPending.value || linksPending.value)
  }
}
