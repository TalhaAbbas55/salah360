# Salah360 — landing page

The public marketing site for Salah360, in English and Urdu. Frontend only: Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Motion and Lucide. No backend, no API routes; every page is prerendered as static HTML.

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
    (en)/              English routes: /, /privacy, /contact, /terms, plus the English
                        root layout (metadata, <html lang="en" dir="ltr">) and opengraph-image
    (ur)/
      ur/               Urdu routes: /ur, /ur/privacy, /ur/contact, /ur/terms
      layout.tsx        Urdu root layout (metadata, <html lang="ur" dir="rtl">)
    icon.svg, apple-icon, robots, sitemap, favicon   shared by both languages
  components/
    home-page.tsx        the whole landing page, composed once and rendered by both languages
    root-shell.tsx        the shared <html>/<body> (fonts, theme script, providers), rendered
                          by each language's own root layout — see "Two languages" below
    layout/               navbar, mobile menu, language menu, theme toggle, logo, footer
    pages/                shared content for /privacy, /contact, /terms (each language's
                          page.tsx supplies its own metadata, then renders these)
    sections/              one file per page section (hero, story, problem, …, final-cta)
    visuals/               illustrations and mockups (globe, orbit, dashboard, maps, patterns)
    ui/                    small shared pieces (ButtonLink, SectionHeading, Reveal, Badge…)
    providers/             theme and Motion providers (client)
  content/               page copy and sample data — each file exports a getX(lang) function
                        returning that language's strings, not raw constants (see below)
  lib/
    i18n/lang.ts          the Lang type ('en' | 'ur') and the /ur URL-prefix helpers
    site-config.ts         site facts, per-language SITE_COPY, and ctaLinks(lang)
    theme/, globe/, geo/    theme script, globe math/renderer, geo data (language-agnostic)
  hooks/                 client hooks for the navbar
scripts/generate-geo-data.mjs   builds src/lib/geo/land-points.ts and public/world-dots.svg
public/opengraph-ur.png         static Urdu social-preview image — see "Two languages" below
```

Most of the page is Server Components. Only interactive or animated parts are client components: navbar, menus, providers, `Reveal`, the globe and the prayer timeline.

## Two languages

English lives at `/`, Urdu at `/ur` — two separate static route trees (`app/(en)` and `app/(ur)/ur`), each with its own root layout, rather than one page that toggles language client-side. That's what lets almost everything stay a Server Component: a page's language is fixed by which tree rendered it, so components just take `lang: Lang` as a prop (from `lib/i18n/lang.ts`), not from client state or context. There's no `LanguageProvider` — the `LanguageMenu` reads the current language off the URL (`usePathname()`) and its options are `<Link>`s to the equivalent page in the other language (built with `localizePath`/`delocalizePath`), so switching is a normal navigation.

Both root layouts render the same `RootShell` component (fonts, the pre-paint theme script, providers), just with a different `lang` — that's the one piece of markup, `<html lang dir>`, that has to be set per-tree rather than per-component.

**Adding or changing copy**: `src/content/*.ts` files export `getX(lang)` functions, not plain constants — keep the English and Urdu strings together in the same file (usually one `Record<Lang, …>` object) so a translation is never out of sync with a change to the English copy. Section components take a `lang` prop and call these getters; a few short, section-only strings (headings, button labels) are kept as a local `COPY: Record<Lang, …>` inside the section component itself instead of a content file, when nothing else needs them.

**RTL**: Urdu is `dir="rtl"`. Most layout (flexbox, grid, logical `ps-`/`pe-`/`start-`/`end-` utilities) mirrors automatically from that one attribute. A few visuals are deliberately **not** mirrored and carry an explicit `dir="ltr"`, because their left/right is geography or fixed UI convention, not reading order: `TravelMap` (its route strip goes from the departure city, physically, to the destination) and the dashboard mockup's toggle switches. Where a chevron or arrow icon *is* directional (nav CTAs, "how it works" links), the component picks `ArrowLeft`/`ArrowRight` based on `lang`.

**Urdu translations were drafted by a developer, not a professional translator** (matching the note already on the mobile app's `lib/i18n/locales/ur.ts`, which this site's glossary follows — Masjid, Jamaat, Janazah and the Salah360 name stay in Latin script). Have a native speaker review `content/privacy-policy.tsx` in particular before launch.

**Urdu social-preview image**: `/ur`'s Open Graph image is a static file (`public/opengraph-ur.png`), not a `opengraph-image.tsx` route like the English one. Satori, the renderer behind `next/og`, can't shape Urdu's Arabic-script text (two different Urdu fonts both failed the build with "lookupType … not yet supported" — Satori's shaping engine doesn't handle the contextual-substitution features real Urdu/Arabic fonts need). The English route (`app/(en)/opengraph-image.tsx`) needs no such font and can be regenerated any time by editing that file; the Urdu one was rendered once with a real browser (Noto Nastaliq Urdu, which does shape correctly there) and saved as a PNG. To update it: edit the copy, re-render an HTML page with the same design in a browser at 1200×630, screenshot it, and replace `public/opengraph-ur.png`.

## Things to know

- **Colors** are semantic tokens in `src/app/globals.css`, with light and dark values for each (`bg-surface`, `text-muted`, `text-primary-ink`…). The brand emerald matches the mobile app. The theme is applied before first paint by `lib/theme/theme-script.ts`.
- **Copy and facts** live in `src/content/`. Features reflect what the app actually does. Features that are planned but not built (donation information) are marked `comingSoon`. The site shows no user or Masjid counts, testimonials or ratings. Place names on the maps illustrate the vision; the page never says the app is live there.
- **Links** (support email, CTAs) come from `ctaLinks(lang)` in `src/lib/site-config.ts` — `contactPage` follows the current language, the rest (anchors, mailto) don't need to. Add the Google Play / App Store links there once the app is published. Set `NEXT_PUBLIC_SITE_URL` if the domain isn't `https://salah360.net`.
- **Adding a third language**: add it to `LANGUAGES` in `lib/i18n/lang.ts`, give it a URL prefix in `localizePath`/`delocalizePath`, add an `app/(<code>)/<code>/…` route tree mirroring `(ur)/ur`, and add that language's entry to every `Record<Lang, …>` (content files and section-local `COPY` objects) — TypeScript will point at each one that's missing it.
- **Globe**: Canvas 2D instead of WebGL, with land dots precomputed offline and loaded as a separate chunk. It pauses when off-screen or in a background tab, and stays still when reduced motion is requested. Place names (`content/regions.ts`) are language-agnostic — the globe never renders them as text, only the `NETWORK_REGIONS` labels on the flat world map do.
- **Privacy Policy** (`/privacy`, `/ur/privacy`) text lives in `src/content/privacy-policy.tsx` and describes what the app, backend and database actually do. Update both languages (and `PRIVACY_LAST_UPDATED`) whenever data handling changes.
- **Contact** (`/contact`, `/ur/contact`): topics are in `src/content/contact.ts`. There's no backend, so the form opens the visitor's email app with the message filled in.
- **Terms** (`/terms`, `/ur/terms`) is still a placeholder saying the terms are being prepared.
