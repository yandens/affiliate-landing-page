# DESIGN.md — AFPro Affiliate Landing

Source of truth for how the page looks. Built on **Nuxt UI v4 + Tailwind CSS v4** (`nuxt-ui-templates/starter`). Use Nuxt UI tokens and components first; customize through `nuxt.config.ts`, `app/assets/css/main.css`, and `app/app.config.ts`, not per-component CSS.

This file is the design direction that both the **antislop** and **frontend-design** skills look for. Where either skill's general advice conflicts with this file, this file wins.

```
Dial: ENERGY 2 / RHYTHM 2 / MOTION 1
```

> Reading this as: an affiliate recruitment landing page for bloggers, creators, and agencies (English copy, Rupiah payouts), in a clean "payout statement" visual language, dial ENERGY 2 / RHYTHM 2 / MOTION 1.

---

## 1. Direction

**Subject.** AFPro pays people a cut of every sale they refer. The page has one job: make a prospect see their own number, then sign up.

**Visual world.** Borrowed from what affiliates actually look at after they join: payout statements, transfer receipts, commission ledgers. Clean paper, ink-dark text, one cobalt for action, and a highlighter amber that only ever marks *your money*.

**Signature (the one bold move): the Payout Slip.** The hero's visual is a working earnings estimate styled as a payout receipt: a perforated tear line, ledger rows, and a highlighted monthly total that updates as the visitor drags a slider. It is the thesis of the page, not decoration. Everything else stays quiet so the slip carries the personality.

**What we deliberately avoid** (antislop + frontend-design): gradient or glow backgrounds, radial orbs, dot or grid textures, a pill badge above the H1, a "trusted by" logo bar without real logos, three pricing cards with a "Most popular" middle, uniform icon-card grids, a fake dashboard screenshot with invented numbers, wide-tracked uppercase labels, emoji, and arrows on every button.

**Theme.** Light only. A content-first recruitment page for a broad, mostly non-technical audience has no reason for a dark theme, and dropping it halves the QA surface. Color mode is disabled in `nuxt.config.ts`.

## 2. Voice (UI copy)

All UI copy is **English**, as are ids, hrefs, and code. Money is shown in Rupiah.

- Plain, friendly, professional. Talk to the reader as "you". No marketing filler ("unlock", "supercharge", "seamless", "game-changing").
- Short sentences, active verbs, sentence case everywhere (headings, buttons, labels).
- Honest numbers: "up to", "from", "estimate" whenever a figure is not guaranteed.
- **No em dashes** (`—`) in UI text. Use a period, comma, or colon.
- **No emoji.** No income hype ("guaranteed earnings", "passive income on autopilot").
- Button labels name the action: "Join free", not "Get started →".
- Plain words over jargon where the audience may not be native English speakers: "sales", not "conversions"; "you get paid", not "payout disbursement".

---

## 3. Token System

### 3.1 Named colors

| Name | Value | Role |
|------|-------|------|
| **Ink** | `slate-900` `#0F172A` | Headings, slip text |
| **Paper** | `white` `#FFFFFF` | Page and slip surface |
| **Ledger** | `slate-50` `#F8FAFC` | Alternate section background (`bg-muted`) |
| **Cobalt** | `brand-500` `#3F5AF6` | `primary`: buttons, links, ladder steps, focus |
| **Highlighter** | `amber-300` `#FCD34D` | `secondary`: *only* behind the monthly payout figure and on the active ladder step |
| **Rule** | `slate-200` `#E2E8F0` | Borders, slip tear line |

Active palette: Ink + Paper as the neutral base, Cobalt as the core color, Highlighter as the single accent. The accent appears in exactly two linked places (slip total and active ladder step) because both mean "your earnings". Anywhere else, amber is a bug.

Nuxt UI mapping: `primary → brand`, `secondary → amber`, `neutral → slate`. `success / info / warning / error` keep Nuxt UI defaults (used only if a form error ever appears).

**`brand` scale (Cobalt):**

