import type { ReactNode } from 'react';

type Tone = 'primary' | 'gold' | 'neutral';

const TONES: Record<Tone, string> = {
  primary: 'bg-primary-soft text-primary-ink',
  gold: 'bg-gold-soft text-gold',
  neutral: 'bg-surface-muted text-muted',
};

export function Badge({
  tone = 'neutral',
  children,
  className = '',
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
