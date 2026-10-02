import { localizePath, type Lang } from '@/lib/i18n/lang';

/** `path` is the page without its language prefix (to match the current page); `href` has it. */
export type NavItem = { label: string; path: string; href: string };

type LinkCopy = { label: string; path: string };

const NAV_ITEMS_BY_LANG: Record<Lang, readonly LinkCopy[]> = {
  en: [
    { label: 'Home', path: '/' },
    { label: 'Features', path: '/features' },
    { label: 'For Masjids', path: '/for-masjids' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ],
  ur: [
    { label: 'ہوم', path: '/' },
    { label: 'خصوصیات', path: '/features' },
    { label: 'مساجد کے لیے', path: '/for-masjids' },
    { label: 'تعارف', path: '/about' },
    { label: 'رابطہ', path: '/contact' },
  ],
};

export function getNavItems(lang: Lang): readonly NavItem[] {
  return NAV_ITEMS_BY_LANG[lang].map(({ label, path }) => ({ label, path, href: localizePath(path, lang) }));
}

const FOOTER_LINKS_BY_LANG: Record<Lang, readonly LinkCopy[]> = {
  en: [
    ...NAV_ITEMS_BY_LANG.en,
    { label: 'Privacy', path: '/privacy' },
    { label: 'Terms', path: '/terms' },
    { label: 'Delete account', path: '/delete-account' },
  ],
  ur: [
    ...NAV_ITEMS_BY_LANG.ur,
    { label: 'رازداری کی پالیسی', path: '/privacy' },
    { label: 'شرائط', path: '/terms' },
    { label: 'اکاؤنٹ ڈیلیٹ کریں', path: '/delete-account' },
  ],
};

/** Footer links, all pointed at the current language's route. */
export function getFooterLinks(lang: Lang): readonly { label: string; href: string }[] {
  return FOOTER_LINKS_BY_LANG[lang].map(({ label, path }) => ({ label, href: localizePath(path, lang) }));
}
