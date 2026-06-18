import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, ArrowRight } from "lucide-react";
import { TIMELINE } from "../lib/portfolio/data";
import { PageHero, useReveal } from "../lib/portfolio/shared";

export const Route = createFileRoute("/timeline")({
  component: TimelinePage,
  head: () => ({ meta: [
    { title: "Timeline — Jeet Soni" },
    { name: "description", content: "Evolution checkpoints: beginner → builder → operator → engineer → founder." },
  ]}),
});

const STAGES = [
  { name: "Beginner", color: "var(--cyan)", note: "Curiosity-led tinkering. Code and circuits as toys." },
  { name: "Intermediate", color: "var(--teal)", note: "First shipped things. Real users, real bugs, real learning." },
  { name: "Builder", color: "var(--electric)", note: "End-to-end ownership. Pixels to PCBs to deploys." },
  { name: "Innovator", color: "var(--purple-glow)", note: "New systems, funded startup, building for the field." },
];

function TimelinePage() {
  useReveal();
  return (
    <>
      <PageHero variant="timeline"
        eyebrow={<><Star className="h-3 w-3" /> SYSTEM · 05 · TIMELINE</>}
        code={`${TIMELINE.length} CHECKPOINTS · ACTIVE`}
        title={<>Evolution <span className="text-gradient">Timeline</span></>}
        subtitle="A connected path with glowing checkpoints — from first soldered circuit to incubated, funded startup."
      />

      {/* Year timeline */}
      <section className="relative py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal relative">
            <div className="absolute left-0 right-0 top-9 h-px bg-gradient-to-r from-transparent via-[color:var(--cyan)]/60 to-transparent" />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {TIMELINE.map((t, i) => (
                <div key={t.year} className="relative">
                  <div className="grid place-items-center">
                    <span className="relative grid place-items-center">
                      <span className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: "var(--cyan)", opacity: 0.5 }} />
                      <span className="relative h-4 w-4 rounded-full bg-[var(--cyan)] shadow-[0_0_24px_var(--cyan)]" />
                    </span>
                  </div>
                  <div className="glass mt-6 rounded-xl p-4 hud-corner card-hover">
                    <div className="mono text-[10.5px] tracking-widest text-[var(--cyan)]">{t.year} · {t.label.toUpperCase()}</div>
                    <div className="mt-2 text-[14px] text-foreground/90">{t.text}</div>
                  </div>
                  {i < TIMELINE.length - 1 && <div className="hidden md:block absolute top-9 right-[-12px] w-3 h-px bg-[var(--cyan)]/40" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stage progression */}
      <section className="relative pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal flex items-center gap-2">
            <Star className="h-4 w-4 text-[var(--cyan)]" />
            <h2 className="text-2xl font-semibold tracking-tight">Stage progression</h2>
          </div>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STAGES.map((s, i) => (
              <div key={s.name} className="reveal glass rounded-2xl p-5 hud-corner card-hover">
                <div className="mono text-[10.5px] tracking-widest" style={{ color: s.color }}>STAGE · 0{i + 1}</div>
                <div className="mt-2 text-xl font-semibold">{s.name}</div>
                <p className="mt-1.5 text-[13.5px] text-muted-foreground leading-relaxed">{s.note}</p>
                <div className="mt-4 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full" style={{ width: `${(i + 1) * 25}%`, background: `linear-gradient(90deg, ${s.color}, transparent)` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link to="/modules" className="btn-hero">Browse Active Modules <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
