import { useState, type FormEvent } from "react";
import { ArrowRight, Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

import { submitContact } from "@/lib/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { contactChannels } from "@/data/site";

import { Section, SectionHeading } from "./section";
import { Reveal } from "./reveal";

const icons = [Mail, Send, MapPin];

export function Contact() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const result = await submitContact({
        data: {
          name: String(formData.get("name") ?? ""),
          company: String(formData.get("company") ?? ""),
          email: String(formData.get("email") ?? ""),
          phone: String(formData.get("phone") ?? ""),
          message: String(formData.get("message") ?? ""),
        },
      });

      if (!result.success) {
        toast.error("Could not send request", {
          description: result.error ?? "Something went wrong.",
        });

        return;
      }

      form.reset();

      toast.success("Request sent!", {
        description: "We will contact you shortly.",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      toast.error("Could not send request", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section id="contact">
      <SectionHeading
        eyebrow="Contact"
        title="Tell us what you want to automate"
        description="Tell us about your business, the problems you are facing and what you would like to improve. We will help you find the right solution."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        {/* Contact information */}
        <Reveal>
          <div className="space-y-3">
            {contactChannels.map((channel, i) => {
              const Icon = icons[i] ?? Mail;

              return (
                <div
                  key={channel.label}
                  className="glass glass-hover flex items-center gap-4 rounded-2xl p-5"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-border bg-secondary/50">
                    <Icon className="size-4 text-primary" />
                  </span>

                  <div className="min-w-0">
                    <p className="text-xs tracking-wide text-muted-foreground uppercase">
                      {channel.label}
                    </p>

                    <p className="mt-1 truncate text-sm font-medium">{channel.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Contact form */}
        <Reveal delay={0.15}>
          <form onSubmit={onSubmit} className="glass rounded-3xl p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>

                <Input id="name" name="name" required placeholder="Your name" />
              </div>

              {/* Company */}
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>

                <Input id="company" name="company" required placeholder="Your company" />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Work email</Label>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>

                <Input id="phone" name="phone" placeholder="+998 90 000 00 00" />
              </div>
            </div>

            {/* Message */}
            <div className="mt-4 space-y-2">
              <Label htmlFor="message">What would you like to automate?</Label>

              <Textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell us about your business and the process you want to improve..."
              />
            </div>

            {/* Submit */}
            <Button type="submit" size="lg" className="group mt-6 w-full" disabled={submitting}>
              {submitting ? "Sending…" : "Start a conversation"}

              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Button>

            <p className="mt-3 text-center text-xs text-muted-foreground/70">
              No commitment. Tell us what you need and we will discuss the best approach.
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
