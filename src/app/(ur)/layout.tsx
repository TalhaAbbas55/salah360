import type { Metadata, Viewport } from 'next';

import { RootShell } from '@/components/root-shell';
import { rootMetadata, themeViewport } from '@/lib/seo/metadata';

export const metadata: Metadata = rootMetadata('ur');

export const viewport: Viewport = themeViewport;

export default function UrduRootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="ur">{children}</RootShell>;
}
