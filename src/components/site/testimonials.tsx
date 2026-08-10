import { testimonials } from "@/data/site";
import { Section, SectionHeading } from "./section";
import { Reveal } from "./reveal";

export function Testimonials() {
  return (
    <Section id="testimonials">
      <SectionHeading
        eyebrow="Use cases"
        title="What businesses can automate with RIVORA"
        description="Examples of how our technology can be applied to everyday business operations."
      />

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {testimonials.map((item, i) => (
          <Reveal key={item.name} delay={i * 0.06}>
            <figure className="glass glass-hover flex h-full flex-col justify-between rounded-2xl p-7">
              <blockquote className="text-sm leading-relaxed text-foreground/90 sm:text-base">
                “{item.quote}”
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3">
                <span
                  className="grid size-10 shrink-0 place-items-center rounded-full text-xs font-semibold text-primary-foreground"
                  style={{ backgroundImage: "var(--gradient-brand)" }}
                >
                  {item.initials}
                </span>

                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{item.name}</span>

                  <span className="block truncate text-xs text-muted-foreground">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
