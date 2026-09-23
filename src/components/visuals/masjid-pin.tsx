/** Round map badge with a dome, matching the app's green map markers. */
export function MasjidPin({ selected = false, className = '' }: { selected?: boolean; className?: string }) {
  return (
    <span
      className={`flex items-center justify-center rounded-full ring-2 ring-white/90 transition-transform ${
        selected ? 'size-10 bg-[#047857]' : 'size-8 bg-[#10b981]'
      } shadow-[0_6px_16px_-4px_rgb(4_120_87/0.6)] ${className}`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className={selected ? 'size-5' : 'size-4'} fill="#fff">
        <path d="M5 20v-6.5C5 9.6 8.3 7 12 4.5c3.7 2.5 7 5.1 7 9V20z" />
        <path d="M11.3 1.5h1.4v3.4h-1.4z" />
      </svg>
    </span>
  );
}
