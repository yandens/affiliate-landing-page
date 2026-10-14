# PRD — AFPro Affiliate Program Landing Page

> **Status:** v2 · **Date:** Oct 14, 2026
> **Scope:** a single landing page. Not the affiliate dashboard, not a tracking system.
> **Structural reference:** Hostinger's affiliate program page (hostinger.com/id/afiliasi). We borrow the **content it covers** (how it works, commission, benefits, FAQ), not its layout, copy, colors, or assets.

**Language:** the whole site is **English**: visible copy, nav labels, buttons, FAQ, metadata, and everything machine-facing (section ids, anchor links, URL paths, query params, file and component names). Copy examples below show intent; final copy lives in `app/data/landing.ts`. Money stays in **Indonesian Rupiah (IDR)**, the currency AFPro pays out in.

---

## 1. Background

AFPro wants more affiliates (bloggers, content creators, agencies, freelancers) promoting its products on a per-sale commission. There is no page that explains the program, so prospects have nowhere to learn how it works, what they can earn, or how to join.

Registration and the affiliate dashboard live on a separate platform (`{PORTAL_URL}`). This page's single job: **show prospects what they could earn, and send them to sign up.**

## 2. Goals

1. A visitor understands what they could earn within the first screen, without scrolling.
2. A visitor can answer their own questions (cookie, payouts, eligibility) without leaving the page.
3. The page is fast and findable: Lighthouse Performance, Accessibility, SEO, and Best Practices ≥ 95 on mobile.

## 3. Non-Goals

- Sign-up form, login, or affiliate dashboard (all at `{PORTAL_URL}`).
- Backend, database, API, commission tracking.
- Analytics integration.
- CMS. Content is a typed TypeScript data file in the repo.
- Media kit / promo asset gallery.
- Dark mode. The site is light-only.
- Multi-language in v1 (data shape should make adding i18n easy later).

## 4. Target Users

| Persona | Primary need | Objection to answer |
|---------|--------------|---------------------|
| **Blogger / website owner** | High commission, reliable tracking | "How long is the cookie? When do I get paid?" |
| **Content creator** (YouTube, TikTok, IG) | Something easy to share with their audience | "My audience isn't technical. Will they buy?" |
| **Agency / freelancer** | Extra income from clients they already serve | "Is there a sales minimum? Is it complicated?" |
| **Beginner** | Simple explanation, free to join | "I have no traffic yet. Can I still join?" |

## 5. User Stories

1. As a prospect, I want to **see my potential earnings** in the first screen, so I can decide whether to keep reading.
2. As a prospect, I want to know **how the commission rate grows** with my sales.
3. As a prospect, I want a clear **sign-up process**, so I know the effort is small.
4. As a prospect, I want answers to common questions **without leaving the page**.
5. As a mobile visitor, I want the sign-up button **always within reach**.

## 6. Program Facts (content source of truth)

These values go into `app/data/landing.ts` as-is. They are the program's settings; the page only displays them.

| Fact | Value |
|------|-------|
| Commission tiers | **Starter** 1–10 valid sales/month: **40%** · **Pro** 11–50: **50%** · **Elite** 51+: **60%** |
| Cookie duration | 30 days |
| Payout schedule | Monthly, after a 30-day validation period |
| Cost to join | Free |
| Minimum traffic | None |

## 7. Page Structure

Sections render in this order. Each has an English `id` used for anchor links. The order follows the prospect's questions (*what can I earn → how does the rate grow → how do I start → why trust it → what else should I know*), not a template. Visual composition per section is in `DESIGN.md §7`.

| # | Section | `id` | In nav |
|---|---------|------|--------|
| 7.0 | Header | — | — |
| 7.1 | Hero + Payout Slip | `#estimate` | No |
| 7.2 | Commission Ladder | `#commission` | Yes |
| 7.3 | How It Works | `#how-it-works` | Yes |
| 7.4 | Benefits | `#benefits` | Yes |
| 7.5 | Testimonials (conditional) | `#testimonials` | No |
| 7.6 | FAQ | `#faq` | Yes |
| 7.7 | Final CTA | `#join` | No |
| 7.8 | Footer | — | — |

### 7.0 Header (sticky)
- AFPro wordmark (links to `/`).
- Anchor nav: How it works → `#how-it-works`, Commission → `#commission`, Benefits → `#benefits`, FAQ → `#faq`.
- Right side: ghost **Log in** → `{PORTAL_URL}/login`, solid **Join free** → `{PORTAL_URL}/register`.
- No color mode toggle.
- Mobile: nav collapses into the `UHeader` menu; **Join free** stays visible in the bar.

### 7.1 Hero + Payout Slip (`#estimate`)
The hero answers "what could I earn?" directly instead of describing it.

- **Left:** H1 (≤ 8 words, intent: _"Earn up to 60% on every sale you refer"_), description (≤ 25 words: free to join, no minimum traffic, paid monthly), one primary CTA **Join free** → `{PORTAL_URL}/register`, and one plain line of program facts below it (_40% to 60% commission · 30-day cookie · paid monthly_).
- **Right (below on mobile): the Payout Slip**, an interactive earnings estimate styled as a payout receipt:
  - Input 1: valid sales per month. Slider 1–200 plus a number input. Default 20.
  - Input 2: average order value. Three presets (Rp 300k / Rp 750k / Rp 1.5M) plus custom. Default Rp 750k.
  - Output lines: applicable tier and rate (derived from sales volume, §6), monthly estimate, yearly estimate.
  - Footer note intent: _"Estimate only. Actual commission depends on valid sales."_
  - Updates live as inputs change. No submit button. No network requests.
