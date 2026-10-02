import { SitePage } from '@/components/layout/site-page';
import { FinalCta } from '@/components/sections/final-cta';
import { GlobalNetwork } from '@/components/sections/global-network';
import { Problem } from '@/components/sections/problem';
import { Solution } from '@/components/sections/solution';
import { Story } from '@/components/sections/story';
import type { Lang } from '@/lib/i18n/lang';

/** `/about`: why Salah360 exists, the problem, how the app answers it, and the vision. */
export function AboutPageContent({ lang }: { lang: Lang }) {
  return (
    <SitePage lang={lang}>
      <Story lang={lang} />
      <Problem lang={lang} />
      <Solution lang={lang} />
      <GlobalNetwork lang={lang} />
      <FinalCta lang={lang} />
    </SitePage>
  );
}
