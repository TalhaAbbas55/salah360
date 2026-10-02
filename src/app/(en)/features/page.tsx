import type { Metadata } from 'next';

import { FeaturesPageContent } from '@/components/pages/features-page-content';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata('en', '/features', {
  title: 'Features',
  description:
    'Find nearby Masjids on a map, see the Azan and Jamaat times each Masjid publishes, and get alerts for time changes, events and Janazah. Everything the Salah360 app does.',
});

export default function FeaturesPage() {
  return <FeaturesPageContent lang="en" />;
}
