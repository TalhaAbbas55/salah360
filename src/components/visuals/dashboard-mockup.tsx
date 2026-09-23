import { BadgeCheck, Bell, CalendarDays, ChevronRight, HandHeart, MapPin, Pencil, Users } from 'lucide-react';

import { LogoMark } from '@/components/layout/logo';
import { getDashboardPrayers } from '@/content/masjids';
import type { Lang } from '@/lib/i18n/lang';

const COPY: Record<
  Lang,
  {
    dashboardTitle: string;
    greeting: string;
    masjidName: string;
    address: string;
    verified: string;
    gate: string;
    stats: readonly [string, string, string];
    prayerTimes: string;
    edit: string;
    tableHeaders: readonly [string, string, string];
    changeNotice: string;
    tafseerTitle: string;
    tafseerRepeat: string;
    notifyFollowers: string;
    janazahTitle: string;
    janazahBody: string;
    eventTitle: string;
    eventBody: string;
  }
> = {
  en: {
    dashboardTitle: 'Masjid dashboard',
    greeting: 'Assalamu alaikum',
    masjidName: 'Masjid Al-Noor',
    address: 'Model Town, Lahore',
    verified: 'Verified',
    gate: 'Gate: Open',
    stats: ['Followers', 'Upcoming events', 'Notified this week'],
    prayerTimes: 'Prayer times',
    edit: 'Edit',
    tableHeaders: ['Prayer', 'Azan', 'Jamaat'],
    changeNotice: 'Asr Jamaat → 5:30 from Monday · followers notified',
    tafseerTitle: 'Weekly Tafseer',
    tafseerRepeat: 'Repeats weekly · Fridays after Isha',
    notifyFollowers: 'Notify followers',
    janazahTitle: 'Janazah Alert',
    janazahBody: 'Notify followers straight away',
    eventTitle: 'Create new event',
    eventBody: 'Once, daily, weekly or monthly',
  },
  ur: {
    dashboardTitle: 'مسجد ڈیش بورڈ',
    greeting: 'السلام علیکم',
    masjidName: 'مسجد النور',
    address: 'ماڈل ٹاؤن، لاہور',
    verified: 'تصدیق شدہ',
    gate: 'گیٹ: کھلا',
    stats: ['فالورز', 'آنے والے پروگرامز', 'اس ہفتے مطلع کیا گیا'],
    prayerTimes: 'نماز کے اوقات',
    edit: 'ترمیم کریں',
    tableHeaders: ['نماز', 'اذان', 'جماعت'],
    changeNotice: 'عصر کی جماعت → پیر سے 5:30 · فالورز کو مطلع کر دیا گیا',
    tafseerTitle: 'ہفتہ وار تفسیر',
    tafseerRepeat: 'ہر ہفتے · جمعہ کو عشاء کے بعد',
    notifyFollowers: 'فالورز کو مطلع کریں',
    janazahTitle: 'نمازِ جنازہ کی اطلاع',
    janazahBody: 'فالورز کو فوراً مطلع کریں',
    eventTitle: 'نیا پروگرام بنائیں',
    eventBody: 'ایک بار، روزانہ، ہفتہ وار یا ماہانہ',
  },
};

/**
 * The Masjid Admin dashboard, reduced to what the admin app really offers: verification,
 * open/closed status, prayer times, events and Janazah alerts. Sample data; decorative.
 * The toggle switches keep their physical thumb position in both languages, matching how
 * this mockup's other geometry (window-bar dots, card layout) also isn't mirrored.
 */
