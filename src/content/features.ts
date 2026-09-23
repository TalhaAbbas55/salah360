import {
  BadgeCheck,
  Bell,
  CalendarDays,
  Clock,
  DoorOpen,
  HandHeart,
  Heart,
  KeyRound,
  Landmark,
  Languages,
  MapPin,
  SunMoon,
  UsersRound,
  type LucideIcon,
} from 'lucide-react';

import type { Lang } from '@/lib/i18n/lang';

export type Feature = {
  icon: LucideIcon;
  title: string;
  body: string;
  /** Planned, not in the app yet. Shown with a "Coming soon" badge. */
  comingSoon?: boolean;
};

type HighlightCopy = { title: string; body: string };
type HighlightKey = 'nearby' | 'prayerTimes' | 'janazah';

const HIGHLIGHT_ICONS: Record<HighlightKey, LucideIcon> = { nearby: MapPin, prayerTimes: Clock, janazah: HandHeart };

const HIGHLIGHTS_BY_LANG: Record<Lang, Record<HighlightKey, HighlightCopy>> = {
  en: {
    nearby: {
      title: 'Find Nearby Masjids',
      body: 'Browse Masjids on a map, or search within a radius you choose — from 100 m to 20 km — filtered by Jamaat time.',
    },
    prayerTimes: {
      title: 'Accurate Prayer Times',
      body: 'Azan and Jamaat times published by each Masjid, in the Masjid’s own local time, with upcoming changes shown ahead.',
    },
    janazah: {
      title: 'Janazah Alerts',
      body: 'When a followed Masjid announces a Janazah, you receive the details you need, presented simply and respectfully.',
    },
  },
  ur: {
    nearby: {
      title: 'قریبی مساجد تلاش کریں',
      body: 'مساجد کو نقشے پر دیکھیں، یا اپنی پسند کے رداس میں تلاش کریں — 100 میٹر سے 20 کلومیٹر تک — جماعت کے وقت کے مطابق فلٹر کیا ہوا۔',
    },
    prayerTimes: {
      title: 'نماز کے درست اوقات',
      body: 'ہر مسجد کی جانب سے شائع کردہ اذان اور جماعت کے اوقات، مسجد کے اپنے مقامی وقت میں، آنے والی تبدیلیوں کے ساتھ۔',
    },
    janazah: {
      title: 'نمازِ جنازہ کی اطلاع',
      body: 'جب کوئی فالو کی گئی مسجد نمازِ جنازہ کا اعلان کرے، تو آپ کو ضروری تفصیلات سادگی اور احترام سے مل جاتی ہیں۔',
    },
  },
};

export function getFeatureHighlights(lang: Lang): Record<HighlightKey, Feature> {
  const copy = HIGHLIGHTS_BY_LANG[lang];
  return {
    nearby: { icon: HIGHLIGHT_ICONS.nearby, ...copy.nearby },
    prayerTimes: { icon: HIGHLIGHT_ICONS.prayerTimes, ...copy.prayerTimes },
    janazah: { icon: HIGHLIGHT_ICONS.janazah, ...copy.janazah },
  };
}

const JANAZAH_FIELDS_BY_LANG: Record<Lang, readonly string[]> = {
  en: ['Name of the deceased', 'Photo, where provided', 'Janazah location', 'Date and time'],
  ur: ['میت کا نام', 'تصویر، اگر دی گئی ہو', 'نمازِ جنازہ کا مقام', 'تاریخ اور وقت'],
};

export function getJanazahFields(lang: Lang): readonly string[] {
  return JANAZAH_FIELDS_BY_LANG[lang];
}

/** Icons, order and coming-soon flags are language-agnostic; only the copy changes. */
const FEATURE_ICONS: readonly LucideIcon[] = [
  Bell,
  Heart,
  BadgeCheck,
  CalendarDays,
  UsersRound,
  DoorOpen,
  Landmark,
  Languages,
  SunMoon,
  KeyRound,
];
const FEATURE_COMING_SOON: readonly boolean[] = [false, false, false, false, false, false, true, false, false, false];

type FeatureCopy = { title: string; body: string };

