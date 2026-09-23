'use client';

import { ArrowUp } from 'lucide-react';
import { AnimatePresence, m } from 'motion/react';

import { useScrolled } from '@/hooks/use-scrolled';
import type { Lang } from '@/lib/i18n/lang';

const LABEL: Record<Lang, string> = { en: 'Back to top', ur: 'اوپر واپس جائیں' };

/** Floating pill, brand-colored like the rest of the UI, once the page has scrolled a bit. */
export function ScrollTopButton({ lang }: { lang: Lang }) {
  const scrolled = useScrolled(480);
  const label = LABEL[lang];

  return (
    <AnimatePresence>
      {scrolled ? (
        <m.div
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="group fixed bottom-5 end-5 z-40 sm:bottom-7 sm:end-7"
        >
          <span
            role="tooltip"
            className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-foreground px-2.5 py-1.5 text-xs font-medium text-background opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
          >
            {label}
          </span>
          <button
            type="button"
            aria-label={label}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_24px_-8px_var(--glow),inset_0_1px_0_rgb(255_255_255/0.18)] transition-colors hover:bg-primary-strong"
          >
            <ArrowUp className="size-5" aria-hidden="true" />
          </button>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
