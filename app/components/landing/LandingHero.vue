<script setup lang="ts">
import { content } from '~/data/landing'

const copy = content.hero
const registerUrl = usePortalLink('/register')
</script>

<template>
  <UPageHero
    id="estimate"
    :title="copy.title"
    :description="copy.description"
    orientation="horizontal"
    :ui="{
      root: 'bg-muted',
      container: 'gap-12 pt-16 pb-24 sm:gap-y-16 lg:grid-cols-12 lg:gap-x-12 lg:pt-24 lg:pb-32',
      wrapper: 'lg:col-span-7',
      description: 'max-w-[60ch]'
    }"
  >
    <template #footer>
      <UButton
        :to="registerUrl"
        :label="copy.cta"
        trailing-icon="i-lucide-arrow-right"
        size="xl"
      />
      <p class="mt-5 text-sm text-muted">
        {{ copy.facts }}
      </p>
    </template>

    <div class="lg:col-span-5">
      <LandingPayoutSlip />
    </div>
  </UPageHero>
</template>
