import { Clock, DoorOpen, LocateFixed, Ruler, UsersRound } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { SerifAccent } from '@/components/ui/serif-accent';
import { TravelMap } from '@/components/visuals/travel-map';
import type { Lang } from '@/lib/i18n/lang';

const TOOL_ICONS = [Ruler, LocateFixed, Clock, UsersRound, DoorOpen];

const COPY: Record<Lang, { eyebrow: string; title: React.ReactNode; description: string; tools: readonly string[] }> = {
  en: {
    eyebrow: 'Travel',
    title: (
      <>
        Your Masjid, <SerifAccent className="text-primary">Wherever You Go.</SerifAccent>
      </>
    ),
    description:
      'Whether you’re traveling across your city or visiting another country, Salah360 helps you discover Masjids around you — and whether you can make their next Jamaat.',
    tools: [
      'Radius search up to 20 km',
      'Nearby Masjid discovery',
      'Filter by Jamaat time',
      'Women’s area filter',
      'Open status & Masjid info',
    ],
  },
  ur: {
    eyebrow: 'سفر',
    title: (
      <>
        آپ کی مسجد، <SerifAccent className="text-primary">جہاں بھی آپ جائیں۔</SerifAccent>
      </>
    ),
    description:
      'چاہے آپ اپنے شہر میں سفر کر رہے ہوں یا کسی دوسرے ملک میں، Salah360 آپ کے ارد گرد مساجد دریافت کرنے — اور یہ جاننے میں مدد دیتا ہے کہ کیا آپ ان کی اگلی جماعت میں شامل ہو سکتے ہیں۔',
    tools: [
      '20 کلومیٹر تک رداس میں تلاش',
      'قریبی مسجد کی دریافت',
      'جماعت کے وقت کے مطابق فلٹر',
      'خواتین کی جگہ کا فلٹر',
      'کھلی حالت اور مسجد کی معلومات',
    ],
  },
};

export function Travel({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  return (
    <section aria-labelledby="travel-title" className="relative py-24 sm:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <TravelMap lang={lang} />
        </Reveal>
        <div className="order-1 lg:order-2">
          <SectionHeading id="travel-title" eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
          <ul className="mt-9 grid gap-3 sm:grid-cols-2">
            {copy.tools.map((label, index) => {
              const Icon = TOOL_ICONS[index];
              return (
                <li key={label}>
                  <Reveal
                    delay={index * 0.05}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-medium"
                  >
                    <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                    {label}
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
