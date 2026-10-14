import { describe, expect, it } from 'vitest'
import { buildPortalUrl, pickPassthroughParams } from '~/composables/usePortalLink'

describe('pickPassthroughParams', () => {
  it('keeps ref and utm_* params and drops everything else', () => {
    expect(pickPassthroughParams({
      utm_source: 'blog',
      utm_campaign: 'launch',
      ref: 'abc',
      foo: 'bar',
      gclid: 'x'
    })).toEqual({ utm_source: 'blog', utm_campaign: 'launch', ref: 'abc' })
  })

  it('uses the first value of repeated params and skips empty ones', () => {
    expect(pickPassthroughParams({ ref: ['a', 'b'], utm_medium: '', utm_term: null })).toEqual({ ref: 'a' })
  })
})

describe('buildPortalUrl', () => {
  it('joins the base and path without a double slash', () => {
    expect(buildPortalUrl('https://portal.example.com/', '/register')).toBe('https://portal.example.com/register')
  })

  it('appends passthrough params', () => {
    expect(buildPortalUrl('https://portal.example.com', '/login', { ref: 'abc', utm_source: 'yt' }))
      .toBe('https://portal.example.com/login?ref=abc&utm_source=yt')
  })
})
