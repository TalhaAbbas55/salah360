'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { localizePath, type Lang } from '@/lib/i18n/lang';

/**
 * The home page used to be one long page, and links such as `/#for-masjids` were shared
 * while it was. Those sections are pages of their own now; each old anchor goes to its page.
 */
const MOVED_ANCHORS: Record<string, string> = {
  '#features': '/features',
  '#how-it-works': '/features#how-it-works',
  '#for-masjids': '/for-masjids',
  '#about': '/about',
};

/** On the home page: sends a visitor who arrived on an old section anchor to that section's page. */
export function LegacyAnchorRedirect({ lang }: { lang: Lang }) {
  const router = useRouter();
  useEffect(() => {
    const target = MOVED_ANCHORS[window.location.hash];
    if (target) router.replace(localizePath(target, lang));
  }, [router, lang]);
  return null;
}
