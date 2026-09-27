import type { Metadata } from 'next';

import { TermsPageContent } from '@/components/pages/terms-page-content';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata('en', '/terms', {
  title: 'Terms',
  description: 'The terms for using Salah360.',
});

export default function TermsPage() {
  return <TermsPageContent lang="en" />;
}
