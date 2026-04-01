<template>
  <template v-if="blok.component === 'page'">
    <Page :blok="blok"></Page>
  </template>

  <template v-if="blok.component === 'testimonials'">
    <Testimonials :blok="blok"></Testimonials>
  </template>

  <template v-if="blok.component === 'testimonial'">
    <Testimonial :blok="blok"></Testimonial>
  </template>

  <template v-if="blok.component === 'cards'">
    <Cards :blok="blok"></Cards>
  </template>

  <template v-if="blok.component === 'card'">
    <Card :blok="blok"></Card>
  </template>

  <template v-if="blok.component === 'hero'">
    <Hero :blok="blok"></Hero>
  </template>

  <template v-if="blok.component === 'tabs'">
    <Tabs :blok="blok"></Tabs>
  </template>

  <template v-if="blok.component === 'teamMembers'">
    <TeamMembers :blok="blok"></TeamMembers>
  </template>

  <template v-if="blok.component === 'button'">
    <Button :blok="blok"></Button>
  </template>
</template>

<script setup lang="ts">
import type {
  CardsContent,
  Content,
  HeroContent,
  PageContent,
  TestimonialContent,
  TestimonialsContent,
  TabsContent,
  TeamMembersContent,
  CardContent,
  ButtonContent,
} from '../content'
import TeamMembers from './TeamMembers.vue'
import Page from './Page.vue'
import Testimonials from './Testimonials.vue'
import Testimonial from './Testimonial.vue'
import Cards from './Cards.vue'
import Hero from './Hero.vue'
import Tabs from './Tabs.vue'
import Card from './Card.vue'
import Button from './Button.vue'

export type ContentProps = {
  blok: Content
}

const props = defineProps<ContentProps>()
</script>
