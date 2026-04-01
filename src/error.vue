<script lang="ts" setup>
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()
</script>
<template>
  <NotFoundPage v-if="error.statusCode === 404" />
  <ErrorPage v-else />
</template>
