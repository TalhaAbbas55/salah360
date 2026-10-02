import { Building2, UserRound, type LucideIcon } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { SerifAccent } from '@/components/ui/serif-accent';
import { getMasjidSteps, getUserSteps, type Step } from '@/content/how-it-works';
import type { Lang } from '@/lib/i18n/lang';

/** Who the steps are for: someone looking for a Masjid, or the admin of one. */
type Audience = 'muslims' | 'admins';

function StepList({
  icon: Icon,
  audience,
  title,
  steps,
}: {
  icon: LucideIcon;
  audience: string;
  title: string;
  steps: readonly Step[];
}) {
  return (
    <Reveal delay={0.1} className="h-full">
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

type AudienceCopy = {
  title: React.ReactNode;
  description: string;
  /** The small label and title on the steps card. */
  cardLabel: string;
  cardTitle: string;
};

const EYEBROW: Record<Lang, string> = { en: 'How it works', ur: 'یہ کیسے کام کرتا ہے' };

const COPY: Record<Lang, Record<Audience, AudienceCopy>> = {
  en: {
    muslims: {
      title: (
        <>
          Simple from <SerifAccent className="text-primary">the first tap.</SerifAccent>
        </>
      ),
      description:
        'Browse nearby Masjids as a guest. Sign in to follow the ones you pray at, and their updates reach you on their own.',
      cardLabel: 'For Muslims',
      cardTitle: 'From search to Saff',
    },
    admins: {
      title: (
        <>
          Your Masjid online <SerifAccent className="text-primary">in four steps.</SerifAccent>
        </>
      ),
      description:
        'Masjid Admins use the same Salah360 app. Sign up as an admin, verify your Masjid, and start publishing.',
      cardLabel: 'For Masjid Admins',
      cardTitle: 'From sign-up to followers',
    },
  },
  ur: {
    muslims: {
      title: (
        <>
          پہلے ٹیپ سے ہی <SerifAccent className="text-primary">آسان۔</SerifAccent>
        </>
      ),
      description:
        'بطور مہمان قریبی مساجد دیکھیں۔ جن مساجد میں آپ نماز پڑھتے ہیں انہیں فالو کرنے کے لیے سائن اِن کریں، اور ان کی اپڈیٹس خود آپ تک پہنچتی رہیں گی۔',
      cardLabel: 'مسلمانوں کے لیے',
      cardTitle: 'تلاش سے صف تک',
    },
    admins: {
      title: (
        <>
          آپ کی مسجد آن لائن، <SerifAccent className="text-primary">چار مراحل میں۔</SerifAccent>
        </>
      ),
      description:
        'مسجد ایڈمنز یہی Salah360 ایپ استعمال کرتے ہیں۔ بطور ایڈمن سائن اپ کریں، اپنی مسجد کی تصدیق کریں، اور شائع کرنا شروع کریں۔',
      cardLabel: 'مسجد ایڈمنز کے لیے',
      cardTitle: 'سائن اپ سے فالورز تک',
    },
  },
};

const AUDIENCE_ICONS: Record<Audience, LucideIcon> = { muslims: UserRound, admins: Building2 };

/**
 * The four steps for one audience: on the Features page for people looking for a Masjid,
 * on the For Masjids page for Masjid Admins.
 */
export function HowItWorks({ lang, audience }: { lang: Lang; audience: Audience }) {
  const copy = COPY[lang][audience];
  const steps = audience === 'admins' ? getMasjidSteps(lang) : getUserSteps(lang);
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="relative py-24 sm:py-32">
      <Container className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <SectionHeading id="how-title" eyebrow={EYEBROW[lang]} title={copy.title} description={copy.description} />
        <StepList icon={AUDIENCE_ICONS[audience]} audience={copy.cardLabel} title={copy.cardTitle} steps={steps} />
      </Container>
    </section>
  );
}
