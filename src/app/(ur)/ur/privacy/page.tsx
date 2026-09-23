import type { Metadata } from 'next';

import { PrivacyPageContent } from '@/components/pages/privacy-page-content';

export const metadata: Metadata = {
  title: 'رازداری کی پالیسی',
  description:
    'Salah360 کیا معلومات جمع کرتا ہے، کیوں، کن کے ساتھ شیئر کرتا ہے، اور آپ کے پاس کیا اختیارات ہیں۔ ہم آپ کی معلومات کبھی نہیں بیچتے۔',
  alternates: { canonical: '/ur/privacy', languages: { en: '/privacy', ur: '/ur/privacy' } },
};

export default function PrivacyPage() {
  return <PrivacyPageContent lang="ur" />;
}
