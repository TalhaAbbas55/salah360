import type { Metadata } from 'next';

import { TermsPageContent } from '@/components/pages/terms-page-content';

export const metadata: Metadata = {
  title: 'شرائط',
  description: 'Salah360 استعمال کرنے کی شرائط۔',
  alternates: { canonical: '/ur/terms', languages: { en: '/terms', ur: '/ur/terms' } },
};

export default function TermsPage() {
  return <TermsPageContent lang="ur" />;
}
