import type { Metadata } from 'next';

import { TermsPageContent } from '@/components/pages/terms-page-content';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata('ur', '/terms', {
  title: 'شرائطِ استعمال',
  description:
    'Salah360 ایپ اور ویب سائٹ استعمال کرنے کی شرائط: آپ کا اکاؤنٹ، مسجد ایڈمنز کی ذمہ داریاں، نماز کے اوقات کی درستگی، اور ہم کس بات کا وعدہ کر سکتے ہیں اور کس کا نہیں۔',
});

export default function TermsPage() {
  return <TermsPageContent lang="ur" />;
}
