'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';

import { ButtonLink } from '@/components/ui/button-link';
import { getNavItems } from '@/content/navigation';
import { useActiveSection } from '@/hooks/use-active-section';
import { useScrolled } from '@/hooks/use-scrolled';
import type { Lang } from '@/lib/i18n/lang';
import { ctaLinks } from '@/lib/site-config';

import { LanguageMenu } from './language-menu';
import { Logo } from './logo';
import { MobileMenu } from './mobile-menu';
import { ThemeToggle } from './theme-toggle';

const COPY: Record<Lang, { mainNav: string; joinCta: string }> = {
  en: { mainNav: 'Main', joinCta: 'Join Salah360' },
  ur: { mainNav: 'مرکزی مینو', joinCta: 'Salah360 میں شامل ہوں' },
};

/** Sticky navbar: transparent over the hero, frosted glass once the page scrolls. */
export function Navbar({ lang }: { lang: Lang }) {
  const scrolled = useScrolled();
  const navItems = getNavItems(lang);
  const sectionIds = navItems.map((item) => item.sectionId);
  const active = useActiveSection(sectionIds);
  const copy = COPY[lang];
  const JoinIcon = lang === 'ur' ? ArrowLeft : ArrowRight;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div
        className={`mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 rounded-full border px-3 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 sm:px-4 ${
          scrolled
            ? 'border-border bg-surface-glass shadow-[0_8px_32px_-12px_rgb(var(--shadow)/0.18)] backdrop-blur-xl backdrop-saturate-150'
            : 'border-transparent bg-transparent'
        }`}
      >
        <Logo lang={lang} className="ps-1" />

        <nav aria-label={copy.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = active === item.sectionId;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                      isActive ? 'text-foreground' : 'text-muted hover:text-foreground'
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3.5 -bottom-0.5 h-px bg-primary transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-0.5 sm:flex">
            <LanguageMenu lang={lang} />
            <ThemeToggle lang={lang} />
          </div>
          <div className="ms-2 hidden sm:block">
            <ButtonLink href={ctaLinks(lang).getStarted}>
              {copy.joinCta}
              <JoinIcon className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </ButtonLink>
          </div>
          <MobileMenu lang={lang} navItems={navItems} activeSection={active} />
        </div>
      </div>
    </header>
  );
}
