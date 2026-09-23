import { CalendarDays, Clock, HandHeart, type LucideIcon } from 'lucide-react';

import type { Lang } from '@/lib/i18n/lang';

export type SampleNotification = {
  icon: LucideIcon;
  kind: string;
  title: string;
  body: string;
  masjid: string;
  time: string;
  tone: 'primary' | 'gold' | 'calm';
};

type NotificationCopy = { kind: string; title: string; body: string; masjid: string; time: string };

const NOTIFICATION_ICONS: readonly LucideIcon[] = [Clock, CalendarDays, HandHeart];
const NOTIFICATION_TONES: readonly SampleNotification['tone'][] = ['primary', 'gold', 'calm'];

/** Example push notifications, modelled on the ones the app actually sends. */
const NOTIFICATIONS_BY_LANG: Record<Lang, readonly NotificationCopy[]> = {
  en: [
    {
      kind: 'Prayer Time Updated',
      title: 'Asr Jamaat time updated',
      body: 'Asr Jamaat time has been updated to 5:15 PM.',
      masjid: 'Masjid Al-Noor',
      time: 'now',
    },
    {
      kind: 'Masjid Event',
      title: 'Quran Study Circle',
      body: 'Tonight at 8:00 PM, after Isha. All are welcome.',
      masjid: 'Masjid Al-Noor',
      time: '12m ago',
    },
    {
      kind: 'Janazah Alert',
      title: 'Janazah prayer',
      body: 'Today at 2:30 PM. Please remember the deceased in your duas.',
      masjid: 'Jamia Masjid Rahmah',
      time: '1h ago',
    },
  ],
  ur: [
    {
      kind: 'نماز کا وقت تبدیل',
      title: 'عصر کی جماعت کا وقت تبدیل ہوا',
      body: 'عصر کی جماعت کا وقت بدل کر 5:15 PM کر دیا گیا ہے۔',
      masjid: 'مسجد النور',
      time: 'ابھی',
    },
    {
      kind: 'مسجد کا پروگرام',
      title: 'قرآن اسٹڈی سرکل',
      body: 'آج رات 8:00 بجے، عشاء کے بعد۔ سب کی شرکت کا خیرمقدم ہے۔',
      masjid: 'مسجد النور',
      time: '12 منٹ پہلے',
    },
    {
      kind: 'نمازِ جنازہ کی اطلاع',
      title: 'نمازِ جنازہ',
      body: 'آج 2:30 بجے۔ براہِ کرم میت کے لیے دعا کریں۔',
      masjid: 'جامع مسجد رحمہ',
      time: '1 گھنٹہ پہلے',
    },
  ],
};

export function getSampleNotifications(lang: Lang): readonly SampleNotification[] {
  return NOTIFICATIONS_BY_LANG[lang].map((copy, index) => ({
    icon: NOTIFICATION_ICONS[index],
    tone: NOTIFICATION_TONES[index],
    ...copy,
  }));
}

export type CommunityChannel = { title: string; body: string };

const COMMUNITY_CHANNELS_BY_LANG: Record<Lang, readonly CommunityChannel[]> = {
  en: [
    {
      title: 'Prayer time updates',
      body: 'When a followed Masjid changes a Jamaat time — and a reminder on the day it applies.',
    },
    {
      title: 'Masjid events',
      body: 'New events, updates the Masjid chooses to share, and a reminder before each one starts.',
    },
    {
      title: 'Janazah alerts',
      body: 'Sent straight away to followers, with a one-tap route and calendar entry.',
    },
  ],
  ur: [
    {
      title: 'نماز کے اوقات کی اطلاعات',
      body: 'جب فالو کی گئی مسجد جماعت کا وقت بدلے — اور جس دن یہ نافذ ہو اس دن یاد دہانی بھی۔',
    },
    {
      title: 'مسجد کے پروگرامز',
      body: 'نئے پروگرامز، وہ اپڈیٹس جو مسجد شیئر کرنا چاہے، اور ہر پروگرام سے پہلے ایک یاد دہانی۔',
    },
    {
      title: 'نمازِ جنازہ کی اطلاعات',
      body: 'فالورز کو فوراً بھیجی جاتی ہیں، ایک ٹیپ میں راستہ اور کیلنڈر اندراج کے ساتھ۔',
    },
  ],
};

export function getCommunityChannels(lang: Lang): readonly CommunityChannel[] {
  return COMMUNITY_CHANNELS_BY_LANG[lang];
}
