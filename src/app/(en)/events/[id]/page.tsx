import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { OpenInAppPageContent } from '@/components/pages/open-in-app-page-content';
import { isUuid } from '@/lib/uuid';

/** Shared links carry ids, not content: keep them out of search results. */
export const metadata: Metadata = {
  title: 'Open in Salah360',
  robots: { index: false, follow: false },
};

export default async function SharedEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isUuid(id)) notFound();
  return <OpenInAppPageContent kind="event" id={id} />;
}
