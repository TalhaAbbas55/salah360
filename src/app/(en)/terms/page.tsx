import type { Metadata } from 'next';

import { TermsPageContent } from '@/components/pages/terms-page-content';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata('en', '/terms', {
  title: 'Terms of Service',
  description:
    'The terms for using the Salah360 app and website: your account, what Masjid Admins agree to, how accurate prayer times are, and what we can and can’t promise.',
});

export default function TermsPage() {
  return <TermsPageContent lang="en" />;
}
