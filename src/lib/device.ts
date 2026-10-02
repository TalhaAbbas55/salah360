/** What a visitor is browsing on, as far as the User-Agent header says. */
export type VisitorDevice = 'android' | 'ios' | 'other';

/**
 * Android or iPhone/iPad, from the User-Agent header. An iPad in its default "desktop
 * website" mode calls itself a Mac, so it comes out as 'other' here; the page corrects
 * that in the browser (see IpadAware).
 */
export function detectDevice(userAgent: string | null | undefined): VisitorDevice {
  if (!userAgent) return 'other';
  // Old Windows phones name both Android and iPhone to get mobile pages; they are neither.
  if (/Windows Phone/i.test(userAgent)) return 'other';
  if (/iPhone|iPad|iPod/i.test(userAgent)) return 'ios';
  if (/Android/i.test(userAgent)) return 'android';
  return 'other';
}

/**
 * True inside an Android app's built-in browser (a WebView: the "; wv" marker, or the
 * Facebook, Instagram and Line apps). Many of these can't follow an `intent:` link and
 * show an error page instead, so they only ever get ordinary https links.
 */
export function isAndroidInAppBrowser(userAgent: string | null | undefined): boolean {
  if (!userAgent || !/Android/i.test(userAgent)) return false;
  return /;\s*wv\)|\bFBAN\b|\bFBAV\b|\bFB_IAB\b|Instagram|\bLine\//i.test(userAgent);
}
