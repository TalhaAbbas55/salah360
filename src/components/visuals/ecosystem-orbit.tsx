import { LogoMark } from '@/components/layout/logo';
import { getEcosystemInner, getEcosystemOuter } from '@/content/ecosystem';
import type { Lang } from '@/lib/i18n/lang';

type RingProps = {
  labels: readonly string[];
  /** Ring radius as a % of the container. */
  radius: number;
  /** Start angle offset in degrees, so the two rings' labels don't line up. */
  offset: number;
  reverse?: boolean;
  tone: 'primary' | 'neutral';
};

/**
 * One slowly turning ring of labels. Each label counter-rotates at the same speed, so it stays
 * upright while it travels around the circle.
 */
function Ring({ labels, radius, offset, reverse = false, tone }: RingProps) {
  const spin = reverse ? 'animate-spin-slow-reverse' : 'animate-spin-slow';
  const counterSpin = reverse ? 'animate-spin-slow' : 'animate-spin-slow-reverse';
  return (
    <div className={`absolute inset-0 ${spin}`}>
      <div
        className="absolute rounded-full border border-border"
        style={{ inset: `${50 - radius}%` }}
        aria-hidden="true"
      />
      {labels.map((label, index) => {
        const angle = ((offset + (360 / labels.length) * index) * Math.PI) / 180;
        return (
          <div
            key={label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${50 + radius * Math.cos(angle)}%`, top: `${50 + radius * Math.sin(angle)}%` }}
          >
            <span
              className={`block whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-medium backdrop-blur sm:px-3.5 sm:text-[13px] ${counterSpin} ${
                tone === 'primary'
                  ? 'border-primary/25 bg-primary-soft text-primary-ink'
                  : 'border-border bg-surface text-muted card-shadow'
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function CenterMark() {
  return (
    <span className="flex flex-col items-center gap-2">
      <span className="relative">
        <span aria-hidden="true" className="absolute inset-2 animate-ping-soft rounded-full bg-primary/25" />
        <LogoMark className="relative size-16 drop-shadow-[0_12px_24px_rgb(4_120_87/0.35)] sm:size-20" />
      </span>
      <span className="text-sm font-semibold tracking-[-0.02em]">Salah360</span>
    </span>
  );
}

/**
 * Salah360 at the centre, with everything it brings together orbiting around it. On phones the
 * orbit is too tight for eleven labels, so they sit in a calm cloud under the mark instead.
 */
export function EcosystemOrbit({ lang }: { lang: Lang }) {
  const inner = getEcosystemInner(lang);
  const outer = getEcosystemOuter(lang);
  return (
    <>
      <div className="sm:hidden">
        <div className="relative flex flex-col items-center rounded-[28px] border border-border bg-surface/60 px-4 py-8">
          <div
            aria-hidden="true"
            className="absolute inset-x-10 top-0 h-40 bg-[radial-gradient(closest-side,var(--glow),transparent)]"
          />
          <div className="relative">
            <CenterMark />
          </div>
          <ul className="relative mt-7 flex flex-wrap justify-center gap-2">
            {inner.map((label) => (
              <li
                key={label}
                className="rounded-full border border-primary/25 bg-primary-soft px-3 py-1.5 text-xs font-medium text-primary-ink"
              >
                {label}
              </li>
            ))}
            {outer.map((label) => (
              <li
                key={label}
                className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted"
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <OrbitDiagram inner={inner} outer={outer} />
    </>
  );
}

function OrbitDiagram({ inner, outer }: { inner: readonly string[]; outer: readonly string[] }) {
  return (
    <div className="relative mx-auto hidden aspect-square w-full max-w-[540px] sm:block">
      <div
        aria-hidden="true"
        className="absolute inset-[18%] rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]"
      />
      <Ring labels={outer} radius={41} offset={-60} reverse tone="neutral" />
      <Ring labels={inner} radius={25} offset={-90} tone="primary" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <CenterMark />
      </div>
      <ul className="sr-only">
        {[...inner, ...outer].map((label) => (
          <li key={label}>{label}</li>
        ))}
      </ul>
    </div>
  );
}
