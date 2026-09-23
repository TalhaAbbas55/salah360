import { getNetworkRegions } from '@/content/regions';
import type { Lang } from '@/lib/i18n/lang';
import { WORLD_MAP_ASPECT, projectToMap } from '@/lib/geo/world-map-projection';

/** Region pairs (NETWORK_REGIONS indexes) joined by a soft arc. */
const LINKS: readonly (readonly [number, number])[] = [
  [0, 1],
  [1, 3],
  [3, 5],
  [5, 6],
  [2, 10],
  [10, 8],
  [7, 4],
  [1, 9],
  [8, 11],
];

const LABEL_POSITION = {
  right: 'left-3 top-0 -translate-y-1/2',
  left: 'right-3 top-0 -translate-y-1/2',
  below: 'left-0 top-3 -translate-x-1/2',
} as const;

const MASK = 'url(/world-dots.svg) center / 100% 100% no-repeat';

/**
 * A flat dotted world map (the land is a CSS mask, so it takes the theme's color) with the
 * regions from NETWORK_REGIONS pulsing and linked. A vision, not a coverage map.
 */
export function WorldNetworkMap({ lang }: { lang: Lang }) {
  const regions = getNetworkRegions(lang);
  const points = regions.map((region) => projectToMap(region.lat, region.lng));
  return (
    <div className="relative w-full" style={{ aspectRatio: WORLD_MAP_ASPECT }}>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[rgb(var(--globe-dot)/0.32)]"
        style={{ mask: MASK, WebkitMask: MASK }}
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full overflow-visible"
      >
        {LINKS.map(([from, to]) => {
          const a = points[from];
          const b = points[to];
          const lift = Math.hypot(b.x - a.x, b.y - a.y) * 0.35;
          const d = `M${a.x} ${a.y}Q${(a.x + b.x) / 2} ${(a.y + b.y) / 2 - lift} ${b.x} ${b.y}`;
          return (
            <path
              key={`${from}-${to}`}
              d={d}
              fill="none"
              stroke="rgb(var(--globe-accent))"
              strokeOpacity=".55"
              strokeWidth="1.2"
              strokeDasharray="3 5"
              vectorEffect="non-scaling-stroke"
              className="animate-dash"
            />
          );
        })}
      </svg>
      <ul className="absolute inset-0">
        {regions.map((region, index) => {
          const { x, y } = points[index];
          return (
            <li key={region.label} className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
              <span className="absolute -translate-x-1/2 -translate-y-1/2">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 animate-ping-soft rounded-full bg-primary/50"
                  style={{ animationDelay: `${index * 0.35}s` }}
                />
                <span className="relative block size-2.5 rounded-full bg-primary ring-[3px] ring-background sm:size-3" />
              </span>
              <span
                className={`absolute hidden whitespace-nowrap ${LABEL_POSITION[region.labelSide ?? 'right']} rounded-full border border-border bg-surface/90 px-2.5 py-1 text-[11px] font-medium text-muted backdrop-blur md:block`}
              >
                {region.label}
              </span>
              <span className="sr-only md:hidden">{region.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
