<script setup lang="ts">
import { content, tiers } from '~/data/landing'

const copy = content.ladder
const { result } = useCommissionCalculator()
const links = useAffiliateLinks()

// Each step is taller (desktop) or wider (mobile) than the one before, so the
// rates read as a climb instead of three equal pricing cards.
const stepSizes = ['w-3/5 lg:h-24', 'w-4/5 lg:h-36', 'w-full lg:h-48']
</script>

<template>
  <UPageSection
    id="commission"
    :title="copy.title"
    :description="copy.description"
    :ui="{
      container: 'gap-12 py-24 sm:gap-12 sm:py-24 lg:py-32',
      title: 'text-left',
      description: 'max-w-[60ch] text-left text-balance'
    }"
  >
    <ol class="flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-4">
      <li
        v-for="(tier, index) in tiers"
        :key="tier.id"
        :aria-current="tier.id === result.tier.id ? 'true' : undefined"
        class="flex flex-col gap-3 lg:flex-1"
      >
        <div>
          <p class="text-lg font-semibold text-highlighted">
            {{ tier.name }}
          </p>
          <p class="text-sm text-muted">
            {{ tier.rangeLabel }}
          </p>
          <p
            v-if="tier.id === result.tier.id"
            class="mt-1 text-sm font-medium text-highlighted"
          >
            {{ copy.activeLabel }}
          </p>
        </div>
        <div
          class="flex items-end rounded-lg px-5 py-4 transition-colors duration-150 ease-out motion-reduce:transition-none lg:w-full"
          :class="[
            stepSizes[index],
            tier.id === result.tier.id ? 'bg-amber-300 text-highlighted' : 'bg-brand-50 text-brand-700'
          ]"
        >
          <p class="font-display text-4xl leading-none font-extrabold tabular-nums sm:text-5xl">
            {{ tier.rate }}%
          </p>
        </div>
      </li>
    </ol>

    <p class="max-w-[70ch] text-sm text-muted">
      {{ copy.smallPrint }}
      <ULink
        :to="links.terms"
        target="_blank"
        class="font-medium text-primary underline underline-offset-4"
      >
        {{ copy.termsLink }}
      </ULink>
    </p>
  </UPageSection>
</template>
