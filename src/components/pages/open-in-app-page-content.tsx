import { SimplePage } from '@/components/layout/simple-page';
import { AndroidAppRedirect } from '@/components/open-in-app/android-app-redirect';
import { IpadAware } from '@/components/open-in-app/ipad-aware';
import { ButtonLink } from '@/components/ui/button-link';
import { androidIntentUrl, appDeepLink, playStoreUrl, type SharedContentKind } from '@/lib/app-links';
import { detectDevice, isAndroidInAppBrowser } from '@/lib/device';

const COPY: Record<SharedContentKind, { eyebrow: string; title: string; description: string; thing: string }> = {
  masjid: {
    eyebrow: 'Shared masjid',
    title: 'Open this masjid in Salah360',
    description: 'See its Jamaat times, events and janazah alerts, and follow it to get notified when they change.',
    thing: 'this masjid',
  },
  event: {
    eyebrow: 'Shared event',
    title: 'Open this event in Salah360',
    description: 'See the event’s date, time, speakers and location, and add it to your calendar.',
    thing: 'this event',
  },
  janazah: {
    eyebrow: 'Janazah alert',
    title: 'Open this janazah alert in Salah360',
    description: 'See the time and place of the janazah prayer, and get directions.',
    thing: 'this janazah alert',
  },
};

type OpenInAppPageContentProps = {
  kind: SharedContentKind;
  /** A checked UUID. */
  id: string;
  /** The visitor's User-Agent header: decides which of the three pages below they get. */
  userAgent: string | null;
};

/**
 * Where a shared link or a masjid's printed QR code lands in a browser. With the app
 * installed and its links verified, Android opens the app directly and this page is never
 * shown. Otherwise:
 *   - Android: sent on at once, into the app if it is installed, else to Google Play
 *   - iPhone / iPad: told that the iPhone app is still on its way
 *   - anything else (a computer): both links, to use from an Android phone
 */
export function OpenInAppPageContent({ kind, id, userAgent }: OpenInAppPageContentProps) {
  const device = detectDevice(userAgent);
  if (device === 'ios') return <IosComingSoonPage kind={kind} />;
  if (device === 'android') return <AndroidPage kind={kind} id={id} inAppBrowser={isAndroidInAppBrowser(userAgent)} />;
  return (
    <IpadAware ios={<IosComingSoonPage kind={kind} />}>
      <OtherDevicePage kind={kind} id={id} />
    </IpadAware>
  );
}

function AndroidPage({ kind, id, inAppBrowser }: { kind: SharedContentKind; id: string; inAppBrowser: boolean }) {
  const copy = COPY[kind];
  const intentUrl = androidIntentUrl(kind, id);
  const storeUrl = playStoreUrl(kind, id);
  return (
    <SimplePage lang="en" eyebrow={copy.eyebrow} title={copy.title} description={copy.description}>
      <AndroidAppRedirect intentUrl={intentUrl} storeUrl={storeUrl} inAppBrowser={inAppBrowser} />
      <div className="flex max-w-xl flex-col gap-3 sm:flex-row">
        {/* Tapped by hand, the same link: the app if it is installed, Google Play if not. */}
        <ButtonLink href={intentUrl} size="lg">
          Open in the app
        </ButtonLink>
        <ButtonLink href={storeUrl} variant="secondary" size="lg">
          Get Salah360 on Google Play
        </ButtonLink>
      </div>
      <p className="mt-6 max-w-xl text-sm text-muted">
        Taking you to Salah360. If nothing happens, use the buttons above. Salah360 is free, and once it&apos;s
        installed, links and QR codes like this one open straight in the app.
      </p>
    </SimplePage>
  );
}

function IosComingSoonPage({ kind }: { kind: SharedContentKind }) {
  const copy = COPY[kind];
  return (
    <SimplePage
      lang="en"
      eyebrow="Coming soon to iPhone"
      title="Salah360 for iPhone is on its way"
      description="The iPhone app is in development and isn’t on the App Store yet. Salah360 is available on Android today."
    >
      <div className="max-w-xl rounded-3xl border border-border bg-surface p-6">
        <p className="text-pretty leading-relaxed text-foreground">
          The link you opened shows {copy.thing} in the Salah360 app. As soon as the iPhone app is released, links and QR
          codes like this one will open there.
        </p>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">
          Have an Android phone? Open the same link or scan the same QR code on it to get Salah360 from Google Play.
        </p>
      </div>
      <div className="mt-6 flex max-w-xl flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" variant="secondary" size="lg">
          Learn more about Salah360
        </ButtonLink>
      </div>
    </SimplePage>
  );
}

function OtherDevicePage({ kind, id }: { kind: SharedContentKind; id: string }) {
  const copy = COPY[kind];
  return (
    <SimplePage lang="en" eyebrow={copy.eyebrow} title={copy.title} description={copy.description}>
      <div className="flex max-w-xl flex-col gap-3 sm:flex-row">
        <ButtonLink href={appDeepLink(kind, id)} size="lg">
          Open in the app
        </ButtonLink>
        <ButtonLink href={playStoreUrl(kind, id)} variant="secondary" size="lg">
          Get Salah360 on Google Play
        </ButtonLink>
      </div>
      <p className="mt-6 max-w-xl text-sm text-muted">
        Salah360 is free. Once it&apos;s installed, links like this one open straight in the app.
      </p>
    </SimplePage>
  );
}
