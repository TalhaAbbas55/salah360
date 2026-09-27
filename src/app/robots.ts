import type { MetadataRoute } from 'next';

import { siteConfig } from '@/lib/site-config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The Masjid Admin verification link from WhatsApp carries a one-time token and is
      // proxied to the backend (see next.config.ts); it must never be crawled or indexed.
      disallow: ['/verify-admin'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
