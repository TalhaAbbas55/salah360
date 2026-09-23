'use client';

import { Bell, MapPin, UsersRound } from 'lucide-react';
import { AnimatePresence, m, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';

import { getSamplePrayers } from '@/content/prayers';
import { dirOf, type Lang } from '@/lib/i18n/lang';

const ADVANCE_MS = 3600;

const COPY: Record<
  Lang,
  {
    today: string;
    localTime: string;
    tabList: string;
    jamaatSuffix: string;
    azan: string;
    distance: string;
    womenArea: string;
    noWomenArea: string;
    following: string;
  }
> = {
  en: {
    today: 'Today at Masjid Al-Noor',
    localTime: 'Masjid local time',
    tabList: 'Daily prayers',
    jamaatSuffix: 'Jamaat',
    azan: 'Azan',
    distance: '0.6 km away',
    womenArea: 'Women’s area',
    noWomenArea: 'No women’s area for this prayer',
    following: 'Following',
  },
  ur: {
    today: 'آج مسجد النور میں',
    localTime: 'مسجد کا مقامی وقت',
    tabList: 'روزانہ کی نمازیں',
    jamaatSuffix: 'کی جماعت',
    azan: 'اذان',
    distance: '0.6 کلومیٹر دور',
    womenArea: 'خواتین کی جگہ',
    noWomenArea: 'اس نماز کے لیے خواتین کی جگہ نہیں',
    following: 'فالو کر رہے ہیں',
  },
};

/**
 * Fajr → Isha as tabs. It steps through the day on its own while visible, until the visitor
 * picks a prayer (then it stays put). Arrow keys move between prayers, following the reading
 * direction: in RTL, ArrowRight moves to the previous tab and ArrowLeft to the next one.
 */
export function PrayerTimeline({ lang }: { lang: Lang }) {
  const prayers = getSamplePrayers(lang);
  const copy = COPY[lang];
  const rtl = dirOf(lang) === 'rtl';
  const [activeIndex, setActiveIndex] = useState(2);
  const [autoPlay, setAutoPlay] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(rootRef, { amount: 0.4 });
  const reducedMotion = useReducedMotion();
  const baseId = useId();
  const active = prayers[activeIndex];

  useEffect(() => {
    if (!autoPlay || !inView || reducedMotion) return;
    const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % prayers.length), ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [autoPlay, inView, reducedMotion, prayers.length]);

  const select = (index: number, focus = false) => {
    setAutoPlay(false);
    setActiveIndex(index);
    if (focus) tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = prayers.length - 1;
    const forwardKey = rtl ? 'ArrowLeft' : 'ArrowRight';
    const backwardKey = rtl ? 'ArrowRight' : 'ArrowLeft';
    const next =
      event.key === forwardKey
        ? (activeIndex + 1) % (last + 1)
        : event.key === backwardKey
          ? (activeIndex - 1 + last + 1) % (last + 1)
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    select(next, true);
  };

  const progress = (activeIndex / (prayers.length - 1)) * 100;

  return (
    <div ref={rootRef} className="rounded-[28px] border border-border bg-surface p-5 card-shadow-lg sm:p-7">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{copy.today}</p>
        <p className="text-xs text-subtle">{copy.localTime}</p>
      </div>

      <div className="relative mt-7">
        <div aria-hidden="true" className="absolute left-[10%] right-[10%] top-[18px] h-px bg-border" />
        <div
          aria-hidden="true"
          className="absolute top-[18px] h-px bg-primary transition-[width] duration-700 ease-out ltr:left-[10%] rtl:right-[10%]"
          style={{ width: `${progress * 0.8}%` }}
        />
        <div role="tablist" aria-label={copy.tabList} onKeyDown={onKeyDown} className="relative grid grid-cols-5">
          {prayers.map((prayer, index) => {
            const selected = index === activeIndex;
            const passed = index < activeIndex;
            return (
              <button
                key={prayer.key}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${prayer.key}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(index)}
                className="group flex flex-col items-center gap-2.5 rounded-xl py-1 focus-visible:outline-offset-0"
              >
                <span
                  className={`relative flex size-9 items-center justify-center rounded-full border text-[11px] font-semibold transition-all duration-500 ${
                    selected
                      ? 'scale-110 border-primary bg-primary text-primary-foreground shadow-[0_0_0_6px_var(--glow)]'
                      : passed
                        ? 'border-primary/40 bg-primary-soft text-primary-ink'
                        : 'border-border bg-surface text-subtle group-hover:border-primary/40'
                  }`}
                >
                  {prayer.name.slice(0, 1)}
                </span>
                <span className={`text-xs font-medium sm:text-sm ${selected ? 'text-foreground' : 'text-muted'}`}>
                  {prayer.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active.key}`}
        className="mt-7 rounded-2xl border border-border bg-surface-muted/50 p-5"
      >
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={active.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-subtle">
                  {active.name} {copy.jamaatSuffix}
                </p>
                <p className="mt-1.5 text-4xl font-semibold tabular-nums tracking-[-0.04em] sm:text-5xl">
                  {active.jamaat}
                </p>
              </div>
              <div className="text-end">
                <p className="text-xs text-subtle">{copy.azan}</p>
                <p className="mt-1 text-lg font-medium tabular-nums text-muted">{active.azan}</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-muted">
                <MapPin className="size-3.5 text-primary" aria-hidden="true" /> {copy.distance}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 ${
                  active.womenArea
                    ? 'border-primary/25 bg-primary-soft text-primary-ink'
                    : 'border-border bg-surface text-subtle'
                }`}
              >
                <UsersRound className="size-3.5" aria-hidden="true" />
                {active.womenArea ? copy.womenArea : copy.noWomenArea}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-muted">
                <Bell className="size-3.5 text-primary" aria-hidden="true" /> {copy.following}
              </span>
            </div>
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
