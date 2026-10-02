import { SitePage } from '@/components/layout/site-page';
import { Community } from '@/components/sections/community';
import { Features } from '@/components/sections/features';
import { FinalCta } from '@/components/sections/final-cta';
import { HowItWorks } from '@/components/sections/how-it-works';
import { PrayerExperience } from '@/components/sections/prayer-experience';
import { Travel } from '@/components/sections/travel';
import type { Lang } from '@/lib/i18n/lang';

/** `/features`: what the app does for someone looking for a Masjid. */
export function FeaturesPageContent({ lang }: { lang: Lang }) {
  return (
    <SitePage lang={lang}>
      <Features lang={lang} />
      <PrayerExperience lang={lang} />
      <Travel lang={lang} />
      <Community lang={lang} />
      <HowItWorks lang={lang} audience="muslims" />
      <FinalCta lang={lang} />
    </SitePage>
  );
}
