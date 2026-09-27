import type { Metadata } from 'next';

import { ContactPageContent } from '@/components/pages/contact-page-content';
import { siteConfig } from '@/lib/site-config';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata('en', '/contact', {
  title: 'Contact Us',
  description: `Get in touch with Salah360 — questions, Masjid Admin support, corrections and privacy requests. Email ${siteConfig.supportEmail}.`,
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;
  return <ContactPageContent lang="en" topic={topic} />;
}
