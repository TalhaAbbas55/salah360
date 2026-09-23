import Link from 'next/link';

import { localizePath, type Lang } from '@/lib/i18n/lang';

/**
 * The Salah360 mark: a Masjid arch inside a 360° orbit, with a single point travelling on it
 * (a Masjid found, wherever you are). Same drawing as app/icon.svg.
 */
export function LogoMark({ className = 'size-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="logo-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0a8a64" />
          <stop offset="1" stopColor="#04513b" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#logo-bg)" />
      <circle cx="20" cy="21" r="12.5" fill="none" stroke="#fff" strokeOpacity="0.28" strokeWidth="1.4" />
      <circle cx="28.84" cy="12.16" r="2.1" fill="#e2bd72" />
      <path d="M13.6 29.5V21.2c0-3.9 2.7-6.5 6.4-9 3.7 2.5 6.4 5.1 6.4 9v8.3z" fill="#fff" />
      <path d="M17.7 29.5v-4.6c0-1.5 1-2.6 2.3-3.4 1.3.8 2.3 1.9 2.3 3.4v4.6z" fill="#05634a" />
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
