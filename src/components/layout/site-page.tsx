import type { ReactNode } from 'react';

import type { Lang } from '@/lib/i18n/lang';

import { Footer } from './footer';
import { Navbar } from './navbar';
import { ScrollTopButton } from './scroll-top-button';

type SitePageProps = {
  lang: Lang;
  /** See Navbar: for a page that opens on the dark emerald band. */
  solidNavbar?: boolean;
  /** The page's sections. The first one clears the fixed navbar with its own top padding. */
  children: ReactNode;
};

/** Shell for the main pages (Home, Features, For Masjids, About): full navbar, sections, footer. */
export function SitePage({ lang, solidNavbar = false, children }: SitePageProps) {
  return (
    <>
      <Navbar lang={lang} solid={solidNavbar} />
      <main id="main">{children}</main>
      <Footer lang={lang} />
      <ScrollTopButton lang={lang} />
    </>
  );
}
