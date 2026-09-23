import { localizePath, type Lang } from './i18n/lang';

/**
 * Site-wide facts in one place, so launch details (domain, store links) change here only.
 * Nothing in this file should claim numbers, partners or availability that aren't real.
 */
export const siteConfig = {
  name: 'Salah360',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://salah360.net',
  founder: 'Talha Abbas',
  supportEmail: 'support@salah360.net',
} as const;

type SiteCopy = { tagline: string; title: string; description: string };

/** Per-language brand copy, used in <title>/<meta description> and the footer. */
export const SITE_COPY: Record<Lang, SiteCopy> = {
  en: {
    tagline: 'Never Miss Salah With Jamaat.',
    title: 'Salah360 — Never Miss Salah With Jamaat',
    description:
      'Salah360 helps you find nearby Masjids, discover prayer times, stay connected with your Masjid, and receive important community alerts wherever you are.',
  },
  ur: {
    tagline: 'جماعت کے ساتھ نماز کبھی نہ چھوٹے۔',
    title: 'Salah360 — جماعت کے ساتھ نماز کبھی نہ چھوٹے',
    description:
      'Salah360 آپ کو قریبی مساجد تلاش کرنے، نماز کے اوقات معلوم کرنے، اپنی مسجد سے جڑے رہنے اور جہاں بھی ہوں کمیونٹی کی اہم اطلاعات حاصل کرنے میں مدد دیتا ہے۔',
  },
};

/**
 * Where each call to action goes. `contactPage` follows the current language's route
 * (`/contact` or `/ur/contact`); everything else — anchors, mailto — is language-agnostic.
 * Add the Google Play / App Store links here once the app is published.
 */
export function ctaLinks(lang: Lang) {
  return {
    explore: '#features',
    getStarted: '#get-started',
    forMasjids: '#for-masjids',
    contactPage: localizePath('/contact', lang),
    email: `mailto:${siteConfig.supportEmail}`,
  } as const;
}
