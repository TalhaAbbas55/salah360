'use client';

import { X } from 'lucide-react';
import { useId, type MouseEvent, type Ref } from 'react';

import type { Lang } from '@/lib/i18n/lang';

import { GooglePlayBadge } from './google-play-badge';
import { AppleGlyph } from './store-glyphs';

const COPY: Record<Lang, { eyebrow: string; title: string; body: string; android: string; close: string }> = {
  en: {
    eyebrow: 'Coming soon',
    title: 'Salah360 for iPhone is on its way',
    body: 'The iPhone app is in development and isn’t on the App Store yet.',
    android: 'Have an Android phone? Salah360 is on Google Play today.',
    close: 'Close',
  },
  ur: {
    eyebrow: 'جلد آ رہا ہے',
    title: 'آئی فون کے لیے Salah360 جلد آ رہا ہے',
    body: 'آئی فون ایپ تیاری کے مراحل میں ہے اور ابھی App Store پر موجود نہیں۔',
    android: 'اینڈرائیڈ فون ہے؟ Salah360 آج ہی Google Play پر دستیاب ہے۔',
    close: 'بند کریں',
  },
};

/**
 * "The iPhone app is coming soon", shown in the middle of the screen when the App Store
 * badge is pressed. A native modal <dialog>: the browser keeps focus inside it, closes it
 * on Escape and draws it above everything else, wherever on the page the badge sits.
 */
export function IosComingSoonDialog({ ref, lang }: { ref: Ref<HTMLDialogElement>; lang: Lang }) {
  const copy = COPY[lang];
  const titleId = useId();

  // The dialog has no padding, so a click that lands on the dialog itself is on the backdrop.
  const closeOnBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) event.currentTarget.close();
  };

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClick={closeOnBackdrop}
      className="m-auto w-[min(calc(100vw-2rem),26rem)] rounded-[28px] border border-border bg-surface p-0 text-center font-normal text-foreground opacity-0 transition-[opacity,scale,overlay,display] transition-discrete duration-200 card-shadow-lg scale-95 backdrop:bg-[rgb(var(--shadow)/0.5)] backdrop:backdrop-blur-sm open:scale-100 open:opacity-100 starting:open:scale-95 starting:open:opacity-0"
    >
      <form method="dialog" className="relative px-6 pb-7 pt-9 sm:px-8">
        <button
          type="submit"
          aria-label={copy.close}
          className="absolute end-3 top-3 inline-flex size-10 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        <span className="mx-auto flex size-16 items-center justify-center rounded-[20px] bg-foreground text-background">
          <AppleGlyph className="size-8" />
        </span>
        {/* Letter-spacing would pull Urdu's joined letters apart, so it is for Latin script only. */}
        <p className="mt-5 text-xs font-medium uppercase text-primary ltr:tracking-[0.18em]">{copy.eyebrow}</p>
        <h2 id={titleId} className="mt-2 text-balance text-2xl font-semibold tracking-[-0.03em]">
          {copy.title}
        </h2>
        <p className="mt-3 text-pretty leading-relaxed text-muted">{copy.body}</p>

        <div className="mt-6 rounded-2xl border border-border bg-surface-muted/60 p-4">
          <p className="text-pretty text-sm leading-relaxed text-muted">{copy.android}</p>
          <GooglePlayBadge lang={lang} className="mt-3" />
        </div>
      </form>
    </dialog>
  );
}
