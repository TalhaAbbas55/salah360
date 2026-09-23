import type { MetadataRoute } from 'next';

import { localizePath } from '@/lib/i18n/lang';
import { siteConfig } from '@/lib/site-config';

const PATHS = ['/', '/privacy', '/terms', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({
    url: `${siteConfig.url}${localizePath(path, 'en')}`,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.3,
    alternates: {
      languages: {
        en: `${siteConfig.url}${localizePath(path, 'en')}`,
        ur: `${siteConfig.url}${localizePath(path, 'ur')}`,
      },
    },
  }));
}
