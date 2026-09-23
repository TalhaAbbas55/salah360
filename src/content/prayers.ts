import type { Lang } from '@/lib/i18n/lang';

export type PrayerKey = 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';

export type SamplePrayer = {
  key: PrayerKey;
  name: string;
  azan: string;
  jamaat: string;
  womenArea: boolean;
};

/** Language-agnostic: the key, sample clock times (kept as western digits, like the app) and flag. */
type PrayerFacts = { key: PrayerKey; azan: string; jamaat: string; womenArea: boolean };
const PRAYER_FACTS: readonly PrayerFacts[] = [
  { key: 'fajr', azan: '4:52 AM', jamaat: '5:15 AM', womenArea: true },
  { key: 'dhuhr', azan: '12:45 PM', jamaat: '1:30 PM', womenArea: true },
  { key: 'asr', azan: '4:40 PM', jamaat: '5:15 PM', womenArea: true },
  { key: 'maghrib', azan: '6:32 PM', jamaat: '6:37 PM', womenArea: false },
  { key: 'isha', azan: '8:05 PM', jamaat: '8:30 PM', womenArea: true },
];

/** Prayer names, matching the mobile app's Urdu glossary (lib/i18n/locales/ur.ts). */
const PRAYER_NAMES: Record<Lang, Record<PrayerKey, string>> = {
  en: { fajr: 'Fajr', dhuhr: 'Dhuhr', asr: 'Asr', maghrib: 'Maghrib', isha: 'Isha' },
  ur: { fajr: 'فجر', dhuhr: 'ظہر', asr: 'عصر', maghrib: 'مغرب', isha: 'عشاء' },
};

/**
 * Illustrative times for the prayer-experience demo only. Real times always come from the Masjid
 * (or the visitor's calculation settings), which the section says in its footnote.
 */
export function getSamplePrayers(lang: Lang): readonly SamplePrayer[] {
  const names = PRAYER_NAMES[lang];
  return PRAYER_FACTS.map((facts) => ({ ...facts, name: names[facts.key] }));
}

export type PrayerPoint = { title: string; body: string };

const PRAYER_POINTS_BY_LANG: Record<Lang, readonly PrayerPoint[]> = {
  en: [
    {
      title: 'Azan and Jamaat, side by side',
      body: 'Each Masjid publishes both, plus Jumu’ah and extra timings like Taraweeh or Eid.',
    },
    {
      title: 'Always the Masjid’s local time',
      body: 'Times stay correct even when your phone is set to a different time zone.',
    },
    {
      title: 'Your own calculation settings',
      body: 'Today’s prayer periods for your location, with Hanafi or Shafi Asr — your choice.',
    },
    {
      title: 'Told when times change',
      body: 'Follow a Masjid and you’ll hear about a new Jamaat time before it takes effect.',
    },
  ],
  ur: [
    {
      title: 'اذان اور جماعت، ساتھ ساتھ',
      body: 'ہر مسجد دونوں شائع کرتی ہے، ساتھ ہی جمعہ اور تراویح یا عید جیسے اضافی اوقات بھی۔',
    },
    {
      title: 'ہمیشہ مسجد کا مقامی وقت',
      body: 'آپ کا فون کسی اور ٹائم زون پر ہو تب بھی اوقات درست رہتے ہیں۔',
    },
    {
      title: 'آپ کی اپنی حساب کی ترتیبات',
      body: 'آپ کی جگہ کے لیے آج کے نماز کے اوقات، حنفی یا شافعی عصر — آپ کی پسند۔',
    },
    {
      title: 'وقت بدلنے پر اطلاع',
      body: 'کسی مسجد کو فالو کریں اور نافذ ہونے سے پہلے ہی نئے جماعت کے وقت کی خبر پائیں۔',
    },
  ],
};

export function getPrayerPoints(lang: Lang): readonly PrayerPoint[] {
  return PRAYER_POINTS_BY_LANG[lang];
}
