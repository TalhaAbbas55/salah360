import { LegacyAnchorRedirect } from '@/components/layout/legacy-anchor-redirect';
import { SitePage } from '@/components/layout/site-page';
import { Hero } from '@/components/sections/hero';
import { Purpose } from '@/components/sections/purpose';
import { JsonLd } from '@/components/seo/json-ld';
import type { Lang } from '@/lib/i18n/lang';
import { homeStructuredData } from '@/lib/seo/structured-data';

/**
 * The home page, shared by the English (`/`) and Urdu (`/ur`) route trees. Kept to two
 * sections: what Salah360 is and where to get it, then a way into each page that goes into
 * detail. Anything longer belongs on Features, For Masjids or About.
 */
export function HomePage({ lang }: { lang: Lang }) {
  return (
    <SitePage lang={lang}>
      <JsonLd data={homeStructuredData(lang)} />
      <LegacyAnchorRedirect lang={lang} />
      <Hero lang={lang} />
      <Purpose lang={lang} />
    </SitePage>
  );
}
