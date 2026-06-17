import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Brain as BrainIcon, ArrowRight } from "lucide-react";
import { BRAIN_NODES } from "../lib/portfolio/data";
import { PageHero, useReveal } from "../lib/portfolio/shared";

export const Route = createFileRoute("/brain")({
  component: BrainPage,
  head: () => ({ meta: [
    { title: "Brain Map — Jeet Soni" },
    { name: "description", content: "Interconnected map of skills across security, robotics, AI, web, and cloud." },
  ]}),
});

function BrainPage() {
  useReveal();
  const [hover, setHover] = useState<string | null>(null);
  const activeSet = useMemo(() => {
    if (!hover) return new Set<string>();
    const node = BRAIN_NODES.find((n) => n.id === hover);
    return new Set<string>([hover, ...(node?.related ?? [])]);
  }, [hover]);

  const current = hover ? BRAIN_NODES.find((n) => n.id === hover) : null;

  return (
    <>
      <PageHero
        eyebrow={<><BrainIcon className="h-3 w-3" /> SYSTEM · 04 · BRAIN</>}
        code={`${BRAIN_NODES.length} NODES · LINKED`}
        title={<>Brain <span className="text-gradient">Map</span></>}
        subtitle="The stack is a network, not a list. Hover any node to light its connections."
      />

      <section className="relative py-8">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[1.5fr_1fr] gap-6">
          <div className="reveal relative glass rounded-2xl p-2 hud-corner aspect-[16/10] overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-40" />
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              {BRAIN_NODES.flatMap((n) =>
                n.related.map((r) => {
                  const t = BRAIN_NODES.find((x) => x.id === r)!;
                  const active = activeSet.has(n.id) && activeSet.has(r);
                  return (
                    <line key={n.id + r}
                      x1={n.x} y1={n.y} x2={t.x} y2={t.y}
                      stroke={active ? "var(--cyan)" : "rgba(255,255,255,0.12)"}
                      strokeWidth={active ? 0.4 : 0.2}
                      style={{ transition: "all .3s" }}
                    />
                  );
                })
              )}
            </svg>
            {BRAIN_NODES.map((n) => {
              const isActive = !hover || activeSet.has(n.id);
              return (
                <button
                  key={n.id}
                  onMouseEnter={() => setHover(n.id)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(n.id)}
                  onBlur={() => setHover(null)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 transition-all"
                  style={{ left: `${n.x}%`, top: `${n.y}%`, opacity: isActive ? 1 : 0.35 }}
                >
                  <span className="relative grid place-items-center">
                    <span className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: n.color, opacity: 0.4 }} />
                    <span className="relative h-4 w-4 rounded-full" style={{ background: n.color, boxShadow: `0 0 18px ${n.color}` }} />
                  </span>
                  <span className="mt-2 block mono text-[10.5px] tracking-widest text-foreground/85 whitespace-nowrap">{n.label.toUpperCase()}</span>
                </button>
              );
            })}
          </div>

          <div className="reveal glass rounded-2xl p-5 hud-corner">
            <div className="mono text-[11px] tracking-widest text-[var(--cyan)]">NODE · INSPECTOR</div>
            <div className="mt-3 text-2xl font-semibold">{current ? current.label : "Hover a node"}</div>
            <p className="mt-2 text-muted-foreground text-[14px]">
              {current
                ? "Linked domains light up across the map. Each connection represents a real project where these disciplines met."
                : "Each node is a domain I build in. Connections show where they collide in real projects."}
            </p>
            <div className="hairline my-4" />
            <div className="grid grid-cols-2 gap-2">
              {BRAIN_NODES.map((n) => (
                <button
                  key={n.id}
                  onMouseEnter={() => setHover(n.id)}
                  onMouseLeave={() => setHover(null)}
                  className="glass-soft rounded-lg p-3 flex items-center gap-2 text-left"
                >
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: n.color }} />
                  <span className="text-[13px]">{n.label}</span>
                </button>
              ))}
            </div>
            <div className="mt-6">
              <Link to="/timeline" className="btn-hero w-full justify-center">Open Evolution Timeline <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative pb-20" />
    </>
  );
}
