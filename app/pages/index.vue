<template>
  <div>
    <LandingHero />
    <!-- The ladder hydrates eagerly: it mirrors the slip's live state, and a late
         hydration could leave a stale highlighted step from the prerendered HTML. -->
    <LandingLadder />
    <LazyLandingSteps hydrate-on-visible />
    <LazyLandingBenefits hydrate-never />
    <LazyLandingTestimonials hydrate-on-visible />
    <LazyLandingFaq hydrate-on-visible />
    <LazyLandingCta hydrate-on-visible />
    <LazyLandingStickyCta hydrate-on-idle />
  </div>
</template>
