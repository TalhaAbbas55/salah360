# Salah360 — landing page

The public marketing site for Salah360, in English and Urdu. Frontend only: Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Motion and Lucide. No backend of its own: almost every page is prerendered as static HTML, and the two things that need a server (the contact form, the admin verification page) are handed on to the Salah360 backend.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Structure

```
src/
  app/
    (en)/              English routes: /, /features, /for-masjids, /about, /privacy,
                        /contact, /terms, plus the English root layout (metadata,
                        <html lang="en" dir="ltr">)
    (ur)/
      ur/               Urdu routes: /ur, /ur/features, /ur/for-masjids, /ur/about, …
      layout.tsx        Urdu root layout (metadata, <html lang="ur" dir="rtl">)
    icon.svg, apple-icon, robots, sitemap, manifest, favicon   shared by both languages
    opengraph-en.png/    the English social-preview image, rendered at build time — see "SEO" below
  components/
    home-page.tsx        the home page (two sections), rendered by both languages
    root-shell.tsx        the shared <html>/<body> (fonts, theme script, providers), rendered
                          by each language's own root layout — see "Two languages" below
    layout/               navbar, mobile menu, language menu, theme toggle, logo, footer,
                          and the two page shells (site-page, simple-page)
    pages/                shared content for every route but the home page (each language's
                          page.tsx supplies its own metadata, then renders these)
    sections/              one file per page section (hero, purpose, story, …, final-cta)
    store/                 the Google Play and App Store badges, and the "coming soon" dialog
    visuals/               illustrations and mockups (globe, orbit, dashboard, maps, patterns)
    ui/                    small shared pieces (ButtonLink, SectionHeading, Reveal, Badge…)
    seo/                   JsonLd, which renders structured data into the page
    providers/             theme and Motion providers (client)
  content/               page copy and sample data — each file exports a getX(lang) function
                        returning that language's strings, not raw constants (see below)
  lib/
    i18n/lang.ts          the Lang type ('en' | 'ur') and the /ur URL-prefix helpers
    site-config.ts         site facts, per-language SITE_COPY, and ctaLinks(lang)
    seo/                   rootMetadata/pageMetadata (titles, canonical, hreflang, social
                          previews) and the home page's schema.org structured data
    theme/, globe/, geo/    theme script, globe math/renderer, geo data (language-agnostic)
  hooks/                 client hooks for the navbar
scripts/generate-geo-data.mjs   builds src/lib/geo/land-points.ts and public/world-dots.svg
scripts/generate-icons.mjs      builds public/icon-*.png and public/logo.png from the brand mark
public/opengraph-ur.png         static Urdu social-preview image — see "Two languages" below
```

Most of the site is Server Components. Only interactive or animated parts are client components: navbar, menus, providers, `Reveal`, the globe, the prayer timeline and the App Store badge.

## Pages

The site is several short pages, not one long one. Each main page is a list of sections inside the `SitePage` shell (`components/layout/site-page.tsx`: full navbar, sections, footer):

| Page | Sections, in order |
| --- | --- |
| `/` (`components/home-page.tsx`) | `Hero`, `Purpose` |
| `/features` | `Features`, `PrayerExperience`, `Travel`, `Community`, `HowItWorks` (for Muslims), `FinalCta` |
| `/for-masjids` | `ForMasjids`, `HowItWorks` (for admins), `Verification`, `FinalCta` |
| `/about` | `Story`, `Problem`, `Solution`, `GlobalNetwork`, `FinalCta` |

- **The home page stays at two sections**: what Salah360 is and where to get it (`Hero`), then one card into each detail page (`Purpose`). New material goes on a detail page, or a new one. The For Masjids card is the featured one, on the dark emerald band, and carries that page's headline, "Give Your Masjid a Digital Home": keep the line on the home page, and keep the two copies the same.
- The section that opens a page (`Features`, `ForMasjids`, `Story`) carries the page's `<h1>` (`SectionHeading as="h1"`) and extra top padding to clear the fixed navbar.
- `/for-masjids` opens on the dark emerald band, so it asks for the frosted navbar from the start (`SitePage solidNavbar`); the transparent bar's dark text would be unreadable there.
- Privacy, Terms and Delete account use the slimmer `SimplePage` shell instead. Contact uses it too, but with the full navbar (`fullNavbar`), since Contact is in the nav.
- **Old links**: the home page was once a single long page, and links like `/#for-masjids` were shared. `components/layout/legacy-anchor-redirect.tsx` (on the home page) sends those anchors to the page that now holds the section.

## Two languages

