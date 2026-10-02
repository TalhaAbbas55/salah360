import { Check, Clock, EyeOff } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { SerifAccent } from '@/components/ui/serif-accent';
import { getVerificationMethods } from '@/content/verification';
import type { Lang } from '@/lib/i18n/lang';

const COPY: Record<
  Lang,
  { eyebrow: string; title: React.ReactNode; description: string; recommended: string; privacyNote: string }
> = {
  en: {
    eyebrow: 'Verification',
    title: (
      <>
        Two ways to <SerifAccent className="text-primary">verify your Masjid.</SerifAccent>
      </>
    ),
    description:
      'Only a verified admin can publish for a Masjid. The app checks your Masjid’s Google Maps listing and offers the quickest way it can.',
    recommended: 'Recommended',
    privacyNote:
      'The photo and phone number you send are seen only by the Salah360 team reviewing your request, and are never shown in the app.',
  },
  ur: {
    eyebrow: 'تصدیق',
    title: (
      <>
        اپنی مسجد کی <SerifAccent className="text-primary">تصدیق کے دو طریقے۔</SerifAccent>
      </>
    ),
    description:
      'کسی مسجد کے لیے صرف تصدیق شدہ ایڈمن ہی کچھ شائع کر سکتا ہے۔ ایپ آپ کی مسجد کی گوگل میپس لسٹنگ دیکھ کر سب سے تیز دستیاب طریقہ پیش کرتی ہے۔',
    recommended: 'تجویز کردہ',
    privacyNote:
      'آپ کی بھیجی ہوئی تصویر اور فون نمبر صرف آپ کی درخواست کا جائزہ لینے والی Salah360 ٹیم دیکھتی ہے، اور یہ ایپ میں کبھی نہیں دکھائے جاتے۔',
  },
};

/** How a Masjid Admin gets verified: over WhatsApp, or by sending a photo for review. */
export function Verification({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  return (
    <section
      id="verification"
      aria-labelledby="verification-title"
      className="relative border-t border-border bg-surface-muted/40 py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          id="verification-title"
          align="center"
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <ul className="mt-14 grid gap-5 lg:grid-cols-2">
          {getVerificationMethods(lang).map(({ id, icon: Icon, recommended, title, time, body, points }, index) => (
            <li key={id}>
              <Reveal delay={index * 0.08} className="h-full">
                <article
                  className={`flex h-full flex-col rounded-[28px] border p-6 card-shadow sm:p-9 ${
                    recommended ? 'border-primary/40 bg-surface' : 'border-border bg-surface'
                  }`}
                >
                  <header className="flex items-start justify-between gap-3">
                    <span
                      className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${
                        recommended ? 'bg-primary text-primary-foreground' : 'bg-primary-soft text-primary-ink'
                      }`}
                    >
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    {recommended ? <Badge tone="primary">{copy.recommended}</Badge> : null}
                  </header>
                  <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em]">{title}</h3>
                  <p className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary">
                    <Clock className="size-4" aria-hidden="true" />
                    {time}
                  </p>
                  <p className="mt-4 leading-relaxed text-muted">{body}</p>
                  <ul className="mt-6 space-y-3 border-t border-border pt-6 text-[15px]">
                    {points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-ink">
                          <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal
          delay={0.15}
          className="mx-auto mt-8 flex max-w-2xl items-start gap-3 text-pretty text-sm leading-relaxed text-muted"
        >
          <EyeOff className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          <p>{copy.privacyNote}</p>
        </Reveal>
      </Container>
    </section>
  );
}
