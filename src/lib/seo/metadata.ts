import type { Metadata, Viewport } from 'next';

import { localizePath, type Lang } from '@/lib/i18n/lang';
import { SITE_COPY, siteConfig } from '@/lib/site-config';

const OG_LOCALE: Record<Lang, string> = { en: 'en_US', ur: 'ur_PK' };

/** Google ignores meta keywords; Bing and smaller engines still read them a little. */
const KEYWORDS: Record<Lang, string[]> = {
  en: [
    'Salah360',
    'Masjid finder',
    'Masjid near me',
    'mosque near me',
    'prayer times',
    'Salah times',
    'Namaz times',
    'Jamaat times',
    'Janazah alerts',
    'Masjid events',
    "women's prayer area",
    'Muslim app',
  ],
  ur: [
    'Salah360',
    'مسجد تلاش کریں',
    'قریبی مسجد',
    'نماز کے اوقات',
    'جماعت کا وقت',
    'نمازِ جنازہ کی اطلاع',
    'مسجد کے پروگرام',
    'خواتین کے لیے نماز کی جگہ',
    'مسلم ایپ',
  ],
};

/**
 * The social-preview image for each language, at a fixed URL so every page can list it (a
 * page that sets its own `openGraph` replaces the layout's, images included). English is
 * rendered at build time by `app/opengraph-en.png/route.tsx`. Urdu is a static PNG, because
 * Satori (the renderer behind next/og) can't shape Urdu's Arabic-script text; see "Urdu
 * social-preview image" in the README.
 */
const OG_IMAGE: Record<Lang, string> = { en: '/opengraph-en.png', ur: '/opengraph-ur.png' };

function ogImages(lang: Lang) {
  return [{ url: OG_IMAGE[lang], width: 1200, height: 630, alt: SITE_COPY[lang].title, type: 'image/png' }];
}

/** hreflang links for one page: both languages, with English as the default for everyone else. */
function languageAlternates(path: string) {
  return {
    en: localizePath(path, 'en'),
    ur: localizePath(path, 'ur'),
    'x-default': localizePath(path, 'en'),
  };
}

/** Search-engine ownership tokens, emitted only when set (Vercel → Environment Variables). */
function verification(): Metadata['verification'] {
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const bing = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
  if (!google && !bing) return undefined;
  return {
    ...(google && { google }),
    ...(bing && { other: { 'msvalidate.01': bing } }),
  };
}

/** Metadata for a language's root layout, which is also the home page's (`/` or `/ur`). */
export function rootMetadata(lang: Lang): Metadata {
  const copy = SITE_COPY[lang];
  const images = ogImages(lang);
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: copy.searchTitle, template: `%s · ${siteConfig.name}` },
    description: copy.description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.founder }],
    creator: siteConfig.founder,
    keywords: KEYWORDS[lang],
    publisher: siteConfig.name,
    category: 'religion',
    alternates: { canonical: localizePath('/', lang), languages: languageAlternates('/') },
    openGraph: {
      type: 'website',
      url: localizePath('/', lang),
      siteName: siteConfig.name,
      title: copy.title,
      description: copy.description,
      locale: OG_LOCALE[lang],
      alternateLocale: lang === 'en' ? OG_LOCALE.ur : OG_LOCALE.en,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.title,
      description: copy.description,
      images,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    formatDetection: { telephone: false },
    verification: verification(),
  };
}

/**
 * Metadata for an inner page (features, for-masjids, about, privacy, contact, terms). Next
 * merges metadata shallowly, so a page that sets only `title` would otherwise keep the home
 * page's og:title and og:url, and WhatsApp would preview `/privacy` as the home page.
 */
export function pageMetadata(
  lang: Lang,
  path: string,
  { title, description }: { title: string; description: string },
): Metadata {
  const url = localizePath(path, lang);
  const socialTitle = `${title} · ${siteConfig.name}`;
  const images = ogImages(lang);
  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: 'website',
      url,
      siteName: siteConfig.name,
      title: socialTitle,
      description,
      locale: OG_LOCALE[lang],
      images,
    },
    twitter: { card: 'summary_large_image', title: socialTitle, description, images },
  };
}

/** The browser UI color for both root layouts, matching the page background in each theme. */
export const themeViewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f5ef' },
    { media: '(prefers-color-scheme: dark)', color: '#050e0b' },
  ],
};
