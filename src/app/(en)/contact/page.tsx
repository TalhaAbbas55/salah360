import type { Metadata } from 'next';

import { ContactPageContent } from '@/components/pages/contact-page-content';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Get in touch with Salah360 — questions, Masjid Admin support, corrections and privacy requests. Email ${siteConfig.supportEmail}.`,
  alternates: { canonical: '/contact', languages: { en: '/contact', ur: '/ur/contact' } },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;
  return <ContactPageContent lang="en" topic={topic} />;
}
