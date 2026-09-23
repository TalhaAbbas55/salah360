import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { ScrollTopButton } from '@/components/layout/scroll-top-button';
import { Community } from '@/components/sections/community';
import { Features } from '@/components/sections/features';
import { FinalCta } from '@/components/sections/final-cta';
import { ForMasjids } from '@/components/sections/for-masjids';
import { GlobalNetwork } from '@/components/sections/global-network';
import { Hero } from '@/components/sections/hero';
import { HowItWorks } from '@/components/sections/how-it-works';
import { PrayerExperience } from '@/components/sections/prayer-experience';
import { Problem } from '@/components/sections/problem';
import { Solution } from '@/components/sections/solution';
import { Story } from '@/components/sections/story';
import { Travel } from '@/components/sections/travel';
import type { Lang } from '@/lib/i18n/lang';

/** The whole landing page, shared by the English (`/`) and Urdu (`/ur`) route trees. */
export function HomePage({ lang }: { lang: Lang }) {
  return (
    <>
      <Navbar lang={lang} />
      <main id="main">
        <Hero lang={lang} />
        <Story lang={lang} />
        <Problem lang={lang} />
        <Solution lang={lang} />
        <Features lang={lang} />
        <PrayerExperience lang={lang} />
        <Travel lang={lang} />
        <Community lang={lang} />
        <ForMasjids lang={lang} />
        <HowItWorks lang={lang} />
        <GlobalNetwork lang={lang} />
        <FinalCta lang={lang} />
      </main>
      <Footer lang={lang} />
      <ScrollTopButton lang={lang} />
    </>
  );
}
