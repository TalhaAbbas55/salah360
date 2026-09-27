import type { Metadata } from 'next';

import { TermsPageContent } from '@/components/pages/terms-page-content';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata('ur', '/terms', {
  title: 'شرائط',
  description: 'Salah360 استعمال کرنے کی شرائط۔',
});

export default function TermsPage() {
  return <TermsPageContent lang="ur" />;
}
