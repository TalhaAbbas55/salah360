import { Building2, UserRound, type LucideIcon } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { SerifAccent } from '@/components/ui/serif-accent';
import { getMasjidSteps, getUserSteps, type Step } from '@/content/how-it-works';
import type { Lang } from '@/lib/i18n/lang';

function StepList({
  icon: Icon,
  audience,
  title,
  steps,
  delay,
}: {
  icon: LucideIcon;
  audience: string;
  title: string;
  steps: readonly Step[];
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="h-full rounded-[28px] border border-border bg-surface p-6 card-shadow sm:p-9">
        <header className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-primary-soft text-primary-ink">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-subtle">{audience}</p>
            <h3 className="text-lg font-semibold tracking-[-0.02em]">{title}</h3>
          </div>
        </header>
        <ol className="relative mt-8 space-y-7">
          <span
            aria-hidden="true"
            className="absolute bottom-3 start-[19px] top-3 w-px bg-gradient-to-b from-primary/50 via-border to-border"
          />
          {steps.map((step, index) => (
            <li key={step.title} className="relative flex gap-5">
              <span className="relative flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-sm font-semibold tabular-nums text-primary">
                {index + 1}
              </span>
              <div className="pt-1.5">
                <h4 className="font-semibold tracking-[-0.01em]">{step.title}</h4>
                <p className="mt-1 leading-relaxed text-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </article>
    </Reveal>
  );
}

const COPY: Record<
  Lang,
  {
    eyebrow: string;
    title: React.ReactNode;
    description: string;
    forMuslims: string;
    userTitle: string;
    forAdmins: string;
    adminTitle: string;
  }
> = {
  en: {
    eyebrow: 'How it works',
    title: (
      <>
        Simple for everyone. <SerifAccent className="text-primary">On both sides.</SerifAccent>
      </>
    ),
    description:
      'Salah360 is one app with two experiences: one for the people looking for a Masjid, and one for the Masjids serving them.',
    forMuslims: 'For Muslims',
    userTitle: 'From search to Saff',
    forAdmins: 'For Masjid Admins',
    adminTitle: 'From sign-up to followers',
  },
  ur: {
    eyebrow: 'یہ کیسے کام کرتا ہے',
    title: (
      <>
        سب کے لیے آسان۔ <SerifAccent className="text-primary">دونوں طرف سے۔</SerifAccent>
      </>
    ),
    description:
      'Salah360 ایک ایپ ہے جس کے دو تجربات ہیں: ایک اس شخص کے لیے جو مسجد تلاش کر رہا ہے، اور ایک ان مساجد کے لیے جو ان کی خدمت کرتی ہیں۔',
    forMuslims: 'مسلمانوں کے لیے',
    userTitle: 'تلاش سے صف تک',
    forAdmins: 'مسجد ایڈمنز کے لیے',
    adminTitle: 'سائن اپ سے فالورز تک',
  },
};

export function HowItWorks({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="how-title"
          align="center"
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <StepList
            icon={UserRound}
            audience={copy.forMuslims}
            title={copy.userTitle}
            steps={getUserSteps(lang)}
            delay={0}
          />
          <StepList
            icon={Building2}
            audience={copy.forAdmins}
            title={copy.adminTitle}
            steps={getMasjidSteps(lang)}
            delay={0.1}
          />
        </div>
      </Container>
    </section>
  );
}
