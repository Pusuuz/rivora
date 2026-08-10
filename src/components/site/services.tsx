import { services } from "@/data/site";
import { Section, SectionHeading } from "./section";
import { Reveal } from "./reveal";

export function Services() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Services"
        title="Everything your business needs to work smarter"
        description="From websites and Telegram bots to CRM, automation and AI solutions — we build practical systems around the way your business actually works."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Reveal key={service.title} delay={i * 0.05}>
            <article className="glass glass-hover group h-full rounded-2xl p-6">
              <span className="grid size-10 place-items-center rounded-xl border border-border bg-secondary/50 transition-colors group-hover:border-primary/40">
                <service.icon className="size-4.5 text-primary" />
              </span>

              <h3 className="mt-5 text-base font-medium tracking-tight">{service.title}</h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
