import { advantages } from "@/data/site";
import { Section, SectionHeading } from "./section";
import { Reveal } from "./reveal";

export function WhyRivora() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Why RIVORA"
        title="Technology that solves real business problems"
        description="We combine software engineering, automation and AI to build practical systems that fit the way your business actually operates."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2">
        {advantages.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.07}>
            <div className="glass glass-hover h-full rounded-2xl p-6">
              <item.icon className="size-5 text-accent" />

              <h3 className="mt-4 text-base font-medium tracking-tight">{item.title}</h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