| 50 | 100 | 200 | 300 | 400 | **500** | 600 | 700 | 800 | 900 | 950 |
|----|-----|-----|-----|-----|---------|-----|-----|-----|-----|-----|
| `#EFF3FF` | `#DCE4FF` | `#BFCDFF` | `#93A9FE` | `#6580FB` | **`#3F5AF6`** | `#2B3EE8` | `#2330C9` | `#222BA2` | `#212A80` | `#161A4B` |

### 3.2 Type

Headings and descriptions use **different families**, by design.

| Role | Family | Weights | Why this face |
|------|--------|---------|---------------|
| **Display** (h1, h2, h3, ladder rates) | **Funnel Display** | 600, 700, 800 | Wide apertures and slightly squared curves give "Pro" confidence without corporate stiffness. Distinct at large sizes, and not one of the default AI roster (Inter, Geist, Space Grotesk). |
| **Text** (descriptions, body, UI, numbers) | **Instrument Sans** | 400, 500, 600 | Compact and highly legible at small sizes, so long Rupiah amounts ("Rp 15.000.000") and ledger rows fit narrow mobile columns. Its quieter shapes let the display face lead. Used for all money figures with `tabular-nums` so the slip total never jitters. |

Both are on Google Fonts and load through `@nuxt/fonts` (bundled with Nuxt UI).

### 3.3 Layout concept

An asymmetric hero (copy left, slip right) with the slip sitting fully inside the hero's `bg-muted` band, so its tear-line notches always cut into the right background. Below that, sections alternate between left-aligned statements and full-width visuals; no two consecutive sections share a composition.

```
Desktop (lg+)
┌───────────────────────────────────────────────────────────┐
│ AFPro  How it works  Commission  Benefits  FAQ  Log in [Join]│
├───────────────────────────────┬───────────────────────────┤
│ H1 (Funnel Display 800)        │ ┌ PAYOUT SLIP ──────────┐ │  #estimate
│ Description (Instrument Sans)  │ │ Sales/month    [===o]  │ │  bg-muted
│ [Join free →]                  │ │ Avg. order     ◉ ○ ○   │ │
│ 40–60% · 30-day cookie · ...   │ ├ ─ ─ ─ tear ─ ─ ─ ─ ─ ─┤ │
│                                │ │ Pro tier · 50%         │ │
│                                │ │ ▇ Rp 7.500.000 /month  │ │
├───────────────────────────────┴─┴────────────────────────┴─┤
│ H2 left-aligned          ▁▁▁▁  ▃▃▃▃  ▇▇▇▇   ladder          │  #commission
├────────────────────────────────────────────────────────────┤
│ H2   ①────────②────────③────────④   horizontal timeline     │  #how-it-works
├────────────────────────────────────────────────────────────┤
│ Lead benefit: one large statement, full width               │  #benefits
│ • item  • item           • item  • item     (2-col list)    │
├──────────────────┬─────────────────────────────────────────┤
│ H2 FAQ (sticky)  │ accordion                                │  #faq
│ email link       │                                          │
├──────────────────┴─────────────────────────────────────────┤
│        Final CTA (solid brand-900 block)                    │  #join
├────────────────────────────────────────────────────────────┤
│ AFPro · Terms · Privacy · Contact                 © 2026    │
└────────────────────────────────────────────────────────────┘
```

---

## 4. Contrast (computed, WCAG 2.x, light only)

| Combination | Ratio | Result |
|-------------|-------|--------|
| White on `brand-500` (primary button) | 5.24 | AA |
| `brand-500` text on white | 5.24 | AA |
| `brand-500` text on `slate-50` | 5.01 | AA |
| `brand-700` on `brand-50` | 8.10 | AAA |
| `slate-900` on `amber-300` (slip total, active step) | 12.38 | AAA |
| White on `brand-900` (Final CTA title) | 12.30 | AAA |
| `brand-200` on `brand-900` (Final CTA description) | 7.84 | AAA |
| `slate-700` (`text-default`) on white | 10.35 | AAA |
| `slate-500` (`text-muted`) on white | 4.76 | AA |
| `slate-500` (`text-muted`) on `slate-50` | 4.55 | AA |
| `slate-400` (`text-dimmed`) on white | 2.56 | **Fails** |

