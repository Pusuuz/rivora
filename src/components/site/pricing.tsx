import { Check } from "lucide-react";
import { pricing } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "./section";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <Section id="pricing">
      <SectionHeading
        eyebrow="Pricing"
        title="Start with what your business needs"
        description="Choose a starting point or talk to us about a custom solution. Every project is scoped around your actual business requirements."
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-3 lg:items-start">
        {pricing.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 0.08}>
            <div
              className={cn(
                "glass relative h-full rounded-3xl p-7",
                plan.featured && "border-primary/40 lg:-mt-4 lg:pb-10",
              )}
              style={plan.featured ? { boxShadow: "var(--shadow-glow)" } : undefined}
            >
              {plan.featured ? (
                <span
                  className="absolute -top-3 left-7 rounded-full px-3 py-1 text-[11px] font-medium text-primary-foreground"
                  style={{ backgroundImage: "var(--gradient-brand)" }}
                >
                  Most chosen
                </span>
              ) : null}

              <h3 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
                {plan.name}
              </h3>

              <p className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-semibold tracking-tight">{plan.price}</span>

                <span className="text-xs text-muted-foreground">{plan.cadence}</span>
              </p>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {plan.description}
              </p>

              <Button
                className="mt-6 w-full"
                variant={plan.featured ? "default" : "outline"}
                asChild
              >
                <a href="#contact">{plan.cta}</a>
              </Button>

              <ul className="mt-7 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
