<script setup lang="ts">
import { parseBridgeSearchParams } from '~/BridgeSearchParams'
import { getStoryPath } from '~/delivery-api'
// Parsing: uncomment the lines below to perform runtime validation of the story content
// import { parseContent } from '~/content'
// import { formatResult } from 'pure-parse'

const resolveRelations = ['teamMembers.teamMembers']

const route = useRoute()

const slugs = computed<string[]>(() =>
  // The slugs can be an empty string -> []
  Array.isArray(route.params.slugs) ? route.params.slugs : [],
)

const bridgeSearchParams = computed(() => parseBridgeSearchParams(route.query))

const story = await useAsyncStoryblok(
  getStoryPath(slugs.value, bridgeSearchParams.value),
  {
    resolve_relations: resolveRelations,
    version: bridgeSearchParams.value.version,
    // To support internationalization in production, you'll want to adjust this;
    //  for example, by parsing the language code from the path.
    language:
      bridgeSearchParams.value.version === 'draft'
        ? bridgeSearchParams.value._storyblok_lang
        : 'default',
  },
)
// Parsing: uncomment the lines below to perform runtime validation of the story content
// .then((story) => {
//   if (!story.value) {
//     return undefined
//   }
//   const contentResult = parseContent(story.value.content)
//
//   if (contentResult.error) {
//     throw new Error(
//       `Failed to parse story content: ${formatResult(contentResult)}`,
//     )
//   }
//   story.value.content = contentResult.value
//   return story
// })
</script>

<template>
  <StoryblokComponent :blok="story?.content" />
</template>
