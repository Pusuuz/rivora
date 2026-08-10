export function Logo({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span className="flex items-center gap-2.5">
        <span className="relative grid size-8 place-items-center overflow-hidden rounded-[10px] border border-border">
          <span
            className="absolute inset-0"
            style={{ backgroundImage: "var(--gradient-brand)", opacity: 0.9 }}
          />
          <svg
            viewBox="0 0 24 24"
            className="relative size-4 text-primary-foreground"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 19V6a1 1 0 0 1 1-1h6a4 4 0 0 1 1.6 7.7L19 19" />
          </svg>
        </span>
        <span className="text-[17px] font-semibold tracking-tight">RIVORA</span>
      </span>
    </span>
  );
}