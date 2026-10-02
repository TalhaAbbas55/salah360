import { LegalDocument } from '@/components/legal/legal-document';
import { SimplePage } from '@/components/layout/simple-page';
import { getTermsSections, TERMS_LAST_UPDATED } from '@/content/terms-of-service';
import type { Lang } from '@/lib/i18n/lang';

const COPY: Record<Lang, { eyebrow: string; title: string; description: string; lastUpdated: string }> = {
  en: {
    eyebrow: 'Legal',
    title: 'Terms of Service',
    description:
      'The rules for using Salah360, written to be read: what the app is, what we ask of you and of Masjid Admins, and what we can and can’t promise.',
    lastUpdated: 'Last updated',
  },
  ur: {
    eyebrow: 'قانونی',
    title: 'شرائطِ استعمال',
    description:
      'Salah360 استعمال کرنے کے اصول، آسان الفاظ میں: ایپ کیا ہے، ہم آپ سے اور مسجد ایڈمنز سے کیا چاہتے ہیں، اور ہم کس بات کا وعدہ کر سکتے ہیں اور کس کا نہیں۔',
    lastUpdated: 'آخری بار اپڈیٹ کیا گیا',
  },
};

export function TermsPageContent({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  return (
    <SimplePage
      lang={lang}
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
      meta={`${copy.lastUpdated} ${TERMS_LAST_UPDATED[lang]}`}
    >
      <LegalDocument lang={lang} sections={getTermsSections(lang)} />
    </SimplePage>
  );
}
