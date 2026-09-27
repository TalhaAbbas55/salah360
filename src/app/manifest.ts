import type { MetadataRoute } from 'next';

import { SITE_COPY, siteConfig } from '@/lib/site-config';

/** Web app manifest: the name, icons and colors used when the site is added to a home screen. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_COPY.en.title,
    short_name: siteConfig.name,
    description: SITE_COPY.en.description,
    id: '/',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    lang: 'en',
    dir: 'ltr',
    background_color: '#f7f5ef',
    theme_color: '#0a8a64',
    categories: ['lifestyle', 'navigation', 'social'],
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
