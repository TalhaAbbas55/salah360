import { ArrowDownToLine } from 'lucide-react';

import { StarGlyph } from '@/components/ui/star-glyph';
import type { Lang } from '@/lib/i18n/lang';
import { ctaLinks } from '@/lib/site-config';

const LABEL: Record<Lang, string> = { en: 'Get the app', ur: 'ایپ حاصل کریں' };

const SIZES = {
  /** The navbar. */
  md: { button: 'h-11 gap-2.5 ps-1.5 pe-5 text-sm', star: 'size-8', arrow: 'size-3.5' },
  /** The mobile menu, across its full width. */
  lg: { button: 'h-13 w-full justify-center gap-3 px-5 text-[15px]', star: 'size-9', arrow: 'size-4' },
};

type GetAppButtonProps = {
  lang: Lang;
  size?: keyof typeof SIZES;
  onClick?: () => void;
  className?: string;
};

/**
 * "Get the app": the navbar's and mobile menu's link to Google Play. Drawn in the site's
 * own colors, the deep emerald and gold of the For Masjids band: a gold eight-pointed star
 * (the motif used across the site) holds the download arrow, and turns on hover. The band
 * colors are the same in both themes, so it needs no dark variant.
 */
export function GetAppButton({ lang, size = 'md', onClick, className = '' }: GetAppButtonProps) {
  const sizes = SIZES[size];
  return (
    <a
      href={ctaLinks(lang).playStore}
      onClick={onClick}
      className={`group relative isolate inline-flex items-center overflow-hidden rounded-full border border-[#e2bd72]/45 bg-band font-medium tracking-[-0.01em] text-band-foreground shadow-[0_10px_24px_-12px_rgb(var(--shadow)/0.6),inset_0_1px_0_rgb(255_255_255/0.1)] transition-[border-color,transform] duration-300 hover:border-[#e2bd72] active:scale-[0.98] ${sizes.button} ${className}`}
    >
      {/* Lighter emerald where the star sits, falling away to the band color. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_160%_at_0%_50%,#127656_0%,transparent_62%)] rtl:bg-[radial-gradient(120%_160%_at_100%_50%,#127656_0%,transparent_62%)]"
      />
      <span className={`relative flex shrink-0 items-center justify-center ${sizes.star}`}>
        <StarGlyph className="absolute inset-0 size-full text-[#e2bd72] transition-transform duration-500 ease-out group-hover:rotate-45" />
        <ArrowDownToLine
          className={`relative text-band transition-transform duration-300 group-hover:translate-y-px ${sizes.arrow}`}
          strokeWidth={2.75}
          aria-hidden="true"
        />
      </span>
      {LABEL[lang]}
    </a>
  );
}