English lives at `/`, Urdu at `/ur` — two separate static route trees (`app/(en)` and `app/(ur)/ur`), each with its own root layout, rather than one page that toggles language client-side. That's what lets almost everything stay a Server Component: a page's language is fixed by which tree rendered it, so components just take `lang: Lang` as a prop (from `lib/i18n/lang.ts`), not from client state or context. There's no `LanguageProvider` — the `LanguageMenu` reads the current language off the URL (`usePathname()`) and its options are `<Link>`s to the equivalent page in the other language (built with `localizePath`/`delocalizePath`), so switching is a normal navigation.

Both root layouts render the same `RootShell` component (fonts, the pre-paint theme script, providers), just with a different `lang` — that's the one piece of markup, `<html lang dir>`, that has to be set per-tree rather than per-component.

**Adding or changing copy**: `src/content/*.ts` files export `getX(lang)` functions, not plain constants — keep the English and Urdu strings together in the same file (usually one `Record<Lang, …>` object) so a translation is never out of sync with a change to the English copy. Section components take a `lang` prop and call these getters; a few short, section-only strings (headings, button labels) are kept as a local `COPY: Record<Lang, …>` inside the section component itself instead of a content file, when nothing else needs them.

**RTL**: Urdu is `dir="rtl"`. Most layout (flexbox, grid, logical `ps-`/`pe-`/`start-`/`end-` utilities) mirrors automatically from that one attribute. A few visuals are deliberately **not** mirrored and carry an explicit `dir="ltr"`, because their left/right is geography or fixed UI convention, not reading order: `TravelMap` (its route strip goes from the departure city, physically, to the destination) and the dashboard mockup's toggle switches. Where a chevron or arrow icon *is* directional (nav CTAs, "how it works" links), the component picks `ArrowLeft`/`ArrowRight` based on `lang`.

**Urdu translations were drafted by a developer, not a professional translator** (matching the note already on the mobile app's `lib/i18n/locales/ur.ts`, which this site's glossary follows — Masjid, Jamaat, Janazah and the Salah360 name stay in Latin script). Have a native speaker review `content/privacy-policy.tsx` in particular before launch.

**Urdu social-preview image**: `/ur`'s Open Graph image is a static file (`public/opengraph-ur.png`), not generated in code like the English one (`app/opengraph-en.png/route.tsx`). Satori, the renderer behind `next/og`, can't shape Urdu's Arabic-script text (two different Urdu fonts both failed the build with "lookupType … not yet supported" — Satori's shaping engine doesn't handle the contextual-substitution features real Urdu/Arabic fonts need). The English route (`app/opengraph-en.png/route.tsx`) needs no such font and can be regenerated any time by editing that file; the Urdu one was rendered once with a real browser (Noto Nastaliq Urdu, which does shape correctly there) and saved as a PNG. To update it: edit the copy, re-render an HTML page with the same design in a browser at 1200×630, screenshot it, and replace `public/opengraph-ur.png`.

## Things to know

