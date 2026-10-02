import type { Lang } from '@/lib/i18n/lang';

export type Step = { title: string; body: string };

const USER_STEPS_BY_LANG: Record<Lang, readonly Step[]> = {
  en: [
    { title: 'Find', body: 'Discover nearby Masjids on the map or within a radius you choose.' },
    { title: 'Connect', body: 'Follow your Masjid — and the ones you visit — in a single tap.' },
    { title: 'Stay Updated', body: 'Receive prayer time, event and Janazah notifications as they happen.' },
    { title: 'Never Miss Jamaat', body: 'Use timely, Masjid-published information to plan your Salah.' },
  ],
  ur: [
    { title: 'تلاش کریں', body: 'نقشے پر یا اپنی پسند کے رداس میں قریبی مساجد دریافت کریں۔' },
    { title: 'جڑیں', body: 'اپنی مسجد کو — اور جہاں بھی جائیں انہیں — ایک ہی ٹیپ میں فالو کریں۔' },
    { title: 'باخبر رہیں', body: 'نماز کے اوقات، پروگرامز اور نمازِ جنازہ کی اطلاعات فوراً پائیں۔' },
    { title: 'جماعت کبھی نہ چھوٹے', body: 'مسجد کی شائع کردہ بروقت معلومات سے اپنی نماز کا منصوبہ بنائیں۔' },
  ],
};

export function getUserSteps(lang: Lang): readonly Step[] {
  return USER_STEPS_BY_LANG[lang];
}

const MASJID_STEPS_BY_LANG: Record<Lang, readonly Step[]> = {
  en: [
    { title: 'Register your Masjid', body: 'Sign up as a Masjid Admin with your Masjid’s name and address.' },
    {
      title: 'Get verified & build your profile',
      body: 'Confirm over WhatsApp in about two minutes, on the number from your Masjid’s Google Maps listing — or send a photo and phone number for the Salah360 team to review.',
    },
    {
      title: 'Manage prayer times',
      body: 'Publish Azan and Jamaat times, schedule changes ahead, add special timings.',
    },
    { title: 'Connect with followers', body: 'Share events and Janazah alerts that reach your followers directly.' },
  ],
  ur: [
    { title: 'اپنی مسجد رجسٹر کریں', body: 'اپنی مسجد کے نام اور پتے کے ساتھ بطور مسجد ایڈمن سائن اپ کریں۔' },
    {
      title: 'تصدیق کروائیں اور پروفائل بنائیں',
      body: 'واٹس ایپ پر تقریباً دو منٹ میں تصدیق کریں، اس نمبر پر جو آپ کی مسجد کی گوگل میپس لسٹنگ پر درج ہے — یا تصویر اور فون نمبر بھیجیں جس کا Salah360 ٹیم جائزہ لے گی۔',
    },
    {
      title: 'نماز کے اوقات منظم کریں',
      body: 'اذان اور جماعت کے اوقات شائع کریں، آگے کی تبدیلیاں شیڈول کریں، خصوصی اوقات شامل کریں۔',
    },
    {
      title: 'فالورز سے جڑیں',
      body: 'ایسے پروگرامز اور نمازِ جنازہ کی اطلاعات شیئر کریں جو براہِ راست آپ کے فالورز تک پہنچیں۔',
    },
  ],
};

export function getMasjidSteps(lang: Lang): readonly Step[] {
  return MASJID_STEPS_BY_LANG[lang];
}
