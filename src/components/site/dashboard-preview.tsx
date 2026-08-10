import { motion } from "motion/react";
import {
  ArrowUpRight,
  Bot,
  CalendarCheck,
  CircleDollarSign,
  Users,
  Zap,
} from "lucide-react";

const bars = [38, 54, 46, 72, 61, 88, 76, 96, 84, 100, 92, 78];

const activity = [
  { icon: Bot, text: "AI assistant qualified 12 new leads", time: "2m" },
  { icon: CalendarCheck, text: "34 appointments confirmed via Telegram", time: "14m" },
  { icon: Zap, text: "Invoice workflow completed automatically", time: "38m" },
];

export function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 12 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200 }}
      className="relative mx-auto w-full max-w-5xl"
    >
      <div
        className="pointer-events-none absolute -inset-x-10 -top-10 bottom-0 animate-pulse-glow blur-3xl"
        style={{ backgroundImage: "var(--gradient-mesh)" }}
        aria-hidden="true"
      />

      <div className="glass relative overflow-hidden rounded-2xl p-2 sm:rounded-3xl sm:p-3">
        <div className="rounded-xl border border-border bg-background/70 sm:rounded-2xl">
          {/* window bar */}
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="size-2.5 rounded-full bg-destructive/70" />
            <span className="size-2.5 rounded-full bg-chart-4/60" />
            <span className="size-2.5 rounded-full bg-accent/70" />
            <div className="ml-3 hidden min-w-0 flex-1 items-center gap-2 sm:flex">
              <span className="truncate rounded-md border border-border bg-secondary/50 px-2.5 py-1 text-[11px] text-muted-foreground">
                app.rivora.uz / operations
              </span>
            </div>
            <span className="ml-auto rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
              Live
            </span>
          </div>

          <div className="grid gap-3 p-3 sm:p-4 lg:grid-cols-[1fr_260px]">
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { label: "Revenue", value: "$284,120", delta: "+18.4%", icon: CircleDollarSign },
                  { label: "Active clients", value: "1,248", delta: "+6.2%", icon: Users },
                  { label: "Hours saved", value: "3,940", delta: "+24.1%", icon: Zap },
                ].map((kpi, i) => (
                  <motion.div
                    key={kpi.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.12, duration: 0.6 }}
                    className="rounded-xl border border-border bg-card/60 p-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-muted-foreground">{kpi.label}</span>
                      <kpi.icon className="size-3.5 text-muted-foreground" />
                    </div>
                    <p className="mt-2 text-lg font-semibold tracking-tight">{kpi.value}</p>
                    <span className="mt-1 inline-flex items-center gap-1 text-[11px] text-accent">
                      <ArrowUpRight className="size-3" />
                      {kpi.delta}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="rounded-xl border border-border bg-card/60 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Automation throughput</p>
                  <span className="text-[11px] text-muted-foreground">Last 12 weeks</span>
                </div>
                <div className="mt-5 flex h-32 items-end gap-1.5 sm:gap-2">
                  {bars.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.8 + i * 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="flex-1 rounded-t-[4px]"
                      style={{
                        backgroundImage:
                          "linear-gradient(180deg, var(--color-primary), color-mix(in oklab, var(--color-accent) 60%, transparent))",
                        opacity: 0.35 + (i / bars.length) * 0.65,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl border border-border bg-card/60 p-4">
                <p className="text-sm font-medium">AI activity</p>
                <div className="mt-3 space-y-3">
                  {activity.map((item, i) => (
                    <motion.div
                      key={item.text}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + i * 0.18, duration: 0.6 }}
                      className="flex items-start gap-2.5"
                    >
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border border-border bg-secondary/60">
                        <item.icon className="size-3 text-primary" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[12px] leading-snug text-muted-foreground">{item.text}</p>
                        <span className="text-[10px] text-muted-foreground/60">{item.time} ago</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card/60 p-4">
                <p className="text-sm font-medium">Process health</p>
                {[
                  { label: "CRM sync", v: 96 },
                  { label: "Billing bot", v: 88 },
                  { label: "Clinic queue", v: 74 },
                ].map((row, i) => (
                  <div key={row.label} className="mt-3">
                    <div className="flex justify-between text-[11px] text-muted-foreground">
                      <span>{row.label}</span>
                      <span>{row.v}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${row.v}%` }}
                        transition={{ delay: 1.2 + i * 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full"
                        style={{ backgroundImage: "var(--gradient-brand)" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* floating glass cards */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, duration: 0.7 }}
        className="glass absolute top-1/3 -left-24 hidden animate-float rounded-2xl p-3 xl:block"
      >
        <p className="text-[11px] text-muted-foreground">Response time</p>
        <p className="text-lg font-semibold tracking-tight">0.8s</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, duration: 0.7 }}
        style={{ animationDelay: "1.5s" }}
        className="glass absolute -right-24 bottom-16 hidden animate-float rounded-2xl p-3 xl:block"
      >
        <p className="text-[11px] text-muted-foreground">Tasks automated today</p>
        <p className="text-lg font-semibold tracking-tight text-accent">1,392</p>
      </motion.div>
    </motion.div>
  );
}