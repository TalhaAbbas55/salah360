import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

import { OpenInAppPageContent } from '@/components/pages/open-in-app-page-content';
import { isUuid } from '@/lib/uuid';

/** Shared links carry ids, not content: keep them out of search results. */
export const metadata: Metadata = {
  title: 'Open in Salah360',
  robots: { index: false, follow: false },
};

export default async function SharedMasjidPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isUuid(id)) notFound();
  // The page differs by phone (Android, iPhone, other), so it is rendered per request.
  const userAgent = (await headers()).get('user-agent');
  return <OpenInAppPageContent kind="masjid" id={id} userAgent={userAgent} />;
}
