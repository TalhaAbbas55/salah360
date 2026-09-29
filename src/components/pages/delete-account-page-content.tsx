import { LegalDocument } from '@/components/legal/legal-document';
import { SimplePage } from '@/components/layout/simple-page';
import { getAccountDeletionSections } from '@/content/account-deletion';
import type { Lang } from '@/lib/i18n/lang';

const COPY: Record<Lang, { eyebrow: string; title: string; description: string }> = {
  en: {
    eyebrow: 'Your account',
    title: 'Delete your account',
    description: 'How to delete your Salah360 account and its data, in the app or by email, and what happens next.',
  },
  ur: {
    eyebrow: 'آپ کا اکاؤنٹ',
    title: 'اپنا اکاؤنٹ ڈیلیٹ کریں',
    description: 'اپنا Salah360 اکاؤنٹ اور اس کا ڈیٹا ایپ میں یا ای میل کے ذریعے کیسے ڈیلیٹ کریں، اور اس کے بعد کیا ہوتا ہے۔',
  },
};

export function DeleteAccountPageContent({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  return (
    <SimplePage lang={lang} eyebrow={copy.eyebrow} title={copy.title} description={copy.description}>
      <LegalDocument lang={lang} sections={getAccountDeletionSections(lang)} />
    </SimplePage>
  );
}
