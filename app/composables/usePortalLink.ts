import type { LocationQuery } from 'vue-router'

export type PortalPath = '/register' | '/login'

/** Keeps only the params the portal uses for attribution: `ref` and any `utm_*`. */
export function pickPassthroughParams(query: LocationQuery): Record<string, string> {
  const params: Record<string, string> = {}

  for (const [key, raw] of Object.entries(query)) {
    if (key !== 'ref' && !key.startsWith('utm_')) {
      continue
    }

    const value = Array.isArray(raw) ? raw[0] : raw
    if (typeof value === 'string' && value !== '') {
      params[key] = value
    }
  }

  return params
}

export function buildPortalUrl(base: string, path: PortalPath, params: Record<string, string> = {}): string {
  const search = new URLSearchParams(params).toString()

  return `${base.replace(/\/+$/, '')}${path}${search ? `?${search}` : ''}`
}

export function usePortalLink(path: PortalPath) {
  const config = useRuntimeConfig()
  const route = useRoute()
  const params = useState<Record<string, string>>('portal-passthrough', () => ({}))

  // The page is prerendered without a query string, so the params are read after
  // hydration. Reading them during setup would make the client href differ from
  // the server HTML, and Vue does not patch attribute mismatches in production.
  onMounted(() => {
    params.value = pickPassthroughParams(route.query)
  })

  return computed(() => buildPortalUrl(config.public.affiliatePortalUrl, path, params.value))
}
