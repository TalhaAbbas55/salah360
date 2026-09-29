import type { Metadata } from 'next';

import { DeleteAccountPageContent } from '@/components/pages/delete-account-page-content';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata('en', '/delete-account', {
  title: 'Delete your account',
  description: 'How to delete your Salah360 account and its data, in the app or by email.',
});

/** Linked from Google Play's "Delete account URL": deletion must be requestable without the app. */
export default function DeleteAccountPage() {
  return <DeleteAccountPageContent lang="en" />;
}
