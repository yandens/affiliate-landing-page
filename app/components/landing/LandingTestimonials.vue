<script setup lang="ts">
import { content } from '~/data/landing'

const copy = content.testimonials
</script>

<template>
  <UPageSection
    v-if="copy.items.length"
    id="testimonials"
    :title="copy.title"
    :ui="{ title: 'text-left' }"
  >
    <UPageColumns>
      <UPageCard
        v-for="item in copy.items"
        :key="item.name"
        :description="item.quote"
        variant="ghost"
        :ui="{ description: 'text-base text-default before:content-[open-quote] after:content-[close-quote]' }"
      >
        <template #footer>
          <UUser
            :name="item.name"
            :description="item.role"
            :avatar="item.avatar ? { src: item.avatar, alt: item.name } : undefined"
            size="lg"
          />
        </template>
      </UPageCard>
    </UPageColumns>
  </UPageSection>
</template>
