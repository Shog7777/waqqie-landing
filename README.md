# Waqqie landing page

[![CI](https://github.com/Shog7777/waqqie-landing/actions/workflows/ci.yml/badge.svg)](https://github.com/Shog7777/waqqie-landing/actions/workflows/ci.yml)

A landing page for Waqqie, an Arabic e-signature app. The whole interface is in
Arabic and runs right to left, and the colors and typography come from the
brand's official identity guide.

Live: https://waqqie-landing.vercel.app

## Running it

You need Node 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Available scripts:

```
npm run dev        dev server
npm run build      production build
npm run start      serve the production build
npm run lint       ESLint
npm run typecheck  TypeScript
npm test           unit tests
npm run test:e2e   browser tests
npm run verify     all four, same as CI
```

## Stack

**Next.js 16** with the App Router. Everything is static and generated at build
time, including the social share image and the site icons.

**shadcn/ui** on top of Radix, set up with the RTL option. The components live
inside the repo rather than coming from a package, so I could restyle them
completely with the brand colors.

**Tailwind CSS v4.** The brand tokens are CSS variables declared inside
`@theme`, which turns them into real utilities like `bg-ink` and `text-gold`.

**lucide-react** for icons, TypeScript in strict mode, ESLint.

**Vitest, Playwright and axe-core** for tests.

There is no animation library. Scroll reveals are plain CSS transitions driven
by one shared `IntersectionObserver`, which saved a good chunk of JavaScript.

There are no raster images either. Icons, phone mockups, signatures and
background patterns are all SVG and CSS, so they stay sharp at any resolution.

## Brand tokens

Every brand color is declared once, in
[`src/app/globals.css`](src/app/globals.css), and then mapped onto the shadcn
tokens so all the components inherit the identity automatically:

```css
--wq-ink:      #0F4C5C;  /* main background */
--wq-card:     #163E48;  /* cards and surfaces */
--wq-gold:     #D4A24E;  /* accent */
--wq-ivory:    #FAF8F4;  /* text */
--wq-whatsapp: #25D366;  /* WhatsApp button only */
```

The guide also comes with rules, not just colors. The ones I followed: a 60/30/10
split between background, surfaces and gold; green is not allowed anywhere
outside the WhatsApp context; no pure white, Warm Ivory instead; corner radius
between 8 and 12 pixels. There is also a calligraphic accent font that the guide
says must appear exactly once in the whole product, so it shows up only in the
success screen mockup.

That last rule is why the store badges are monochrome. The official Google Play
badge is green, and green is reserved.

### Fonts

The guide specifies 29LT Azat for headings. It's a commercial font and there is
no web license for it here, so headings use IBM Plex Sans Arabic at weight 700,
which is already part of the same type system. If the license ever shows up,
swapping it back is one line in [`layout.tsx`](src/app/layout.tsx).

## Project structure

```
.github/workflows/ci.yml   checks that run on every push
e2e/                       Playwright tests
src/
  app/                     layout, page, OG image, robots, sitemap, 404
  components/
    brand/                 logo, patterns, phone frame, app screens, date stamp
    site/                  page sections
    motion/                scroll reveal wrapper
    ui/                    shadcn/ui components
  hooks/                   active section tracking in the header
  lib/                     copy, number and date formatting, deployment URL
```

All the Arabic copy lives in [`src/lib/content.ts`](src/lib/content.ts), so
changing a sentence never means opening a component.

## A few details worth pointing out

The phone mockups are five full app screens (home, scanner, signing pad, date
stamp, success) built with HTML and CSS.

The date stamp in the features section is actually interactive. You can switch
between the Hijri and Gregorian calendars and between Eastern and Western Arabic
numerals, and the stamp updates as you do. The sample date is a fixed constant
rather than `new Date()`, because the page is rendered on the server first and a
live date would produce a hydration mismatch.

RTL support is built on logical properties (`start`, `end`, `ps`, `pe`) instead
of hardcoded left and right, plus Embla's direction option for the carousel, a
`DirectionProvider` for the Radix components, and bidi isolation for numbers and
timestamps sitting inside Arabic sentences.

## Tests

```bash
npm run verify
```

67 tests run on every push through GitHub Actions. 17 of them are Vitest unit
tests covering numeral conversion, stamp formatting and how the deployment URL
is resolved. The other 50 are Playwright browser tests running on both a desktop
and a mobile viewport.

The browser tests run against the production build rather than the dev server,
since static generation, bundle splitting and OG image generation don't happen in
`next dev` at all.

What they cover: an `axe-core` accessibility scan against WCAG 2.1 A and AA on
the home page, the 404 page and the open mobile menu; the behaviour of the date
stamp, the carousel, the accordion and the sticky mobile CTA; no horizontal
overflow at five widths from 320px to 1440px; and that the absolute URLs and the
share image actually resolve.

Writing these after the page was finished turned up three real bugs, which is
mostly why they're here.

## Performance and accessibility

The `axe-core` scan reports zero violations, and CI fails if that changes.

Lighthouse against the live deployment: accessibility, best practices and SEO all
hit 100 on both mobile and desktop. Performance sits between 99 and 100 on
desktop. On mobile it moves around between 72 and 96 depending on how busy the
machine running the audit is, since the score leans heavily on TBT and TBT
measures the main thread of the auditing machine. If you want a number that
doesn't depend on my laptop,
[PageSpeed Insights](https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fwaqqie-landing.vercel.app)
runs it from Google's servers.

The numbers that stayed the same across every run: LCP between 2.6 and 3.0
seconds on mobile and 0.7 on desktop, and CLS of zero.

## Deployment

Deployed on Vercel by connecting the repo, with the default Next.js settings and
no environment variables.

The absolute URLs (canonical, OG image, sitemap) are derived at build time from
`VERCEL_PROJECT_PRODUCTION_URL` through [`getBaseUrl`](src/lib/site-url.ts). The
brand domain `waqqie.sa` isn't live yet, and hardcoding it into the metadata was
producing a broken preview when the link was shared. Once the real domain is
running, setting `NEXT_PUBLIC_SITE_URL` is enough.

## A note on the content

Waqqie hasn't launched, so there are no invented download counts or store
ratings anywhere on the page. The trust section shows product characteristics
documented in the product brief instead. The testimonials are illustrative
personas representing the target user groups, and the page footer says so. Store
links, privacy policy and terms are placeholders waiting for the real ones.

## Sources

The product brief, the assignment document, and the Waqqie brand identity guide
v1.0 (2026).
