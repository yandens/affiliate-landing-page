<script setup lang="ts">
import { content } from '~/data/landing'

const copy = content.benefits
</script>

<template>
  <UPageSection
    id="benefits"
    :ui="{
      root: 'bg-muted',
      container: 'gap-12 py-24 sm:gap-14 sm:py-24 lg:py-24'
    }"
  >
    <!-- The lead statement carries the visual weight, so the section heading is for screen readers only. -->
    <h2 class="sr-only">
      {{ copy.title }}
    </h2>

    <div class="max-w-3xl">
      <UIcon
        :name="copy.lead.icon"
        class="size-8 text-primary"
      />
      <h3 class="mt-5 text-2xl leading-tight font-bold tracking-[-0.01em] text-balance text-highlighted sm:text-3xl">
        {{ copy.lead.title }}
      </h3>
      <p class="mt-3 max-w-[60ch] text-lg leading-relaxed text-pretty text-toned">
        {{ copy.lead.description }}
      </p>
    </div>

    <ul class="grid gap-x-12 gap-y-5 border-t border-default pt-10 sm:grid-cols-2">
      <li
        v-for="item in copy.items"
        :key="item.text"
        class="flex gap-3"
      >
        <UIcon
          :name="item.icon"
          class="mt-0.5 size-5 shrink-0 text-primary"
        />
        <span class="text-base leading-relaxed text-default">{{ item.text }}</span>
      </li>
    </ul>
  </UPageSection>
</template>
