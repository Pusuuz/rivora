import { processSteps } from "@/data/site";
import { Section, SectionHeading } from "./section";
import { Reveal } from "./reveal";

export function Process() {
  return (
    <Section id="process">
      <SectionHeading
        eyebrow="How it works"
        title="From business problem to working solution"
        description="We turn repetitive processes into practical digital systems through a clear, transparent development process."
      />

      <div className="relative mt-14">
        <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border md:left-1/2 md:-translate-x-1/2" />

        <div className="space-y-4 md:space-y-0">
          {processSteps.map((step, i) => (
            <Reveal key={step.step} delay={i * 0.06}>
              <div
                className={`relative flex gap-5 md:w-1/2 md:gap-0 ${
                  i % 2 === 0 ? "md:pr-10 md:text-right" : "md:ml-auto md:pl-10"
                }`}
              >
                <span
                  className={`relative z-10 mt-1 grid size-10 shrink-0 place-items-center rounded-full border border-border bg-card text-xs font-semibold md:absolute md:top-8 ${
                    i % 2 === 0 ? "md:-right-5" : "md:-left-5"
                  }`}
                >
                  {step.step}
                </span>

                <div className="glass glass-hover w-full rounded-2xl p-6 md:my-3">
                  <h3 className="text-base font-medium tracking-tight">{step.title}</h3>

                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
