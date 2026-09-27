import type { MetadataRoute } from 'next';

import { LANGUAGES, localizePath } from '@/lib/i18n/lang';
import { siteConfig } from '@/lib/site-config';

const PAGES: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
];

/**
 * Every page in every language, each listing all its translations (hreflang), as Google
 * asks for multilingual sitemaps: `/ur` pages are URLs of their own, not just alternates.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const absolute = (path: string) => `${siteConfig.url}${path}`;
  return PAGES.flatMap(({ path, priority, changeFrequency }) =>
    LANGUAGES.map(({ code }) => ({
      url: absolute(localizePath(path, code)),
      changeFrequency,
      priority,
      alternates: {
        languages: {
          ...Object.fromEntries(LANGUAGES.map((l) => [l.code, absolute(localizePath(path, l.code))])),
          'x-default': absolute(localizePath(path, 'en')),
        },
      },
    })),
  );
}
