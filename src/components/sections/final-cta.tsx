import Link from 'next/link';

import { LogoMark } from '@/components/layout/logo';
import { StoreBadges } from '@/components/store/store-badges';
import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { SerifAccent } from '@/components/ui/serif-accent';
import { GeometricPattern } from '@/components/visuals/geometric-pattern';
import { MasjidSilhouette } from '@/components/visuals/masjid-silhouette';
import type { Lang } from '@/lib/i18n/lang';
import { ctaLinks, siteConfig } from '@/lib/site-config';

const COPY: Record<
  Lang,
  { title: React.ReactNode; description: string; questions: string; or: string; contact: string }
> = {
  en: {
    title: (
      <>
        Stay Connected. <SerifAccent className="text-[#e2bd72]">Pray Together.</SerifAccent>
      </>
    ),
    description: 'Get Salah360, find your Masjid, and make Jamaat a part of your journey wherever you go.',
    questions: 'Questions? Write to',
    or: 'or',
    contact: 'contact us',
  },
  ur: {
    title: (
      <>
        جڑے رہیں۔ <SerifAccent className="text-[#e2bd72]">ساتھ نماز پڑھیں۔</SerifAccent>
      </>
    ),
    description: 'Salah360 حاصل کریں، اپنی مسجد تلاش کریں، اور جہاں بھی جائیں جماعت کو اپنے سفر کا حصہ بنائیں۔',
    questions: 'سوال ہے؟ لکھیں',
    or: 'یا',
    contact: 'ہم سے رابطہ کریں',
  },
};

const LINK_CLASS =
  'font-medium text-band-foreground underline decoration-white/30 underline-offset-4 hover:decoration-white';

/** The closing band of the Features, For Masjids and About pages: get the app. */
export function FinalCta({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  const links = ctaLinks(lang);
  return (
    <section id="get-app" aria-labelledby="cta-title" className="relative py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-t-[min(50vw,280px)] rounded-b-4xl bg-band px-6 pb-14 pt-24 text-center text-band-foreground sm:px-12 sm:pb-20 sm:pt-32">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_0%,#127656_0%,transparent_70%)]" />
              <div className="absolute inset-0 text-white/[0.05] [--pattern:currentColor]">
                <GeometricPattern fade="center" size={56} />
              </div>
              <MasjidSilhouette className="absolute bottom-0 left-1/2 w-[640px] max-w-[120%] -translate-x-1/2 text-white/[0.025] [&_.text-background]:text-band" />
            </div>

            <div className="relative mx-auto max-w-2xl">
              <LogoMark className="mx-auto size-16 rounded-[18px] shadow-[0_12px_32px_-12px_rgb(0_0_0/0.6)]" />
              <h2
                id="cta-title"
                className="mt-8 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl"
              >
                {copy.title}
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-pretty text-lg leading-relaxed text-band-muted">
                {copy.description}
              </p>
              <StoreBadges lang={lang} className="mt-10 justify-center" />
              <p className="mt-8 text-sm text-band-muted">
                {copy.questions}{' '}
                <a href={links.email} className={LINK_CLASS}>
                  {siteConfig.supportEmail}
                </a>{' '}
                {copy.or}{' '}
                <Link href={links.contactPage} className={LINK_CLASS}>
                  {copy.contact}
                </Link>
                .
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
