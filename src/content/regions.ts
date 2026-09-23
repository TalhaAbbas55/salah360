import type { Lang } from '@/lib/i18n/lang';

/**
 * Places shown on the world visuals. These illustrate the vision of a worldwide network —
 * they are NOT a list of where Salah360 is live, and the copy around them must never say so.
 *
 * `name` is an internal label for readability only (never rendered) — no translation needed.
 */
export type Place = { name: string; lat: number; lng: number };

export const GLOBE_PLACES: readonly Place[] = [
  { name: 'Lahore', lat: 31.55, lng: 74.34 },
  { name: 'Karachi', lat: 24.86, lng: 67.01 },
  { name: 'Islamabad', lat: 33.68, lng: 73.05 },
  { name: 'Makkah', lat: 21.42, lng: 39.83 },
  { name: 'Madinah', lat: 24.47, lng: 39.61 },
  { name: 'Dubai', lat: 25.2, lng: 55.27 },
  { name: 'Istanbul', lat: 41.01, lng: 28.98 },
  { name: 'Cairo', lat: 30.04, lng: 31.24 },
  { name: 'London', lat: 51.51, lng: -0.13 },
  { name: 'Birmingham', lat: 52.49, lng: -1.89 },
  { name: 'Paris', lat: 48.86, lng: 2.35 },
  { name: 'Berlin', lat: 52.52, lng: 13.4 },
  { name: 'New York', lat: 40.71, lng: -74.0 },
  { name: 'Toronto', lat: 43.65, lng: -79.38 },
  { name: 'Chicago', lat: 41.88, lng: -87.63 },
  { name: 'Houston', lat: 29.76, lng: -95.37 },
  { name: 'Dhaka', lat: 23.81, lng: 90.41 },
  { name: 'Kuala Lumpur', lat: 3.14, lng: 101.69 },
  { name: 'Jakarta', lat: -6.2, lng: 106.85 },
  { name: 'Lagos', lat: 6.52, lng: 3.38 },
  { name: 'Nairobi', lat: -1.29, lng: 36.82 },
  { name: 'Johannesburg', lat: -26.2, lng: 28.05 },
  { name: 'Sydney', lat: -33.87, lng: 151.21 },
  { name: 'Casablanca', lat: 33.57, lng: -7.59 },
];

/** Pairs of GLOBE_PLACES indexes joined by an arc on the hero globe. */
export const GLOBE_ARCS: readonly (readonly [number, number])[] = [
  [0, 3],
  [3, 8],
  [8, 12],
  [5, 16],
  [16, 17],
  [6, 10],
  [12, 13],
  [3, 20],
  [17, 22],
  [9, 0],
];

export type Region = Place & { label: string; labelSide?: 'left' | 'right' | 'below' };

/** Coordinates and label placement are language-agnostic; only the visible label changes. */
type RegionFacts = { name: string; lat: number; lng: number; labelSide?: Region['labelSide'] };
const REGION_FACTS: readonly RegionFacts[] = [
  { name: 'Lahore', lat: 30.4, lng: 70.0 },
  { name: 'Riyadh', lat: 24.2, lng: 44.5, labelSide: 'left' },
  { name: 'Dubai', lat: 24.4, lng: 54.4, labelSide: 'below' },
  { name: 'London', lat: 52.8, lng: -1.8, labelSide: 'left' },
  { name: 'Europe', lat: 47.5, lng: 12.0, labelSide: 'below' },
  { name: 'USA', lat: 38.5, lng: -97.0 },
  { name: 'Canada', lat: 53.5, lng: -106.0 },
  { name: 'Istanbul', lat: 39.2, lng: 34.5 },
  { name: 'Kuala Lumpur', lat: 0.5, lng: 108.0 },
  { name: 'Africa', lat: 6.0, lng: 18.0 },
  { name: 'Dhaka', lat: 23.8, lng: 90.4 },
  { name: 'Australia', lat: -27.0, lng: 135.0 },
];

const REGION_LABELS: Record<Lang, readonly string[]> = {
  en: [
    'Pakistan',
    'Saudi Arabia',
    'UAE',
    'United Kingdom',
    'Europe',
    'USA',
    'Canada',
    'Türkiye',
    'Malaysia & Indonesia',
    'Africa',
    'Bangladesh',
    'Australia',
  ],
  ur: [
    'پاکستان',
    'سعودی عرب',
    'متحدہ عرب امارات',
    'برطانیہ',
    'یورپ',
    'امریکہ',
    'کینیڈا',
    'ترکیہ',
    'ملائیشیا اور انڈونیشیا',
    'افریقہ',
    'بنگلہ دیش',
    'آسٹریلیا',
  ],
};

export function getNetworkRegions(lang: Lang): readonly Region[] {
  return REGION_FACTS.map((facts, index) => ({ ...facts, label: REGION_LABELS[lang][index] }));
}
