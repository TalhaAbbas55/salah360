'use client';

import { useRef } from 'react';

import type { Lang } from '@/lib/i18n/lang';

import { IosComingSoonDialog } from './ios-coming-soon-dialog';
import { STORE_BADGE_CLASS, StoreBadgeLabel } from './store-badge';
import { AppleGlyph } from './store-glyphs';

const LABEL: Record<Lang, string> = {
  en: 'Salah360 for iPhone: coming soon to the App Store',
  ur: 'آئی فون کے لیے Salah360: جلد App Store پر آ رہا ہے',
};

/**
 * The App Store badge. The iPhone app isn't released yet, so this is a button, not a
 * link: it opens a dialog saying the app is coming soon. When the app ships, turn it into
 * a link like GooglePlayBadge.
 */
export function AppStoreBadge({ lang, className = '' }: { lang: Lang; className?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={LABEL[lang]}
        onClick={() => dialogRef.current?.showModal()}
        className={`${STORE_BADGE_CLASS} ${className}`}
      >
        <StoreBadgeLabel
          glyph={<AppleGlyph className="size-6 shrink-0 sm:size-7" />}
          line="Coming soon on the"
          store="App Store"
        />
      </button>
      <IosComingSoonDialog ref={dialogRef} lang={lang} />
    </>
  );
}
