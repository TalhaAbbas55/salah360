import type { Metadata, Viewport } from 'next';

import { RootShell } from '@/components/root-shell';
import { SITE_COPY, siteConfig } from '@/lib/site-config';

const copy = SITE_COPY.ur;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: copy.title, template: `%s · ${siteConfig.name}` },
  description: copy.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.founder }],
  creator: siteConfig.founder,
  keywords: [
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
  alternates: { canonical: '/ur', languages: { en: '/', ur: '/ur', 'x-default': '/' } },
  openGraph: {
    type: 'website',
    url: '/ur',
    siteName: siteConfig.name,
    title: copy.title,
    description: copy.description,
    locale: 'ur_PK',
    // A static image, not a app/opengraph-image.tsx route: Satori (the renderer behind that
    // route) can't shape Urdu's Arabic-script text, so this was rendered once with a real
    // browser instead — see public/opengraph-ur.png's provenance in the project README.
    images: [{ url: '/opengraph-ur.png', width: 1200, height: 630, alt: copy.description }],
  },
  twitter: {
    card: 'summary_large_image',
    title: copy.title,
    description: copy.description,
    images: ['/opengraph-ur.png'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f5ef' },
    { media: '(prefers-color-scheme: dark)', color: '#050e0b' },
  ],
};

export default function UrduRootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="ur">{children}</RootShell>;
}
