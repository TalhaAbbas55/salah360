'use client';

import { Check, ChevronDown, Languages } from 'lucide-react';
import { AnimatePresence, m } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useId, useRef, useState, type KeyboardEvent } from 'react';

import { useDismiss } from '@/hooks/use-dismiss';
import { delocalizePath, LANGUAGES, localizePath, type Lang } from '@/lib/i18n/lang';

const MENU_LABEL: Record<Lang, string> = { en: 'Choose language', ur: 'زبان منتخب کریں' };

/**
 * Language picker (menu pattern: arrow keys, Home/End, Escape returns focus). Each option is
 * a real link to the equivalent page in that language — English at `/…`, Urdu at `/ur/…` —
 * so switching is a normal navigation, not client state (see lib/i18n/lang.ts).
 */
export function LanguageMenu({ lang, align = 'end' }: { lang: Lang; align?: 'start' | 'end' }) {
  const pathname = usePathname();
  const { path } = delocalizePath(pathname);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const menuId = useId();

  const close = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }, []);
  useDismiss(rootRef, open, () => close(true));

  const openMenu = () => {
    setOpen(true);
    const index = LANGUAGES.findIndex((item) => item.code === lang);
    requestAnimationFrame(() => itemRefs.current[Math.max(index, 0)]?.focus());
  };

  const onMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const items = itemRefs.current.filter((item): item is HTMLAnchorElement => item !== null);
    const index = items.indexOf(document.activeElement as HTMLAnchorElement);
    const focusAt = (next: number) => items[(next + items.length) % items.length]?.focus();
    if (event.key === 'ArrowDown') focusAt(index + 1);
    else if (event.key === 'ArrowUp') focusAt(index - 1);
    else if (event.key === 'Home') focusAt(0);
    else if (event.key === 'End') focusAt(items.length - 1);
    else if (event.key === 'Escape') close(true);
    else if (event.key === 'Tab') close();
    else return;
    if (event.key !== 'Escape' && event.key !== 'Tab') event.preventDefault();
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${MENU_LABEL[lang]}: ${lang.toUpperCase()}`}
        onClick={() => (open ? close() : openMenu())}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' && !open) {
            event.preventDefault();
            openMenu();
          }
        }}
        className="inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
      >
        <Languages className="size-4" aria-hidden="true" />
        <span className="uppercase tracking-wide">{lang}</span>
        <ChevronDown
          className={`size-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open ? (
          <m.div
            id={menuId}
            role="menu"
            aria-label={MENU_LABEL[lang]}
            onKeyDown={onMenuKeyDown}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className={`absolute top-full z-50 mt-2 w-60 origin-top rounded-2xl border border-border bg-surface p-1.5 card-shadow-lg ${align === 'end' ? 'end-0' : 'start-0'}`}
          >
            {LANGUAGES.map((item, index) => {
              const selected = item.code === lang;
              return (
                <Link
                  key={item.code}
                  ref={(element) => {
                    itemRefs.current[index] = element;
                  }}
                  href={localizePath(path, item.code)}
                  role="menuitem"
                  aria-current={selected ? 'true' : undefined}
                  lang={item.code}
                  dir={item.dir}
                  onClick={() => close()}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-start transition-colors hover:bg-surface-muted focus-visible:bg-surface-muted ${selected ? 'text-foreground' : 'text-muted'}`}
                >
                  <span className="flex flex-col">
                    <span className={`text-[15px] font-medium ${item.dir === 'rtl' ? 'font-urdu leading-[2]' : ''}`}>
                      {item.nativeName}
                    </span>
                    {item.nativeName !== item.englishName ? (
                      <span className="text-xs text-subtle" lang="en" dir="ltr">
                        {item.englishName}
                      </span>
                    ) : null}
                  </span>
                  {selected ? <Check className="size-4 text-primary" aria-hidden="true" /> : null}
                </Link>
              );
            })}
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