export function DashboardMockup({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  const prayers = getDashboardPrayers(lang);
  const [prayerHeader, azanHeader, jamaatHeader] = copy.tableHeaders;

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-[28px] border border-white/10 bg-[#081f18] text-band-foreground shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)]"
    >
      {/* Window bar */}
      <div className="flex items-center gap-2 border-b border-white/[0.07] px-5 py-3">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="ms-3 flex items-center gap-2 text-xs text-band-muted">
          <LogoMark className="size-4" /> {copy.dashboardTitle}
        </span>
      </div>

      <div className="grid gap-4 p-4 sm:p-5 md:grid-cols-[1.25fr_1fr]">
        {/* Profile */}
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 md:col-span-2">
          <p className="text-xs text-band-muted">{copy.greeting}</p>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#0f7a58,#064e3b)]">
                <svg viewBox="0 0 24 24" className="size-5" fill="#fff">
                  <path d="M5 20v-6.5C5 9.6 8.3 7 12 4.5c3.7 2.5 7 5.1 7 9V20z" />
                </svg>
              </span>
              <div>
                <p className="flex items-center gap-1.5 font-semibold">
                  {copy.masjidName} <BadgeCheck className="size-4 text-[#34d399]" />
                </p>
                <p className="flex items-center gap-1 text-xs text-band-muted">
                  <MapPin className="size-3" /> {copy.address}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#34d399]/15 px-2.5 py-1 font-medium text-[#6ee7b7]">
                <span className="size-1.5 rounded-full bg-[#34d399]" /> {copy.verified}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-2.5 py-1 text-band-muted">
                {copy.gate}
                <span className="relative h-3.5 w-6 rounded-full bg-[#10b981]">
                  <span className="absolute right-0.5 top-0.5 size-2.5 rounded-full bg-white" />
                </span>
              </span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {(
              [
                [Users, copy.stats[0], '1,240'],
                [CalendarDays, copy.stats[1], '3'],
                [Bell, copy.stats[2], '4'],
              ] as const
            ).map(([Icon, label, value]) => (
              <div key={label} className="rounded-xl bg-white/[0.04] px-2 py-2.5">
                <Icon className="mx-auto size-3.5 text-band-muted" />
                <p className="mt-1 text-lg font-semibold tabular-nums">{value}</p>
                <p className="text-[10px] text-band-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Prayer times */}
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">{copy.prayerTimes}</p>
            <span className="inline-flex items-center gap-1 text-[11px] text-band-muted">
              <Pencil className="size-3" /> {copy.edit}
            </span>
          </div>
          <div className="mt-3 grid grid-cols-[1fr_auto_auto] gap-x-4 text-[10px] uppercase tracking-[0.12em] text-band-muted">
            <span>{prayerHeader}</span>
            <span>{azanHeader}</span>
            <span>{jamaatHeader}</span>
          </div>
          <ul className="mt-1.5 space-y-0.5 text-[13px] tabular-nums">
            {prayers.map((prayer, index) => (
              <li
                key={prayer.name}
                className={`grid grid-cols-[1fr_auto_auto] gap-x-4 rounded-lg px-1.5 py-1.5 ${index === 2 ? 'bg-white/[0.06]' : ''}`}
              >
                <span>{prayer.name}</span>
                <span className="text-band-muted">{prayer.azan}</span>
                <span className="font-medium text-[#6ee7b7]">{prayer.jamaat}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 rounded-lg bg-[#d6ae62]/10 px-2.5 py-2 text-[11px] text-[#e6c88a]">{copy.changeNotice}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
            <p className="text-sm font-semibold">{copy.tafseerTitle}</p>
            <p className="mt-0.5 text-xs text-band-muted">{copy.tafseerRepeat}</p>
            <div className="mt-3 flex items-center justify-between rounded-lg bg-white/[0.04] px-2.5 py-2 text-xs">
              <span className="text-band-muted">{copy.notifyFollowers}</span>
              <span className="relative h-4 w-7 rounded-full bg-[#10b981]">
                <span className="absolute right-0.5 top-0.5 size-3 rounded-full bg-white" />
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
            <span className="flex size-9 items-center justify-center rounded-xl bg-white/[0.07]">
              <HandHeart className="size-4 text-band-muted" />
            </span>
            <span className="flex-1">
              <span className="block text-sm font-semibold">{copy.janazahTitle}</span>
              <span className="block text-xs text-band-muted">{copy.janazahBody}</span>
            </span>
            <ChevronRight className="size-4 text-band-muted rtl:rotate-180" />
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
            <span className="flex size-9 items-center justify-center rounded-xl bg-white/[0.07]">
              <CalendarDays className="size-4 text-band-muted" />
            </span>
            <span className="flex-1">
              <span className="block text-sm font-semibold">{copy.eventTitle}</span>
              <span className="block text-xs text-band-muted">{copy.eventBody}</span>
            </span>
            <ChevronRight className="size-4 text-band-muted rtl:rotate-180" />
          </div>
        </div>
      </div>
    </div>
  );
}