- **Colors** are semantic tokens in `src/app/globals.css`, with light and dark values for each (`bg-surface`, `text-muted`, `text-primary-ink`…). The brand emerald matches the mobile app. The theme is applied before first paint by `lib/theme/theme-script.ts`.
- **Copy and facts** live in `src/content/`. Features reflect what the app actually does. Features that are planned but not built (donation information) are marked `comingSoon`. The site shows no user or Masjid counts, testimonials or ratings. Place names on the maps illustrate the vision; the page never says the app is live there.
- **Links** (page links, the Google Play link, support email) come from `ctaLinks(lang)` in `src/lib/site-config.ts` — page links follow the current language, the store link and mailto don't need to.
- **Store badges** (`components/store/`): `StoreBadges` shows both, in the hero, the closing band of each detail page and the footer. Google Play is a link to the listing (`siteConfig.playStoreUrl`, with a `referrer` so Play Console can count installs from the website); the navbar's and mobile menu's "Get the app" button (`GetAppButton`) goes there too. The App Store badge is a button that opens a centred "coming soon" dialog (a native modal `<dialog>`), because there is no iPhone app yet. When it ships: add its URL to `ctaLinks`, turn `AppStoreBadge` into a link and drop the dialog.
- **Masjid verification** (`content/verification.ts`, shown by `sections/verification.tsx` on `/for-masjids`) describes the two ways the app verifies an admin: over WhatsApp on the number from the Masjid's Google Maps listing, or manually with a photo and phone number. The times and conditions mirror the app's own copy (`salah360/lib/i18n/locales`: `admin.verifyChoice`); change them together.
- **Adding a third language**: add it to `LANGUAGES` in `lib/i18n/lang.ts`, give it a URL prefix in `localizePath`/`delocalizePath`, add an `app/(<code>)/<code>/…` route tree mirroring `(ur)/ur`, and add that language's entry to every `Record<Lang, …>` (content files and section-local `COPY` objects) — TypeScript will point at each one that's missing it.
- **Globe**: Canvas 2D instead of WebGL, with land dots precomputed offline and loaded as a separate chunk. It pauses when off-screen or in a background tab, and stays still when reduced motion is requested. Place names (`content/regions.ts`) are language-agnostic — the globe never renders them as text, only the `NETWORK_REGIONS` labels on the flat world map do.
- **Privacy Policy** (`/privacy`, `/ur/privacy`) text lives in `src/content/privacy-policy.tsx` and describes what the app, backend and database actually do. Update both languages (and `PRIVACY_LAST_UPDATED`) whenever data handling changes.
- **Contact** (`/contact`, `/ur/contact`): topics are in `src/content/contact.ts`. The form (`components/contact/`) sends the message itself: it posts to this site's `/api/contact` route (`app/api/contact/route.ts`, called from `lib/contact-api.ts`), which forwards it to the backend's `POST /contact`, and the backend emails it to the support inbox with Reply-To set to the visitor. The route adds a key (`CONTACT_FORM_SECRET`, the same value as in the backend's environment) that the backend requires, so the backend endpoint can't be used except through this site; it also refuses a POST that doesn't come from one of this site's own pages (the `Origin` header). Nothing on the page opens the visitor's email app: the address is shown as text, and each topic card is a link back to the page that picks that topic in the form (`?topic=…`). It needs two server-side environment variables, `BACKEND_API_URL` and `CONTACT_FORM_SECRET` (set both in Vercel); without them the form shows its "couldn't be sent" message. The topic ids must match the backend's (`backend/src/contact/contact-topics.ts`).
- **Terms** (`/terms`, `/ur/terms`) is still a placeholder saying the terms are being prepared.
- **Shared links and masjid QR codes** (`/masjid/<id>`, `/events/<id>`, `/janazah/<id>`): the links the app's Share button sends, and what a masjid's printed QR code holds, so these URLs must never change. With the app installed and its links verified, Android opens the app and the page is never seen. Otherwise `components/pages/open-in-app-page-content.tsx` picks a page from the request's User-Agent (`lib/device.ts`), which makes these routes server-rendered per request: Android is sent on at once (`components/open-in-app/android-app-redirect.tsx`: the app if installed, else Google Play, via the `intent:` link built in `lib/app-links.ts`), iPhone and iPad get a "coming soon" page, and a computer gets both buttons. When the iPhone app ships, replace that page with an App Store link.

## SEO and link previews

- **Domain**: the canonical origin is `https://www.salah360.net`, because Vercel redirects `salah360.net` to `www`. Canonical links, the sitemap and `og:image` must use the host that answers 200, not the one that redirects. If the primary domain in Vercel ever changes, change `NEXT_PUBLIC_SITE_URL` (or the default in `lib/site-config.ts`) to match. A trailing slash in that variable is stripped.
- **Page metadata**: every page's metadata comes from `rootMetadata(lang)` (the two root layouts, i.e. the home pages) or `pageMetadata(lang, path, { title, description })` (inner pages) in `lib/seo/metadata.ts`. Next merges metadata shallowly, so an inner page that set only `title` would keep the home page's og:title and og:url, and WhatsApp would preview it as the home page. Use `pageMetadata` for any new page, add the page to `PAGES` in `app/sitemap.ts`, and, for a main page, to the nav in `content/navigation.ts`.
- **Social previews** (WhatsApp, Facebook, X, LinkedIn…): each language has one 1200×630 PNG at a fixed URL, `/opengraph-en.png` and `/opengraph-ur.png`, listed on every page of that language. The English one is a route handler rather than an `opengraph-image.tsx` file, because that convention gives the image a hashed URL that Next drops from any page setting its own `openGraph`. Keep both images under ~300 KB, or WhatsApp skips them. WhatsApp caches a link's preview, so after changing an image, test with a new URL (e.g. `?v=2`).
- **Titles**: `SITE_COPY.searchTitle` is the home page's `<title>` in Google, written with the words people search for (Masjids, prayer and Jamaat times). `SITE_COPY.title` is the brand promise shown on social previews.
- **Structured data**: the home page carries schema.org `Organization`, `WebSite` and `WebPage` JSON-LD (`lib/seo/structured-data.ts`), which gives Google the site name and logo (`public/logo.png`) for search results. It states only real facts: no ratings, download counts or store listings. Add a `MobileApplication` node with the store URLs once the app is published. Check it with Google's [Rich Results Test](https://search.google.com/test/rich-results).
- **Search Console**: set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (and optionally `NEXT_PUBLIC_BING_SITE_VERIFICATION`) in Vercel to the token from Google Search Console's "HTML tag" method (the `content` value only) and the tag is emitted on every page. Verifying the domain with a DNS TXT record instead needs no code. Then submit `https://www.salah360.net/sitemap.xml`.
- **Kept out of search**: `/verify-admin` (the WhatsApp admin-verification link, which carries a one-time token) is disallowed in `robots.ts` and sent with `X-Robots-Tag: noindex`.
