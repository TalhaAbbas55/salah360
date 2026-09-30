import { ImageResponse } from 'next/og';

import {
  BRAND_COLORS,
  BRAND_TILE_MARK_OFFSET,
  BRAND_TILE_RADIUS,
  BRAND_TILE_SIZE,
  MARK_ARCH,
  MARK_DOT,
  MARK_RING,
} from '@/lib/brand-mark';
import { SITE_COPY } from '@/lib/site-config';

// GET route handlers are dynamic by default; this image never changes between deploys.
export const dynamic = 'force-static';

const copy = SITE_COPY.en;

/**
 * The English social preview, served at a fixed URL (`/opengraph-en.png`, rendered once at
 * build time) so every English page can list it in its own `openGraph.images`. An
 * `opengraph-image.tsx` file would get a hashed URL, and Next drops it from any page that
 * sets its own `openGraph` — which each inner page does, for its own og:title and og:url.
 * Dimensions and alt text live with the Urdu image's in `lib/seo/metadata.ts`.
 */
export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        background: 'radial-gradient(circle at 85% 20%, #0f6a4d 0%, #062a1f 45%, #04120d 100%)',
        color: '#eef5f1',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <svg width="72" height="72" viewBox={`0 0 ${BRAND_TILE_SIZE} ${BRAND_TILE_SIZE}`}>
          <rect width={BRAND_TILE_SIZE} height={BRAND_TILE_SIZE} rx={BRAND_TILE_RADIUS} fill={BRAND_COLORS.green} />
          <g transform={`translate(${BRAND_TILE_MARK_OFFSET} ${BRAND_TILE_MARK_OFFSET})`}>
            <path d={MARK_RING} fill={BRAND_COLORS.ivory} />
            <path d={MARK_ARCH} fill={BRAND_COLORS.ivory} fillRule="evenodd" />
            <circle cx={MARK_DOT.cx} cy={MARK_DOT.cy} r={MARK_DOT.r} fill={BRAND_COLORS.gold} />
          </g>
        </svg>
        <div style={{ display: 'flex', fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>
          Salah<span style={{ color: '#34d399' }}>360</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{copy.tagline}</div>
        <div style={{ fontSize: 30, color: '#a9c2b7', maxWidth: 900, lineHeight: 1.35 }}>
          Find nearby Masjids, prayer times and community alerts — wherever you are.
        </div>
      </div>
      <div style={{ display: 'flex', fontSize: 24, color: '#e2bd72' }}>
        Connecting Muslims with Masjids around the world.
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
