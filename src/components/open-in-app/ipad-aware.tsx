'use client';

import { useSyncExternalStore, type ReactNode } from 'react';

const subscribe = () => () => {};

/** An iPad asking for desktop pages calls itself a Mac; only a real Mac has no touch screen. */
const isIpad = () => /Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1;

/**
 * Shows `ios` instead of its children on an iPad. The server can't tell such an iPad from
 * a Mac (same User-Agent), so this is decided in the browser.
 */
export function IpadAware({ ios, children }: { ios: ReactNode; children: ReactNode }) {
  const ipad = useSyncExternalStore(subscribe, isIpad, () => false);
  return ipad ? ios : children;
}
