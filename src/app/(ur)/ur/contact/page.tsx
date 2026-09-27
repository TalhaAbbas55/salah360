import type { Metadata } from 'next';

import { ContactPageContent } from '@/components/pages/contact-page-content';
import { siteConfig } from '@/lib/site-config';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata('ur', '/contact', {
  title: 'ہم سے رابطہ کریں',
  description: `Salah360 سے رابطہ کریں — سوالات، مسجد ایڈمن سپورٹ، تصحیحات اور رازداری کی درخواستیں۔ ای میل ${siteConfig.supportEmail}۔`,
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;
  return <ContactPageContent lang="ur" topic={topic} />;
}
