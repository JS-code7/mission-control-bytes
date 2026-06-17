import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bot, FlaskConical, Play, Send, Workflow, Zap, ChevronRight, ArrowRight } from "lucide-react";
import { PageHero, useReveal } from "../lib/portfolio/shared";

export const Route = createFileRoute("/lab")({
  component: LabPage,
  head: () => ({ meta: [
    { title: "Lab — Jeet Soni" },
    { name: "description", content: "Interactive demos: AI concierge, adaptive traffic simulator, and a research console." },
  ]}),
});

function ChatbotDemo() {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<{ from: "user" | "bot"; text: string }[]>([
    { from: "bot", text: "Concierge online. Ask me about Jeet's stack, projects, or how to collab." },
  ]);
  const send = () => {
    if (!input.trim()) return;
    const q = input.trim();
    setMsgs((m) => [...m, { from: "user", text: q }]);
    setInput("");
    setTimeout(() => {
      const a = q.toLowerCase();
      let reply = "Routing your question to the operator. For a direct reply, hit /contact.";
      if (a.includes("project")) reply = "Six modules are live — BinBuddy, Adaptive Traffic, Defensive Toolkit, Azure Blueprint, AI Concierge, Robotics Rig.";
      else if (a.includes("hire") || a.includes("work")) reply = "Open to founder/engineer collaborations in AI, robotics, and secure systems. Email or LinkedIn is fastest.";
      else if (a.includes("stack") || a.includes("skill")) reply = "Core: AI/ML, Cybersecurity, Robotics & Electronics, Web (React/TS), Azure cloud.";
      else if (a.includes("binbuddy")) reply = "BinBuddy is an incubated, funded startup — IoT bins + vision + cloud routing.";
      setMsgs((m) => [...m, { from: "bot", text: reply }]);
    }, 450);
  };
  return (
    <div className="glass rounded-2xl p-4 hud-corner h-full flex flex-col">
      <div className="flex items-center gap-2 mono text-[11px] text-[var(--cyan)]">
        <Bot className="h-3.5 w-3.5" /> AI CONCIERGE · PREVIEW <span className="ml-auto opacity-70">v0.3</span>
      </div>
      <div className="hairline my-3" />
      <div className="flex-1 space-y-2 overflow-auto max-h-[260px] pr-1">
        {msgs.map((m, i) => (
          <div key={i} className={`text-[13px] leading-snug ${m.from === "bot" ? "text-foreground/85" : "text-foreground"}`}>
            <span className={`mono text-[10px] mr-2 ${m.from === "bot" ? "text-[var(--cyan)]" : "text-[var(--purple-glow)]"}`}>
              {m.from === "bot" ? "BOT" : "YOU"}
            </span>{m.text}
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Try: tell me about BinBuddy"
          className="flex-1 bg-white/5 border border-white/10 rounded-md px-3 py-2 text-[13px] outline-none focus:border-[var(--cyan)]"
        />
        <button onClick={send} className="btn-hero !py-2 !px-3"><Send className="h-3.5 w-3.5" /></button>
      </div>
    </div>
  );
}

function TrafficDemo() {
  const [running, setRunning] = useState(true);
  const [phase, setPhase] = useState<"N" | "E" | "S" | "W">("N");
  useEffect(() => {
    if (!running) return;
    const order: ("N" | "E" | "S" | "W")[] = ["N", "E", "S", "W"];
    const t = setInterval(() => setPhase((p) => order[(order.indexOf(p) + 1) % 4]), 1400);
    return () => clearInterval(t);
  }, [running]);
  const light = (dir: "N" | "E" | "S" | "W") => (phase === dir ? "var(--cyan)" : "rgba(255,255,255,0.15)");
  return (
    <div className="glass rounded-2xl p-4 hud-corner h-full">
      <div className="flex items-center gap-2 mono text-[11px] text-[var(--cyan)]">
        <Workflow className="h-3.5 w-3.5" /> ADAPTIVE TRAFFIC · SIM
        <button onClick={() => setRunning((r) => !r)} className="ml-auto btn-ghost !py-1 !px-2 text-[11px]">
          <Play className="h-3 w-3" /> {running ? "Pause" : "Run"}
        </button>
      </div>
      <div className="hairline my-3" />
      <div className="relative mx-auto aspect-square w-[240px]">
        <div className="absolute inset-0 grid place-items-center">
          <div className="w-full h-12 bg-white/[0.04] absolute top-1/2 -translate-y-1/2" />
          <div className="h-full w-12 bg-white/[0.04] absolute left-1/2 -translate-x-1/2" />
        </div>
        <div className="absolute left-1/2 top-2 -translate-x-1/2 h-3 w-3 rounded-full" style={{ background: light("N"), boxShadow: phase === "N" ? "0 0 18px var(--cyan)" : "" }} />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full" style={{ background: light("E"), boxShadow: phase === "E" ? "0 0 18px var(--cyan)" : "" }} />
        <div className="absolute left-1/2 bottom-2 -translate-x-1/2 h-3 w-3 rounded-full" style={{ background: light("S"), boxShadow: phase === "S" ? "0 0 18px var(--cyan)" : "" }} />
        <div className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full" style={{ background: light("W"), boxShadow: phase === "W" ? "0 0 18px var(--cyan)" : "" }} />
        <div className="absolute left-1/2 -translate-x-1/2 h-2 w-3 rounded-sm bg-[var(--gold)] transition-all" style={{ top: phase === "S" ? "70%" : "20%" }} />
      </div>
      <div className="mono text-[11px] text-muted-foreground mt-2 text-center">PHASE · {phase} · adaptive timing engaged</div>
    </div>
  );
}

function TryThisDemo() {
  const items = [
    { label: "Run security scan", t: "Scanning ports… 22, 80, 443 only. No surface bleed." },
    { label: "Deploy module", t: "Build OK · Tests passed · Pushed to prod in 38s." },
    { label: "Train model", t: "Loss: 0.0421 · Acc: 96.8% · Snapshot saved." },
    { label: "Calibrate sensor", t: "Drift corrected · ±0.02 · Baseline locked." },
  ];
  const [log, setLog] = useState<string[]>(["» Lab ready. Click a button to simulate."]);
  return (
    <div className="glass rounded-2xl p-4 hud-corner h-full flex flex-col">
      <div className="flex items-center gap-2 mono text-[11px] text-[var(--cyan)]">
        <FlaskConical className="h-3.5 w-3.5" /> RESEARCH · CONSOLE
      </div>
      <div className="hairline my-3" />
      <div className="grid grid-cols-1 gap-2">
        {items.map((it) => (
          <button key={it.label} onClick={() => setLog((l) => [...l, "» " + it.t].slice(-6))} className="btn-ghost justify-between">
            <span className="flex items-center gap-2"><Zap className="h-3.5 w-3.5 text-[var(--cyan)]" /> {it.label}</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        ))}
      </div>
      <div className="mt-3 mono text-[12px] bg-black/30 rounded-md border border-white/10 p-3 flex-1 min-h-[140px]">
        {log.map((l, i) => <div key={i} className="text-foreground/80">{l}</div>)}
      </div>
    </div>
  );
}

function LabPage() {
  useReveal();
  return (
    <>
      <PageHero
        eyebrow={<><FlaskConical className="h-3 w-3" /> SYSTEM · 03 · LAB</>}
        code="LAB · LIVE"
        title={<>Interactive <span className="text-gradient">Lab</span></>}
        subtitle="Not a resume — a research facility. Touch the demos and watch the systems respond."
      />

      <section className="relative py-10">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-3 gap-5">
          <div className="reveal"><ChatbotDemo /></div>
          <div className="reveal"><TrafficDemo /></div>
          <div className="reveal"><TryThisDemo /></div>
        </div>
      </section>

      <section className="relative pb-20">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-3 gap-5">
          {[
            { t: "Edge perception", d: "On-device computer vision for fill-level and contamination classification." },
            { t: "Policy-aware LLMs", d: "Guardrails, refusal logic, and tool routing for high-stakes assistants." },
            { t: "Hardware-in-the-loop", d: "Sim-to-real bridges so models meet sensors before they meet customers." },
          ].map((p) => (
            <div key={p.t} className="reveal glass rounded-2xl p-5 hud-corner card-hover">
              <div className="mono text-[10.5px] tracking-widest text-[var(--cyan)]">EXPERIMENT</div>
              <div className="mt-2 text-lg font-semibold">{p.t}</div>
              <p className="mt-2 text-[14px] text-muted-foreground leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto max-w-7xl px-6 mt-10">
          <Link to="/brain" className="btn-hero">Open Brain Map <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </>
  );
}
