import type { Tier } from '~/types/landing'
import { calculator, tiers } from '~/data/landing'

export interface Estimate {
  sales: number
  orderValue: number
  tier: Tier
  /** Total value of the referred sales, before commission. */
  salesValue: number
  monthly: number
  yearly: number
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function clampSales(value: number): number {
  if (!Number.isFinite(value)) {
    return calculator.minSales
  }

  return clamp(Math.round(value), calculator.minSales, calculator.maxSales)
}

export function clampOrderValue(value: number): number {
  if (!Number.isFinite(value)) {
    return calculator.minOrderValue
  }

  return clamp(Math.round(value), calculator.minOrderValue, calculator.maxOrderValue)
}

export function getTier(sales: number): Tier {
  const match = tiers.find(tier => sales >= tier.minSales && (tier.maxSales === null || sales <= tier.maxSales))

  // Sales are clamped to at least 1, so this only guards a misconfigured tier list.
  return match ?? tiers[0]!
}

/** The tier's rate applies to every valid sale in the month, not just the sales above its threshold. */
export function estimate(sales: number, orderValue: number): Estimate {
  const safeSales = clampSales(sales)
  const safeOrderValue = clampOrderValue(orderValue)
  const tier = getTier(safeSales)
  const salesValue = safeSales * safeOrderValue
  const monthly = Math.round(salesValue * tier.rate / 100)

  return {
    sales: safeSales,
    orderValue: safeOrderValue,
    tier,
    salesValue,
    monthly,
    yearly: monthly * 12
  }
}

/** Shared by the Payout Slip and the Commission Ladder so the highlighted tier always matches. */
export function useCommissionCalculator() {
  const sales = useState('calculator-sales', () => calculator.defaultSales)
  const orderValue = useState('calculator-order-value', () => calculator.defaultOrderValue)
  const result = computed(() => estimate(sales.value, orderValue.value))

  return { sales, orderValue, result }
}
