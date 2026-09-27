import type { Metadata } from 'next';

import { PrivacyPageContent } from '@/components/pages/privacy-page-content';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata('en', '/privacy', {
  title: 'Privacy Policy',
  description:
    'What information Salah360 collects, why, who it is shared with, and the choices you have. We never sell your information.',
});

export default function PrivacyPage() {
  return <PrivacyPageContent lang="en" />;
}
