import { Camera, MessageCircle, type LucideIcon } from 'lucide-react';

import type { Lang } from '@/lib/i18n/lang';

export type VerificationMethod = {
  id: 'whatsapp' | 'manual';
  icon: LucideIcon;
  /** The method the app offers first, when the Masjid qualifies for it. */
  recommended: boolean;
  title: string;
  /** How long it takes, as the app words it. */
  time: string;
  body: string;
  points: readonly string[];
};

type MethodCopy = Pick<VerificationMethod, 'title' | 'time' | 'body' | 'points'>;

const METHOD_ICONS: Record<VerificationMethod['id'], LucideIcon> = { whatsapp: MessageCircle, manual: Camera };

/**
 * The two ways a Masjid Admin is verified, as the app's "Choose how to verify" screen
 * offers them (salah360/lib/i18n/locales: `admin.verifyChoice`, `admin.whatsappVerify`,
 * `admin.verify`). Keep the times and conditions here in step with the app.
 */
const METHODS_BY_LANG: Record<Lang, Record<VerificationMethod['id'], MethodCopy>> = {
  en: {
    whatsapp: {
      title: 'Verify with WhatsApp',
      time: 'Instant · about 2 minutes',
      body: 'Salah360 finds the phone number on your Masjid’s Google Maps listing and sends it a WhatsApp message. Tap the button in the message and confirm, and your Masjid is verified.',
      points: [
        'The number comes from Google Maps automatically; you don’t type it',
        'The link in the message works for 10 minutes',
        'Offered when your Masjid’s Google Maps listing shows a phone number',
      ],
    },
    manual: {
      title: 'Verify manually',
      time: 'Usually 1–2 days',
      body: 'Send a clear photo of yourself at the Masjid, with its name board or entrance visible, and a phone number. The Salah360 team reviews each request.',
      points: [
        'For Masjids with no number on Google Maps, or a landline that can’t receive WhatsApp',
        'The team may call the number to confirm',
        'You get an email when your Masjid is approved',
      ],
    },
  },
  ur: {
    whatsapp: {
      title: 'واٹس ایپ سے تصدیق',
      time: 'فوری · تقریباً 2 منٹ',
      body: 'Salah360 آپ کی مسجد کی گوگل میپس لسٹنگ سے فون نمبر خود لیتا ہے اور اس پر واٹس ایپ پیغام بھیجتا ہے۔ پیغام میں موجود بٹن دبا کر تصدیق کریں، اور آپ کی مسجد تصدیق شدہ ہو جاتی ہے۔',
      points: [
        'نمبر گوگل میپس سے خود بخود لیا جاتا ہے؛ آپ کو لکھنا نہیں پڑتا',
        'پیغام میں موجود لنک 10 منٹ تک کام کرتا ہے',
        'تب دستیاب ہے جب آپ کی مسجد کی گوگل میپس لسٹنگ پر فون نمبر درج ہو',
      ],
    },
    manual: {
      title: 'دستی تصدیق',
      time: 'عموماً 1 سے 2 دن',
      body: 'مسجد میں اپنی ایک واضح تصویر، جس میں مسجد کا نام یا داخلی دروازہ نظر آئے، اور ایک فون نمبر بھیجیں۔ Salah360 ٹیم ہر درخواست کا جائزہ لیتی ہے۔',
      points: [
        'ان مساجد کے لیے جن کا گوگل میپس پر نمبر نہیں، یا لینڈ لائن ہے جس پر واٹس ایپ نہیں آتا',
        'ٹیم تصدیق کے لیے اس نمبر پر کال کر سکتی ہے',
        'مسجد منظور ہونے پر آپ کو ای میل ملتی ہے',
      ],
    },
  },
};

export function getVerificationMethods(lang: Lang): readonly VerificationMethod[] {
  const copy = METHODS_BY_LANG[lang];
  return [
    { id: 'whatsapp', icon: METHOD_ICONS.whatsapp, recommended: true, ...copy.whatsapp },
    { id: 'manual', icon: METHOD_ICONS.manual, recommended: false, ...copy.manual },
  ];
}
