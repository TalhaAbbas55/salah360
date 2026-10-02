import { SitePage } from '@/components/layout/site-page';
import { FinalCta } from '@/components/sections/final-cta';
import { ForMasjids } from '@/components/sections/for-masjids';
import { HowItWorks } from '@/components/sections/how-it-works';
import { Verification } from '@/components/sections/verification';
import type { Lang } from '@/lib/i18n/lang';

/** `/for-masjids`: what a Masjid gets, how an admin joins, and the two ways to get verified. */
export function ForMasjidsPageContent({ lang }: { lang: Lang }) {
  return (
    // The page opens on the dark emerald band, so the navbar is frosted from the start.
    <SitePage lang={lang} solidNavbar>
      <ForMasjids lang={lang} />
      <HowItWorks lang={lang} audience="admins" />
      <Verification lang={lang} />
      <FinalCta lang={lang} />
    </SitePage>
  );
}
