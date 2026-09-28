'use client';

import { ErrorPageContent } from '@/components/pages/error-page-content';

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return <ErrorPageContent lang="ur" error={error} retry={retry} />;
}
