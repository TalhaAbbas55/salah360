import { Plane, SlidersHorizontal, UsersRound } from 'lucide-react';

import { Reveal } from '@/components/ui/reveal';
import type { Lang } from '@/lib/i18n/lang';

import { MasjidPin } from './masjid-pin';

const PINS = [
  { left: '28%', top: '36%' },
  { left: '66%', top: '30%' },
  { left: '72%', top: '62%' },
  { left: '36%', top: '70%' },
  { left: '50%', top: '22%' },
];

const COPY: Record<
  Lang,
  {
    from: string;
    to: string;
    radiusFilter: string;
    prayerFilter: string;
    womenFilter: string;
    masjid: string;
    distance: string;
    open: string;
  }
> = {
  en: {
    from: 'Lahore',
    to: 'Istanbul',
    radiusFilter: 'Within 1 km',
    prayerFilter: 'Asr · 5:00–5:30 PM',
    womenFilter: 'Women’s area',
    masjid: 'Masjid Al-Noor',
    distance: '450 m · Asr Jamaat 5:15 PM',
    open: 'Open',
  },
  ur: {
    from: 'لاہور',
    to: 'استنبول',
    radiusFilter: '1 کلومیٹر کے اندر',
    prayerFilter: 'عصر · 5:00–5:30 PM',
    womenFilter: 'خواتین کی جگہ',
    masjid: 'مسجد النور',
    distance: '450 میٹر · عصر کی جماعت 5:15 PM',
    open: 'کھلی ہے',
  },
};

/**
 * A stylised city map: the traveller's position, the search radius and the Masjids inside it,
 * with the app's filters along the top. Decorative; the section text carries the meaning.
 * Kept `dir="ltr"` throughout — the route strip's left-to-right arrow, and every pin's
 * position, are geometry, not reading order, so they stay fixed in both languages.
 */
export function TravelMap({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  return (
    <div
      dir="ltr"
      aria-hidden="true"
      className="relative overflow-hidden rounded-[28px] border border-border bg-surface text-start card-shadow-lg"
    >
      {/* Route strip */}
      <div className="flex items-center gap-3 border-b border-border px-5 py-3.5 text-sm">
        <span className="font-medium">{copy.from}</span>
        <span className="relative h-px flex-1 bg-[repeating-linear-gradient(90deg,var(--border-strong)_0_6px,transparent_6px_12px)]">
          <Plane className="absolute left-[62%] top-1/2 size-4 -translate-y-1/2 rotate-45 text-primary" />
        </span>
        <span className="font-medium">{copy.to}</span>
      </div>

      <div className="relative h-[360px] bg-surface-muted/60 sm:h-[420px]">
        {/* Streets, a river and a park, drawn loosely */}
        <svg
          className="absolute inset-0 size-full text-border-strong"
          viewBox="0 0 400 400"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M-20 300C80 260 120 330 220 290S360 220 420 240"
            fill="none"
            stroke="var(--primary)"
            strokeOpacity=".14"
            strokeWidth="18"
          />
          <rect x="250" y="70" width="90" height="60" rx="14" fill="var(--primary)" fillOpacity=".06" />
          <g stroke="currentColor" strokeWidth="1.2" fill="none" opacity=".75">
            <path d="M0 120h400M0 210h400M90 0v400M190 0v400M300 0v400" />
            <path d="M0 60l400 110M40 400L260 0" opacity=".6" />
          </g>
          <g stroke="currentColor" strokeWidth=".6" fill="none" opacity=".45">
            <path d="M0 165h400M0 260h400M0 350h400M140 0v400M245 0v400M350 0v400" />
          </g>
        </svg>

        {/* Filters */}
        <div className="absolute inset-x-4 top-4 flex flex-wrap gap-2 text-[11px] font-medium sm:text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-background">
            <SlidersHorizontal className="size-3.5" /> {copy.radiusFilter}
          </span>
          <span className="rounded-full border border-border bg-surface px-3 py-1.5 text-muted">
            {copy.prayerFilter}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary-soft px-3 py-1.5 text-primary-ink">
            <UsersRound className="size-3.5" /> {copy.womenFilter}
          </span>
        </div>

        {/* Radius */}
        <svg
          className="absolute left-1/2 top-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2 sm:size-[340px]"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="48" fill="var(--primary)" fillOpacity=".05" />
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="var(--primary)"
            strokeOpacity=".5"
            strokeWidth=".5"
            strokeDasharray="2 2"
            className="animate-dash"
          />
        </svg>

        {/* You */}
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="absolute -inset-1 animate-ping-soft rounded-full bg-[#3b82f6]/40" />
          <span className="relative block size-4 rounded-full bg-[#3b82f6] ring-4 ring-white" />
        </span>

        {PINS.map((pin, index) => (
          <Reveal
            key={pin.left + pin.top}
            delay={0.25 + index * 0.15}
            y={-10}
            className="absolute -translate-x-1/2 -translate-y-full"
            style={{ left: pin.left, top: pin.top }}
          >
            <MasjidPin selected={index === 2} />
          </Reveal>
        ))}

        {/* Selected Masjid */}
        <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl border border-border bg-surface/95 p-3.5 backdrop-blur card-shadow-lg sm:inset-x-auto sm:right-4 sm:w-[300px]">
          <MasjidPin selected />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{copy.masjid}</p>
            <p className="text-xs text-muted">{copy.distance}</p>
          </div>
          <span className="rounded-full bg-primary-soft px-2 py-1 text-[10px] font-medium text-primary-ink">
            {copy.open}
          </span>
        </div>
      </div>
    </div>
  );
}
