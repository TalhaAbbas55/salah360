import { localizePath, type Lang } from '@/lib/i18n/lang';
import { SITE_COPY, siteConfig } from '@/lib/site-config';

const ORGANIZATION_ID = `${siteConfig.url}/#organization`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

const IN_LANGUAGE: Record<Lang, string> = { en: 'en', ur: 'ur' };

/**
 * schema.org JSON-LD for the home page (`/` and `/ur`). It tells Google the site's name
 * (shown above the result instead of the bare domain), the organization behind it, its
 * logo and support contact. It describes only facts that are true today: no ratings, user
 * counts or app-store listings until those exist (add a `MobileApplication` node with the
 * store URLs once the app is published).
 */
export function homeStructuredData(lang: Lang) {
  const copy = SITE_COPY[lang];
  const pageUrl = `${siteConfig.url}${localizePath('/', lang)}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name: siteConfig.name,
        url: `${siteConfig.url}/`,
        logo: {
          '@type': 'ImageObject',
          url: `${siteConfig.url}/logo.png`,
          width: 512,
          height: 512,
        },
        email: siteConfig.supportEmail,
        founder: { '@type': 'Person', name: siteConfig.founder },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: siteConfig.supportEmail,
          url: `${siteConfig.url}${localizePath('/contact', lang)}`,
          availableLanguage: ['English', 'Urdu'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: siteConfig.name,
        alternateName: ['Salah 360', 'salah360.net'],
        url: `${siteConfig.url}/`,
        description: SITE_COPY.en.description,
        inLanguage: ['en', 'ur'],
        publisher: { '@id': ORGANIZATION_ID },
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: copy.searchTitle,
        description: copy.description,
        inLanguage: IN_LANGUAGE[lang],
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORGANIZATION_ID },
      },
    ],
  };
}
