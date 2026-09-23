/** A simple Masjid skyline — central dome, two minarets, smaller side domes. Fills with currentColor. */
export function MasjidSilhouette({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 110" aria-hidden="true" className={className} fill="currentColor">
      {/* Minarets */}
      <path d="M36 110V40l4-8 4 8v70z" />
      <path d="M34 42h12v3H34zM34 62h12v2H34z" opacity=".6" />
      <path d="M40 22l2.2 10h-4.4z" />
      <path d="M196 110V40l4-8 4 8v70z" />
      <path d="M194 42h12v3h-12zM194 62h12v2h-12z" opacity=".6" />
      <path d="M200 22l2.2 10h-4.4z" />
      {/* Main hall and dome */}
      <path d="M72 110V70h96v40z" />
      <path d="M78 70c0-22 18-38 42-46 24 8 42 24 42 46z" />
      <path d="M118.6 12h2.8v12h-2.8z" />
      <circle cx="120" cy="10" r="3" />
      {/* Side domes */}
      <path d="M52 110V80h20v30z" />
      <path d="M52 80c0-8 4.5-13 10-15.5C67.5 67 72 72 72 80z" />
      <path d="M168 110V80h20v30z" />
      <path d="M168 80c0-8 4.5-13 10-15.5 5.5 2.5 10 7.5 10 15.5z" />
      {/* Doorway */}
      <path
        d="M112 110V94c0-4.5 3.5-8 8-10.5 4.5 2.5 8 6 8 10.5v16z"
        className="text-background"
        fill="currentColor"
        opacity=".9"
      />
    </svg>
  );
}
