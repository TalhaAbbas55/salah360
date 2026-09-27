import type { Metadata } from 'next';

import { PrivacyPageContent } from '@/components/pages/privacy-page-content';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata('ur', '/privacy', {
  title: 'رازداری کی پالیسی',
  description:
    'Salah360 کیا معلومات جمع کرتا ہے، کیوں، کن کے ساتھ شیئر کرتا ہے، اور آپ کے پاس کیا اختیارات ہیں۔ ہم آپ کی معلومات کبھی نہیں بیچتے۔',
});

export default function PrivacyPage() {
  return <PrivacyPageContent lang="ur" />;
}
