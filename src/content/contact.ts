import { Building2, CircleHelp, MapPinned, ShieldCheck, type LucideIcon } from 'lucide-react';

import type { Lang } from '@/lib/i18n/lang';

export type ContactTopic = {
  id: string;
  icon: LucideIcon;
  title: string;
  body: string;
  /** Email subject used when this topic is chosen. */
  subject: string;
  /** Prefilled message text used when this topic is chosen. */
  messageTemplate?: string;
};

type TopicCopy = { id: string; title: string; body: string; subject: string; messageTemplate?: string };

const TOPIC_ICONS: Record<string, LucideIcon> = {
  general: CircleHelp,
  masjid: Building2,
  correction: MapPinned,
  privacy: ShieldCheck,
};

const TOPICS_BY_LANG: Record<Lang, readonly TopicCopy[]> = {
  en: [
    {
      id: 'general',
      title: 'General questions',
      body: 'Questions about Salah360, feedback, or an idea that would make it better.',
      subject: 'Question about Salah360',
    },
    {
      id: 'masjid',
      title: 'Masjid Admins',
      body: 'Help registering or verifying your Masjid, or managing its prayer times and events.',
      subject: 'Masjid Admin support',
    },
    {
      id: 'correction',
      title: 'Report incorrect information',
      body: 'A Masjid’s prayer times, address or details look wrong? Tell us which Masjid and what to fix.',
      subject: 'Incorrect Masjid information',
    },
    {
      id: 'privacy',
      title: 'Privacy, your account & deletion',
      body: 'Request deletion of your account and data, or ask about privacy.',
      subject: 'Privacy or account deletion request',
      messageTemplate:
        'I would like to request deletion of my account and associated data. My account email is: ',
    },
  ],
  ur: [
    {
      id: 'general',
      title: 'عمومی سوالات',
      body: 'Salah360 کے بارے میں سوالات، رائے، یا کوئی خیال جو اسے بہتر بنائے۔',
      subject: 'Salah360 کے بارے میں سوال',
    },
    {
      id: 'masjid',
      title: 'مسجد ایڈمنز',
      body: 'اپنی مسجد رجسٹر یا تصدیق کروانے، یا اس کے نماز کے اوقات اور پروگرامز منظم کرنے میں مدد۔',
      subject: 'مسجد ایڈمن سپورٹ',
    },
    {
      id: 'correction',
      title: 'غلط معلومات کی نشاندہی',
      body: 'کسی مسجد کے نماز کے اوقات، پتہ یا تفصیلات غلط لگ رہی ہیں؟ ہمیں مسجد کا نام اور درست کرنے کی بات بتائیں۔',
      subject: 'مسجد کی غلط معلومات',
    },
    {
      id: 'privacy',
      title: 'رازداری، آپ کا اکاؤنٹ اور حذف کرنا',
      body: 'اپنا اکاؤنٹ اور ڈیٹا حذف کروانے کی درخواست کریں، یا رازداری کے بارے میں پوچھیں۔',
      subject: 'رازداری یا اکاؤنٹ حذف کرنے کی درخواست',
      messageTemplate:
        'میں اپنا اکاؤنٹ اور اس سے منسلک ڈیٹا حذف کروانا چاہتا/چاہتی ہوں۔ میرا اکاؤنٹ ای میل یہ ہے: ',
    },
  ],
};

export function getContactTopics(lang: Lang): readonly ContactTopic[] {
  return TOPICS_BY_LANG[lang].map((copy) => ({ icon: TOPIC_ICONS[copy.id], ...copy }));
}
