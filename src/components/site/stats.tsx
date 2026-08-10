import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { stats } from "@/data/site";
import { Reveal } from "./reveal";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-60px",
  });

  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 1600;
    const start = performance.now();

    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplay(value * eased);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  const formatted = Number.isInteger(value)
    ? Math.round(display).toLocaleString()
    : display.toFixed(2);

  return (
    <span ref={ref} className="text-brand-gradient">
      {formatted}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative px-5 py-16 sm:px-8 md:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <div className="glass grid gap-8 rounded-3xl p-8 sm:grid-cols-2 sm:p-12 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="text-center sm:text-left">
                <p className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>

                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
