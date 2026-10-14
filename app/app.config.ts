export default defineAppConfig({
  ui: {
    colors: {
      primary: 'brand',
      secondary: 'amber',
      neutral: 'slate'
    },
    button: {
      slots: {
        base: 'font-semibold'
      }
    },
    pageHero: {
      slots: {
        title: 'text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.03em] text-balance',
        description: 'text-lg sm:text-xl leading-relaxed text-toned text-pretty'
      }
    },
    pageSection: {
      slots: {
        title: 'text-3xl leading-[1.1] sm:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-balance',
        description: 'text-lg sm:text-xl leading-relaxed text-toned text-pretty'
      }
    }
  }
})
