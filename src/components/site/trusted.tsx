import { trustedBy } from "@/data/site";

export function TrustedBy() {
  const row = [...trustedBy, ...trustedBy];

  return (
    <section className="overflow-hidden border-y border-border/40 py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
          Built for businesses across Central Asia
        </p>

        <div className="relative overflow-hidden">
          <div className="flex w-max animate-[marquee_30s_linear_infinite] items-center gap-10">
            {row.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="whitespace-nowrap text-sm font-medium text-muted-foreground/50 transition-colors hover:text-foreground"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}