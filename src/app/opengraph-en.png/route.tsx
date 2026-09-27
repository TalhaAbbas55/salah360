import { ImageResponse } from 'next/og';

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
        <svg width="72" height="72" viewBox="0 0 40 40">
          <rect width="40" height="40" rx="11" fill="#0a8a64" />
          <circle cx="20" cy="21" r="12.5" fill="none" stroke="#fff" strokeOpacity="0.28" strokeWidth="1.4" />
          <circle cx="28.84" cy="12.16" r="2.1" fill="#e2bd72" />
          <path d="M13.6 29.5V21.2c0-3.9 2.7-6.5 6.4-9 3.7 2.5 6.4 5.1 6.4 9v8.3z" fill="#fff" />
          <path d="M17.7 29.5v-4.6c0-1.5 1-2.6 2.3-3.4 1.3.8 2.3 1.9 2.3 3.4v4.6z" fill="#05634a" />
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
