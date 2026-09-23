/** An eight-pointed star (two overlapping squares), the quiet Islamic motif used across the site. */
export function StarGlyph({ className = 'size-3' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <rect x="4.22" y="4.22" width="15.56" height="15.56" rx="0.8" />
      <rect x="4.22" y="4.22" width="15.56" height="15.56" rx="0.8" transform="rotate(45 12 12)" />
    </svg>
  );
}
