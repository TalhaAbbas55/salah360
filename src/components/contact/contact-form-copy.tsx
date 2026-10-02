import type { ReactNode } from 'react';

import type { ContactResult } from '@/lib/contact-api';
import type { Lang } from '@/lib/i18n/lang';

type ContactFormCopy = {
  heading: string;
  intro: string;
  nameLabel: string;
  nameOptional: string;
  namePlaceholder: string;
  emailLabel: string;
  topicLabel: string;
  messageLabel: string;
  messagePlaceholder: string;
  submit: string;
  sending: string;
  sentTitle: string;
  /** `email` is the visitor's own address, already wrapped for display. */
  sentBody: (email: ReactNode) => ReactNode;
  sendAnother: string;
  errors: Record<Exclude<ContactResult, 'sent'>, string>;
  /** Followed by the support address, as text. */
  emailFallback: string;
};

export const CONTACT_FORM_COPY: Record<Lang, ContactFormCopy> = {
  en: {
    heading: 'Write to us',
    intro: 'Your message goes straight to the Salah360 team. We reply by email, so please check your address.',
    nameLabel: 'Your name',
    nameOptional: '(optional)',
    namePlaceholder: 'Your name',
    emailLabel: 'Your email',
    topicLabel: 'Topic',
    messageLabel: 'Message',
    messagePlaceholder: 'How can we help? If it’s about a Masjid, please include its name and city.',
    submit: 'Send message',
    sending: 'Sending…',
    sentTitle: 'Message sent',
    sentBody: (email) => (
      <>
        Thank you. Your message has reached the Salah360 team, and we will reply to {email} as soon as we can, in shā’
        Allāh.
      </>
    ),
    sendAnother: 'Send another message',
    errors: {
      invalid: 'Please check your email address and your message, then try again.',
      busy: 'Too many messages are being sent right now. Please try again in a little while.',
      failed: 'Your message couldn’t be sent. Please check your connection and try again.',
    },
    emailFallback: 'You can also email us at',
  },
  ur: {
    heading: 'ہمیں لکھیں',
    intro:
      'آپ کا پیغام سیدھا Salah360 ٹیم تک پہنچتا ہے۔ ہم ای میل سے جواب دیتے ہیں، اس لیے اپنا ای میل ایڈریس درست لکھیں۔',
    nameLabel: 'آپ کا نام',
    nameOptional: '(اختیاری)',
    namePlaceholder: 'آپ کا نام',
    emailLabel: 'آپ کی ای میل',
    topicLabel: 'موضوع',
    messageLabel: 'پیغام',
    messagePlaceholder: 'ہم کیسے مدد کر سکتے ہیں؟ اگر بات کسی مسجد کی ہے، تو براہِ کرم اس کا نام اور شہر شامل کریں۔',
    submit: 'پیغام بھیجیں',
    sending: 'بھیجا جا رہا ہے…',
    sentTitle: 'پیغام بھیج دیا گیا',
    sentBody: (email) => (
      <>شکریہ۔ آپ کا پیغام Salah360 ٹیم تک پہنچ گیا ہے، اور ہم جلد از جلد {email} پر جواب دیں گے، اِن شاء اللہ۔</>
    ),
    sendAnother: 'ایک اور پیغام بھیجیں',
    errors: {
      invalid: 'براہِ کرم اپنا ای میل ایڈریس اور پیغام چیک کریں، پھر دوبارہ کوشش کریں۔',
      busy: 'اس وقت بہت زیادہ پیغامات بھیجے جا رہے ہیں۔ براہِ کرم تھوڑی دیر بعد دوبارہ کوشش کریں۔',
      failed: 'آپ کا پیغام نہیں بھیجا جا سکا۔ اپنا کنکشن چیک کریں اور دوبارہ کوشش کریں۔',
    },
    emailFallback: 'آپ ہمیں اس پتے پر ای میل بھی کر سکتے ہیں:',
  },
};
