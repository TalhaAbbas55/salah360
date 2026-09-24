import type { Metadata } from 'next';

import { ContactPageContent } from '@/components/pages/contact-page-content';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'ہم سے رابطہ کریں',
  description: `Salah360 سے رابطہ کریں — سوالات، مسجد ایڈمن سپورٹ، تصحیحات اور رازداری کی درخواستیں۔ ای میل ${siteConfig.supportEmail}۔`,
  alternates: { canonical: '/ur/contact', languages: { en: '/contact', ur: '/ur/contact' } },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;
  return <ContactPageContent lang="ur" topic={topic} />;
}
