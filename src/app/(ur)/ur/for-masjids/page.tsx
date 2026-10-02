import type { Metadata } from 'next';

import { ForMasjidsPageContent } from '@/components/pages/for-masjids-page-content';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata('ur', '/for-masjids', {
  title: 'مساجد کے لیے',
  description:
    'Salah360 پر اپنی مسجد کو تصدیق شدہ پروفائل دیں۔ واٹس ایپ سے تقریباً دو منٹ میں، یا تصویر بھیج کر تصدیق کریں، پھر نماز کے اوقات، پروگرامز اور نمازِ جنازہ کی اطلاعات اپنے فالورز تک پہنچائیں۔',
});

export default function ForMasjidsPage() {
  return <ForMasjidsPageContent lang="ur" />;
}
