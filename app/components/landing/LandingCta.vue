<script setup lang="ts">
import { content } from '~/data/landing'

const copy = content.cta
const registerUrl = usePortalLink('/register')
const links = useAffiliateLinks()
</script>

<template>
  <UPageSection
    id="join"
    :ui="{ container: 'py-16 sm:py-16 lg:py-16' }"
  >
    <!-- brand-900, white, and brand-200 are the raw-color exceptions from DESIGN.md §7. -->
    <UPageCTA
      :title="copy.title"
      :description="copy.description"
      variant="solid"
      :ui="{
        root: 'rounded-2xl bg-brand-900',
        title: 'text-balance text-white',
        description: 'text-brand-200'
      }"
    >
      <template #links>
        <UButton
          :to="registerUrl"
          :label="copy.join"
          size="xl"
          class="bg-white text-brand-900 hover:bg-brand-50 focus-visible:outline-white active:bg-brand-50"
        />
        <UButton
          :to="links.mailto"
          :label="copy.email"
          variant="link"
          size="xl"
          class="text-white hover:text-brand-100 focus-visible:ring-white active:text-brand-100"
        />
      </template>
    </UPageCTA>
  </UPageSection>
</template>
