import type { Metadata, Viewport } from 'next';

import { RootShell } from '@/components/root-shell';
import { rootMetadata, themeViewport } from '@/lib/seo/metadata';

export const metadata: Metadata = rootMetadata('en');

export const viewport: Viewport = themeViewport;

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
