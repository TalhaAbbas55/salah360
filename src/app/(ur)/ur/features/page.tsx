import type { Metadata } from 'next';

import { FeaturesPageContent } from '@/components/pages/features-page-content';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata('ur', '/features', {
  title: 'خصوصیات',
  description:
    'نقشے پر قریبی مساجد تلاش کریں، ہر مسجد کے شائع کردہ اذان اور جماعت کے اوقات دیکھیں، اور اوقات کی تبدیلی، پروگرامز اور نمازِ جنازہ کی اطلاعات پائیں۔ Salah360 ایپ کی تمام خصوصیات۔',
});

export default function FeaturesPage() {
  return <FeaturesPageContent lang="ur" />;
}
