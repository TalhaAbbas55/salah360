import { localizePath, type Lang } from '@/lib/i18n/lang';

export type NavItem = { label: string; href: string; sectionId: string };

const NAV_ITEMS_BY_LANG: Record<Lang, readonly NavItem[]> = {
  en: [
    { label: 'Home', href: '#top', sectionId: 'top' },
    { label: 'Features', href: '#features', sectionId: 'features' },
    { label: 'How It Works', href: '#how-it-works', sectionId: 'how-it-works' },
    { label: 'For Masjids', href: '#for-masjids', sectionId: 'for-masjids' },
    { label: 'About', href: '#about', sectionId: 'about' },
  ],
  ur: [
    { label: 'ہوم', href: '#top', sectionId: 'top' },
    { label: 'خصوصیات', href: '#features', sectionId: 'features' },
    { label: 'یہ کیسے کام کرتا ہے', href: '#how-it-works', sectionId: 'how-it-works' },
    { label: 'مساجد کے لیے', href: '#for-masjids', sectionId: 'for-masjids' },
    { label: 'تعارف', href: '#about', sectionId: 'about' },
  ],
};

export function getNavItems(lang: Lang): readonly NavItem[] {
  return NAV_ITEMS_BY_LANG[lang];
}

const FOOTER_LABELS_BY_LANG: Record<Lang, readonly { label: string; path: string }[]> = {
  en: [
    { label: 'Home', path: '/#top' },
    { label: 'Features', path: '/#features' },
    { label: 'For Masjids', path: '/#for-masjids' },
    { label: 'About', path: '/#about' },
    { label: 'Privacy', path: '/privacy' },
    { label: 'Terms', path: '/terms' },
    { label: 'Contact', path: '/contact' },
  ],
  ur: [
    { label: 'ہوم', path: '/#top' },
    { label: 'خصوصیات', path: '/#features' },
    { label: 'مساجد کے لیے', path: '/#for-masjids' },
    { label: 'تعارف', path: '/#about' },
    { label: 'رازداری کی پالیسی', path: '/privacy' },
    { label: 'شرائط', path: '/terms' },
    { label: 'رابطہ', path: '/contact' },
  ],
};

/** Footer links, all pointed at the current language's route (home-page anchors included). */
export function getFooterLinks(lang: Lang): readonly { label: string; href: string }[] {
  return FOOTER_LABELS_BY_LANG[lang].map(({ label, path }) => {
    const [base, hash] = path.split('#');
    const href = hash ? `${localizePath('/', lang)}#${hash}` : localizePath(base, lang);
    return { label, href };
  });
}
