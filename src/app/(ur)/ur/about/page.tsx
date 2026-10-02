import type { Metadata } from 'next';

import { AboutPageContent } from '@/components/pages/about-page-content';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata('ur', '/about', {
  title: 'تعارف',
  description:
    'Salah360 کیوں بنایا گیا: مسجد اور اس کی جماعت کے اوقات تلاش کرنے کی مشکل، ایپ اسے کیسے حل کرتی ہے، اور دنیا بھر کی مساجد کو جوڑنے کا ویژن۔',
});

export default function AboutPage() {
  return <AboutPageContent lang="ur" />;
}
