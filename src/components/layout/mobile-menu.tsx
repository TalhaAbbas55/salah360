'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AnimatePresence, m } from 'motion/react';
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

import { ButtonLink } from '@/components/ui/button-link';
import type { NavItem } from '@/content/navigation';
import { dirOf, type Lang } from '@/lib/i18n/lang';
import { ctaLinks } from '@/lib/site-config';

import { LanguageMenu } from './language-menu';
import { ThemeToggle } from './theme-toggle';

const COPY: Record<Lang, { open: string; close: string; menu: string; mobileNav: string; joinCta: string }> = {
  en: { open: 'Open menu', close: 'Close menu', menu: 'Menu', mobileNav: 'Mobile', joinCta: 'Join Salah360' },
  ur: {
    open: 'مینو کھولیں',
    close: 'مینو بند کریں',
    menu: 'مینو',
    mobileNav: 'موبائل مینو',
    joinCta: 'Salah360 میں شامل ہوں',
  },
};

/**
 * Hamburger (two lines that fold into an ×) opening a full-width drawer with focus kept inside.
 * The drawer is portalled to <body>: the navbar's backdrop-filter would otherwise become the
 * containing block for its `position: fixed` and clip it.
 */
export function MobileMenu({
  lang,
  navItems,
  activeSection,
}: {
  lang: Lang;
  navItems: readonly NavItem[];
  activeSection: string | null;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const copy = COPY[lang];
  const rtl = dirOf(lang) === 'rtl';
  const ItemArrow = rtl ? ArrowLeft : ArrowRight;

  const close = useCallback(() => setOpen(false), []);
  // False during SSR and hydration, true afterwards: the portal target only exists in the browser.
  const mounted = useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>('a')?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      // Keep focus cycling between the toggle button and the drawer.
      const focusable = [buttonRef.current, ...panelRef.current.querySelectorAll<HTMLElement>('a, button')].filter(
        (element): element is HTMLElement => element !== null,
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // The drawer is for small screens only; close it if the window grows past the breakpoint.
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const onChange = () => media.matches && setOpen(false);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? copy.close : copy.open}
        onClick={() => setOpen((value) => !value)}
        className="relative z-[60] inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface-muted"
      >
        <span aria-hidden="true" className="relative block h-3 w-5">
          <span
            className={`absolute left-0 block h-[1.5px] w-5 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? 'top-[5px] rotate-45' : 'top-0'}`}
          />
          <span
            className={`absolute left-0 block h-[1.5px] rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? 'top-[5px] w-5 -rotate-45' : 'top-[10px] w-3.5'}`}
          />
        </span>
      </button>

      {!mounted
        ? null
        : createPortal(
            <AnimatePresence>
              {open ? (
                <>
                  <m.div
                    key="backdrop"
                    aria-hidden="true"
                    onClick={close}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40 bg-[rgb(var(--shadow)/0.35)] backdrop-blur-sm"
                  />
                  <m.div
                    key="panel"
                    ref={panelRef}
                    id={panelId}
                    role="dialog"
                    aria-modal="true"
                    aria-label={copy.menu}
                    dir={dirOf(lang)}
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-x-3 top-[84px] z-50 max-h-[calc(100dvh-100px)] overflow-y-auto rounded-3xl border border-border bg-surface p-3 card-shadow-lg sm:inset-x-5"
                  >
                    <nav aria-label={copy.mobileNav}>
                      <ul>
                        {navItems.map((item, index) => (
                          <m.li
                            key={item.href}
                            initial={{ opacity: 0, x: rtl ? 8 : -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.04 * index + 0.06,
                              duration: 0.3,
                            }}
                          >
                            <a
                              href={item.href}
                              onClick={close}
                              aria-current={activeSection === item.sectionId ? 'true' : undefined}
                              className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-medium tracking-[-0.02em] transition-colors hover:bg-surface-muted aria-[current=true]:text-primary"
                            >
                              {item.label}
                              <ItemArrow className="size-4 text-subtle" aria-hidden="true" />
                            </a>
                          </m.li>
                        ))}
                      </ul>
                    </nav>
                    <div className="mt-2 flex items-center justify-between border-t border-border px-2 pt-3">
                      <LanguageMenu lang={lang} align="start" />
                      <ThemeToggle lang={lang} />
                    </div>
                    <ButtonLink href={ctaLinks(lang).getStarted} onClick={close} size="lg" className="mt-3 w-full">
                      {copy.joinCta}
                    </ButtonLink>
                  </m.div>
                </>
              ) : null}
            </AnimatePresence>,
            document.body,
          )}
    </div>
  );
}

const subscribeNever = () => () => {};
