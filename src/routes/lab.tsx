import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Bot, FlaskConical, Play, Send, Workflow, Zap, ChevronRight, ArrowRight, Sparkles, Tag, Smile, Loader2 } from "lucide-react";
import { PageHero, useReveal } from "../lib/portfolio/shared";
import { track } from "../lib/portfolio/analytics";

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

type MlResp = { task: string; result: Record<string, unknown>; error?: string };

function MlDemo({
  task,
  title,
  icon: Icon,
  placeholder,
  accent,
  render,
}: {
  task: "sentiment" | "classify" | "keywords";
  title: string;
  icon: typeof Smile;
  placeholder: string;
  accent: string;
  render: (r: Record<string, unknown>) => React.ReactNode;
}) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const run = async () => {
    if (!text.trim() || loading) return;
    setLoading(true);
    setErr(null);
    setResult(null);
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      track("ml_demo_run", { task });
      const r = await fetch("/api/ml", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ task, text: text.trim() }),
        signal: ctrl.signal,
      });
      const data = (await r.json()) as MlResp;
      if (!r.ok) throw new Error(data.error || "Model error");
      setResult(data.result);
    } catch (e) {
      if ((e as Error).name !== "AbortError") setErr((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass rounded-2xl p-4 hud-corner h-full flex flex-col card-hover">
      <div className="flex items-center gap-2 mono text-[11px]" style={{ color: accent }}>
        <Icon className="h-3.5 w-3.5" /> {title}
        <span className="ml-auto opacity-60">LIVE · MODEL</span>
      </div>
      <div className="hairline my-3" />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="bg-white/5 border border-white/10 rounded-md px-3 py-2 text-[13px] outline-none focus:border-[var(--cyan)] resize-none transition-colors"
      />
      <button
        onClick={run}
        disabled={loading || !text.trim()}
        className="btn-hero mt-3 !py-2 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
        {loading ? "Analyzing" : "Run model"}
      </button>
      <div className="mt-3 bg-black/30 rounded-md border border-white/10 p-3 flex-1 min-h-[110px] text-[13px] animate-fade-in">
        {err && <div className="text-red-400 mono text-[11px]">! {err}</div>}
        {!err && !result && !loading && (
          <div className="mono text-[11px] text-muted-foreground">» awaiting input · powered by Lovable AI</div>
        )}
        {loading && <div className="mono text-[11px] text-muted-foreground">» computing · streaming inference</div>}
        {result && render(result)}
      </div>
    </div>
  );
}

function SentimentDemo() {
  return (
    <MlDemo
      task="sentiment"
      title="SENTIMENT · ANALYZER"
      icon={Smile}
      accent="var(--electric)"
      placeholder="Paste a review, tweet, or note…"
      render={(r) => {
        const label = (r.label as string) ?? "—";
        const score = typeof r.score === "number" ? r.score : 0;
        const reason = (r.reason as string) ?? "";
        const color =
          label === "positive" ? "var(--teal)" : label === "negative" ? "#f87171" : "var(--gold)";
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="mono text-[10px] tracking-widest opacity-70">LABEL</span>
              <span className="mono text-[12px] uppercase font-semibold" style={{ color }}>
                {label}
              </span>
              <span className="ml-auto mono text-[10px] opacity-70">{Math.round(score * 100)}%</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.round(score * 100)}%`, background: color }}
              />
            </div>
            <div className="text-foreground/80 text-[12.5px]">{reason}</div>
          </div>
        );
      }}
    />
  );
}

function ClassifierDemo() {
  return (
    <MlDemo
      task="classify"
      title="TOPIC · CLASSIFIER"
      icon={Tag}
      accent="var(--purple-glow)"
      placeholder="Paste a snippet — we'll route the topic…"
      render={(r) => {
        const topic = (r.topic as string) ?? "other";
        const confidence = typeof r.confidence === "number" ? r.confidence : 0;
        const why = (r.why as string) ?? "";
        return (
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-[var(--purple-glow)]/15 border border-[var(--purple-glow)]/30">
              <span className="mono text-[10px] tracking-widest text-[var(--purple-glow)]">{topic.toUpperCase()}</span>
            </div>
            <div className="mono text-[10px] opacity-70">CONFIDENCE · {Math.round(confidence * 100)}%</div>
            <div className="text-foreground/80 text-[12.5px]">{why}</div>
          </div>
        );
      }}
    />
  );
}

function KeywordDemo() {
  return (
    <MlDemo
      task="keywords"
      title="KEYWORD · EXTRACTOR"
      icon={Sparkles}
      accent="var(--cyan)"
      placeholder="Drop a paragraph to extract its core terms…"
      render={(r) => {
        const kws = Array.isArray(r.keywords) ? (r.keywords as string[]) : [];
        return (
          <div className="flex flex-wrap gap-1.5">
            {kws.map((k) => (
              <span
                key={k}
                className="mono text-[11px] px-2 py-1 rounded-md bg-[var(--cyan)]/10 border border-[var(--cyan)]/30 text-[var(--cyan)]"
              >
                {k}
              </span>
            ))}
          </div>
        );
      }}
    />
  );
}

function LabPage() {
  useReveal();
  return (
    <>
      <PageHero variant="lab"
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

      <section className="relative pb-6">
        <div className="mx-auto max-w-7xl px-6 mb-4 flex items-end justify-between">
          <div>
            <div className="mono text-[10.5px] tracking-[0.22em] text-[var(--cyan)]">ML · MODELS · ONLINE</div>
            <h2 className="text-2xl md:text-3xl font-semibold mt-1">Real inference, in your browser</h2>
            <p className="text-muted-foreground text-[14px] mt-1 max-w-2xl">
              Three live ML demos powered by the Lovable AI Gateway. Type anything — the model answers in real time.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-3 gap-5">
          <div className="reveal"><SentimentDemo /></div>
          <div className="reveal"><ClassifierDemo /></div>
          <div className="reveal"><KeywordDemo /></div>
        </div>
      </section>

      <section className="relative pb-20 pt-10">
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
