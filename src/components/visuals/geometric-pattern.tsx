import { useId } from 'react';

type GeometricPatternProps = {
  className?: string;
  /** Tile size in px. */
  size?: number;
  /** Where the pattern stays visible before fading out. */
  fade?: 'center' | 'top' | 'top-right' | 'none';
};

const FADES: Record<NonNullable<GeometricPatternProps['fade']>, string> = {
  center: 'radial-gradient(ellipse 60% 55% at 50% 45%, #000 20%, transparent 75%)',
  top: 'linear-gradient(to bottom, #000 10%, transparent 80%)',
  'top-right': 'radial-gradient(ellipse 70% 70% at 90% 0%, #000 10%, transparent 70%)',
  none: 'none',
};

/**
 * A quiet interlaced eight-pointed-star lattice, drawn as fine lines in the `--pattern` color.
 * Purely decorative; it fades out so it never sits behind body text at full strength.
 */
export function GeometricPattern({ className = '', size = 56, fade = 'center' }: GeometricPatternProps) {
  const id = useId();
  const s = size;
  const h = s / 2;
  const q = s * 0.21; // Star arm reach from the tile centre.
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 size-full text-[var(--pattern)] ${className}`}
      style={{ maskImage: FADES[fade], WebkitMaskImage: FADES[fade] }}
    >
      <defs>
        <pattern id={id} width={s} height={s} patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <rect x={h - q} y={h - q} width={q * 2} height={q * 2} />
            <rect x={h - q} y={h - q} width={q * 2} height={q * 2} transform={`rotate(45 ${h} ${h})`} />
            <path
              d={`M0 0L${h - q * 1.414} ${h - q * 1.414}M${s} 0L${h + q * 1.414} ${h - q * 1.414}M0 ${s}L${h - q * 1.414} ${h + q * 1.414}M${s} ${s}L${h + q * 1.414} ${h + q * 1.414}`}
            />
            <circle cx={h} cy={h} r={q * 0.42} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
