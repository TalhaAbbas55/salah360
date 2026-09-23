/** Path for a pointed (mihrab) arch filling a 100×120 box, so it scales with preserveAspectRatio="none". */
export const ARCH_PATH = 'M0 120V46C0 22 22 8 50 0c28 8 50 22 50 46v74z';

/** A thin arch outline, used as a frame in the story and final CTA sections. */
export function ArchOutline({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="-1 -1 102 122"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 size-full ${className}`}
    >
      <path d={ARCH_PATH} fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
