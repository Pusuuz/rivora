import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/site";
import { Section, SectionHeading } from "./section";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

export function Products() {
  const [active, setActive] = useState(0);
  const product = products[active]!;

  return (
    <Section id="products">
      <SectionHeading
        eyebrow="RIVORA Solutions"
        title="Software built around your business"
        description="A growing suite of business solutions designed to connect operations, automate repetitive work and give teams better tools."
      />

      <Reveal className="mt-12">
        <div className="flex flex-wrap justify-center gap-2">
          {products.map((p, i) => (
            <button
              key={p.name}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm transition-colors",
                active === i ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {active === i ? (
                <motion.span
                  layoutId="product-pill"
                  className="absolute inset-0 rounded-full border border-primary/40 bg-primary/12"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 32,
                  }}
                />
              ) : null}

              <span className="relative">{p.name}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-8">
        <motion.div
          key={product.name}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="glass grid gap-8 rounded-3xl p-6 sm:p-10 lg:grid-cols-2 lg:items-center"
        >
          <div>
            <span className="grid size-11 place-items-center rounded-2xl border border-border bg-secondary/50">
              <product.icon className="size-5 text-primary" />
            </span>

            <p className="mt-5 text-xs tracking-[0.16em] text-muted-foreground uppercase">
              {product.tagline}
            </p>

            <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              {product.name}
            </h3>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              {product.description}
            </p>

            <a
              href="#contact"
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
            >
              Discuss your project
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {product.metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-border bg-card/60 p-5">
                <p className="text-2xl font-semibold tracking-tight text-brand-gradient">
                  {metric.value}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">{metric.label}</p>
              </div>
            ))}

            <div className="rounded-2xl border border-border bg-card/60 p-5 sm:col-span-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Product concept</span>
                <span className="text-accent">In development</span>
              </div>

              <div className="mt-4 flex items-end gap-1.5">
                {[32, 48, 40, 66, 74, 82, 91, 97].map((height, i) => (
                  <motion.span
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}px` }}
                    transition={{
                      delay: i * 0.05,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex-1 rounded-t-sm"
                    style={{
                      backgroundImage: "var(--gradient-brand)",
                      opacity: 0.35 + i * 0.08,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </Reveal>
    </Section>
  );
}
