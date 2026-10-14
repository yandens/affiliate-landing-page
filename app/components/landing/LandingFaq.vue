<script setup lang="ts">
import { content } from '~/data/landing'

const copy = content.faq
const links = useAffiliateLinks()

const items = copy.items.map(item => ({ label: item.question, content: item.answer }))

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': copy.items.map(item => ({
        '@type': 'Question',
        'name': item.question,
        'acceptedAnswer': { '@type': 'Answer', 'text': item.answer }
      }))
    })
  }]
})
</script>

<template>
  <UPageSection
    id="faq"
    :title="copy.title"
    :description="copy.description"
    orientation="horizontal"
    :ui="{
      container: 'gap-10 py-24 sm:gap-12 sm:py-24 lg:grid-cols-12 lg:items-start lg:gap-12 lg:py-24',
      wrapper: 'lg:sticky lg:top-[calc(var(--ui-header-height)+2rem)] lg:col-span-4',
      title: 'text-left',
      description: 'text-left text-pretty',
      footer: 'mt-5'
    }"
  >
    <template #links>
      <ULink
        :to="links.mailto"
        class="font-medium text-primary underline underline-offset-4"
      >
        {{ copy.emailLink }}
      </ULink>
    </template>

    <div class="lg:col-span-8">
      <UAccordion
        :items="items"
        type="single"
        collapsible
        :unmount-on-hide="false"
        :ui="{
          trigger: 'py-4 text-base',
          label: 'font-semibold text-highlighted',
          body: 'pb-5 text-base leading-relaxed text-toned'
        }"
      />
      <ULink
        :to="links.terms"
        target="_blank"
        class="mt-6 inline-block font-medium text-primary underline underline-offset-4"
      >
        {{ copy.termsLink }}
      </ULink>
    </div>
  </UPageSection>
</template>
