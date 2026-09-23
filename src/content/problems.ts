import { Clock, HandHeart, Megaphone, Plane, UsersRound, type LucideIcon } from 'lucide-react';

import type { Lang } from '@/lib/i18n/lang';

export type Problem = { icon: LucideIcon; label: string; title: string; body: string };

type ProblemCopy = { label: string; title: string; body: string };

/** Icons and order are language-agnostic; only the copy changes. */
const PROBLEM_ICONS: readonly LucideIcon[] = [Plane, Clock, Megaphone, HandHeart, UsersRound];

const COPY: Record<Lang, readonly ProblemCopy[]> = {
  en: [
    {
      label: 'Traveling',
      title: 'In an unfamiliar city?',
      body: "You arrive somewhere new and don't know where the nearest Masjid is — or when its next Jamaat starts.",
    },
    {
      label: 'Prayer Times',
      title: 'Every Masjid keeps its own time.',
      body: 'Jamaat times vary from Masjid to Masjid and change through the year. A generic timetable isn’t enough.',
    },
    {
      label: 'Community Updates',
      title: 'Announcements get missed.',
      body: 'Updates shared after a Jumu’ah khutbah or on a notice board rarely reach everyone who needs them.',
    },
    {
      label: 'Janazah',
      title: 'Janazah news needs to travel quickly.',
      body: 'When a Janazah is announced, people want to know where and when — while there is still time to attend.',
    },
    {
      label: 'Women’s Prayer Area',
      title: 'Not every Masjid has a women’s area.',
      body: 'Sisters and families need to know before they set off, not after they arrive at the door.',
    },
  ],
  ur: [
    {
      label: 'سفر کے دوران',
      title: 'کسی اجنبی شہر میں ہیں؟',
      body: 'آپ کسی نئی جگہ پہنچتے ہیں اور نہیں جانتے کہ قریب ترین مسجد کہاں ہے — یا اگلی جماعت کب شروع ہو رہی ہے۔',
    },
    {
      label: 'نماز کے اوقات',
      title: 'ہر مسجد کا اپنا وقت ہوتا ہے۔',
      body: 'جماعت کے اوقات ہر مسجد میں مختلف ہوتے ہیں اور سال بھر بدلتے رہتے ہیں۔ ایک عمومی ٹائم ٹیبل کافی نہیں۔',
    },
    {
      label: 'کمیونٹی کی اطلاعات',
      title: 'اعلانات اکثر نظروں سے اوجھل ہو جاتے ہیں۔',
      body: 'جمعہ کے خطبے کے بعد یا نوٹس بورڈ پر دی گئی اطلاعات شاذ و نادر ہی ہر ضرورت مند تک پہنچ پاتی ہیں۔',
    },
    {
      label: 'نمازِ جنازہ',
      title: 'جنازے کی خبر جلد پہنچنی چاہیے۔',
      body: 'جب نمازِ جنازہ کا اعلان ہو، تو لوگ فوراً جاننا چاہتے ہیں کہاں اور کب — تاکہ شرکت کا وقت رہے۔',
    },
    {
      label: 'خواتین کی نماز کی جگہ',
      title: 'ہر مسجد میں خواتین کے لیے جگہ نہیں ہوتی۔',
      body: 'بہنوں اور خاندانوں کو روانہ ہونے سے پہلے یہ معلوم ہونا چاہیے، دروازے پر پہنچنے کے بعد نہیں۔',
    },
  ],
};

export function getProblems(lang: Lang): readonly Problem[] {
  return COPY[lang].map((copy, index) => ({ icon: PROBLEM_ICONS[index], ...copy }));
}
