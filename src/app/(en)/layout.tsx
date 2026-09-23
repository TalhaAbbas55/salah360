import type { Metadata, Viewport } from 'next';

import { RootShell } from '@/components/root-shell';
import { SITE_COPY, siteConfig } from '@/lib/site-config';

const copy = SITE_COPY.en;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: copy.title, template: `%s · ${siteConfig.name}` },
  description: copy.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.founder }],
  creator: siteConfig.founder,
  keywords: [
    'Salah360',
    'Masjid finder',
    'mosque near me',
    'prayer times',
    'Jamaat times',
    'Janazah alerts',
    'Masjid events',
    "women's prayer area",
    'Muslim app',
  ],
  alternates: { canonical: '/', languages: { en: '/', ur: '/ur', 'x-default': '/' } },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: siteConfig.name,
    title: copy.title,
    description: copy.description,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: copy.title,
    description: copy.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f5ef' },
    { media: '(prefers-color-scheme: dark)', color: '#050e0b' },
  ],
};

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
