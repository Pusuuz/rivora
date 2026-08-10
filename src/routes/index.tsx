import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { TrustedBy } from "@/components/site/trusted";
import { Services } from "@/components/site/services";
import { Process } from "@/components/site/process";
import { Products } from "@/components/site/products";
import { WhyRivora } from "@/components/site/why";
import { Stats } from "@/components/site/stats";
import { Testimonials } from "@/components/site/testimonials";
import { Pricing } from "@/components/site/pricing";
import { Faq } from "@/components/site/faq";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";

const title = "RIVORA — AI Business Automation for Uzbekistan";
const description =
  "RIVORA builds AI-powered CRM, ERP, clinic, HR and automation systems for small businesses and private clinics in Uzbekistan. Live in 30 days.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <Services />
        <Process />
        <Products />
        <WhyRivora />
        <Stats />
        <Testimonials />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