**Rules from this table:**
- Never use `text-dimmed` for readable text. Its 2.56 ratio fails. Disclaimers and footnotes use `text-muted`.
- Amber is a **background** only (with Ink text). Never amber text on white.

---

## 5. Typography Scale

Set the display family on headings once in `main.css` (§9.2). Override Nuxt UI title sizes in `app.config.ts` (§9.3).

| Role | Classes | Family |
|------|---------|--------|
| H1 (hero only) | `text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.03em] text-highlighted text-balance` | Display |
| H2 section | `text-3xl leading-[1.1] sm:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-highlighted text-balance` | Display |
| H3 | `text-xl font-semibold tracking-[-0.01em] text-highlighted` | Display |
| Ladder rate ("50%") | `text-4xl sm:text-5xl font-extrabold tabular-nums` | Display |
| Description / lead | `text-lg sm:text-xl leading-relaxed text-toned text-pretty max-w-[60ch]` | Text |
| Body | `text-base leading-relaxed text-default` | Text |
| Slip total | `text-4xl sm:text-5xl font-semibold tabular-nums tracking-tight text-highlighted` | Text |
| Slip row / label | `text-sm font-medium text-muted` (label), `text-sm font-semibold tabular-nums text-highlighted` (value) | Text |
| Footnote | `text-sm text-muted` | Text |

No uppercase labels with wide tracking. Labels are sentence case.

## 6. Space, Radius, Elevation

| Token | Value | Notes |
|-------|-------|-------|
| `--ui-radius` | `0.375rem` | `rounded-lg` = 0.75rem (buttons, inputs), `rounded-xl` = 1.125rem (Payout Slip), `rounded-2xl` = 1.5rem (Final CTA block). Nothing is pill-shaped except slider thumbs. |
| `--ui-container` | `76rem` | Max content width |
| `--ui-header-height` | `4.25rem` | Sticky header |

- **Vertical rhythm** varies on purpose (RHYTHM 2): hero `pt-16 pb-24 lg:pt-24 lg:pb-32`, commission `py-24 lg:py-32`, how-it-works `py-20`, benefits `py-24`, FAQ `py-24`, Final CTA `py-16` around a contained block. Don't flatten these into one value.
- **Elevation:** flat everywhere (borders, not shadows). Exactly one shadow on the page: the Payout Slip (`shadow-xl shadow-slate-900/5`), because it is the one object that sits "on top of" the page.
- **Breakpoints:** Tailwind defaults. Mobile-first; mandatory checks at **375px**, **768px**, **1280px**.

## 7. Sections → Components

All landing components live in `app/components/landing/` with the `Landing*` prefix (`<LandingHero />`). Content comes from `app/data/landing.ts`. Verify every prop and slot name with the Nuxt UI MCP before use.

