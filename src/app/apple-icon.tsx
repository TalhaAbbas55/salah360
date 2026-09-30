import { ImageResponse } from 'next/og';

import { BRAND_COLORS, BRAND_TILE_MARK_OFFSET, BRAND_TILE_SIZE, MARK_ARCH, MARK_BOX, MARK_DOT, MARK_RING } from '@/lib/brand-mark';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** Home-screen icon: the Salah360 mark on a full-bleed square (iOS rounds the corners itself). */
export default function AppleIcon() {
  // The mark keeps the app icon's proportions: 660 of every 1024.
  const markSize = (size.width * MARK_BOX) / BRAND_TILE_SIZE;
  const inset = (size.width * BRAND_TILE_MARK_OFFSET) / BRAND_TILE_SIZE;
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', background: BRAND_COLORS.green }}>
      <svg
        width={markSize}
        height={markSize}
        viewBox={`0 0 ${MARK_BOX} ${MARK_BOX}`}
        style={{ position: 'absolute', left: inset, top: inset }}
      >
        <path d={MARK_RING} fill={BRAND_COLORS.ivory} />
        <path d={MARK_ARCH} fill={BRAND_COLORS.ivory} fillRule="evenodd" />
        <circle cx={MARK_DOT.cx} cy={MARK_DOT.cy} r={MARK_DOT.r} fill={BRAND_COLORS.gold} />
      </svg>
    </div>,
    size,
  );
}
