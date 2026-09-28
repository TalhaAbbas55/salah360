import type { Metadata, Viewport } from 'next';

import { NotFoundPageContent } from '@/components/pages/not-found-page-content';
import { RootShell } from '@/components/root-shell';
import { themeViewport } from '@/lib/seo/metadata';
import { siteConfig } from '@/lib/site-config';

/**
 * The 404 page for every unmatched URL. The site has two root layouts (`(en)` and `(ur)`),
 * so there is no single layout a plain `not-found.tsx` could render in; this file renders its
 * own `<html>` through the same shell instead (enabled by `experimental.globalNotFound`).
 * Next adds `noindex` to it automatically.
 */
export const metadata: Metadata = {
  title: `Page Not Found - ${siteConfig.name}`,
  description: 'The page you are looking for does not exist.',
};

export const viewport: Viewport = themeViewport;

export default function GlobalNotFound() {
  return (
    <RootShell lang="en">
      <NotFoundPageContent lang="en" />
    </RootShell>
  );
}
