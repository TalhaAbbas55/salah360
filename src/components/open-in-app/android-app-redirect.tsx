'use client';

import { useEffect } from 'react';

type AndroidAppRedirectProps = {
  /** Opens the app, or Google Play without it (see androidIntentUrl). */
  intentUrl: string;
  storeUrl: string;
  /** Inside another app's built-in browser, which may not understand `intentUrl`. */
  inAppBrowser: boolean;
};

/**
 * Sends an Android visitor on as soon as the page loads: into the app when it is
 * installed, to Google Play when it is not. The page's buttons stay as the fallback for a
 * browser that refuses to leave without a tap.
 *
 * Only once per tab: coming back from Google Play with the Back button must show the
 * page, not bounce the visitor to the store again.
 */
export function AndroidAppRedirect({ intentUrl, storeUrl, inAppBrowser }: AndroidAppRedirectProps) {
  useEffect(() => {
    const key = `salah360:redirected:${window.location.pathname}`;
    try {
      if (window.sessionStorage.getItem(key)) return;
      window.sessionStorage.setItem(key, '1');
    } catch {
      // Storage is blocked (some private modes): redirect anyway, the first visit matters most.
    }
    window.location.href = inAppBrowser ? storeUrl : intentUrl;
  }, [intentUrl, storeUrl, inAppBrowser]);

  return null;
}
