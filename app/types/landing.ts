export interface NavLink {
  label: string
  to: string
}

export type TierId = 'starter' | 'pro' | 'elite'

export interface Tier {
  id: TierId
  name: string
  minSales: number
  /** `null` means no upper limit. */
  maxSales: number | null
  /** Whole percent, e.g. `40` for 40%. */
  rate: number
  rangeLabel: string
}

export interface OrderValuePreset {
  value: number
  label: string
}

export interface CalculatorSettings {
  minSales: number
  maxSales: number
  defaultSales: number
  orderValuePresets: OrderValuePreset[]
  defaultOrderValue: number
  minOrderValue: number
  maxOrderValue: number
  orderValueStep: number
}

export interface Step {
  title: string
  description: string
}

export interface Benefit {
  icon: string
  text: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  avatar?: string
}

export interface LandingContent {
  seo: {
    title: string
    description: string
    siteName: string
  }
  header: {
    nav: NavLink[]
    logIn: string
    join: string
    homeLabel: string
  }
  hero: {
    title: string
    description: string
    cta: string
    facts: string
  }
  slip: {
    title: string
    salesLabel: string
    salesValueText: string
    orderValueLabel: string
    customOption: string
    customLabel: string
    tierLabel: string
    rateLabel: string
    salesTotalLabel: string
    monthlyLabel: string
    yearlyText: string
    footnote: string
  }
  ladder: {
    title: string
    description: string
    activeLabel: string
    smallPrint: string
    termsLink: string
  }
  steps: {
    title: string
    description: string
    items: Step[]
    cta: string
  }
  benefits: {
    title: string
    lead: {
      icon: string
      title: string
      description: string
    }
    items: Benefit[]
  }
  testimonials: {
    title: string
    items: Testimonial[]
  }
  faq: {
    title: string
    description: string
    emailLink: string
    items: FaqItem[]
    termsLink: string
  }
  cta: {
    title: string
    description: string
    join: string
    email: string
  }
  stickyCta: {
    join: string
  }
  footer: {
    terms: string
    privacy: string
    contact: string
    copyright: string
  }
}
