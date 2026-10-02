import type { Metadata } from 'next';

import { ForMasjidsPageContent } from '@/components/pages/for-masjids-page-content';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata('en', '/for-masjids', {
  title: 'For Masjids',
  description:
    'Give your Masjid a verified profile on Salah360. Verify over WhatsApp in about two minutes, or by sending a photo, then publish prayer times, events and Janazah alerts to your followers.',
});

export default function ForMasjidsPage() {
  return <ForMasjidsPageContent lang="en" />;
}
