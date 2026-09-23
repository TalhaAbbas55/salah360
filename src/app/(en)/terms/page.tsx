import type { Metadata } from 'next';

import { TermsPageContent } from '@/components/pages/terms-page-content';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'The terms for using Salah360.',
  alternates: { canonical: '/terms', languages: { en: '/terms', ur: '/ur/terms' } },
};

export default function TermsPage() {
  return <TermsPageContent lang="en" />;
}
