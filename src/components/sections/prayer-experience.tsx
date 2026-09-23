import { Check } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { SerifAccent } from '@/components/ui/serif-accent';
import { GeometricPattern } from '@/components/visuals/geometric-pattern';
import { PrayerTimeline } from '@/components/visuals/prayer-timeline';
import { getPrayerPoints } from '@/content/prayers';
import type { Lang } from '@/lib/i18n/lang';

const COPY: Record<Lang, { eyebrow: string; title: React.ReactNode; description: string; footnote: string }> = {
  en: {
    eyebrow: 'Prayer times',
    title: (
      <>
        Know When. Know Where. <SerifAccent className="text-primary">Never Miss Jamaat.</SerifAccent>
      </>
    ),
    description:
      'Each Masjid publishes its own Azan and Jamaat times, so what you see is what the Masjid actually keeps.',
    footnote:
      'Example times. Salah360 shows the times each Masjid publishes, and calculates today’s prayer periods for your location from the calculation settings you choose.',
  },
  ur: {
    eyebrow: 'نماز کے اوقات',
    title: (
      <>
        وقت جانیں۔ جگہ جانیں۔ <SerifAccent className="text-primary">جماعت کبھی نہ چھوٹے۔</SerifAccent>
      </>
    ),
    description: 'ہر مسجد اپنے اذان اور جماعت کے اوقات شائع کرتی ہے، تو جو آپ دیکھتے ہیں وہی مسجد اصل میں رکھتی ہے۔',
    footnote:
      'یہ مثالی اوقات ہیں۔ Salah360 ہر مسجد کے شائع کردہ اوقات دکھاتا ہے، اور آپ کی منتخب کردہ حساب کی ترتیبات سے آپ کی جگہ کے آج کے نماز کے اوقات معلوم کرتا ہے۔',
  },
};

export function PrayerExperience({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  return (
    <section
      aria-labelledby="prayer-title"
      className="relative overflow-hidden border-t border-border bg-surface-muted/40 py-24 sm:py-32"
    >
      <GeometricPattern fade="center" size={72} className="opacity-70" />
      <Container className="relative">
        <SectionHeading
          id="prayer-title"
          align="center"
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <ul className="space-y-7">
            {getPrayerPoints(lang).map((point, index) => (
              <li key={point.title}>
                <Reveal delay={index * 0.07} className="flex gap-4">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-semibold tracking-[-0.01em]">{point.title}</span>
                    <span className="mt-1 block leading-relaxed text-muted">{point.body}</span>
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={0.1}>
            <PrayerTimeline lang={lang} />
            <p className="mt-4 text-pretty text-center text-xs leading-relaxed text-subtle">{copy.footnote}</p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