| Section | File | Nuxt UI | Composition |
|---------|------|---------|-------------|
| Header | `app.vue` | `UHeader`, `UNavigationMenu`, `UButton` | Wordmark left, nav center, "Log in" (`variant="ghost" color="neutral"`) + "Join free" (`color="primary"`) right. No `UColorModeButton`. Nav hrefs: `#how-it-works`, `#commission`, `#benefits`, `#faq`. |
| Hero `#estimate` | `LandingHero.vue` | `UPageHero` (`orientation="horizontal"`), `UButton` | `bg-muted`. 7/5 column split. Left: H1, description, one primary button with trailing `i-lucide-arrow-right` (the **only** arrow on the page), then a single text line of program facts in `text-sm text-muted`. No headline badge. Right: `<LandingPayoutSlip />`, contained within the hero (no overlap into the next section). |
| Payout Slip | `LandingPayoutSlip.vue` | `UFormField`, `USlider`, `UInputNumber`, `URadioGroup` | Surface `bg-default rounded-xl ring ring-default shadow-xl shadow-slate-900/5 p-6`. **Top:** inputs (sales/month slider + number; order value as `URadioGroup` presets + custom). **Middle:** tear line, `slip-tear` utility (§9.2), spanning the slip's full width. **Bottom:** ledger rows (Tier, Rate, Order value × sales) as label/value pairs with dotted leaders, then the monthly total on an amber highlight (`bg-amber-300 px-2 -mx-2 rounded-md`), then yearly in `text-muted`, then the estimate footnote. Wrap outputs in `aria-live="polite"`. |
| Commission `#commission` | `LandingLadder.vue` | `UPageSection` (heading only), plain markup for the ladder | `bg-default`. Left-aligned H2 + description. Three steps as columns of **increasing height** (`h-24 / h-36 / h-48` on `lg`), each a `rounded-lg` block: tier name, sales range, rate in Display 800. Inactive steps `bg-brand-50 text-brand-700`; active step (from calculator state) `bg-amber-300 text-slate-900`. On mobile, stack as rows with increasing width. Small print below with terms link. |
| How It Works `#how-it-works` | `LandingSteps.vue` | `UPageSection`, `UTimeline` | `bg-default` with `border-t border-default`. Horizontal `UTimeline` on `lg`, vertical below. Numbers are real order, so number markers are allowed. Secondary button "Join now" (`variant="outline"`, no arrow). |
| Benefits `#benefits` | `LandingBenefits.vue` | `UPageSection`, `UIcon` | `bg-muted`. Lead benefit as one large statement (H3 in Display at `text-2xl sm:text-3xl`, max 2 lines) with a one-line explanation. Then a 2-column list (`sm:grid-cols-2`) of the remaining benefits: icon + one sentence each, no cards, no borders. |
| Testimonials `#testimonials` | `LandingTestimonials.vue` | `UPageSection`, `UPageColumns`, `UPageCard` (`variant="ghost"`), `UUser` | Only rendered when real data exists. Quote first, person second. |
| FAQ `#faq` | `LandingFaq.vue` | `UPageSection`, `UAccordion` | `bg-default`. Two columns on `lg` (`4 / 8`): left is H2 + one line + `mailto` link, `lg:sticky lg:top-[calc(var(--ui-header-height)+2rem)]`; right is `UAccordion type="single" collapsible`. Terms link under the accordion. |
| Final CTA `#join` | `LandingCta.vue` | `UPageCTA` (`variant="solid"`) | Contained `rounded-2xl` block, override root to `bg-brand-900` (documented raw-color exception). Title white, description `text-brand-200`. Primary button as a white button (`class="bg-white text-brand-900 hover:bg-brand-50"`, documented exception), secondary `mailto` link `variant="link"` in `text-white`. No pattern, no glow. |
| Mobile sticky CTA | `LandingStickyCta.vue` | `UButton block size="xl"` | `fixed inset-x-0 bottom-0 z-40 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] bg-default border-t border-default lg:hidden`. Slides in with `translate-y` (functional motion). |
| Footer | `app.vue` | `UFooter` | One row: wordmark left, links (Terms, Privacy, Contact) center, © right. Stacks on mobile. |

## 8. Icons, Imagery, Motion

**Icons.** Lucide (`i-lucide-*`), because Nuxt UI's own components (chevrons, close, accordion) already use Lucide, and a second library would mismatch stroke weight. Icons appear in only two places: the benefits list and the hero CTA arrow. Each icon is chosen for literal meaning:

| Benefit | Icon |
|---------|------|
| 30-day cookie | `i-lucide-calendar-clock` |
| Rate grows with sales | `i-lucide-trending-up` |
| Real-time dashboard | `i-lucide-chart-line` |
| Links and coupon codes | `i-lucide-link` |
| Free, no minimum traffic | `i-lucide-badge-check` |
| Affiliate team by email | `i-lucide-mail` |

