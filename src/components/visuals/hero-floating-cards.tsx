import { Bell, MapPin, UsersRound } from 'lucide-react';

import type { Lang } from '@/lib/i18n/lang';

const COPY: Record<
  Lang,
  {
    nextJamaat: string;
    open: string;
    asr: string;
    distance: string;
    womenArea: string;
    updatedTitle: string;
    updatedTime: string;
    updatedBody: string;
  }
> = {
  en: {
    nextJamaat: 'Next Jamaat',
    open: 'Open',
    asr: 'Asr',
    distance: 'Masjid Al-Noor · 0.6 km',
    womenArea: 'Women’s area available',
    updatedTitle: 'Prayer time updated',
    updatedTime: 'now',
    updatedBody: 'Isha Jamaat at Masjid Al-Noor is now 8:30 PM.',
  },
  ur: {
    nextJamaat: 'اگلی جماعت',
    open: 'کھلی ہے',
    asr: 'عصر',
    distance: 'مسجد النور · 0.6 کلومیٹر',
    womenArea: 'خواتین کی جگہ دستیاب',
    updatedTitle: 'نماز کا وقت تبدیل ہوا',
    updatedTime: 'ابھی',
    updatedBody: 'عشاء کی جماعت مسجد النور میں اب 8:30 PM ہے۔',
  },
};

/**
 * Two glass cards floating beside the hero globe, showing what the app surfaces. Decorative,
 * and positioned relative to the globe rather than to reading direction, so they keep the
 * same left/right placement in both languages.
 */
export function HeroFloatingCards({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute left-0 top-[6%] origin-top-left scale-[0.86] animate-float sm:top-[12%] sm:scale-100 lg:left-[2%]">
        <div className="hairline w-[210px] rounded-2xl border border-border bg-surface-glass p-3.5 backdrop-blur-xl card-shadow-lg sm:w-[232px]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-subtle">{copy.nextJamaat}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-medium text-primary-ink">
              <span className="size-1.5 rounded-full bg-primary" />
              {copy.open}
            </span>
          </div>
          <p className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-semibold tracking-[-0.03em]">{copy.asr}</span>
            <span className="text-lg font-medium tabular-nums text-primary">5:15 PM</span>
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
            <MapPin className="size-3.5" />
            {copy.distance}
          </p>
          <p className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-surface-muted px-2 py-1 text-[11px] text-muted">
            <UsersRound className="size-3" />
            {copy.womenArea}
          </p>
        </div>
      </div>

      <div className="absolute bottom-[8%] right-0 hidden animate-float-delayed sm:block lg:-right-4">
        <div className="hairline flex w-[228px] items-start gap-3 rounded-2xl border border-border bg-surface-glass p-3.5 backdrop-blur-xl card-shadow-lg sm:w-[256px]">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Bell className="size-4" />
          </span>
          <span className="min-w-0">
            <span className="flex items-center justify-between gap-2">
              <span className="text-[13px] font-semibold">{copy.updatedTitle}</span>
              <span className="text-[10px] text-subtle">{copy.updatedTime}</span>
            </span>
            <span className="mt-0.5 block text-xs leading-snug text-muted">{copy.updatedBody}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