const FEATURES_BY_LANG: Record<Lang, readonly FeatureCopy[]> = {
  en: [
    {
      title: 'Jamaat Notifications',
      body: 'Get notified when a Masjid you follow changes a Jamaat time, so you can plan your Salah around it.',
    },
    {
      title: 'Follow Your Masjid',
      body: 'Follow your local Masjid and the ones you visit, and keep them together in My Masjids.',
    },
    {
      title: 'Masjid Profiles',
      body: 'Every Masjid gets an online identity: address, contact, prayer times and events in one verified profile.',
    },
    {
      title: 'Events & Announcements',
      body: 'Lectures, classes and gatherings — one-off or recurring — with speakers, topic and a reminder before it starts.',
    },
    {
      title: 'Women’s Prayer Area',
      body: 'See which prayers have a women’s area, and filter your search to only those Masjids.',
    },
    {
      title: 'Masjid Open Status',
      body: 'Masjids can mark themselves open or closed, so you know before you travel to the door.',
    },
    {
      title: 'Donation Information',
      body: 'A Masjid’s official banking details on its profile, where it chooses to share them. Salah360 never handles donations.',
    },
    {
      title: 'Multi-Language',
      body: 'English and اردو today, with full right-to-left support and more languages to follow.',
    },
    {
      title: 'Light & Dark Mode',
      body: 'Follows your phone’s setting, or choose the look you prefer for Fajr and Isha alike.',
    },
    {
      title: 'Google Account Login',
      body: 'Sign in with Google in a tap, use email, or browse as a guest before creating an account.',
    },
  ],
  ur: [
    {
      title: 'جماعت کی اطلاعات',
      body: 'جب آپ کی فالو کی گئی مسجد جماعت کا وقت تبدیل کرے تو اطلاع پائیں، تاکہ اپنی نماز کا وقت اسی کے مطابق طے کر سکیں۔',
    },
    {
      title: 'اپنی مسجد کو فالو کریں',
      body: 'اپنی مقامی مسجد اور جن مساجد میں جاتے ہیں انہیں فالو کریں، اور My Masjids میں سب کو ایک جگہ رکھیں۔',
    },
    {
      title: 'مسجد پروفائلز',
      body: 'ہر مسجد کو اپنی آن لائن شناخت ملتی ہے: پتہ، رابطہ، نماز کے اوقات اور پروگرامز ایک تصدیق شدہ پروفائل میں۔',
    },
    {
      title: 'پروگرامز اور اعلانات',
      body: 'لیکچرز، کلاسز اور اجتماعات — یک بارہ یا تکراری — مقررین، موضوع اور شروع ہونے سے پہلے یاد دہانی کے ساتھ۔',
    },
    {
      title: 'خواتین کی نماز کی جگہ',
      body: 'دیکھیں کن نمازوں کے لیے خواتین کی جگہ موجود ہے، اور اپنی تلاش کو صرف انہی مساجد تک محدود کریں۔',
    },
    {
      title: 'مسجد کھلی ہے یا بند',
      body: 'مساجد خود کو کھلا یا بند نشان زد کر سکتی ہیں، تاکہ دروازے تک پہنچنے سے پہلے ہی آپ کو معلوم ہو۔',
    },
    {
      title: 'عطیات کی معلومات',
      body: 'مسجد کی سرکاری بینکنگ تفصیلات اس کی پروفائل پر، جہاں مسجد خود شیئر کرنا چاہے۔ Salah360 کبھی عطیات وصول نہیں کرتا۔',
    },
    {
      title: 'متعدد زبانیں',
      body: 'فی الحال انگریزی اور اردو، مکمل رائٹ ٹو لیفٹ سپورٹ کے ساتھ، اور مزید زبانیں آنے والی ہیں۔',
    },
    {
      title: 'لائٹ اور ڈارک موڈ',
      body: 'آپ کے فون کی ترتیب کے مطابق، یا فجر اور عشاء دونوں کے لیے اپنی پسندیدہ شکل خود منتخب کریں۔',
    },
    {
      title: 'گوگل اکاؤنٹ لاگ اِن',
      body: 'ایک ٹیپ میں گوگل سے سائن اِن کریں، ای میل استعمال کریں، یا اکاؤنٹ بنائے بغیر بطور مہمان براؤز کریں۔',
    },
  ],
};

export function getFeatures(lang: Lang): readonly Feature[] {
  return FEATURES_BY_LANG[lang].map((copy, index) => ({
    icon: FEATURE_ICONS[index],
    comingSoon: FEATURE_COMING_SOON[index],
    ...copy,
  }));
}
