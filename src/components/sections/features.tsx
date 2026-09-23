import { Bell } from 'lucide-react';
import type { ReactNode } from 'react';

import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { SerifAccent } from '@/components/ui/serif-accent';
import {
  JanazahIllustration,
  PrayerTimesIllustration,
  RadiusIllustration,
} from '@/components/visuals/feature-illustrations';
import { getFeatureHighlights, getFeatures, type Feature } from '@/content/features';
import type { Lang } from '@/lib/i18n/lang';

const COPY: Record<
  Lang,
  {
    eyebrow: string;
    title: React.ReactNode;
    description: string;
    comingSoon: string;
    jamaatTitle: string;
    jamaatBody: string;
    jamaatTime: string;
    googleCta: string;
    orGuest: string;
  }
> = {
  en: {
    eyebrow: 'Features',
    title: (
      <>
        Everything that helps you <SerifAccent className="text-primary">reach Jamaat.</SerifAccent>
      </>
    ),
    description: 'Built for the person looking for a Masjid — and for the Masjid that wants to be found.',
    comingSoon: 'Coming soon',
    jamaatTitle: 'Fajr Jamaat changes tomorrow',
    jamaatBody: 'Masjid Al-Noor · 5:15 AM → 5:30 AM',
    jamaatTime: 'now',
    googleCta: 'Continue with Google',
    orGuest: 'or guest',
  },
  ur: {
    eyebrow: 'خصوصیات',
    title: (
      <>
        ہر وہ چیز جو آپ کو <SerifAccent className="text-primary">جماعت</SerifAccent> تک پہنچائے۔
      </>
    ),
    description: 'اس شخص کے لیے بنایا گیا جو مسجد تلاش کر رہا ہے — اور اس مسجد کے لیے جو تلاش کی جانا چاہتی ہے۔',
    comingSoon: 'جلد آ رہا ہے',
    jamaatTitle: 'کل فجر کی جماعت کا وقت تبدیل ہوگا',
    jamaatBody: 'مسجد النور · 5:15 AM → 5:30 AM',
    jamaatTime: 'ابھی',
    googleCta: 'گوگل سے جاری رکھیں',
    orGuest: 'یا بطور مہمان',
  },
};

function FeatureIcon({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  return (
    <span className="flex size-10 items-center justify-center rounded-xl border border-border bg-surface-muted text-primary transition-[background-color,color,border-color,transform] duration-300 group-hover:-rotate-6 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
      <Icon className="size-[18px]" aria-hidden="true" />
    </span>
  );
}

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 18 18" className="size-4 shrink-0" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.87 2.7-6.62Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.98v2.33A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.98A9 9 0 0 0 0 9c0 1.45.35 2.83.98 4.03l2.97-2.33Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .98 4.97L3.95 7.3C4.66 5.17 6.65 3.58 9 3.58Z"
      />
    </svg>
  );
}

function GoogleLoginPreview({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  return (
    <div
      aria-hidden="true"
      className="mt-6 flex items-center gap-3 rounded-2xl border border-border bg-surface p-3 card-shadow"
    >
      <span className="flex h-9 flex-1 items-center justify-center gap-2 rounded-xl border border-border-strong bg-surface px-3 text-[13px] font-medium">
        <GoogleGlyph />
        {copy.googleCta}
      </span>
      <span className="whitespace-nowrap text-xs text-subtle">{copy.orGuest}</span>
    </div>
  );
}

function JamaatNotificationPreview({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  return (
    <div
      aria-hidden="true"
      className="mt-6 flex items-center gap-3 rounded-2xl border border-border bg-surface p-3 card-shadow"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Bell className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold">{copy.jamaatTitle}</span>
        <span className="block truncate text-xs text-muted">{copy.jamaatBody}</span>
      </span>
      <span className="text-[10px] text-subtle">{copy.jamaatTime}</span>
    </div>
  );
}

export function Features({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  const highlights = getFeatureHighlights(lang);
  const features = getFeatures(lang);
  const HIGHLIGHTS: { feature: Feature; illustration: ReactNode }[] = [
    { feature: highlights.nearby, illustration: <RadiusIllustration lang={lang} /> },
    { feature: highlights.prayerTimes, illustration: <PrayerTimesIllustration lang={lang} /> },
    { feature: highlights.janazah, illustration: <JanazahIllustration lang={lang} /> },
  ];

  return (
    <section id="features" aria-labelledby="features-title" className="relative border-t border-border py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading id="features-title" eyebrow={copy.eyebrow} title={copy.title} />
          <Reveal delay={0.1} className="max-w-sm text-pretty leading-relaxed text-muted lg:pb-2">
            {copy.description}
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-4 lg:grid-cols-3">
          {HIGHLIGHTS.map(({ feature, illustration }, index) => (
            <li key={feature.title}>
              <Reveal delay={index * 0.08} className="h-full">
                <article className="group flex h-full flex-col rounded-3xl border border-border bg-surface p-3 transition-[border-color,transform] duration-300 card-shadow hover:-translate-y-1 hover:border-primary/35">
                  {illustration}
                  <div className="flex flex-1 flex-col p-4 pt-5">
                    <div className="flex items-center gap-3">
                      <FeatureIcon feature={feature} />
                      <h3 className="text-lg font-semibold tracking-[-0.02em]">{feature.title}</h3>
                    </div>
                    <p className="mt-3 leading-relaxed text-muted">{feature.body}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const isFirst = index === 0;
            const isLast = index === features.length - 1;
            return (
              <li key={feature.title} className={isFirst || isLast ? 'sm:col-span-2' : ''}>
                <Reveal delay={(index % 4) * 0.05} className="h-full">
                  <article
                    className={`group relative h-full overflow-hidden rounded-3xl border border-border p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-primary/35 ${
                      isFirst ? 'bg-primary-soft/60' : 'bg-surface'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <FeatureIcon feature={feature} />
                      {feature.comingSoon ? <Badge tone="gold">{copy.comingSoon}</Badge> : null}
                    </div>
                    <h3 className="mt-5 font-semibold tracking-[-0.015em]">{feature.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{feature.body}</p>
                    {isFirst ? <JamaatNotificationPreview lang={lang} /> : null}
                    {isLast ? <GoogleLoginPreview lang={lang} /> : null}
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
