import { CalendarPlus, MapPin, Navigation } from 'lucide-react';

import { getJanazahFields } from '@/content/features';
import { getDashboardPrayers } from '@/content/masjids';
import type { Lang } from '@/lib/i18n/lang';

/** Small, decorative product vignettes for the three headline feature cards. */

const RADIUS_LABEL: Record<Lang, string> = { en: 'Within 1 km', ur: '1 کلومیٹر کے اندر' };

export function RadiusIllustration({ lang }: { lang: Lang }) {
  const pins = [
    { left: '26%', top: '34%', delay: '0s' },
    { left: '70%', top: '28%', delay: '0.4s' },
    { left: '62%', top: '70%', delay: '0.8s' },
    { left: '32%', top: '72%', delay: '1.2s' },
  ];
  return (
    <div
      aria-hidden="true"
      className="relative h-44 overflow-hidden rounded-2xl border border-border bg-surface-muted/60"
    >
      <svg className="absolute inset-0 size-full text-border-strong" preserveAspectRatio="none">
        <defs>
          <pattern id="streets" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M0 18h36M18 0v36" stroke="currentColor" strokeWidth="0.6" opacity=".6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#streets)" />
      </svg>
      <div className="absolute left-1/2 top-1/2 size-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-primary/50 bg-primary/5" />
      <div className="absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/25" />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute inset-0 animate-ping-soft rounded-full bg-primary/40" />
        <span className="relative flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground ring-4 ring-surface">
          <Navigation className="size-3.5 fill-current" />
        </span>
      </span>
      {pins.map((pin) => (
        <span
          key={pin.left + pin.top}
          className="absolute flex size-6 -translate-x-1/2 -translate-y-1/2 animate-float items-center justify-center rounded-full border border-border bg-surface text-primary card-shadow"
          style={{ left: pin.left, top: pin.top, animationDelay: pin.delay }}
        >
          <MapPin className="size-3" />
        </span>
      ))}
      <span className="absolute bottom-3 left-3 rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] font-medium text-muted">
        {RADIUS_LABEL[lang]}
      </span>
    </div>
  );
}

const PRAYER_TABLE_HEADERS: Record<Lang, readonly [string, string, string]> = {
  en: ['Prayer', 'Azan', 'Jamaat'],
  ur: ['نماز', 'اذان', 'جماعت'],
};

export function PrayerTimesIllustration({ lang }: { lang: Lang }) {
  const [prayer, azan, jamaat] = PRAYER_TABLE_HEADERS[lang];
  return (
    <div aria-hidden="true" className="h-44 overflow-hidden rounded-2xl border border-border bg-surface-muted/60 p-3">
      <div className="grid grid-cols-[1fr_auto_auto] gap-x-5 px-2 pb-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-subtle">
        <span>{prayer}</span>
        <span>{azan}</span>
        <span>{jamaat}</span>
      </div>
      <ul className="space-y-1">
        {getDashboardPrayers(lang)
          .slice(0, 4)
          .map((entry, index) => (
            <li
              key={entry.name}
              className={`grid grid-cols-[1fr_auto_auto] items-center gap-x-5 rounded-lg px-2 py-1.5 text-[13px] tabular-nums ${
                index === 2 ? 'bg-surface font-medium text-foreground card-shadow' : 'text-muted'
              }`}
            >
              <span className="flex items-center gap-1.5">
                {index === 2 ? <span className="size-1.5 rounded-full bg-primary" /> : null}
                {entry.name}
              </span>
              <span>{entry.azan}</span>
              <span className={index === 2 ? 'text-primary' : ''}>{entry.jamaat}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}

const JANAZAH_COPY: Record<Lang, { label: string; actions: string }> = {
  en: { label: 'Janazah', actions: 'Add to calendar · Open in Maps' },
  ur: { label: 'نمازِ جنازہ', actions: 'کیلنڈر میں شامل کریں · نقشے میں کھولیں' },
};

export function JanazahIllustration({ lang }: { lang: Lang }) {
  const copy = JANAZAH_COPY[lang];
  return (
    <div aria-hidden="true" className="h-44 overflow-hidden rounded-2xl border border-border bg-surface-muted/60 p-4">
      <div className="flex items-center gap-3">
        <span className="size-10 rounded-full bg-[linear-gradient(135deg,var(--border-strong),var(--surface-muted))]" />
        <span className="flex-1 space-y-1.5">
          <span className="block h-2.5 w-28 rounded-full bg-border-strong" />
          <span className="block h-2 w-20 rounded-full bg-border" />
        </span>
        <span className="text-[11px] text-subtle">{copy.label}</span>
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-2">
        {getJanazahFields(lang).map((field) => (
          <li
            key={field}
            className="rounded-lg border border-border bg-surface px-2.5 py-2 text-[11px] leading-tight text-muted"
          >
            {field}
          </li>
        ))}
      </ul>
      <span className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] text-subtle">
        <CalendarPlus className="size-3.5" /> {copy.actions}
      </span>
    </div>
  );
}
