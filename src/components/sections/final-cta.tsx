import { ArrowLeft, ArrowRight } from 'lucide-react';

import { ButtonLink } from '@/components/ui/button-link';
import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { SerifAccent } from '@/components/ui/serif-accent';
import { GeometricPattern } from '@/components/visuals/geometric-pattern';
import { MasjidSilhouette } from '@/components/visuals/masjid-silhouette';
import type { Lang } from '@/lib/i18n/lang';
import { ctaLinks, siteConfig } from '@/lib/site-config';

const COPY: Record<
  Lang,
  { title: React.ReactNode; description: string; explore: string; contact: string; questions: string }
> = {
  en: {
    title: (
      <>
        Stay Connected. <SerifAccent className="text-[#e2bd72]">Pray Together.</SerifAccent>
      </>
    ),
    description: 'Find your Masjid, stay informed, and make Jamaat a part of your journey wherever you go.',
    explore: 'Explore Salah360',
    contact: 'Contact us',
    questions: 'Questions? Write to',
  },
  ur: {
    title: (
      <>
        جڑے رہیں۔ <SerifAccent className="text-[#e2bd72]">ساتھ نماز پڑھیں۔</SerifAccent>
      </>
    ),
    description: 'اپنی مسجد تلاش کریں، باخبر رہیں، اور جہاں بھی جائیں جماعت کو اپنے سفر کا حصہ بنائیں۔',
    explore: 'Salah360 دیکھیں',
    contact: 'ہم سے رابطہ کریں',
    questions: 'سوال ہے؟ لکھیں',
  },
};

export function FinalCta({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  const links = ctaLinks(lang);
  const ExploreIcon = lang === 'ur' ? ArrowLeft : ArrowRight;
  return (
    <section id="get-started" aria-labelledby="cta-title" className="relative py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-t-[min(50vw,280px)] rounded-b-[32px] bg-band px-6 pb-14 pt-24 text-center text-band-foreground sm:px-12 sm:pb-20 sm:pt-32">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_0%,#127656_0%,transparent_70%)]" />
              <div className="absolute inset-0 text-white/[0.05] [--pattern:currentColor]">
                <GeometricPattern fade="center" size={56} />
              </div>
              <MasjidSilhouette className="absolute bottom-0 left-1/2 w-[640px] max-w-[120%] -translate-x-1/2 text-white/[0.025] [&_.text-background]:text-band" />
            </div>

            <div className="relative mx-auto max-w-2xl">
              <h2
                id="cta-title"
                className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl"
              >
                {copy.title}
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-pretty text-lg leading-relaxed text-band-muted">
                {copy.description}
              </p>
              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <ButtonLink href={links.explore} variant="on-band" size="lg">
                  {copy.explore}
                  <ExploreIcon className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href={links.contactPage} variant="on-band-outline" size="lg">
                  {copy.contact}
                </ButtonLink>
              </div>
              <p className="mt-8 text-sm text-band-muted">
                {copy.questions}{' '}
                <a
                  href={links.email}
                  className="font-medium text-band-foreground underline decoration-white/30 underline-offset-4 hover:decoration-white"
                >
                  {siteConfig.supportEmail}
                </a>
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
