import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Terminal, Activity, Wifi, ArrowRight, Server, Cpu, Shield, Briefcase, Handshake, MessageCircle, Lightbulb, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { track } from "../lib/portfolio/analytics";
import { PROFILE } from "../lib/portfolio/data";
import { PageHero, useReveal } from "../lib/portfolio/shared";

export const Route = createFileRoute("/transmit")({
  component: TransmitPage,
  head: () => ({ meta: [
    { title: "Transmit — Jeet Soni" },
    { name: "description", content: "System messages, activity logs, and uplink status." },
  ]}),
});

const SEED = [
  "› uplink stable · 99.9%",
  "› module BinBuddy · pilot ops nominal",
  "› azure secure-storage · key rotation OK",
  "› ai concierge · guardrails engaged",
  "› robotics rig · field test queued",
];

function TransmitPage() {
  useReveal();
  const [log, setLog] = useState<string[]>(SEED);

  useEffect(() => {
    const tick = setInterval(() => {
      const t = new Date().toLocaleTimeString();
      const events = [
        `› ${t} · heartbeat received`,
        `› ${t} · operator online`,
        `› ${t} · scan complete · no anomalies`,
        `› ${t} · channel idle · awaiting transmission`,
      ];
      setLog((l) => [...l, events[Math.floor(Math.random() * events.length)]].slice(-12));
    }, 2200);
    return () => clearInterval(tick);
  }, []);

  return (
    <>
      <PageHero variant="transmit"
        eyebrow={<><Terminal className="h-3 w-3" /> SYSTEM · 07 · TRANSMIT</>}
        code="CHANNEL · OPEN"
        title={<>Transmission <span className="text-gradient">Console</span></>}
        subtitle="Real-time system messages and activity logs from the operator's command center."
      />

      <section className="relative py-8">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[1.4fr_1fr] gap-5">
          {/* Console */}
          <div className="reveal glass rounded-2xl p-5 hud-corner scanline">
            <div className="flex items-center gap-2 mono text-[11px] text-[var(--cyan)]">
              <Terminal className="h-3.5 w-3.5" /> /transmit/console <span className="ml-auto opacity-70">LIVE</span>
            </div>
            <div className="hairline my-3" />
            <div className="mono text-[12.5px] leading-relaxed bg-black/40 border border-white/10 rounded-lg p-4 min-h-[320px] max-h-[420px] overflow-auto">
              {log.map((l, i) => (
                <div key={i} className="text-foreground/85"><span className="text-[var(--cyan)]">{l.replace("›", "›")}</span></div>
              ))}
              <div className="text-[var(--cyan)] cursor-blink">awaiting</div>
            </div>
          </div>

          {/* Status cards */}
          <div className="grid grid-cols-1 gap-4">
            {[
              { i: Activity, l: "Operator", v: "ONLINE", c: "var(--cyan)" },
              { i: Wifi, l: "Uplink", v: "99.9%", c: "var(--teal)" },
              { i: Server, l: "Cloud Region", v: "AZURE · IN-CENTRAL", c: "var(--electric)" },
              { i: Shield, l: "Security Posture", v: "HARDENED", c: "var(--gold)" },
              { i: Cpu, l: "Compute Load", v: "32%", c: "var(--purple-glow)" },
            ].map((s) => (
              <div key={s.l} className="reveal glass rounded-2xl p-4 hud-corner card-hover flex items-center gap-4">
                <div className="grid place-items-center h-10 w-10 rounded-lg" style={{ background: `color-mix(in oklab, ${s.c} 18%, transparent)`, border: `1px solid color-mix(in oklab, ${s.c} 50%, transparent)` }}>
                  <s.i className="h-4 w-4" style={{ color: s.c }} />
                </div>
                <div className="flex-1">
                  <div className="mono text-[10.5px] tracking-widest text-muted-foreground">{s.l.toUpperCase()}</div>
                  <div className="text-[15px] font-semibold">{s.v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TemplatesSection />

      <section className="relative pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal glass rounded-2xl p-6 hud-corner flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="mono text-[11px] tracking-widest text-[var(--cyan)]">DIRECT · LINKS</div>
              <div className="mt-1 text-lg">Operator standing by at <span className="text-foreground font-semibold">{PROFILE.email}</span></div>
            </div>
            <Link to="/contact" className="btn-hero">Open Contact Channel <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}

const TEMPLATES = [
  {
    icon: Briefcase,
    tag: "HIRE",
    title: "Recruit / Hire",
    blurb: "Open role, internship, or contract engagement.",
    subject: "Opportunity for Jeet — [Role]",
    body: "Hi Jeet,\n\nI came across your mission control and would love to discuss a role at [Company].\n\nRole: \nLocation / Remote: \nStack: \nTimeline: \n\nLooking forward to connecting.\n\n— ",
    color: "var(--cyan)",
  },
  {
    icon: Handshake,
    tag: "COLLAB",
    title: "Collaboration",
    blurb: "Co-build, partner, or contribute on a project.",
    subject: "Collab proposal — [Project]",
    body: "Hey Jeet,\n\nI'm working on [project] and think there's a strong fit with what you build.\n\nIdea: \nWhy you: \nWhat I bring: \nNext step: \n\n— ",
    color: "var(--electric)",
  },
  {
    icon: Lightbulb,
    tag: "PITCH",
    title: "Pitch an Idea",
    blurb: "Got a startup, product, or research idea? Send it.",
    subject: "Pitch — [Idea name]",
    body: "Hi Jeet,\n\nQuick pitch:\n\nProblem: \nSolution: \nWhy now: \nWhat I need from you: \n\nHappy to share a deck / demo.\n\n— ",
    color: "var(--purple-glow)",
  },
  {
    icon: MessageCircle,
    tag: "HELLO",
    title: "Just say Hi",
    blurb: "Questions, feedback, or a quick hello.",
    subject: "Hello from the Mission Control",
    body: "Hi Jeet,\n\nJust wanted to say — \n\n— ",
    color: "var(--gold)",
  },
];

function TemplatesSection() {
  const [copied, setCopied] = useState<string | null>(null);

  const open = (t: (typeof TEMPLATES)[number]) => {
    const href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(t.body)}`;
    track("transmit_template", { tag: t.tag });
    window.location.href = href;
  };

  const copy = async (t: (typeof TEMPLATES)[number]) => {
    try {
      await navigator.clipboard.writeText(`To: ${PROFILE.email}\nSubject: ${t.subject}\n\n${t.body}`);
      setCopied(t.tag);
      toast.success("Template copied", { description: `${t.title} ready to paste.` });
      setTimeout(() => setCopied(null), 1800);
    } catch {
      toast.error("Couldn't copy — try the mailto button.");
    }
  };

  return (
    <section className="relative py-6">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <div className="mono text-[11px] tracking-widest text-[var(--cyan)]">QUICK · TRANSMISSIONS</div>
            <h2 className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight">Pre-loaded message templates</h2>
            <p className="text-muted-foreground text-sm mt-1">One tap to draft an email, or copy the full template to send anywhere.</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TEMPLATES.map((t) => (
            <div key={t.tag} className="reveal glass rounded-2xl p-4 hud-corner card-hover flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="grid place-items-center h-9 w-9 rounded-lg" style={{ background: `color-mix(in oklab, ${t.color} 18%, transparent)`, border: `1px solid color-mix(in oklab, ${t.color} 50%, transparent)` }}>
                  <t.icon className="h-4 w-4" style={{ color: t.color }} />
                </div>
                <span className="mono text-[9.5px] tracking-widest px-2 py-0.5 rounded-full border border-white/10 text-muted-foreground">{t.tag}</span>
              </div>
              <div>
                <div className="text-[15px] font-semibold">{t.title}</div>
                <div className="text-[12.5px] text-muted-foreground mt-0.5">{t.blurb}</div>
              </div>
              <div className="mt-auto flex items-center gap-2">
                <button onClick={() => open(t)} className="flex-1 inline-flex items-center justify-center gap-1.5 text-[12px] px-3 py-2 rounded-md bg-gradient-to-br from-[var(--cyan)] to-[var(--electric)] text-background font-medium hover:opacity-90 transition">
                  Send <ArrowRight className="h-3 w-3" />
                </button>
                <button onClick={() => copy(t)} aria-label="Copy template" className="grid place-items-center h-9 w-9 rounded-md border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-foreground/80 transition">
                  {copied === t.tag ? <Check className="h-3.5 w-3.5 text-[var(--cyan)]" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