- No badge or pill above the H1.

### 7.2 Commission Ladder (`#commission`)
- Title intent: _"Your rate climbs with your sales."_
- One visual: a three-step ladder from Starter → Pro → Elite showing the sales range and rate for each, rising left to right. Not three pricing cards.
- The step that matches the Payout Slip's current input is highlighted, so the ladder and the slip read as one system. With no interaction it highlights the default (20 sales → Pro).
- Small print: what counts as a valid sale, the 30-day validation period, link to `{TERMS_URL}`.

### 7.3 How It Works (`#how-it-works`)
The real process has four ordered steps, so they are numbered:
1. **Join free.** Create an account in under a minute and get dashboard access.
2. **Share your link.** Put your unique link in posts, videos, bios, or client sites.
3. **Track results.** See clicks, sales, and commission in your dashboard.
4. **Get paid.** Commission is paid monthly after validation.

Followed by a secondary CTA **Join now**.

### 7.4 Benefits (`#benefits`)
Not a uniform card grid. One lead benefit gets a full-width statement; the rest are a compact list.
- **Lead:** 30-day cookie. A buyer who returns within 30 days still counts as your sale.
- **List:** rate grows automatically with sales · real-time dashboard · ready-to-use links and coupon codes · free to join, no minimum traffic · affiliate team reachable by email.

### 7.5 Testimonials (`#testimonials`) — conditional
- Rendered **only** when `testimonials` in the data file contains real, permitted entries. If the array is empty, the section and every reference to it are omitted. No placeholder testimonials ship.
- Each entry: quote (≤ 40 words), name, role or site, optional avatar.

### 7.6 FAQ (`#faq`)
Accordion, one open at a time. Questions:
1. Does it cost anything to join?
2. Who can join? Do I need a website?
3. How is my commission rate decided?
4. How long does the referral cookie last?
5. When and how am I paid?
6. What counts as a valid sale?
7. Can I run paid ads on the AFPro brand name?
8. How do I track my results?
9. Who do I contact for help?

Answers come from §6 and the terms. A link below the accordion: **Read the full terms** → `{TERMS_URL}`. The FAQ is also emitted as `FAQPage` JSON-LD.

### 7.7 Final CTA (`#join`)
Solid brand block. Title intent: _"Your link is one sign-up away."_ Primary **Join free** + secondary **Email the affiliate team** (`mailto:{AFFILIATE_EMAIL}`).

### 7.8 Footer
One compact row: AFPro wordmark, links (Terms, Privacy, Contact), © current year. No multi-column sitemap; there is only one page.

## 8. Functional Requirements

| ID | Requirement |
|----|-------------|
| F1 | Every sign-up/log-in link is built from `runtimeConfig.public.affiliatePortalUrl`, never hardcoded. |
| F2 | Outbound portal links pass through any `utm_*` and `ref` query params from the current page URL. |
| F3 | Anchor links smooth-scroll with header offset and update the URL hash. Every nav item resolves to a section that exists. |
| F4 | Payout Slip math lives in `useCommissionCalculator()` and is unit-tested: tier boundaries (10/11, 50/51), rounding, Rupiah formatting, custom order value bounds. |
| F5 | The Commission Ladder reads the same calculator state as the Payout Slip (shared composable state), so the highlighted tier always matches. |
| F6 | Mobile (< `lg`): a **Join free** bar sticks to the bottom after the user scrolls past the hero, and hides while `#join` is in view. |
| F7 | `#testimonials` renders only when real testimonial data exists (§7.5). |

## 9. Non-Functional Requirements

- **Rendering:** fully prerendered (SSG). The starter already sets `routeRules: { '/': { prerender: true } }`.
- **Theme:** light only. Nuxt UI color mode disabled in `nuxt.config.ts` (`ui.colorMode: false`).
- **Performance:** LCP < 2.0s on 4G, CLS < 0.05, page JS < 150 KB gzipped. Explicit dimensions on every image.
- **Accessibility:** WCAG 2.2 AA (contrast validated in `DESIGN.md §4`). Fully keyboard-operable; slider has a visible label and a spoken value; Payout Slip output in an `aria-live="polite"` region; one `h1`.
- **SEO:** `<html lang="en">`, title ≤ 60 chars, description ≤ 155 chars, 1200×630 OG image, canonical URL, `Organization` + `FAQPage` JSON-LD, sitemap and robots.
- **Browsers:** last 2 versions of Chrome, Safari (iOS), Firefox, Edge, Samsung Internet.
- **Legal:** `{TERMS_URL}` and `{PRIVACY_URL}` must resolve before launch, because the page asks people to sign up.

## 10. Content Rules

- All copy, program facts, FAQ, and testimonials live in `app/data/landing.ts` (typed). Components contain no copy.
- No fabricated content: no invented testimonials, statistics, user counts, or partner logos.
- UI copy follows the antislop copywriting rules: no em dashes, no emoji, no hype claims ("guaranteed income").

## 11. Milestones

| Phase | Output | Estimate |
|-------|--------|----------|
| M1 | Design system (fonts, colors, light-only), starter cleanup, header and footer | 0.5 day |
| M2 | Hero + Payout Slip with calculator composable and unit tests | 1 day |
| M3 | Commission Ladder, How It Works, Benefits, FAQ, Final CTA | 1 day |
| M4 | Mobile sticky CTA, UTM passthrough, SEO (meta, OG, JSON-LD, sitemap), Lighthouse and a11y pass | 0.5 day |
| M5 | Final copy pass, cross-device QA, deploy | 0.5 day |
