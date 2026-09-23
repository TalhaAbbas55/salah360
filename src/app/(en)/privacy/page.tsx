import type { Metadata } from 'next';

import { PrivacyPageContent } from '@/components/pages/privacy-page-content';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'What information Salah360 collects, why, who it is shared with, and the choices you have. We never sell your information.',
  alternates: { canonical: '/privacy', languages: { en: '/privacy', ur: '/ur/privacy' } },
};

export default function PrivacyPage() {
  return <PrivacyPageContent lang="en" />;
}
