import type { Lang } from '@/lib/i18n/lang';
import { ctaLinks } from '@/lib/site-config';

import { STORE_BADGE_CLASS, StoreBadgeLabel } from './store-badge';
import { GooglePlayGlyph } from './store-glyphs';

const LABEL: Record<Lang, string> = {
  en: 'Get Salah360 on Google Play',
  ur: 'Google Play سے Salah360 حاصل کریں',
};

/** "Get it on Google Play": a link to the app's Google Play listing. */
export function GooglePlayBadge({ lang, className = '' }: { lang: Lang; className?: string }) {
  return (
    <a href={ctaLinks(lang).playStore} aria-label={LABEL[lang]} className={`${STORE_BADGE_CLASS} ${className}`}>
      <StoreBadgeLabel
        glyph={<GooglePlayGlyph className="size-6 shrink-0 sm:size-7" />}
        line="Get it on"
        store="Google Play"
      />
    </a>
  );
}
