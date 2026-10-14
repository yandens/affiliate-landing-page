import { describe, expect, it } from 'vitest'
import { calculator } from '~/data/landing'
import {
  clampOrderValue,
  clampSales,
  estimate,
  getTier,
  useCommissionCalculator
} from '~/composables/useCommissionCalculator'
import { formatIDR } from '~/utils/format'

// Intl puts a non-breaking space between "Rp" and the amount.
const normalize = (value: string) => value.replace(/\s/g, ' ')

describe('getTier', () => {
  it.each([
    [1, 'starter', 40],
    [10, 'starter', 40],
    [11, 'pro', 50],
    [50, 'pro', 50],
    [51, 'elite', 60],
    [200, 'elite', 60]
  ])('%i sales -> %s at %i%%', (sales, id, rate) => {
    const tier = getTier(sales)
    expect(tier.id).toBe(id)
    expect(tier.rate).toBe(rate)
  })
})

describe('clampSales', () => {
  it('keeps sales between 1 and 200', () => {
    expect(clampSales(0)).toBe(1)
    expect(clampSales(-5)).toBe(1)
    expect(clampSales(201)).toBe(200)
    expect(clampSales(37)).toBe(37)
  })

  it('rounds to whole sales and treats non-numbers as the minimum', () => {
    expect(clampSales(10.4)).toBe(10)
    expect(clampSales(10.5)).toBe(11)
    expect(clampSales(Number.NaN)).toBe(1)
  })
})

describe('clampOrderValue', () => {
  it('keeps custom order values between Rp 50.000 and Rp 50.000.000', () => {
    expect(clampOrderValue(49_999)).toBe(50_000)
    expect(clampOrderValue(50_000)).toBe(50_000)
    expect(clampOrderValue(50_000_000)).toBe(50_000_000)
    expect(clampOrderValue(50_000_001)).toBe(50_000_000)
    expect(clampOrderValue(Number.NaN)).toBe(50_000)
  })

  it('accepts every preset as is', () => {
    for (const preset of calculator.orderValuePresets) {
      expect(clampOrderValue(preset.value)).toBe(preset.value)
    }
  })
})

describe('estimate', () => {
  it('matches the default slip: 20 sales at Rp 750.000 on the Pro tier', () => {
    const result = estimate(20, 750_000)
    expect(result.tier.id).toBe('pro')
    expect(result.salesValue).toBe(15_000_000)
    expect(result.monthly).toBe(7_500_000)
    expect(result.yearly).toBe(90_000_000)
  })

  it('applies the reached tier rate to every sale in the month', () => {
    expect(estimate(10, 300_000).monthly).toBe(1_200_000)
    expect(estimate(11, 300_000).monthly).toBe(1_650_000)
    expect(estimate(50, 300_000).monthly).toBe(7_500_000)
    expect(estimate(51, 300_000).monthly).toBe(9_180_000)
  })

  it('rounds the commission to whole Rupiah', () => {
    // 3 x 50.001 x 40% = 60.001,2
    expect(estimate(3, 50_001).monthly).toBe(60_001)
    // 1 x 50.005 x 40% = 20.002
    expect(estimate(1, 50_005).monthly).toBe(20_002)
    // 11 x 50.001 x 50% = 275.005,5
    expect(estimate(11, 50_001).monthly).toBe(275_006)
  })

  it('clamps out-of-range input before calculating', () => {
    const result = estimate(500, 100_000_000)
    expect(result.sales).toBe(200)
    expect(result.orderValue).toBe(50_000_000)
    expect(result.monthly).toBe(6_000_000_000)
  })
})

describe('formatIDR', () => {
  it('formats Rupiah with dot separators and no decimals', () => {
    expect(normalize(formatIDR(7_500_000))).toBe('Rp 7.500.000')
    expect(normalize(formatIDR(0))).toBe('Rp 0')
    expect(normalize(formatIDR(60_001.4))).toBe('Rp 60.001')
  })
})

describe('useCommissionCalculator', () => {
  it('starts from the defaults and shares state between callers', () => {
    const slip = useCommissionCalculator()
    const ladder = useCommissionCalculator()

    expect(slip.sales.value).toBe(calculator.defaultSales)
    expect(ladder.result.value.tier.id).toBe('pro')

    slip.sales.value = 51
    expect(ladder.result.value.tier.id).toBe('elite')

    slip.sales.value = 10
    expect(ladder.result.value.tier.id).toBe('starter')
  })
})
