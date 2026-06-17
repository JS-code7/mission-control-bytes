import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight, Github, Linkedin, Mail, Phone, MapPin, Download, Terminal,
  Cpu, Shield, Bot, Globe, Cloud, Brain, Zap, Rocket, Star, ChevronRight,
  Activity, Layers, Sparkles, Code2, Send, Award, GraduationCap, Briefcase,
  Play, FlaskConical, CircuitBoard, Workflow, Lock, Server, Wifi, Eye,
} from "lucide-react";
import { Toaster, toast } from "sonner";

export const Route = createFileRoute("/")({ component: Portfolio });

/* ============================================================
   DATA
   ============================================================ */
const PROFILE = {
  name: "Jeet Soni",
  role: "Co-Founder @ BinBuddy",
  tagline: "Building Intelligent AI-Driven Systems with Software & Hardware",
  location: "Greater Ahmedabad Area, India",
  email: "sonijeet669@outlook.com",
  phone: "9409205791",
  linkedin: "https://www.linkedin.com/in/jeet-soni-01bb09337/",
  github: "https://github.com/JS-code7",
};

const EXPERIENCES = [
  {
    company: "BinBuddy",
    role: "Co-Founder",
    period: "2024 — Present",
    summary: "Incubated and funded startup building intelligent waste-management systems combining IoT hardware, computer vision, and cloud orchestration.",
    tags: ["Founder", "AI", "Hardware", "Cloud"],
  },
  {
    company: "Webcart",
    role: "Software Engineer",
    period: "2024",
    summary: "Engineered full-stack web modules, refined UX flows, and shipped production features focused on performance and reliability.",
    tags: ["Full-Stack", "Web", "Product"],
  },
  {
    company: "Rotaract Club of New L.J.I.E.T",
    role: "Sergeant-at-Arms · Associate Professional Service Director",
    period: "2023 — 2024",
    summary: "Led service initiatives, coordinated cross-team operations, and organized professional development programs for a 100+ member chapter.",
    tags: ["Leadership", "Operations"],
  },
];

const EDUCATION = [
  {
    school: "Gujarat Technological University (GTU)",
    degree: "Bachelor of Technology — Computer Engineering",
    period: "Pursuing",
  },
  {
    school: "Holy Angels Convent School — India",
    degree: "School Education",
    period: "Completed",
  },
];

const CERTIFICATIONS = [
  { name: "Microsoft Introduction to Cloud Infrastructure", issuer: "Microsoft", icon: Cloud },
  { name: "Applied Skills: Secure storage for Azure Files & Blob", issuer: "Microsoft", icon: Lock },
  { name: "Introduction to AI in Azure", issuer: "Microsoft", icon: Brain },
  { name: "OCI Certified AI Foundations Associate", issuer: "Oracle", icon: Cloud },
  { name: "Defensive Security Hacking", issuer: "Cybersecurity", icon: Shield },
  { name: "Secure Azure Storage", issuer: "Microsoft", icon: Server },
  { name: "Blob Security", issuer: "Microsoft", icon: Lock },
  { name: "Microsoft Azure Fundamentals", issuer: "Microsoft", icon: Cloud },
];

const SKILLS = [
  { group: "Cybersecurity", icon: Shield, items: ["Defensive Security", "Ethical Hacking", "Threat Modeling", "Secure Storage"] },
  { group: "Robotics & Electronics", icon: CircuitBoard, items: ["Embedded Systems", "Microcontrollers", "Sensors & Actuators", "PCB Prototyping"] },
  { group: "Web Development", icon: Globe, items: ["React / TypeScript", "Node.js", "REST & APIs", "Performance"] },
  { group: "AI / ML", icon: Brain, items: ["LLM Apps", "Computer Vision", "Model Integration", "Prompt Systems"] },
  { group: "Cloud", icon: Cloud, items: ["Microsoft Azure", "OCI", "Storage Security", "Deployment"] },
  { group: "Engineering Mindset", icon: Cpu, items: ["Systems Thinking", "Rapid Prototyping", "Product Sense", "Founder Operations"] },
];

