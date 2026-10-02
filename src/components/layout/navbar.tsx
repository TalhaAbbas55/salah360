'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { GetAppButton } from '@/components/store/get-app-button';
import { getNavItems } from '@/content/navigation';
import { useScrolled } from '@/hooks/use-scrolled';
import { delocalizePath, type Lang } from '@/lib/i18n/lang';

import { LanguageMenu } from './language-menu';
import { Logo } from './logo';
import { MobileMenu } from './mobile-menu';
import { ThemeToggle } from './theme-toggle';

const MAIN_NAV_LABEL: Record<Lang, string> = { en: 'Main', ur: 'مرکزی مینو' };

type NavbarProps = {
  lang: Lang;
  /**
   * Frosted glass from the top of the page, not only once it scrolls. For a page that
   * opens on the dark emerald band (For Masjids), where the transparent bar's text would
   * be unreadable.
   */
  solid?: boolean;
};

/** Sticky navbar: transparent over the top of the page, frosted glass once the page scrolls. */
export function Navbar({ lang, solid = false }: NavbarProps) {
  const scrolled = useScrolled();
  const navItems = getNavItems(lang);
  const activePath = delocalizePath(usePathname()).path;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div
        className={`mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 rounded-full border px-3 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 sm:px-4 ${
          scrolled || solid
            ? 'border-border bg-surface-glass shadow-[0_8px_32px_-12px_rgb(var(--shadow)/0.18)] backdrop-blur-xl backdrop-saturate-150'
            : 'border-transparent bg-transparent'
        }`}
      >
        <Logo lang={lang} className="ps-1" />

        <nav aria-label={MAIN_NAV_LABEL[lang]} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activePath === item.path;
              return (
                <li key={item.path}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                      isActive ? 'text-foreground' : 'text-muted hover:text-foreground'
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3.5 -bottom-0.5 h-px bg-primary transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                    />
                  </Link>
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
            <GetAppButton lang={lang} />
          </div>
          <MobileMenu lang={lang} navItems={navItems} activePath={activePath} />
        </div>
      </div>
    </header>
  );
}
