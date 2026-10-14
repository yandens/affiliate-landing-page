import type { CalculatorSettings, LandingContent, Tier } from '~/types/landing'

// Program facts from PRD §6. Change them here only.
export const tiers: Tier[] = [
  { id: 'starter', name: 'Starter', minSales: 1, maxSales: 10, rate: 40, rangeLabel: '1 to 10 sales a month' },
  { id: 'pro', name: 'Pro', minSales: 11, maxSales: 50, rate: 50, rangeLabel: '11 to 50 sales a month' },
  { id: 'elite', name: 'Elite', minSales: 51, maxSales: null, rate: 60, rangeLabel: '51 or more sales a month' }
]

export const program = {
  cookieDays: 30,
  validationDays: 30
}

export const calculator: CalculatorSettings = {
  minSales: 1,
  maxSales: 200,
  defaultSales: 20,
  orderValuePresets: [300_000, 750_000, 1_500_000],
  defaultOrderValue: 750_000,
  minOrderValue: 50_000,
  maxOrderValue: 50_000_000,
  orderValueStep: 10_000
}

export const content: LandingContent = {
  seo: {
    title: 'AFPro Affiliate Program: earn up to 60% commission',
    description: 'Join the AFPro affiliate program for free. Earn 40% to 60% commission on the sales you refer, with a 30-day cookie and monthly payouts.',
    siteName: 'AFPro'
  },

  header: {
    nav: [
      { label: 'How it works', to: '#how-it-works' },
      { label: 'Commission', to: '#commission' },
      { label: 'Benefits', to: '#benefits' },
      { label: 'FAQ', to: '#faq' }
    ],
    logIn: 'Log in',
    join: 'Join free',
    homeLabel: 'AFPro affiliate program home'
  },

  hero: {
    title: 'Earn up to 60% on every sale you refer',
    description: 'Share AFPro with your readers, viewers, or clients. Joining is free, there is no minimum traffic, and you get paid every month.',
    cta: 'Join free',
    facts: '40% to 60% commission · 30-day cookie · Paid monthly'
  },

  slip: {
    title: 'Your payout estimate',
    salesLabel: 'Valid sales per month',
    salesValueText: '{count} sales a month',
    orderValueLabel: 'Average order value',
    customOption: 'Custom',
    customLabel: 'Custom order value in Rupiah',
    tierLabel: 'Tier',
    rateLabel: 'Commission rate',
    salesTotalLabel: 'Sales value',
    monthlyLabel: 'Estimated monthly commission',
    yearlyLabel: 'Over 12 months',
    footnote: 'Estimate only. Actual commission depends on valid sales.'
  },

  ladder: {
    title: 'Your rate climbs with your sales',
    description: 'Your tier depends on how many valid sales you make in a month. Change the sales number in the estimate and the matching step is highlighted here.',
    activeLabel: 'Your estimate',
    smallPrint: 'A valid sale is a purchase made through your link that is not cancelled or refunded during the 30-day validation period.',
    termsLink: 'Read the affiliate terms'
  },

  steps: {
    title: 'How it works',
    description: 'Joining takes about a minute. After that, your part is sharing your link.',
    items: [
      { title: 'Join free', description: 'Create an account in under a minute and get access to your dashboard.' },
      { title: 'Share your link', description: 'Put your unique link in posts, videos, bios, or client sites.' },
      { title: 'Track results', description: 'See clicks, sales, and commission in your dashboard.' },
      { title: 'Get paid', description: 'Commission is paid monthly, after each sale passes validation.' }
    ],
    cta: 'Join now'
  },

  benefits: {
    title: 'What you get as an affiliate',
    lead: {
      icon: 'i-lucide-calendar-clock',
      title: 'Buyers have 30 days to decide, and the sale is still yours',
      description: 'If someone clicks your link and comes back to buy within 30 days, you earn the commission.'
    },
    items: [
      { icon: 'i-lucide-trending-up', text: 'Your rate moves up automatically as your monthly sales grow.' },
      { icon: 'i-lucide-chart-line', text: 'A real-time dashboard shows your clicks, sales, and commission.' },
      { icon: 'i-lucide-link', text: 'Ready-to-use links and coupon codes for posts, videos, and bios.' },
      { icon: 'i-lucide-badge-check', text: 'Free to join, with no minimum traffic.' },
      { icon: 'i-lucide-mail', text: 'The affiliate team answers your questions by email.' }
    ]
  },

  // Only add real quotes from affiliates who agreed to be featured.
  // While this list is empty, the section is not rendered.
  testimonials: {
    title: 'What affiliates say',
    items: []
  },

  faq: {
    title: 'Questions before you join',
    description: 'Can\'t find your answer here? Write to the affiliate team.',
    emailLink: 'Email the affiliate team',
    items: [
      {
        question: 'Does it cost anything to join?',
        answer: 'No. Joining the AFPro affiliate program is free.'
      },
      {
        question: 'Who can join? Do I need a website?',
        answer: 'Bloggers, content creators, agencies, freelancers, and anyone else with an audience can join. You don\'t need a website, and there is no minimum traffic. A social media profile or a list of clients is enough to start.'
      },
      {
        question: 'How is my commission rate decided?',
        answer: 'By the number of valid sales you make in a month. 1 to 10 sales earns 40%, 11 to 50 sales earns 50%, and 51 or more earns 60%. The rate of the tier you reach applies to all of that month\'s valid sales.'
      },
      {
        question: 'How long does the referral cookie last?',
        answer: '30 days. If someone clicks your link and buys within 30 days, the sale counts as yours, even if they leave and come back later.'
      },
      {
        question: 'When and how am I paid?',
        answer: 'Commission is paid monthly in Indonesian Rupiah. Each sale first goes through a 30-day validation period, then its commission is included in the next monthly payout. Payment details are in the affiliate terms.'
      },
      {
        question: 'What counts as a valid sale?',
        answer: 'A purchase made through your link that is not cancelled or refunded during the 30-day validation period. The full rules are in the affiliate terms.'
      },
      {
        question: 'Can I run paid ads on the AFPro brand name?',
        answer: 'The rules for paid ads, including bidding on the AFPro brand name, are in the affiliate terms. Check them before you start a campaign, or email the affiliate team if you are not sure.'
      },
      {
        question: 'How do I track my results?',
        answer: 'In your affiliate dashboard. It shows your clicks, sales, and commission as they come in.'
      },
      {
        question: 'Who do I contact for help?',
        answer: 'The affiliate team. Use the email link in this section and they will reply by email.'
      }
    ],
    termsLink: 'Read the full terms'
  },

  cta: {
    title: 'Your link is one sign-up away',
    description: 'Create a free account, get your link, and start earning commission on the sales you refer.',
    join: 'Join free',
    email: 'Email the affiliate team'
  },

  stickyCta: {
    join: 'Join free'
  },

  footer: {
    terms: 'Terms',
    privacy: 'Privacy',
    contact: 'Contact',
    copyright: '© {year} AFPro'
  }
}
