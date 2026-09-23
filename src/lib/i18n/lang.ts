/**
 * The two languages this website is published in. Each has its own static route tree
 * (English at `/`, Urdu at `/ur`) — see `app/(en)` and `app/(ur)`. A page's language is
 * fixed by which tree rendered it, so components take `lang` as a plain prop; nothing here
 * needs client state or React Context.
 *
 * The mobile app supports the same two languages (see `salah360/lib/i18n`); this file's
 * glossary (Masjid, Jamaat, Janazah, Salah360 kept in Latin script, …) follows its Urdu copy
 * for consistency between the app and the website.
 */
export type Lang = 'en' | 'ur';

export const LANGUAGES: readonly {
  code: Lang;
  nativeName: string;
  englishName: string;
  dir: 'ltr' | 'rtl';
}[] = [
  { code: 'en', nativeName: 'English', englishName: 'English', dir: 'ltr' },
  { code: 'ur', nativeName: 'اردو', englishName: 'Urdu', dir: 'rtl' },
];

export function dirOf(lang: Lang): 'ltr' | 'rtl' {
  return lang === 'ur' ? 'rtl' : 'ltr';
}

/** The `/ur` prefix Urdu routes live under. English routes have no prefix. */
export function localizePath(path: string, lang: Lang): string {
  if (lang === 'en') return path;
  return path === '/' ? '/ur' : `/ur${path}`;
}

/** Turns a possibly-`/ur`-prefixed pathname back into its language and unprefixed path. */
export function delocalizePath(pathname: string): { lang: Lang; path: string } {
  if (pathname === '/ur' || pathname.startsWith('/ur/')) {
    const path = pathname.slice(3);
    return { lang: 'ur', path: path === '' ? '/' : path };
  }
  return { lang: 'en', path: pathname };
}
