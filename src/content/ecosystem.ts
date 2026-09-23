import type { Lang } from '@/lib/i18n/lang';

/** Labels orbiting Salah360 in the "one place" diagram. Split into an inner and an outer ring. */
const ECOSYSTEM_INNER_BY_LANG: Record<Lang, readonly string[]> = {
  en: ['Nearby Masjids', 'Prayer Times', 'Jamaat', 'Notifications', 'Janazah'],
  ur: ['قریبی مساجد', 'نماز کے اوقات', 'جماعت', 'اطلاعات', 'نمازِ جنازہ'],
};

const ECOSYSTEM_OUTER_BY_LANG: Record<Lang, readonly string[]> = {
  en: ['Events', 'Masjid Profiles', 'Community', 'Travel', 'Women’s Area', 'Donation Info'],
  ur: ['پروگرامز', 'مسجد پروفائلز', 'کمیونٹی', 'سفر', 'خواتین کی جگہ', 'عطیات کی معلومات'],
};

export function getEcosystemInner(lang: Lang): readonly string[] {
  return ECOSYSTEM_INNER_BY_LANG[lang];
}

export function getEcosystemOuter(lang: Lang): readonly string[] {
  return ECOSYSTEM_OUTER_BY_LANG[lang];
}

export type SolutionPillar = { title: string; body: string };

const SOLUTION_PILLARS_BY_LANG: Record<Lang, readonly SolutionPillar[]> = {
  en: [
    {
      title: 'Discover',
      body: 'Find Masjids near you on a map or by radius, with their Jamaat times and facilities.',
    },
    {
      title: 'Stay informed',
      body: 'Follow a Masjid and hear about time changes, events and Janazah straight away.',
    },
    {
      title: 'Stay connected',
      body: 'Your Masjids travel with you — at home, across the city or in another country.',
    },
  ],
  ur: [
    {
      title: 'تلاش کریں',
      body: 'اپنے قریب موجود مساجد کو نقشے پر یا رداس کے ذریعے، ان کی جماعت کے اوقات اور سہولیات کے ساتھ تلاش کریں۔',
    },
    {
      title: 'باخبر رہیں',
      body: 'کسی مسجد کو فالو کریں اور اوقات کی تبدیلی، پروگرامز اور نمازِ جنازہ کی خبر فوراً پائیں۔',
    },
    {
      title: 'جڑے رہیں',
      body: 'آپ کی مساجد آپ کے ساتھ سفر کرتی ہیں — گھر پر، شہر میں یا کسی دوسرے ملک میں۔',
    },
  ],
};

export function getSolutionPillars(lang: Lang): readonly SolutionPillar[] {
  return SOLUTION_PILLARS_BY_LANG[lang];
}
