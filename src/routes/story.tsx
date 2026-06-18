import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { CHAPTERS } from "../lib/portfolio/data";
import { PageHero, useReveal } from "../lib/portfolio/shared";

export const Route = createFileRoute("/story")({
  component: StoryPage,
  head: () => ({ meta: [
    { title: "Story — Jeet Soni" },
    { name: "description", content: "Five chapters from curiosity to founder — an interactive documentary." },
  ]}),
});

function StoryPage() {
  useReveal();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? Math.min(100, (h.scrollTop / total) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <PageHero variant="story"
        eyebrow={<><Sparkles className="h-3 w-3" /> SYSTEM · 02 · STORY</>}
        code={`CHAPTER PROGRESS · ${Math.round(progress)}%`}
        title={<>Story <span className="text-gradient">Mode</span></>}
        subtitle="An interactive documentary in five chapters. Scroll to advance the arc — from soldering iron to funded founder."
      />

      {/* Progress bar */}
      <div className="sticky top-[78px] z-40 mx-auto max-w-7xl px-6">
        <div className="glass rounded-full p-1 hud-corner">
          <div className="h-1.5 rounded-full bg-gradient-to-r from-[var(--cyan)] via-[var(--electric)] to-[var(--purple-glow)] transition-all" style={{ width: progress + "%" }} />
        </div>
      </div>

      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[80px_1fr] gap-6">
          <div className="hidden lg:block relative">
            <div className="sticky top-40 h-[60vh]">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--cyan)] via-[var(--purple-glow)] to-transparent" />
              {CHAPTERS.map((c, i) => (
                <div key={c.n} className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full" style={{ top: `${(i / (CHAPTERS.length - 1)) * 100}%`, background: c.color, boxShadow: `0 0 18px ${c.color}` }} />
              ))}
            </div>
          </div>

          <div className="space-y-12">
            {CHAPTERS.map((c, i) => (
              <article
                key={c.n}
                className="reveal glass rounded-2xl p-6 hud-corner card-hover"
                style={{ transform: `translateZ(0)`, animation: `float ${8 + i}s ease-in-out infinite` }}
              >
                <div className="flex items-center gap-3">
                  <div className="mono text-[11px] tracking-widest" style={{ color: c.color }}>CHAPTER {c.n}</div>
                  <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${c.color}, transparent)` }} />
                </div>
                <h3 className="mt-3 text-3xl font-semibold">{c.title}</h3>
                <p className="mt-3 text-muted-foreground text-[15.5px] leading-relaxed max-w-3xl">{c.body}</p>
                <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    ["Problem", "Real-world gap worth solving."],
                    ["Approach", "Tight loop: prototype, ship, measure."],
                    ["Outcome", "A thing that works under pressure."],
                    ["Impact", "Time saved, errors avoided, doors opened."],
                    ["Learned", "Constraints sharpen design."],
                    ["Next", "Earlier user feedback, leaner v1."],
                  ].map(([k, v]) => (
                    <div key={k} className="glass-soft rounded-lg p-3">
                      <div className="mono text-[10px] tracking-widest text-[var(--cyan)]">{k.toUpperCase()}</div>
                      <div className="text-[13px] text-foreground/90 mt-1">{v}</div>
                    </div>
                  ))}
                </div>
              </article>
            ))}

            <div className="reveal glass rounded-2xl p-6 hud-corner flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="mono text-[11px] tracking-widest text-[var(--cyan)]">EPILOGUE</div>
                <div className="text-xl font-semibold mt-1">The story continues — in the lab.</div>
              </div>
              <Link to="/lab" className="btn-hero">Enter the Lab <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
