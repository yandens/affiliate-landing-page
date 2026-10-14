<script setup lang="ts">
import { content } from '~/data/landing'

const registerUrl = usePortalLink('/register')
const visible = ref(false)

let observer: IntersectionObserver | undefined

onMounted(() => {
  const hero = document.getElementById('estimate')
  const join = document.getElementById('join')
  if (!hero || !join) {
    return
  }

  let pastHero = false
  let reachedJoin = false

  // Show once the hero has scrolled off the top, hide again from the final CTA
  // onwards so the bar never doubles up with its own button or covers the footer.
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const scrolledPast = !entry.isIntersecting && entry.boundingClientRect.top < 0
      if (entry.target === hero) {
        pastHero = scrolledPast
      } else {
        reachedJoin = entry.isIntersecting || scrolledPast
      }
    }
    visible.value = pastHero && !reachedJoin
  })

  observer.observe(hero)
  observer.observe(join)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div
    class="fixed inset-x-0 bottom-0 z-40 border-t border-default bg-default p-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition-transform duration-200 ease-out motion-reduce:transition-none lg:hidden"
    :class="visible ? 'translate-y-0' : 'translate-y-full'"
    :inert="!visible"
  >
    <UButton
      :to="registerUrl"
      :label="content.stickyCta.join"
      size="xl"
      block
    />
  </div>
</template>
