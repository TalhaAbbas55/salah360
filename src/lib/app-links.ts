import { siteConfig } from './site-config';

export type SharedContentKind = 'masjid' | 'event' | 'janazah';

/** The app's own route for each kind: the app registers these paths as Android App Links. */
const APP_PATHS: Record<SharedContentKind, string> = { masjid: 'masjid', event: 'events', janazah: 'janazah' };

/** The app's custom-scheme link, e.g. salah360://masjid/<id>. `id` must already be a checked UUID. */
export function appDeepLink(kind: SharedContentKind, id: string): string {
  return `salah360://${APP_PATHS[kind]}/${id}`;
}

/**
 * The Google Play listing. The `referrer` says which shared link brought the visitor, so
 * Play Console can count installs that came from masjid links and QR codes.
 */
export function playStoreUrl(kind: SharedContentKind, id: string): string {
  const referrer = `utm_source=salah360.net&utm_medium=${kind}_link&utm_content=${id}`;
  return `${siteConfig.playStoreUrl}&referrer=${encodeURIComponent(referrer)}`;
}

/**
 * One link that does the right thing on Android: with the app installed it opens the app
 * on this masjid/event/janazah; without it, the browser goes to `browser_fallback_url`,
 * the Google Play listing (Chrome hands that straight to the Play Store app).
 */
export function androidIntentUrl(kind: SharedContentKind, id: string): string {
  return (
    `intent://${APP_PATHS[kind]}/${id}#Intent;scheme=salah360;package=${siteConfig.androidPackage};` +
    `S.browser_fallback_url=${encodeURIComponent(playStoreUrl(kind, id))};end`
  );
}
