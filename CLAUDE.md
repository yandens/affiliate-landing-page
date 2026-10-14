# CLAUDE.md

Guide for Claude (and developers) working in this repo. Read this file first, then `PRD.md` (what we're building) and `DESIGN.md` (how it looks).

## Project Summary

A **single-page** landing page for the **AFPro Affiliate Program**. Its job is to show prospects what they could earn and send them to an external sign-up portal (`{PORTAL_URL}`). No backend, auth, analytics, or database. All content is static and the page is prerendered. Light theme only.

- What & why → `PRD.md`
- Direction, tokens, components, visual rules → `DESIGN.md`
- **Language: English everywhere.** Visible UI copy, nav labels, buttons, FAQ, SEO metadata, section `id`s, anchor hrefs (`#how-it-works`, `#commission`, `#benefits`, `#faq`, `#join`), URL paths, code, comments, commit messages.
- **Currency:** Indonesian Rupiah (IDR), formatted with `formatIDR()`.

## Stack

Built from [`nuxt-ui-templates/starter`](https://github.com/nuxt-ui-templates/starter).

| | Version |
|---|---|
| Nuxt | 4.x (`app/` as srcDir) |
| Nuxt UI | 4.x (bundles `@nuxt/icon`, `@nuxt/fonts`; color mode **disabled**) |
| Tailwind CSS | 4.x (configured via CSS `@theme`; there is **no** `tailwind.config.*`) |
| TypeScript | strict, checked with `vue-tsc` |
| Fonts | Funnel Display (headings) + Instrument Sans (text), via `@nuxt/fonts` |
| Icons | `@iconify-json/lucide` |
| Lint | `@nuxt/eslint` + `eslint-plugin-better-tailwindcss` |
| Package manager | **pnpm** (don't use npm/yarn, don't create `package-lock.json`) |

## Commands

```bash
pnpm install        # install + nuxt prepare
pnpm dev            # http://localhost:3000
pnpm lint           # ESLint (includes Tailwind class validation)
pnpm lint --fix
pnpm typecheck      # vue-tsc
pnpm test           # vitest (added in M2)
pnpm build          # build + prerender
pnpm preview        # preview the build
```

## Target Structure

```
app/
├── app.vue                     # UApp + UHeader + UMain + UFooter, global SEO
├── app.config.ts               # Nuxt UI colors & title overrides (DESIGN.md §9.3)
├── assets/css/main.css         # @theme, fonts, tokens, slip-tear utility (DESIGN.md §9.2)
├── pages/index.vue             # ONLY composes Landing* components in order
├── components/
│   ├── AppLogo.vue             # AFPro wordmark (text in Funnel Display)
│   └── landing/
│       ├── LandingHero.vue
│       ├── LandingPayoutSlip.vue
│       ├── LandingLadder.vue
│       ├── LandingSteps.vue
│       ├── LandingBenefits.vue
│       ├── LandingTestimonials.vue   # renders only with real data
│       ├── LandingFaq.vue
│       ├── LandingCta.vue
│       └── LandingStickyCta.vue
├── composables/
│   ├── useCommissionCalculator.ts    # shared state for Payout Slip + Ladder
│   └── usePortalLink.ts              # portal URLs + UTM/ref passthrough
├── utils/
│   └── format.ts                     # formatIDR()
├── data/
│   └── landing.ts                    # ALL copy, program facts, FAQ, testimonials (typed)
└── types/
    └── landing.ts
public/                               # favicon, og-image.png
test/                                 # vitest unit tests
```

## Skills

This project is built with two Claude Code skills. Install them once per machine:

```text
# antislop (filters generic AI patterns in UI, copy, a11y, mobile layout)
/plugin marketplace add https://github.com/miqdadbadjuber/anti-slop
/plugin install antislop@anti-slop

# frontend-design (Anthropic's design-direction skill)
/plugin marketplace add anthropics/claude-code
/plugin install frontend-design@claude-code-plugins
```

How to use them here:

- **antislop mode: `during`.** Apply the rules while building, not as an after-the-fact audit. The installer may append its own `<!-- antislop:start -->` block to the end of this file; leave that block as-is.
- **Direction already exists.** `DESIGN.md` is the brief both skills ask for, including the dial line (`ENERGY 2 / RHYTHM 2 / MOTION 1`) and the signature element (the Payout Slip). Don't re-brainstorm a new direction, palette, or font pairing.
- **Precedence:** `DESIGN.md` → `PRD.md` → antislop → frontend-design. If a skill suggests something `DESIGN.md` already decided (e.g. "take one aesthetic risk"), the decision in `DESIGN.md` is that risk; don't add another.
- Use antislop's skills by concern: `antislop-ui` for components and layout, `antislop-copywriting` for anything in `app/data/landing.ts`, `antislop-human` for contrast/keyboard/focus, `antislop-layoutmobile` for breakpoints, `antislop-code` for comments.

## Conventions

### Components & Nuxt UI
- **Nuxt UI components first.** The per-section mapping is in `DESIGN.md §7`. Only the Commission Ladder and the Payout Slip internals are custom markup.
- Styling order of preference: **component props** → **`:ui` prop** → **`app.config.ts`** (when global) → Tailwind classes. Custom CSS only via `@utility` in `main.css`, with a comment explaining why.
- Don't guess prop or slot names. Verify via the Nuxt UI MCP (below) or `https://ui.nuxt.com/docs/components/<name>`.
- `<script setup lang="ts">` for every SFC. Typed props via `defineProps<...>()`.
- One section = one component. Components take data via props or import from `~/data/landing`. **No copy strings in templates.**

### Theme & styling
- **Light only.** `ui.colorMode` is `false` in `nuxt.config.ts`. Never add `dark:` variants, `UColorModeButton`, or `useColorMode()`.
- Use semantic tokens (`text-highlighted`, `text-default`, `text-toned`, `text-muted`, `bg-default`, `bg-muted`, `border-default`, `text-primary`). No `text-slate-500` or `bg-white`, except the raw-color exceptions listed in `DESIGN.md §7`.
- **Never `text-dimmed` for readable text** (fails contrast, see `DESIGN.md §4`).
- Amber (`secondary`) appears only on the slip total and the active ladder step.
- Headings use the display family automatically (`h1–h3` base rule). Don't apply `font-display` to body text.
- Money and percentages: `tabular-nums`, formatted only through `formatIDR()` (`Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })`).

### Content & configuration
- Portal URL, terms URL, privacy URL, affiliate email → `runtimeConfig.public` in `nuxt.config.ts`, set via `NUXT_PUBLIC_*` env vars. Never hardcode them in components.
- Every sign-up/log-in link is built with `usePortalLink(path)` so `utm_*` and `ref` params pass through.
- Program facts (tiers, rates, cookie, payout schedule) are fixed in `PRD.md §6`. Copy them into `app/data/landing.ts` exactly.
- No fabricated content: no invented testimonials, statistics, user counts, or logos. `testimonials: []` means the section doesn't render.
- UI copy (English): no em dashes, no emoji, sentence case, plain words, honest numbers ("up to", "estimate"). Voice rules in `DESIGN.md §2`.
- Don't copy text, images, or assets from hostinger.com (content reference only).

### Code style (enforced by ESLint)
- No semicolons, single quotes, **no trailing commas** (`commaDangle: 'never'`), `1tbs` brace style, 2-space indent.
- Run `pnpm lint --fix` before considering work done.

### Dependencies
- Allowed **without asking**: `vitest`, `@nuxt/test-utils`, `@vue/test-utils`, `happy-dom` (testing), `@nuxtjs/sitemap`, `@nuxtjs/robots` (SEO).
- Anything else (animation libraries, other UI kits, analytics SDKs, CMS) → **ask first**.
- Never install another component library alongside Nuxt UI.

## Workflow

1. Work milestone by milestone per `PRD.md §11` (M1 → M5). One milestone = one or a few small, clean commits.
2. M1 starter cleanup:
   - Delete `app/components/TemplateMenu.vue` and its usage in `app.vue`.
   - Remove `UColorModeButton` and the starter's GitHub buttons from header and footer.
   - Replace `AppLogo.vue` with an "AFPro" text wordmark.
   - Apply `nuxt.config.ts`, `main.css`, and `app.config.ts` from `DESIGN.md §9`.
   - Keep `lang: 'en'`, declared in one place only (`nuxt.config.ts` per `DESIGN.md §9.1`; remove the duplicate from `app.vue`'s `useHead`).
   - Update `title`, `description`, and OG tags for AFPro.
3. Before saying "done", run the **Definition of Done** below.
4. If something in `PRD.md` and `DESIGN.md` disagrees, or a requirement is unclear, **ask** instead of picking.

## Definition of Done

- [ ] `pnpm lint` and `pnpm typecheck` clean, `pnpm test` green
- [ ] `pnpm build` succeeds and `/` is prerendered
- [ ] Checked at 375 / 768 / 1280px, no horizontal scroll
- [ ] Keyboard navigation works, focus visible, exactly one `h1`
- [ ] Every anchor href is English and resolves to a rendered section
- [ ] No copy strings in templates; no hardcoded portal URLs
- [ ] No `dark:` classes or color-mode code anywhere
- [ ] `DESIGN.md §10` checklist and the antislop UI checklist pass

## Nuxt UI MCP (recommended)

```bash
claude mcp add --transport http nuxt-ui https://ui.nuxt.com/mcp
```

Tools: `search-components`, `get-component`, `get-component-metadata` (props/slots/ui keys), `get-example`, `search-icons`. Use it before using any component not yet used in this repo.

## Environment Variables

| Variable | Used for |
|----------|----------|
| `NUXT_PUBLIC_AFFILIATE_PORTAL_URL` | Base URL for `/register` and `/login` (`{PORTAL_URL}`) |
| `NUXT_PUBLIC_AFFILIATE_TERMS_URL` | Terms link in ladder small print, FAQ, footer |
| `NUXT_PUBLIC_AFFILIATE_PRIVACY_URL` | Footer privacy link |
| `NUXT_PUBLIC_AFFILIATE_EMAIL` | `mailto:` links in FAQ and Final CTA |
