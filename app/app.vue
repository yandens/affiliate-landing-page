<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { content } from '~/data/landing'

const { seo, header, footer } = content
// Empty when NUXT_SITE_URL is unset, so URLs fall back to relative paths instead of crashing the render.
const siteUrl = (useSiteConfig().url ?? '').replace(/\/+$/, '')

useSeoMeta({
  title: seo.title,
  description: seo.description,
  ogTitle: seo.title,
  ogDescription: seo.description,
  ogSiteName: seo.siteName,
  ogType: 'website',
  ogUrl: `${siteUrl}/`,
  ogImage: `${siteUrl}/og-image.png`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: seo.title,
  twitterCard: 'summary_large_image'
})

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/` }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': seo.siteName,
      'url': `${siteUrl}/`
    })
  }]
})

// exactHash keeps every item from looking active on `/` before a section is picked.
const navItems: NavigationMenuItem[] = header.nav.map(item => ({ ...item, exactHash: true }))

const registerUrl = usePortalLink('/register')
const loginUrl = usePortalLink('/login')
const links = useAffiliateLinks()

const footerLinks: NavigationMenuItem[] = [
  { label: footer.terms, to: links.terms, target: '_blank' },
  { label: footer.privacy, to: links.privacy, target: '_blank' },
  { label: footer.contact, to: links.mailto }
]

const copyright = footer.copyright.replace('{year}', String(new Date().getFullYear()))
</script>

<template>
  <UApp>
    <UHeader
      to="/"
      :ui="{ title: 'rounded-md' }"
    >
      <template #title>
        <span class="sr-only">{{ header.homeLabel }}</span>
        <AppLogo
          aria-hidden="true"
          class="text-2xl"
        />
      </template>

      <UNavigationMenu
        :items="navItems"
        variant="link"
      />

      <template #right>
        <UButton
          :to="loginUrl"
          :label="header.logIn"
          color="neutral"
          variant="ghost"
          class="hidden sm:inline-flex"
        />
        <UButton
          :to="registerUrl"
          :label="header.join"
          variant="soft"
        />
      </template>

      <template #body>
        <UNavigationMenu
          :items="navItems"
          orientation="vertical"
          class="-mx-2.5"
        />
        <UButton
          :to="loginUrl"
          :label="header.logIn"
          color="neutral"
          variant="outline"
          block
          class="mt-6 sm:hidden"
        />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <UFooter class="border-t border-default">
      <template #left>
        <AppLogo class="text-xl" />
      </template>

      <UNavigationMenu
        :items="footerLinks"
        variant="link"
      />

      <template #right>
        <p class="text-sm text-muted">
          {{ copyright }}
        </p>
      </template>
    </UFooter>
  </UApp>
</template>
