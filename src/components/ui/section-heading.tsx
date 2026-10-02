import type { ReactNode } from 'react';

import { Reveal } from './reveal';
import { StarGlyph } from './star-glyph';

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  /** For the always-dark emerald band sections. */
  onBand?: boolean;
  /** `h1` for the section that opens a page (Features, For Masjids, About); `h2` everywhere else. */
  as?: 'h1' | 'h2';
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  onBand = false,
  as: Heading = 'h2',
  id,
}: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <Reveal className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p
        className={`inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] ${onBand ? 'text-[#7fd8b3]' : 'text-primary'}`}
      >
        <StarGlyph className="size-2.5 opacity-80" />
        {eyebrow}
      </p>
      <Heading
        id={id}
        className={`mt-4 text-balance text-[2rem] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[2.6rem] lg:text-5xl ${onBand ? 'text-band-foreground' : 'text-foreground'}`}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={`mt-5 text-pretty text-base leading-relaxed sm:text-lg ${onBand ? 'text-band-muted' : 'text-muted'} ${centered ? 'mx-auto' : ''} max-w-xl`}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
