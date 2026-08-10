import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/site";
import { Section, SectionHeading } from "./section";
import { Reveal } from "./reveal";

export function Faq() {
  return (
    <Section id="faq">
      <SectionHeading
        eyebrow="FAQ"
        title="Questions before starting a project"
        description="A few things businesses usually want to know before working with RIVORA."
      />

      <Reveal className="mx-auto mt-12 max-w-3xl">
        <Accordion type="single" collapsible className="glass rounded-3xl px-6 py-2">
          {faqs.map((item) => (
            <AccordionItem key={item.question} value={item.question} className="border-border">
              <AccordionTrigger className="text-left text-sm font-medium hover:no-underline sm:text-base">
                {item.question}
              </AccordionTrigger>

              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Section>
  );
}
