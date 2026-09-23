import type { ReactNode } from 'react';

/** The italic serif emphasis used for one or two words in a heading. */
export function SerifAccent({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`font-serif text-[1.08em] font-normal italic tracking-[-0.01em] ${className}`}>{children}</span>
  );
}
