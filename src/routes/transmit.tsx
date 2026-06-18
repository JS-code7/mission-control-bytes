import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Terminal, Activity, Wifi, ArrowRight, Server, Cpu, Shield } from "lucide-react";
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