const PROJECTS = [
  {
    title: "BinBuddy — Smart Waste Intelligence",
    category: "AI · Hardware",
    summary: "An incubated, funded startup deploying connected bins with vision-based classification and route-optimization analytics.",
    problem: "Urban waste collection runs on guesswork — overflowing bins, wasted fuel, no signal.",
    approach: "Combined IoT sensors, on-device CV, and a cloud dashboard for real-time fill levels and pickup routing.",
    outcome: "Functional MVP, paying pilots, and an active investor-backed roadmap.",
    impact: "Cuts collection trips, reduces overflow events, and turns operations into measurable data.",
    tags: ["AI", "IoT", "Cloud", "Startup"],
  },
  {
    title: "Adaptive Traffic Signal Simulator",
    category: "AI · Simulation",
    summary: "A traffic system simulation that adapts signal timing using reinforcement-style heuristics on live vehicle counts.",
    problem: "Fixed-time signals waste minutes per intersection during off-peak and surge windows.",
    approach: "Built a simulation engine with queue-aware controllers and tunable policies.",
    outcome: "Demonstrated up to ~25% reduction in average wait time vs. static timing in simulation.",
    impact: "A playground for testing smart-city control strategies before touching real hardware.",
    tags: ["AI", "Web", "Visualization"],
  },
  {
    title: "Defensive Security Toolkit",
    category: "Cybersecurity",
    summary: "A practitioner-style toolkit exploring blue-team workflows: log triage, indicator pivoting, and quick-hit hardening checks.",
    problem: "Defensive tooling is fragmented and hard to learn end-to-end.",
    approach: "Curated a focused, scriptable workflow around real attacker tradecraft.",
    outcome: "Sharper detection-engineering reflexes and reusable response patterns.",
    impact: "Bridges learning and applied defense for early-career security engineers.",
    tags: ["Security", "Tooling"],
  },
  {
    title: "Azure Secure Storage Blueprint",
    category: "Cloud · Security",
    summary: "Reference architecture and playbooks for hardening Azure Blob and Files with private endpoints, RBAC, and key rotation.",
    problem: "Default storage configurations leak — and teams move fast.",
    approach: "Codified a secure baseline with policy, monitoring, and breakglass paths.",
    outcome: "Deployable patterns aligned with Microsoft Applied Skills coursework.",
    impact: "A safer default for teams shipping data-heavy products on Azure.",
    tags: ["Cloud", "Security", "Azure"],
  },
  {
    title: "Conversational AI Concierge",
    category: "AI",
    summary: "A grounded chatbot pattern that combines retrieval, tool-use, and guardrails for domain-specific assistance.",
    problem: "Generic LLMs hallucinate when the stakes are real.",
    approach: "Retrieval over curated context plus structured tool calls with strict response contracts.",
    outcome: "Higher answer fidelity with clear citations and refusal behavior.",
    impact: "A repeatable shape for shipping LLM features that don't embarrass the brand.",
    tags: ["AI", "LLM", "Web"],
  },
  {
    title: "Bench-to-Field Robotics Rig",
    category: "Robotics",
    summary: "A modular robotics chassis with swappable sensor heads, used for rapid field testing of new perception models.",
    problem: "Lab demos rarely survive contact with the real world.",
    approach: "Standardized power, comms, and mounting so new payloads ship in hours, not weeks.",
    outcome: "Multiple successful field iterations across vision and navigation experiments.",
    impact: "Shortens the loop between idea and operating prototype.",
    tags: ["Robotics", "Hardware"],
  },
];

const CHAPTERS = [
  { n: "01", title: "The Beginning", body: "Curiosity wired to a soldering iron. Pulled apart anything with a circuit and asked how the magic worked.", color: "var(--cyan)" },
  { n: "02", title: "First Build", body: "Shipped my first end-to-end product — messy, fragile, and the most important thing I had ever made.", color: "var(--electric)" },
  { n: "03", title: "Failures & Learning", body: "Burned boards, broken builds, late-night rewrites. Each failure became a calibration — sharper instincts, better defaults.", color: "var(--purple-glow)" },
  { n: "04", title: "Breakthrough", body: "BinBuddy got incubated and funded. Hardware, AI, and ops finally clicked into one system that worked outside the lab.", color: "var(--teal)" },
  { n: "05", title: "Now", body: "Building intelligent systems that span software and hardware — and helping others ship the same.", color: "var(--gold)" },
];

const TIMELINE = [
  { year: "2019", label: "Spark", text: "First lines of code and first soldered circuit." },
  { year: "2021", label: "Builder", text: "Started shipping web apps and electronics side-projects." },
  { year: "2023", label: "Operator", text: "Leadership at Rotaract; deeper into security and cloud." },
  { year: "2024", label: "Engineer", text: "Software Engineer at Webcart. Azure & AI certifications." },
  { year: "2025", label: "Founder", text: "Co-founded BinBuddy. Incubated, funded, building in the open." },
];

const BRAIN_NODES = [
  { id: "cyber", label: "Cybersecurity", x: 18, y: 28, color: "var(--cyan)", related: ["cloud", "ai"] },
  { id: "robotics", label: "Robotics", x: 82, y: 26, color: "var(--electric)", related: ["electronics", "ai"] },
  { id: "web", label: "Web Dev", x: 22, y: 76, color: "var(--teal)", related: ["ai", "cloud"] },
  { id: "electronics", label: "Electronics", x: 78, y: 78, color: "var(--gold)", related: ["robotics"] },
  { id: "ai", label: "AI / ML", x: 50, y: 50, color: "var(--purple-glow)", related: ["cyber", "robotics", "web", "cloud"] },
  { id: "cloud", label: "Azure / Cloud", x: 50, y: 14, color: "var(--cyan)", related: ["cyber", "ai", "web"] },
];

