import type { Lang } from '@/lib/i18n/lang';

import { AppStoreBadge } from './app-store-badge';
import { GooglePlayBadge } from './google-play-badge';

/** The two store badges side by side: Google Play (a link) and the App Store (coming soon). */
export function StoreBadges({ lang, className = '' }: { lang: Lang; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <GooglePlayBadge lang={lang} />
      <AppStoreBadge lang={lang} />
    </div>
  );
}
