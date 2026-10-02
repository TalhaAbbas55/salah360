import { localizePath, type Lang } from './i18n/lang';

/**
 * Site-wide facts in one place, so launch details (domain, store links) change here only.
 * Nothing in this file should claim numbers, partners or availability that aren't real.
 */
export const siteConfig = {
  name: 'Salah360',
  /**
   * The canonical origin, with no trailing slash. It must be the host that answers 200, not
   * one that redirects: on Vercel, `salah360.net` 308-redirects to `www.salah360.net`, so
   * canonical links, the sitemap and og:image all use `www`. A trailing slash in the env
   * var is stripped, since it would otherwise produce `https://…//privacy` in the sitemap.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.salah360.net').replace(/\/+$/, ''),
  founder: 'Talha Abbas',
  supportEmail: 'support@salah360.net',
  /** The Android app's package name (salah360/app.json). Also used by /.well-known/assetlinks.json. */
  androidPackage: 'com.salah360.app',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.salah360.app',
} as const;

type SiteCopy = {
  tagline: string;
  /** The home page's <title> in search results: the brand plus the words people search for. */
  searchTitle: string;
  /** The title shown on social previews (WhatsApp, Facebook, X…): the brand promise. */
  title: string;
  description: string;
};

/** Per-language brand copy, used in <title>/<meta description>, social previews and the footer. */
export const SITE_COPY: Record<Lang, SiteCopy> = {
  en: {
    tagline: 'Never Miss Salah With Jamaat.',
    searchTitle: 'Salah360 - Find Nearby Masjids, Prayer & Jamaat Times',
    title: 'Salah360 - Never Miss Salah With Jamaat',
    description:
      'Salah360 helps you find nearby Masjids (mosques), check prayer and Jamaat times, stay connected with your Masjid, and receive Janazah and community alerts wherever you are.',
  },
  ur: {
    tagline: 'جماعت کے ساتھ نماز کبھی نہ چھوٹے۔',
    searchTitle: 'Salah360 - قریبی مساجد، نماز اور جماعت کے اوقات',
    title: 'Salah360 - جماعت کے ساتھ نماز کبھی نہ چھوٹے',
    description:
      'Salah360 آپ کو قریبی مساجد تلاش کرنے، نماز اور جماعت کے اوقات معلوم کرنے، اپنی مسجد سے جڑے رہنے اور جہاں بھی ہوں نمازِ جنازہ اور کمیونٹی کی اہم اطلاعات حاصل کرنے میں مدد دیتا ہے۔',
  },
};

/** Tells Play Console that an install came from the website's own pages (badges, navbar, footer). */
const WEBSITE_REFERRER = 'utm_source=salah360.net&utm_medium=website';

/**
 * Where each call to action goes. Page links follow the current language's route
 * (`/features` or `/ur/features`); the store link and mailto are language-agnostic.
 * There is no App Store link yet: the App Store badge opens a "coming soon" dialog
 * (components/store/app-store-badge.tsx). Add the link here when the iPhone app ships.
 */
export function ctaLinks(lang: Lang) {
  return {
    playStore: `${siteConfig.playStoreUrl}&referrer=${encodeURIComponent(WEBSITE_REFERRER)}`,
    features: localizePath('/features', lang),
    forMasjids: localizePath('/for-masjids', lang),
    about: localizePath('/about', lang),
    contactPage: localizePath('/contact', lang),
    email: `mailto:${siteConfig.supportEmail}`,
  } as const;
}
