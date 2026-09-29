import type { Metadata } from 'next';

import { DeleteAccountPageContent } from '@/components/pages/delete-account-page-content';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata('ur', '/delete-account', {
  title: 'اپنا اکاؤنٹ ڈیلیٹ کریں',
  description: 'اپنا Salah360 اکاؤنٹ اور اس کا ڈیٹا ایپ میں یا ای میل کے ذریعے کیسے ڈیلیٹ کریں۔',
});

export default function DeleteAccountPage() {
  return <DeleteAccountPageContent lang="ur" />;
}
