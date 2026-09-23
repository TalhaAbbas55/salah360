import type { Lang } from '@/lib/i18n/lang';

export type MasjidBenefit = { title: string; comingSoon?: boolean };

const BENEFIT_COMING_SOON: readonly boolean[] = [false, false, false, false, false, false, true, false];

const BENEFIT_TITLES_BY_LANG: Record<Lang, readonly string[]> = {
  en: [
    'Manage your Masjid profile',
    'Publish Azan & Jamaat times',
    'Notify followers instantly',
    'Publish announcements',
    'Create one-off & recurring events',
    'Send Janazah alerts',
    'Share official donation information',
    'Build a stronger local community',
  ],
  ur: [
    'اپنی مسجد کی پروفائل منظم کریں',
    'اذان اور جماعت کے اوقات شائع کریں',
    'فالورز کو فوری اطلاع دیں',
    'اعلانات شائع کریں',
    'یک بارہ اور تکراری پروگرامز بنائیں',
    'نمازِ جنازہ کی اطلاع بھیجیں',
    'سرکاری عطیات کی معلومات شیئر کریں',
    'مقامی کمیونٹی کو مضبوط بنائیں',
  ],
};

export function getMasjidBenefits(lang: Lang): readonly MasjidBenefit[] {
  return BENEFIT_TITLES_BY_LANG[lang].map((title, index) => ({ title, comingSoon: BENEFIT_COMING_SOON[index] }));
}

export type DashboardPrayer = { name: string; azan: string; jamaat: string };

/** Sample times for the dashboard mockup, kept as western digits (like the app itself). */
const DASHBOARD_TIMES: readonly { azan: string; jamaat: string }[] = [
  { azan: '4:52', jamaat: '5:15' },
  { azan: '12:45', jamaat: '1:30' },
  { azan: '4:40', jamaat: '5:15' },
  { azan: '6:32', jamaat: '6:37' },
  { azan: '8:05', jamaat: '8:30' },
];

const DASHBOARD_NAMES: Record<Lang, readonly string[]> = {
  en: ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'],
  ur: ['فجر', 'ظہر', 'عصر', 'مغرب', 'عشاء'],
};

export function getDashboardPrayers(lang: Lang): readonly DashboardPrayer[] {
  return DASHBOARD_TIMES.map((times, index) => ({ name: DASHBOARD_NAMES[lang][index], ...times }));
}
