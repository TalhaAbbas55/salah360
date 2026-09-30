import Link from 'next/link';

import {
  BRAND_COLORS,
  BRAND_TILE_MARK_OFFSET,
  BRAND_TILE_RADIUS,
  BRAND_TILE_SIZE,
  MARK_ARCH,
  MARK_DOT,
  MARK_RING,
} from '@/lib/brand-mark';
import { localizePath, type Lang } from '@/lib/i18n/lang';

/**
 * The Salah360 app icon: the brand mark on its rounded Masjid Green tile. Same drawing as
 * app/icon.svg and the Android app icon; the paths live in lib/brand-mark.ts.
 */
export function LogoMark({ className = 'size-9' }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${BRAND_TILE_SIZE} ${BRAND_TILE_SIZE}`} aria-hidden="true" className={className}>
      <rect width={BRAND_TILE_SIZE} height={BRAND_TILE_SIZE} rx={BRAND_TILE_RADIUS} fill={BRAND_COLORS.green} />
      <g transform={`translate(${BRAND_TILE_MARK_OFFSET} ${BRAND_TILE_MARK_OFFSET})`}>
        <path d={MARK_RING} fill={BRAND_COLORS.ivory} />
        <path d={MARK_ARCH} fill={BRAND_COLORS.ivory} fillRule="evenodd" />
        <circle {...MARK_DOT} fill={BRAND_COLORS.gold} />
      </g>
    </svg>
  );
}

const HOME_LABEL: Record<Lang, string> = { en: 'Salah360 home', ur: 'Salah360 ہوم' };

export function Logo({ lang, className = '' }: { lang: Lang; className?: string }) {
  return (
    <Link
      href={`${localizePath('/', lang)}#top`}
      className={`inline-flex items-center gap-2.5 rounded-xl ${className}`}
      aria-label={HOME_LABEL[lang]}
    >
      <LogoMark />
      <span className="text-[17px] font-semibold tracking-[-0.03em]">
        Salah<span className="text-primary">360</span>
      </span>
    </Link>
  );
}
