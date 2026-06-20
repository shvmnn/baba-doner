export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex flex-col leading-none select-none ${className}`}
      aria-label="BABA Döner"
    >
      <span className="font-display text-2xl font-extrabold uppercase tracking-tight">
        <span className="fire-text">BABA</span>
      </span>
      <span className="-mt-0.5 text-[0.65rem] font-bold uppercase tracking-[0.45em] text-white/80">
        Döner
      </span>
    </span>
  );
}

export function FlameIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2c0 3-4 4.5-4 8a4 4 0 0 0 1.2 2.9C8.5 12.2 9 11 9 11c0 2 1 3 1 4a2 2 0 1 1-4 0c0-.3 0-.6.1-.9A6 6 0 0 0 6 17a6 6 0 0 0 12 0c0-5-6-7-6-15Z" />
    </svg>
  );
}