/* ============================================================
   HOOKS
   ============================================================ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useCursorLight() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.left = e.clientX + "px";
      ref.current.style.top = e.clientY + "px";
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return ref;
}

/* ============================================================
   COMPONENTS
   ============================================================ */
function Preloader({ onDone }: { onDone: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const seq = [
      "[ OK ]  Initializing neural cores…",
      "[ OK ]  Mounting /modules/projects",
      "[ OK ]  Linking secure transmission channel",
      "[ OK ]  Calibrating mission control",
      "[ OK ]  System ready — welcome, operator.",
    ];
    let i = 0;
    const t = setInterval(() => {
      setLines((p) => [...p, seq[i]]);
      i++;
      if (i >= seq.length) clearInterval(t);
    }, 320);
    const p = setInterval(() => setPct((v) => Math.min(100, v + 4)), 70);
    const end = setTimeout(onDone, 2200);
    return () => { clearInterval(t); clearInterval(p); clearTimeout(end); };
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="relative w-[min(560px,92vw)] glass rounded-xl p-6 hud-corner scanline">
        <div className="flex items-center gap-2 mono text-xs text-[var(--cyan)]">
          <Terminal className="h-3.5 w-3.5" /> SYSTEM BOOTING…
          <span className="ml-auto opacity-70">v1.0.0</span>
        </div>
        <div className="hairline my-3" />
        <div className="mono text-[12.5px] leading-relaxed min-h-[120px]">
          {lines.map((l, i) => (
            <div key={i} className="text-foreground/85">
              <span className="text-[var(--cyan)]">›</span> {l}
            </div>
          ))}
          <div className="text-[var(--cyan)] cursor-blink">loading{".".repeat((pct / 10) % 4 | 0)}</div>
        </div>
        <div className="mt-4 h-1.5 rounded-full bg-white/5 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[var(--cyan)] via-[var(--electric)] to-[var(--purple-glow)] transition-all" style={{ width: pct + "%" }} />
        </div>
        <div className="mt-2 mono text-[11px] text-muted-foreground flex justify-between">
          <span>BOOT SEQUENCE</span><span>{pct}%</span>
        </div>
      </div>
    </div>
  );
}

function Nav() {
  const items = [
    ["Mission", "#mission"],
    ["Story", "#story"],
    ["Lab", "#lab"],
    ["Brain", "#brain"],
    ["Timeline", "#timeline"],
    ["Modules", "#projects"],
    ["Transmit", "#contact"],
  ];
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1100px,94vw)]">
      <div className="glass rounded-full px-4 py-2.5 flex items-center gap-2">
        <a href="#top" className="flex items-center gap-2 px-2">
          <div className="relative h-7 w-7 rounded-md bg-gradient-to-br from-[var(--cyan)] to-[var(--electric)] grid place-items-center text-background font-bold text-xs">JS</div>
          <span className="mono text-[12px] tracking-widest text-foreground/80 hidden sm:inline">JEET.SONI</span>
        </a>
        <nav className="ml-auto hidden md:flex items-center gap-1">
          {items.map(([l, h]) => (
            <a key={h} href={h} className="px-3 py-1.5 text-[12.5px] text-muted-foreground hover:text-foreground transition-colors mono">
              {l}
            </a>
          ))}
        </nav>
        <a href={`mailto:${PROFILE.email}`} className="btn-hero !py-2 !px-3 text-[12.5px]">
          <Send className="h-3.5 w-3.5" /> Contact
        </a>
      </div>
    </header>
  );
}

