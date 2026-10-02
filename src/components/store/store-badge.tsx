import type { ReactNode } from 'react';

/**
 * The black store-badge look, shared by the Google Play link and the App Store button.
 * Narrow enough that the two sit side by side on a phone.
 */
export const STORE_BADGE_CLASS =
  'inline-flex h-[50px] cursor-pointer items-center rounded-xl border border-white/25 bg-black px-3 text-white transition-[border-color,transform] duration-200 hover:border-white/60 active:scale-[0.98] sm:h-[54px] sm:min-w-[172px] sm:px-4';

/**
 * What a store badge shows: the store's mark, a small line and the store's name. Store
 * names stay in Latin script in both languages, like the Salah360 name itself, so the
 * badge is always laid out left-to-right; its accessible name is translated by the caller.
 */
export function StoreBadgeLabel({ glyph, line, store }: { glyph: ReactNode; line: string; store: string }) {
  return (
    <span dir="ltr" lang="en" className="flex items-center gap-2 sm:gap-3">
      {glyph}
      <span className="flex flex-col whitespace-nowrap text-start font-sans leading-none">
        <span className="text-[9px] font-medium uppercase tracking-[0.04em] text-white/80 sm:text-[10px]">{line}</span>
        <span className="mt-1 text-[16px] font-semibold tracking-[-0.02em] sm:text-[18px]">{store}</span>
      </span>
    </span>
  );
}
