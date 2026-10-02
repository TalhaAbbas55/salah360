import type { Metadata } from 'next';

import { AboutPageContent } from '@/components/pages/about-page-content';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata('en', '/about', {
  title: 'About',
  description:
    'Why Salah360 was built: the difficulty of finding a Masjid and its Jamaat times, how the app answers it, and the vision of connecting Masjids around the world.',
});

export default function AboutPage() {
  return <AboutPageContent lang="en" />;
}
