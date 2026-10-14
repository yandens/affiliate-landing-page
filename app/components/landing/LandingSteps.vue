<script setup lang="ts">
import type { TimelineItem } from '@nuxt/ui'
import { content } from '~/data/landing'

const copy = content.steps
const registerUrl = usePortalLink('/register')

const items: TimelineItem[] = copy.items.map((step, index) => ({
  ...step,
  value: index,
  number: index + 1
}))
</script>

<template>
  <UPageSection
    id="how-it-works"
    :title="copy.title"
    :description="copy.description"
    :ui="{
      root: 'border-t border-default',
      container: 'gap-12 py-20 sm:gap-12 sm:py-20 lg:py-20',
      title: 'text-left',
      description: 'max-w-[60ch] text-left'
    }"
  >
    <!-- UTimeline's orientation prop is not responsive, so the vertical layout is
         switched to horizontal at lg with classes instead of a JS media query. -->
    <UTimeline
      :items="items"
      orientation="vertical"
      size="lg"
      :ui="{
        root: 'lg:flex-row lg:gap-6',
        item: 'lg:flex-col',
        container: 'lg:flex-row',
        indicator: 'bg-brand-50 font-display text-base font-bold text-brand-700',
        separator: 'bg-brand-100 lg:h-0.5 lg:w-auto',
        wrapper: 'pb-10 group-last:pb-0 lg:pb-0 lg:pe-4',
        title: 'font-display text-xl font-semibold tracking-[-0.01em]',
        description: 'mt-1 text-base text-muted'
      }"
    >
      <template #indicator="{ item }">
        {{ item.number }}
      </template>
    </UTimeline>

    <div>
      <UButton
        :to="registerUrl"
        :label="copy.cta"
        variant="outline"
        size="lg"
      />
    </div>
  </UPageSection>
</template>