No sparkle, rocket, lightning, or robot icons.

**Imagery.** None by default. The Payout Slip and the ladder are the visuals. No stock photos, no illustrations, no fake dashboard screenshots. Testimonial avatars only if real.

**Motion (MOTION 1).**
- Hover and focus color transitions, 150ms `ease-out`.
- Smooth anchor scrolling (off under `prefers-reduced-motion`).
- Sticky CTA slide in/out (functional).
- Slip numbers change instantly. No count-up, no scroll reveals, no floating or looping elements.

## 9. Implementation (copy-paste)

### 9.1 `nuxt.config.ts` (additions)

```ts
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui'],

  css: ['~/assets/css/main.css'],

  ui: {
    colorMode: false
  },

  fonts: {
    families: [
      { name: 'Funnel Display', provider: 'google', weights: [600, 700, 800] },
      { name: 'Instrument Sans', provider: 'google', weights: [400, 500, 600] }
    ]
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' }
    }
  }

  // keep the starter's devtools, routeRules, compatibilityDate, eslint blocks
})
```

### 9.2 `app/assets/css/main.css`

```css
@import "tailwindcss";
@import "@nuxt/ui";

@theme static {
  --font-sans: 'Instrument Sans', ui-sans-serif, system-ui, sans-serif;
  --font-display: 'Funnel Display', 'Instrument Sans', ui-sans-serif, sans-serif;

  --color-brand-50: #EFF3FF;
  --color-brand-100: #DCE4FF;
  --color-brand-200: #BFCDFF;
  --color-brand-300: #93A9FE;
  --color-brand-400: #6580FB;
  --color-brand-500: #3F5AF6;
  --color-brand-600: #2B3EE8;
  --color-brand-700: #2330C9;
  --color-brand-800: #222BA2;
  --color-brand-900: #212A80;
  --color-brand-950: #161A4B;
}

:root {
  --ui-radius: 0.375rem;
  --ui-container: 76rem;
  --ui-header-height: 4.25rem;
}

@layer base {
  h1, h2, h3 {
    font-family: var(--font-display);
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: calc(var(--ui-header-height) + 1rem);
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
  }
}

/* Payout Slip tear line: dashed rule with two half-circle notches cut into the slip edges.
   The element must span the slip's full width (negative margin equal to the slip padding). */
@utility slip-tear {
  position: relative;
  border-top: 2px dashed var(--ui-border-accented);

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -0.75rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 9999px;
    background: var(--ui-bg-muted);
  }

  &::before { left: -0.75rem; }
  &::after { right: -0.75rem; }
}
```

The notch color is `--ui-bg-muted` because the slip sits on the `bg-muted` hero. If the hero background changes, change this too.

### 9.3 `app/app.config.ts`

```ts
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
```

Slot names match Nuxt UI v4. Confirm with `get-component-metadata` before adding more.

### 9.4 Verify after applying

- Both fonts load (DevTools → Network → font). H1/H2/H3 render in Funnel Display; descriptions and body in Instrument Sans.
- Digits in the slip total stay aligned while dragging the slider. If they shift, `tabular-nums` isn't taking effect for the loaded font file: inspect computed `font-variant-numeric`.
- `<html>` has no `dark` class and no color-mode script in the page source.

## 10. Review Checklist (per PR)

Run alongside the antislop UI checklist and Delivery Gate.

- [ ] 375 / 768 / 1280px with no horizontal scroll
- [ ] Headings in Funnel Display, everything else in Instrument Sans
- [ ] Amber appears only on the slip total and the active ladder step
- [ ] One shadow on the page (the slip); one arrow on the page (hero CTA)
- [ ] One solid `primary` button per viewport
- [ ] No raw colors outside the exceptions documented in §7
- [ ] No em dashes or emoji in UI copy
- [ ] Every nav href points to a section that renders
- [ ] Focus visible on every interactive element; slider operable by keyboard
- [ ] Reduced motion turns off smooth scrolling
