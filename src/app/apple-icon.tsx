import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** Home-screen icon: the Salah360 mark on a full-bleed square (iOS rounds the corners itself). */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: 'linear-gradient(135deg, #0a8a64, #04513b)',
      }}
    >
      <svg width="180" height="180" viewBox="0 0 40 40">
        <circle cx="20" cy="21" r="12.5" fill="none" stroke="#fff" strokeOpacity="0.28" strokeWidth="1.4" />
        <circle cx="28.84" cy="12.16" r="2.1" fill="#e2bd72" />
        <path d="M13.6 29.5V21.2c0-3.9 2.7-6.5 6.4-9 3.7 2.5 6.4 5.1 6.4 9v8.3z" fill="#fff" />
        <path d="M17.7 29.5v-4.6c0-1.5 1-2.6 2.3-3.4 1.3.8 2.3 1.9 2.3 3.4v4.6z" fill="#05634a" />
      </svg>
    </div>,
    size,
  );
}
