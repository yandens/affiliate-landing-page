import { createRequire } from 'node:module'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

// Vue is not a direct dependency, so resolve the copy Nuxt itself uses.
const requireFromNuxt = createRequire(createRequire(import.meta.url).resolve('nuxt/package.json'))
const vueDir = dirname(requireFromNuxt.resolve('vue/package.json'))

// The tests cover pure functions and composable logic, so they run in plain Node
// with the `~` alias instead of booting a Nuxt app.
export default defineConfig({
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./app', import.meta.url)),
      'vue': vueDir
    }
  },
  test: {
    environment: 'node',
    include: ['test/**/*.test.ts']
  }
})
