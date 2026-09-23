import { Geist, Geist_Mono, Instrument_Serif, Noto_Nastaliq_Urdu } from 'next/font/google';
import type { ReactNode } from 'react';

import { AppProviders } from '@/components/providers/app-providers';
import { dirOf, type Lang } from '@/lib/i18n/lang';
import { themeScript } from '@/lib/theme/theme-script';

import '@/app/globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });
const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
});
// Body copy in the Urdu tree uses this; English never loads it.
const nastaliq = Noto_Nastaliq_Urdu({
  variable: '--font-nastaliq',
  subsets: ['arabic'],
  weight: ['400', '600'],
  preload: false,
});

const SKIP_LINK_LABEL: Record<Lang, string> = {
  en: 'Skip to content',
  ur: 'مواد پر جائیں',
};

/**
 * The `<html>`/`<body>` shell shared by both root layouts — `app/(en)/layout.tsx` (English,
 * at `/`) and `app/(ur)/layout.tsx` (Urdu, at `/ur`). Each language is its own static route
 * tree (see `lib/i18n/lang.ts`), so `lang` is a plain prop here, not client state.
 */
export function RootShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html
      lang={lang}
      dir={dirOf(lang)}
      // The theme script sets data-theme before hydration.
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${nastaliq.variable} antialiased`}
    >
      {/* eslint-disable-next-line @next/next/no-head-element -- this *is* the root layout's
          <head>, for both language trees (via app/(en)/layout.tsx and app/(ur)/layout.tsx);
          the rule only recognises a literal app/layout.tsx, not a shared shell like this one. */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript>
          {/* Without JavaScript, scroll-reveal content must still be visible. */}
          <style>{'[data-reveal]{opacity:1!important;transform:none!important}'}</style>
        </noscript>
      </head>
      <body className="min-h-dvh bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
        >
          {SKIP_LINK_LABEL[lang]}
        </a>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
