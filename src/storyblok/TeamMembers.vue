<template>
  <div
    class="self-stretch px-5 py-10 md:px-20 md:py-24 items-center flex flex-col"
    v-editable="blok"
  >
    <div class="max-w-6xl flex flex-col gap-10">
      <RichTextView :doc="blok.description"></RichTextView>
      <div
        class="self-stretch flex justify-start items-stretch gap-4 md:gap-6 flex-col md:flex-row"
      >
        <template
          :key="member.content._uid"
          v-for="(member, index) in blok.teamMembers"
        >
          <TeamMember :blok="member.content"></TeamMember>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TeamMembersContent } from '../content'

import TeamMember from './TeamMember.vue'
import RichTextView from '../components/RichText.vue'

export type TeamMembersProps = {
  blok: TeamMembersContent
}

const props = defineProps<TeamMembersProps>()
</script>