function VectorOrb() {
  return (
    <div className="relative w-[min(440px,80vw)] aspect-square">
      <div className="absolute inset-0 rounded-full radial-glow blur-2xl opacity-80" />
      <div className="absolute inset-8 rounded-full border border-[color:var(--cyan)]/30 animate-spin-slow" />
      <div className="absolute inset-16 rounded-full border border-dashed border-[color:var(--purple-glow)]/40" style={{ animation: "spin-slow 30s linear infinite reverse" }} />
      <div className="absolute inset-24 rounded-full border border-[color:var(--electric)]/40 animate-spin-slow" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="glass rounded-2xl px-5 py-4 hud-corner animate-float">
          <div className="mono text-[10px] text-[var(--cyan)] tracking-widest">CORE</div>
          <div className="text-2xl font-semibold text-gradient">JS — v1</div>
          <div className="mono text-[10px] text-muted-foreground">STATUS · ONLINE</div>
        </div>
      </div>
      {/* orbit dots */}
      {[0, 60, 120, 180, 240, 300].map((a, i) => (
        <div key={i} className="absolute left-1/2 top-1/2" style={{ transform: `rotate(${a}deg) translateX(170px)` }}>
          <div className="h-2.5 w-2.5 rounded-full bg-[var(--cyan)] shadow-[0_0_18px_var(--cyan)]" />
        </div>
      ))}
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative pt-36 pb-24 overflow-hidden bg-noise">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 radial-glow opacity-70" />
      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center">
        <div className="reveal">
          <span className="section-label"><Activity className="h-3 w-3" /> MISSION CONTROL · ONLINE</span>
          <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight">
            Hi, I'm <span className="text-gradient">Jeet Soni</span>.
            <br />
            <span className="text-foreground/90">I build intelligent systems</span>
            <br />
            <span className="text-foreground/60">that ship.</span>
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground text-[15.5px] leading-relaxed">
            Co-Founder @ <span className="text-foreground">BinBuddy</span> — an incubated, funded startup. I work across
            <span className="text-foreground"> cybersecurity, robotics, web, and electronics </span>
            to turn ambitious ideas into hardware-meets-software products that survive the real world.
          </p>
          <div className="mt-4 flex items-center gap-2 text-[12.5px] mono text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-[var(--cyan)]" /> {PROFILE.location}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#projects" className="btn-hero"><Rocket className="h-4 w-4" /> View Active Modules</a>
            <a href="#contact" className="btn-ghost"><Send className="h-4 w-4" /> Open Transmission</a>
            <button onClick={() => toast.success("Resume request received", { description: "I'll send a copy to your inbox — reach out via contact." })} className="btn-ghost">
              <Download className="h-4 w-4" /> Resume
            </button>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <a aria-label="LinkedIn" href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="btn-ghost !px-3"><Linkedin className="h-4 w-4" /></a>
            <a aria-label="GitHub" href={PROFILE.github} target="_blank" rel="noreferrer" className="btn-ghost !px-3"><Github className="h-4 w-4" /></a>
            <a aria-label="Email" href={`mailto:${PROFILE.email}`} className="btn-ghost !px-3"><Mail className="h-4 w-4" /></a>
            <a aria-label="Phone" href={`tel:${PROFILE.phone}`} className="btn-ghost !px-3"><Phone className="h-4 w-4" /></a>
          </div>
          <div className="mt-10 grid grid-cols-3 max-w-md gap-3">
            {[
              { k: "Incubated", v: "Funded Startup" },
              { k: "Domains", v: "4+" },
              { k: "Certs", v: "8+" },
            ].map((s) => (
              <div key={s.k} className="glass-soft rounded-lg px-3 py-2.5">
                <div className="mono text-[10px] text-[var(--cyan)] tracking-widest">{s.k.toUpperCase()}</div>
                <div className="text-sm font-medium">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex justify-center reveal">
          <VectorOrb />
        </div>
      </div>
      <a href="#mission" className="absolute left-1/2 -translate-x-1/2 bottom-6 mono text-[10px] tracking-widest text-muted-foreground flex flex-col items-center gap-2">
        <span>SCROLL · MISSION CONTROL</span>
        <span className="h-7 w-px bg-gradient-to-b from-[var(--cyan)] to-transparent animate-pulse" />
      </a>
    </section>
  );
}

function Mission() {
  const panels = [
    { label: "Active Modules", value: `${PROJECTS.length}`, sub: "shipped & in-flight", icon: Layers, href: "#projects" },
    { label: "System Capabilities", value: `${SKILLS.length}`, sub: "core stacks online", icon: Cpu, href: "#capabilities" },
    { label: "Transmission Terminal", value: "OPEN", sub: "channel ready", icon: Wifi, href: "#contact" },
  ];
  return (
    <section id="mission" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal flex items-end justify-between gap-6 flex-wrap">
          <div>
            <span className="section-label"><Eye className="h-3 w-3" /> SECTION · 01</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Mission Control</h2>
            <p className="mt-2 text-muted-foreground max-w-xl text-[15px]">
              Three panels. One operator. Everything routes from here — modules in flight,
              capability matrix, and a direct transmission channel.
            </p>
          </div>
          <div className="mono text-[11px] text-muted-foreground tracking-widest">UPLINK · STABLE · 99.9%</div>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {panels.map((p) => (
            <a key={p.label} href={p.href} className="reveal glass rounded-2xl p-5 hud-corner card-hover group">
              <div className="flex items-center justify-between">
                <div className="mono text-[10.5px] tracking-widest text-[var(--cyan)]">{p.label.toUpperCase()}</div>
                <p.icon className="h-4 w-4 text-[var(--cyan)]" />
              </div>
              <div className="mt-4 text-4xl font-semibold text-gradient">{p.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{p.sub}</div>
              <div className="mt-5 flex items-center gap-1 text-[12px] mono text-foreground/80 group-hover:text-[var(--cyan)] transition-colors">
                ENTER MODULE <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </a>
          ))}
        </div>

        {/* HUD terminal */}
        <div className="reveal mt-8 glass rounded-2xl p-5 hud-corner scanline">
          <div className="flex items-center gap-2 mono text-[11px] text-[var(--cyan)]">
            <Terminal className="h-3.5 w-3.5" /> /mission/status
            <span className="ml-auto opacity-70">UPTIME 100%</span>
          </div>
          <div className="hairline my-3" />
          <div className="mono text-[13px] grid sm:grid-cols-2 gap-y-1.5 gap-x-6 text-foreground/85">
            <div><span className="text-[var(--cyan)]">›</span> operator: <span className="text-foreground">Jeet Soni</span></div>
            <div><span className="text-[var(--cyan)]">›</span> base: <span className="text-foreground">{PROFILE.location}</span></div>
            <div><span className="text-[var(--cyan)]">›</span> mode: <span className="text-foreground">building · shipping · learning</span></div>
            <div><span className="text-[var(--cyan)]">›</span> stack: <span className="text-foreground">AI · IoT · Cloud · Security</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal max-w-2xl">
          <span className="section-label"><Sparkles className="h-3 w-3" /> SECTION · 02</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Story Mode</h2>
          <p className="mt-2 text-muted-foreground text-[15px]">Five chapters. One trajectory. Scroll through the arc from curiosity to founder.</p>
        </div>
        <div className="relative mt-12 grid lg:grid-cols-[80px_1fr] gap-6">
          {/* progress rail */}
          <div className="hidden lg:block relative">
            <div className="sticky top-32 h-[60vh]">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--cyan)] via-[var(--purple-glow)] to-transparent" />
              {CHAPTERS.map((c, i) => (
                <div key={c.n} className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full" style={{ top: `${(i / (CHAPTERS.length - 1)) * 100}%`, background: c.color, boxShadow: `0 0 18px ${c.color}` }} />
              ))}
            </div>
          </div>
          <div className="space-y-8">
            {CHAPTERS.map((c) => (
              <article key={c.n} className="reveal glass rounded-2xl p-6 hud-corner card-hover">
                <div className="flex items-center gap-3">
                  <div className="mono text-[11px] tracking-widest" style={{ color: c.color }}>CHAPTER {c.n}</div>
                  <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${c.color}, transparent)` }} />
                </div>
                <h3 className="mt-3 text-2xl font-semibold">{c.title}</h3>
                <p className="mt-2 text-muted-foreground text-[15px] leading-relaxed max-w-2xl">{c.body}</p>
                <div className="mt-5 grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    ["Problem", "Real-world gap worth solving."],
                    ["Approach", "Tight loop: prototype, ship, measure."],
                    ["Outcome", "A thing that works under pressure."],
                    ["Impact", "Time saved, errors avoided, doors opened."],
                    ["Learned", "Constraints sharpen design."],
                    ["Would improve", "Earlier user feedback, leaner v1."],
                  ].map(([k, v]) => (
                    <div key={k} className="glass-soft rounded-lg p-3">
                      <div className="mono text-[10px] tracking-widest text-[var(--cyan)]">{k.toUpperCase()}</div>
                      <div className="text-[13px] text-foreground/90 mt-1">{v}</div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- Interactive Lab -------- */
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
      let reply = "Routing your question to the operator. For a direct reply, hit the Transmission Terminal below.";
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
        <Bot className="h-3.5 w-3.5" /> AI CONCIERGE · PREVIEW
        <span className="ml-auto opacity-70">v0.3</span>
      </div>
      <div className="hairline my-3" />
      <div className="flex-1 space-y-2 overflow-auto max-h-[220px] pr-1">
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
      <div className="relative mx-auto aspect-square w-[220px]">
        <div className="absolute inset-0 grid place-items-center">
          <div className="w-full h-12 bg-white/[0.04] absolute top-1/2 -translate-y-1/2" />
          <div className="h-full w-12 bg-white/[0.04] absolute left-1/2 -translate-x-1/2" />
        </div>
        {/* lights */}
        <div className="absolute left-1/2 top-2 -translate-x-1/2 h-3 w-3 rounded-full" style={{ background: light("N"), boxShadow: phase === "N" ? "0 0 18px var(--cyan)" : "" }} />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full" style={{ background: light("E"), boxShadow: phase === "E" ? "0 0 18px var(--cyan)" : "" }} />
        <div className="absolute left-1/2 bottom-2 -translate-x-1/2 h-3 w-3 rounded-full" style={{ background: light("S"), boxShadow: phase === "S" ? "0 0 18px var(--cyan)" : "" }} />
        <div className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full" style={{ background: light("W"), boxShadow: phase === "W" ? "0 0 18px var(--cyan)" : "" }} />
        {/* car */}
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
  ];
  const [log, setLog] = useState<string[]>(["» Lab ready. Click a button to simulate."]);
  return (
    <div className="glass rounded-2xl p-4 hud-corner h-full flex flex-col">
      <div className="flex items-center gap-2 mono text-[11px] text-[var(--cyan)]">
        <FlaskConical className="h-3.5 w-3.5" /> TRY THIS
      </div>
      <div className="hairline my-3" />
      <div className="grid grid-cols-1 gap-2">
        {items.map((it) => (
          <button key={it.label} onClick={() => setLog((l) => [...l, "» " + it.t].slice(-5))} className="btn-ghost justify-between">
            <span className="flex items-center gap-2"><Zap className="h-3.5 w-3.5 text-[var(--cyan)]" /> {it.label}</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        ))}
      </div>
      <div className="mt-3 mono text-[12px] bg-black/30 rounded-md border border-white/10 p-3 flex-1 min-h-[110px]">
        {log.map((l, i) => <div key={i} className="text-foreground/80">{l}</div>)}
      </div>
    </div>
  );
}

function Lab() {
  return (
    <section id="lab" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal flex items-end justify-between flex-wrap gap-4">
          <div>
            <span className="section-label"><FlaskConical className="h-3 w-3" /> SECTION · 03</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Interactive Lab</h2>
            <p className="mt-2 text-muted-foreground text-[15px] max-w-xl">
              Not a resume — a playground. Touch the demos and watch the systems respond.
            </p>
          </div>
          <span className="mono text-[11px] tracking-widest text-muted-foreground">LAB · LIVE</span>
        </div>
        <div className="mt-10 grid lg:grid-cols-3 gap-5">
          <div className="reveal"><ChatbotDemo /></div>
          <div className="reveal"><TrafficDemo /></div>
          <div className="reveal"><TryThisDemo /></div>
        </div>
      </div>
    </section>
  );
}

/* -------- Brain Map -------- */
function Brain3() {
  const [hover, setHover] = useState<string | null>(null);
  const activeSet = useMemo(() => {
    if (!hover) return new Set<string>();
    const node = BRAIN_NODES.find((n) => n.id === hover);
    return new Set<string>([hover, ...(node?.related ?? [])]);
  }, [hover]);

  return (
    <section id="brain" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal max-w-2xl">
          <span className="section-label"><Brain className="h-3 w-3" /> SECTION · 04</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Brain Map</h2>
          <p className="mt-2 text-muted-foreground text-[15px]">Hover any node to light its connections. The stack is a network, not a list.</p>
        </div>

        <div className="reveal mt-10 grid lg:grid-cols-[1.5fr_1fr] gap-6">
          <div className="relative glass rounded-2xl p-2 hud-corner aspect-[16/10] overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-40" />
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              {BRAIN_NODES.flatMap((n) =>
                n.related.map((r) => {
                  const t = BRAIN_NODES.find((x) => x.id === r)!;
                  const active = activeSet.has(n.id) && activeSet.has(r);
                  return (
                    <line
                      key={n.id + r}
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
                    <span className="relative h-3.5 w-3.5 rounded-full" style={{ background: n.color, boxShadow: `0 0 18px ${n.color}` }} />
                  </span>
                  <span className="mt-2 block mono text-[10.5px] tracking-widest text-foreground/85 whitespace-nowrap">{n.label.toUpperCase()}</span>
                </button>
              );
            })}
          </div>
          <div className="glass rounded-2xl p-5 hud-corner">
            <div className="mono text-[11px] tracking-widest text-[var(--cyan)]">NODE · INSPECTOR</div>
            <div className="mt-3 text-2xl font-semibold">
              {hover ? BRAIN_NODES.find((n) => n.id === hover)?.label : "Hover a node"}
            </div>
            <p className="mt-2 text-muted-foreground text-[14px]">
              {hover
                ? "Linked domains light up across the map. Each connection represents a real project where these disciplines met."
                : "Each node is a domain I build in. Connections show where they collide in real projects."}
            </p>
            <div className="hairline my-4" />
            <div className="grid grid-cols-2 gap-2">
              {BRAIN_NODES.map((n) => (
                <div key={n.id} className="glass-soft rounded-lg p-3 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: n.color }} />
                  <span className="text-[13px]">{n.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- Timeline -------- */
function Timeline() {
  return (
    <section id="timeline" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal max-w-2xl">
          <span className="section-label"><Star className="h-3 w-3" /> SECTION · 05</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Evolution Timeline</h2>
          <p className="mt-2 text-muted-foreground text-[15px]">Beginner → builder → operator → engineer → founder. A connected path with glowing checkpoints.</p>
        </div>
        <div className="reveal mt-12 relative">
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
  );
}

/* -------- About / Experience / Education -------- */
function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[1.2fr_1fr] gap-10">
        <div className="reveal">
          <span className="section-label"><Code2 className="h-3 w-3" /> SECTION · 06</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">About the Operator</h2>
          <div className="mt-5 space-y-4 text-[15.5px] leading-relaxed text-foreground/85 max-w-2xl">
            <p>
              I'm a builder at the intersection of <span className="text-foreground">cybersecurity, robotics, AI, and web</span>.
              I co-founded <span className="text-foreground">BinBuddy</span>, an incubated and funded startup turning
              waste operations into intelligent, measurable systems.
            </p>
            <p>
              My work is grounded in a simple idea: software is sharper when it touches the real world. That's why I
              gravitate toward problems where bits meet atoms — sensors, vehicles, secure storage, smart agents that
              do more than chat.
            </p>
            <p>
              I care deeply about <span className="text-foreground">ethical hacking, defensive security, and secure-by-default
              architecture</span>. Building something powerful is only half the job; building it responsibly is the rest.
            </p>
          </div>
        </div>
        <div className="reveal glass rounded-2xl p-5 hud-corner">
          <div className="mono text-[11px] tracking-widest text-[var(--cyan)]">OPERATOR · PROFILE</div>
          <div className="hairline my-3" />
          <dl className="text-[14px] space-y-2.5">
            {[
              ["Name", PROFILE.name],
              ["Role", PROFILE.role],
              ["Base", PROFILE.location],
              ["Email", PROFILE.email],
              ["Phone", PROFILE.phone],
              ["Focus", "AI · Security · Robotics · Web"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <dt className="mono text-[11px] text-muted-foreground tracking-widest">{k.toUpperCase()}</dt>
                <dd className="text-foreground/90 text-right">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="hairline my-4" />
          <div className="flex flex-wrap gap-2">
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="btn-ghost text-[12px]"><Linkedin className="h-3.5 w-3.5" /> LinkedIn</a>
            <a href={PROFILE.github} target="_blank" rel="noreferrer" className="btn-ghost text-[12px]"><Github className="h-3.5 w-3.5" /> GitHub</a>
            <a href={`mailto:${PROFILE.email}`} className="btn-ghost text-[12px]"><Mail className="h-3.5 w-3.5" /> Email</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal">
          <span className="section-label"><Briefcase className="h-3 w-3" /> SECTION · 07</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Experience</h2>
        </div>
        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {EXPERIENCES.map((e) => (
            <article key={e.company + e.role} className="reveal glass rounded-2xl p-5 hud-corner card-hover">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold">{e.role}</div>
                  <div className="text-[var(--cyan)] mono text-[12px] tracking-widest mt-0.5">{e.company.toUpperCase()}</div>
                </div>
                <div className="mono text-[11px] text-muted-foreground whitespace-nowrap">{e.period}</div>
              </div>
              <p className="mt-3 text-muted-foreground text-[14.5px] leading-relaxed">{e.summary}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {e.tags.map((t) => (
                  <span key={t} className="mono text-[10.5px] tracking-widest px-2 py-1 rounded-md border border-white/10 bg-white/[0.04] text-foreground/80">{t.toUpperCase()}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal">
          <span className="section-label"><GraduationCap className="h-3 w-3" /> SECTION · 08</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Education</h2>
        </div>
        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {EDUCATION.map((e) => (
            <div key={e.school} className="reveal glass rounded-2xl p-5 hud-corner card-hover">
              <div className="mono text-[11px] tracking-widest text-[var(--cyan)]">{e.period.toUpperCase()}</div>
              <div className="mt-2 text-lg font-semibold">{e.school}</div>
              <div className="text-muted-foreground text-[14px] mt-1">{e.degree}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section id="capabilities" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal">
          <span className="section-label"><Cpu className="h-3 w-3" /> SECTION · 09</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">System Capabilities</h2>
          <p className="mt-2 text-muted-foreground text-[15px] max-w-xl">The matrix powering every module — skills and certifications, in one console.</p>
        </div>

        <div className="mt-10 grid lg:grid-cols-3 gap-5">
          {SKILLS.map((s) => (
            <div key={s.group} className="reveal glass rounded-2xl p-5 hud-corner card-hover">
              <div className="flex items-center gap-2">
                <s.icon className="h-4 w-4 text-[var(--cyan)]" />
                <div className="mono text-[11px] tracking-widest text-[var(--cyan)]">{s.group.toUpperCase()}</div>
              </div>
              <div className="hairline my-3" />
              <ul className="space-y-1.5 text-[14px]">
                {s.items.map((i) => (
                  <li key={i} className="flex items-center gap-2 text-foreground/85">
                    <span className="h-1 w-1 rounded-full bg-[var(--cyan)]" /> {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="reveal mt-10">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-[var(--gold)]" />
            <h3 className="text-xl font-semibold">Certifications</h3>
          </div>
          <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((c) => (
              <div key={c.name} className="glass-soft rounded-xl p-4 card-hover border border-white/10">
                <c.icon className="h-5 w-5 text-[var(--gold)]" />
                <div className="mt-3 text-[13.5px] font-medium leading-snug">{c.name}</div>
                <div className="mono text-[10.5px] tracking-widest text-muted-foreground mt-1">{c.issuer.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- Projects -------- */
function Projects() {
  const cats = useMemo(() => ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))], []);
  const [active, setActive] = useState("All");
  const list = PROJECTS.filter((p) => active === "All" || p.category === active);
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal flex items-end justify-between flex-wrap gap-4">
          <div>
            <span className="section-label"><Rocket className="h-3 w-3" /> SECTION · 10</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Active Modules</h2>
            <p className="mt-2 text-muted-foreground text-[15px] max-w-xl">Projects with weight behind them — each one a real loop of problem, approach, outcome, and impact.</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
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
        </div>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
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
      </div>
    </section>
  );
}

/* -------- Contact -------- */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("All fields required to open the channel.");
      return;
    }
    const subject = encodeURIComponent(`Transmission from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    toast.success("Transmission ready — your email client is opening.");
  };

  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal">
          <span className="section-label"><Send className="h-3 w-3" /> SECTION · 11</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Transmission Terminal</h2>
          <p className="mt-2 text-muted-foreground text-[15px] max-w-xl">Open a channel. I read every message — short notes welcome.</p>
        </div>

        <div className="mt-10 grid lg:grid-cols-[1fr_1.1fr] gap-6">
          <div className="reveal glass rounded-2xl p-5 hud-corner space-y-3">
            <div className="mono text-[11px] tracking-widest text-[var(--cyan)]">DIRECT · LINKS</div>
            <div className="hairline" />
            {[
              { icon: Mail, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
              { icon: Phone, label: "Phone", value: PROFILE.phone, href: `tel:${PROFILE.phone}` },
              { icon: Linkedin, label: "LinkedIn", value: "jeet-soni-01bb09337", href: PROFILE.linkedin },
              { icon: Github, label: "GitHub", value: "JS-code7", href: PROFILE.github },
              { icon: MapPin, label: "Location", value: PROFILE.location, href: "https://maps.google.com/?q=Ahmedabad" },
            ].map((r) => (
              <a key={r.label} href={r.href} target={r.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="flex items-center gap-3 glass-soft rounded-lg p-3 card-hover">
                <r.icon className="h-4 w-4 text-[var(--cyan)]" />
                <div className="min-w-0">
                  <div className="mono text-[10.5px] tracking-widest text-muted-foreground">{r.label.toUpperCase()}</div>
                  <div className="text-[13.5px] truncate">{r.value}</div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
              </a>
            ))}
          </div>

          <form onSubmit={submit} className="reveal glass rounded-2xl p-5 hud-corner space-y-3">
            <div className="flex items-center gap-2 mono text-[11px] text-[var(--cyan)]">
              <Terminal className="h-3.5 w-3.5" /> /channel/open
            </div>
            <div className="hairline" />
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="block">
                <span className="mono text-[10.5px] tracking-widest text-muted-foreground">CALLSIGN</span>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-[14px] outline-none focus:border-[var(--cyan)]" placeholder="Your name" />
              </label>
              <label className="block">
                <span className="mono text-[10.5px] tracking-widest text-muted-foreground">CHANNEL</span>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-[14px] outline-none focus:border-[var(--cyan)]" placeholder="you@domain.com" />
              </label>
            </div>
            <label className="block">
              <span className="mono text-[10.5px] tracking-widest text-muted-foreground">TRANSMISSION</span>
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className="mt-1 w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-[14px] outline-none focus:border-[var(--cyan)]" placeholder="What are we building?" />
            </label>
            <div className="flex items-center justify-between gap-3">
              <span className="mono text-[10.5px] text-muted-foreground">END-TO-END · MAILTO</span>
              <button type="submit" className="btn-hero"><Send className="h-4 w-4" /> Send Transmission</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative py-10 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 flex flex-wrap items-center justify-between gap-3">
        <div className="mono text-[11px] tracking-widest text-muted-foreground">© {new Date().getFullYear()} JEET SONI · ALL SIGNALS RESERVED</div>
        <div className="flex items-center gap-3">
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="btn-ghost !px-3" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
          <a href={PROFILE.github} target="_blank" rel="noreferrer" className="btn-ghost !px-3" aria-label="GitHub"><Github className="h-4 w-4" /></a>
          <a href={`mailto:${PROFILE.email}`} className="btn-ghost !px-3" aria-label="Email"><Mail className="h-4 w-4" /></a>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
function Portfolio() {
  const [booting, setBooting] = useState(true);
  useReveal();
  const cursor = useCursorLight();

  return (
    <div className="relative min-h-screen bg-background text-foreground bg-noise">
      <Toaster theme="dark" position="bottom-right" />
      {booting && <Preloader onDone={() => setBooting(false)} />}
      <div ref={cursor} className="cursor-light hidden md:block" aria-hidden />
      <Nav />
      <main>
        <Hero />
        <Mission />
        <Story />
        <Lab />
        <Brain3 />
        <Timeline />
        <About />
        <Experience />
        <Education />
        <Capabilities />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
