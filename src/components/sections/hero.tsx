import { ArrowRight, BadgeCheck, Clock, Languages } from 'lucide-react';

import { ButtonLink } from '@/components/ui/button-link';
import { Container } from '@/components/ui/container';
import { SerifAccent } from '@/components/ui/serif-accent';
import { GeometricPattern } from '@/components/visuals/geometric-pattern';
import { Globe } from '@/components/visuals/globe/globe';
import { HeroFloatingCards } from '@/components/visuals/hero-floating-cards';
import type { Lang } from '@/lib/i18n/lang';
import { ctaLinks } from '@/lib/site-config';

type HeroCopy = {
  badge: string;
  headline: React.ReactNode;
  description: string;
  explore: string;
  forMasjids: string;
  facts: readonly string[];
};

const COPY: Record<Lang, HeroCopy> = {
  en: {
    badge: 'Connecting Muslims with Masjids around the world.',
    headline: (
      <>
        Never Miss Salah{' '}
        <span className="whitespace-nowrap">
          With <SerifAccent className="text-primary">Jamaat.</SerifAccent>
        </span>
      </>
    ),
    description:
      'Find nearby Masjids, discover accurate prayer times, stay connected with your Masjid, and receive important community alerts — wherever you are.',
    explore: 'Explore Salah360',
    forMasjids: 'For Masjids',
    facts: ['Verified Masjid profiles', 'Azan & Jamaat times', 'English & اردو'],
  },
  ur: {
    badge: 'دنیا بھر کی مساجد کو مسلمانوں سے جوڑتے ہوئے۔',
    headline: (
      <>
        جماعت کے ساتھ <SerifAccent className="text-primary">نماز</SerifAccent> کبھی نہ چھوٹے۔
      </>
    ),
    description:
      'قریبی مساجد تلاش کریں، نماز کے درست اوقات معلوم کریں، اپنی مسجد سے جڑے رہیں، اور جہاں بھی ہوں اہم کمیونٹی اطلاعات پائیں۔',
    explore: 'Salah360 دیکھیں',
    forMasjids: 'مساجد کے لیے',
    facts: ['تصدیق شدہ مسجد پروفائلز', 'اذان اور جماعت کے اوقات', 'انگریزی اور اردو'],
  },
};

const HERO_ICONS = [BadgeCheck, Clock, Languages];

/** Staggered CSS entrance (no JS needed, so the headline paints immediately). */
const enter = (step: number) => ({ animationDelay: `${80 + step * 90}ms` });

export function Hero({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-36"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <GeometricPattern fade="top-right" size={64} />
        <div className="absolute -right-40 -top-40 size-[720px] rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
        <div className="absolute -left-60 top-1/3 size-[560px] rounded-full bg-[radial-gradient(closest-side,rgb(var(--globe-accent)/0.08),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />
      </div>

      <Container className="relative grid items-center gap-10 lg:grid-cols-[1.02fr_1fr] lg:gap-6">
        <div className="max-w-[620px]">
          <p
            className="inline-flex animate-fade-up items-center gap-2.5 rounded-full border border-border bg-surface-glass py-1.5 pe-4 ps-2 text-[13px] text-muted backdrop-blur"
            style={enter(0)}
          >
            <span className="relative flex size-5 items-center justify-center rounded-full bg-primary-soft">
              <span className="absolute size-2 animate-ping-soft rounded-full bg-primary" />
              <span className="size-2 rounded-full bg-primary" />
            </span>
            {copy.badge}
          </p>

          <h1
            id="hero-title"
            className="mt-7 animate-fade-up text-balance text-[2.9rem] font-semibold leading-[1.1] tracking-[-0.045em] sm:text-6xl lg:text-[4.6rem]"
            style={enter(1)}
          >
            {copy.headline}
          </h1>

          <p
            className="mt-6 max-w-[540px] animate-fade-up text-pretty text-lg leading-relaxed text-muted sm:text-xl"
            style={enter(2)}
          >
            {copy.description}
          </p>

          <div className="mt-9 flex animate-fade-up flex-col gap-3 sm:flex-row" style={enter(3)}>
            <ButtonLink href={ctaLinks(lang).explore} size="lg">
              {copy.explore}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={ctaLinks(lang).forMasjids} variant="secondary" size="lg">
              {copy.forMasjids}
            </ButtonLink>
          </div>

          <ul className="mt-10 flex animate-fade-up flex-wrap gap-x-6 gap-y-3 text-sm text-muted" style={enter(4)}>
            {copy.facts.map((label, index) => {
              const Icon = HERO_ICONS[index];
              return (
                <li key={label} className="inline-flex items-center gap-2">
                  <Icon className="size-4 text-primary" aria-hidden="true" />
                  {label}
                </li>
              );
            })}
          </ul>
        </div>

        <div
          className="relative mx-auto aspect-square w-full max-w-[400px] animate-fade-up sm:max-w-[520px] lg:max-w-[600px]"
          style={enter(2)}
        >
          <div
            aria-hidden="true"
            className="absolute inset-[3%] animate-spin-slow rounded-full border border-dashed border-border-strong/70"
          />
          <div aria-hidden="true" className="absolute inset-[12%] rounded-full border border-border/70" />
          <Globe lang={lang} className="absolute inset-0" />
          <HeroFloatingCards lang={lang} />
        </div>
      </Container>
    </section>
  );
}
