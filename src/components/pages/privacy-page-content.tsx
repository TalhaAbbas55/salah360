import { LegalDocument } from '@/components/legal/legal-document';
import { SimplePage } from '@/components/layout/simple-page';
import { getPrivacySections, PRIVACY_LAST_UPDATED } from '@/content/privacy-policy';
import type { Lang } from '@/lib/i18n/lang';

const COPY: Record<Lang, { eyebrow: string; title: string; description: string; lastUpdated: string }> = {
  en: {
    eyebrow: 'Legal',
    title: 'Privacy Policy',
    description:
      'Your trust matters more to us than your data. Here is exactly what Salah360 collects, why, and how you stay in control.',
    lastUpdated: 'Last updated',
  },
  ur: {
    eyebrow: 'قانونی',
    title: 'رازداری کی پالیسی',
    description:
      'آپ کا اعتماد ہمارے لیے آپ کے ڈیٹا سے زیادہ اہم ہے۔ یہاں بالکل واضح ہے کہ Salah360 کیا جمع کرتا ہے، کیوں، اور آپ کیسے اختیار میں رہتے ہیں۔',
    lastUpdated: 'آخری بار اپڈیٹ کیا گیا',
  },
};

export function PrivacyPageContent({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  return (
    <SimplePage
      lang={lang}
      eyebrow={copy.eyebrow}
      title={copy.title}
      description={copy.description}
      meta={`${copy.lastUpdated} ${PRIVACY_LAST_UPDATED[lang]}`}
    >
      <LegalDocument lang={lang} sections={getPrivacySections(lang)} />
    </SimplePage>
  );
}
