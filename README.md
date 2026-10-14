# AFPro Affiliate Program landing page

A single prerendered page that shows prospects what they could earn as an AFPro affiliate and sends them to the affiliate portal to sign up. Built with Nuxt 4 and Nuxt UI 4.

- What and why: [`PRD.md`](./PRD.md)
- How it looks: [`DESIGN.md`](./DESIGN.md)
- Working conventions: [`CLAUDE.md`](./CLAUDE.md)

## Setup

```bash
pnpm install
cp .env.example .env   # then fill in the real values
pnpm dev               # http://localhost:3000
```

## Environment variables

| Variable | Used for |
|----------|----------|
| `NUXT_PUBLIC_AFFILIATE_PORTAL_URL` | Base URL for `/register` and `/login` |
| `NUXT_PUBLIC_AFFILIATE_TERMS_URL` | Terms links in the ladder, FAQ, and footer |
| `NUXT_PUBLIC_AFFILIATE_PRIVACY_URL` | Footer privacy link |
| `NUXT_PUBLIC_AFFILIATE_EMAIL` | `mailto:` links in the FAQ, final CTA, and footer |
| `NUXT_SITE_URL` | Canonical URL, absolute OG image URL, sitemap, and robots.txt |

The page is prerendered, so these values are baked into the HTML at build time. Set them before `pnpm build`, and rebuild after changing them.

## Content

All copy, program facts (tiers, rates, cookie, payout schedule), FAQ entries, and testimonials live in [`app/data/landing.ts`](./app/data/landing.ts). The testimonials section stays hidden until that list has real, approved entries.

## Scripts

```bash
pnpm lint        # ESLint, including Tailwind class checks
pnpm typecheck   # vue-tsc
pnpm test        # vitest unit tests (calculator, formatting, portal links)
pnpm build       # build and prerender to .output/
pnpm preview     # serve the build locally
```

## Deploy (Vercel)

1. Import the repository in Vercel. The Nuxt preset is detected automatically, and no build settings need changing.
2. Under Project Settings > Environment Variables, add the five variables above for Production (and Preview, if used).
3. Deploy. `/`, `/sitemap.xml`, and `/robots.txt` are prerendered and served as static files.

The terms and privacy URLs must resolve before launch, because the page asks visitors to sign up.
