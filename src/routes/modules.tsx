import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Layers, Sparkles, ArrowRight } from "lucide-react";
import { PROJECTS } from "../lib/portfolio/data";
import { PageHero, useReveal } from "../lib/portfolio/shared";

export const Route = createFileRoute("/modules")({
  component: ModulesPage,
  head: () => ({ meta: [
    { title: "Modules — Jeet Soni" },
    { name: "description", content: "Active modules — projects with problem, approach, outcome, impact, learnings, and future scope." },
  ]}),
});

function ModulesPage() {
  useReveal();
  const cats = useMemo(() => ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))], []);
  const [active, setActive] = useState("All");
  const [open, setOpen] = useState<string | null>(null);
  const list = PROJECTS.filter((p) => active === "All" || p.category === active);

  return (
    <>
      <PageHero variant="modules"
        eyebrow={<><Layers className="h-3 w-3" /> SYSTEM · 06 · MODULES</>}
        code={`${PROJECTS.length} MODULES · IN-FLIGHT`}
        title={<>Active <span className="text-gradient">Modules</span></>}
        subtitle="Projects with weight behind them. Each one a real loop of problem, approach, outcome, impact — plus what I learned and what's next."
      >
        <div className="mt-8 flex flex-wrap gap-1.5">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-3 py-1.5 mono text-[11px] tracking-widest rounded-md border transition-all ${
                active === c
                  ? "bg-[color:var(--cyan)]/15 border-[color:var(--cyan)] text-[var(--cyan)]"
                  : "border-white/10 text-muted-foreground hover:text-foreground hover:border-white/30"
              }`}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>
      </PageHero>

      <section className="relative py-10">
        <div className="mx-auto max-w-7xl px-6">
          {list.length === 0 ? (
            <div className="glass rounded-2xl p-8 text-center text-muted-foreground">No modules in this category yet.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {list.map((p) => {
                const isOpen = open === p.title;
                return (
                  <article key={p.title} className="reveal glass rounded-2xl p-5 hud-corner card-hover flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="mono text-[10.5px] tracking-widest text-[var(--cyan)]">{p.category.toUpperCase()}</span>
                      <Sparkles className="h-3.5 w-3.5 text-[var(--gold)]" />
                    </div>
                    <h3 className="mt-3 text-lg font-semibold leading-tight">{p.title}</h3>
                    <p className="mt-2 text-[14px] text-muted-foreground leading-relaxed">{p.summary}</p>
                    {isOpen && (
                      <div className="mt-4 grid gap-2">
                        {[
                          ["Problem", p.problem],
                          ["Approach", p.approach],
                          ["Outcome", p.outcome],
                          ["Impact", p.impact],
                          ["What I Learned", p.learned],
                          ["Future Improvements", p.future],
                        ].map(([k, v]) => (
                          <div key={k} className="glass-soft rounded-lg p-3">
                            <div className="mono text-[10px] tracking-widest text-[var(--cyan)]">{k.toUpperCase()}</div>
                            <div className="text-[13px] text-foreground/90 mt-1">{v}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t} className="mono text-[10px] tracking-widest px-1.5 py-0.5 rounded-md border border-white/10 bg-white/[0.04] text-foreground/75">{t.toUpperCase()}</span>
                      ))}
                    </div>
                    <button
                      onClick={() => setOpen(isOpen ? null : p.title)}
                      className="mt-4 inline-flex items-center justify-between text-[12.5px] mono text-foreground/85 hover:text-[var(--cyan)] transition-colors"
                    >
                      {isOpen ? "COLLAPSE BRIEF" : "OPEN MODULE BRIEF"} <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
