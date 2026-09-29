import { SimplePage } from '@/components/layout/simple-page';
import { ButtonLink } from '@/components/ui/button-link';
import { siteConfig } from '@/lib/site-config';

export type SharedContentKind = 'masjid' | 'event' | 'janazah';

const COPY: Record<SharedContentKind, { eyebrow: string; title: string; description: string }> = {
  masjid: {
    eyebrow: 'Shared masjid',
    title: 'Open this masjid in Salah360',
    description: 'See its Jamaat times, events and janazah alerts, and follow it to get notified when they change.',
  },
  event: {
    eyebrow: 'Shared event',
    title: 'Open this event in Salah360',
    description: 'See the event’s date, time, speakers and location, and add it to your calendar.',
  },
  janazah: {
    eyebrow: 'Janazah alert',
    title: 'Open this janazah alert in Salah360',
    description: 'See the time and place of the janazah prayer, and get directions.',
  },
};

/** The app's own route for each kind: the app registers these paths as Android App Links. */
const APP_PATHS: Record<SharedContentKind, string> = { masjid: 'masjid', event: 'events', janazah: 'janazah' };

/**
 * Where a shared link lands when the app isn't installed (with it installed, Android
 * opens the app directly and this page is never shown).
 */
export function OpenInAppPageContent({ kind, id }: { kind: SharedContentKind; id: string }) {
  const copy = COPY[kind];
  return (
    <SimplePage lang="en" eyebrow={copy.eyebrow} title={copy.title} description={copy.description}>
      <div className="flex max-w-xl flex-col gap-3 sm:flex-row">
        <ButtonLink href={`salah360://${APP_PATHS[kind]}/${id}`} size="lg">
          Open in the app
        </ButtonLink>
        <ButtonLink href={siteConfig.playStoreUrl} variant="secondary" size="lg">
          Get Salah360 on Google Play
        </ButtonLink>
      </div>
      <p className="mt-6 max-w-xl text-sm text-muted">
        Salah360 is free. Once it&apos;s installed, links like this one open straight in the app.
      </p>
    </SimplePage>
  );
}
