import { motion } from "motion/react";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardPreview } from "./dashboard-preview";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-12 sm:px-6 sm:pb-28 sm:pt-16">
      <div className="mx-auto w-full max-w-6xl text-center">
        <motion.a
          href="#products"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass glass-hover mx-auto inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-muted-foreground"
        >
          <Sparkles className="size-3.5 text-accent" />

          <span>BUILT IN UZBEKISTAN · READY FOR THE WORLD</span>

          <ArrowRight className="size-3.5" />
        </motion.a>

        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.9,
            delay: 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-gradient mx-auto mt-7 max-w-4xl text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl md:text-7xl"
        >
          AI automation for{" "}
          <span className="text-brand-gradient">businesses ready to move faster</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg"
        >
          RIVORA builds modern CRM, ERP, clinic and AI solutions that help businesses reduce manual
          work, connect their operations and move faster.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button size="lg" asChild className="group w-full sm:w-auto">
            <a href="#contact">
              Start your automation
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>

          <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
            <a href="#products">
              <PlayCircle className="size-4" />
              Explore our solutions
            </a>
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-5 text-xs text-muted-foreground/70"
        >
          No commitment · Initial consultation · NDA available on request
        </motion.p>
      </div>

      <div className="mt-16 sm:mt-20">
        <DashboardPreview />
      </div>
    </section>
  );
}
