import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity, Rocket, Send, MapPin, Download, Linkedin, Github, Mail, Phone,
  Eye, Sparkles, FlaskConical, Brain, Star, Layers, Wifi, Terminal,
  ChevronRight, Cpu,
} from "lucide-react";
import { toast } from "sonner";
import { PROFILE, NAV_ITEMS, PROJECTS, SKILLS } from "../lib/portfolio/data";
import { useReveal } from "../lib/portfolio/shared";
import { VectorBG } from "../lib/portfolio/VectorBG";

export const Route = createFileRoute("/")({ component: Hub });

const ICONS: Record<string, typeof Eye> = {
  Mission: Eye, Story: Sparkles, Lab: FlaskConical, Brain: Brain,
  Timeline: Star, Modules: Layers, Transmit: Terminal, Contact: Wifi,
};

function VectorOrb() {
  return (
    <div className="relative w-[min(460px,82vw)] aspect-square">
      <div className="absolute inset-0 rounded-full radial-glow blur-3xl opacity-90" />
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="orb-g" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--cyan)" />
            <stop offset="60%" stopColor="var(--electric)" />
            <stop offset="100%" stopColor="var(--purple-glow)" />
          </linearGradient>
        </defs>
        {/* organic morphing blob */}
        <path fill="none" stroke="url(#orb-g)" strokeWidth="1.2" opacity="0.75">
          <animate
            attributeName="d"
            dur="14s"
            repeatCount="indefinite"
            values="
              M200,80 C280,80 330,140 330,210 C330,290 270,330 200,330 C130,330 70,290 70,210 C70,140 120,80 200,80 Z;
              M200,70 C300,90 340,160 320,230 C300,310 250,330 190,325 C115,320 60,270 75,200 C90,120 130,55 200,70 Z;
              M200,80 C280,80 330,140 330,210 C330,290 270,330 200,330 C130,330 70,290 70,210 C70,140 120,80 200,80 Z
            "
          />
        </path>
        {/* outer dotted ring */}
        <circle cx="200" cy="200" r="180" fill="none" stroke="var(--cyan)" strokeOpacity="0.35" strokeDasharray="1.5 8" />
        <circle cx="200" cy="200" r="150" fill="none" stroke="var(--purple-glow)" strokeOpacity="0.3" strokeDasharray="3 10" />
      </svg>
      <div className="absolute inset-0 rounded-full border border-[color:var(--cyan)]/15 animate-spin-slow" />
      <div className="absolute inset-10 rounded-full border border-dashed border-[color:var(--purple-glow)]/25" style={{ animation: "spin-slow 28s linear infinite reverse" }} />
      <div className="absolute inset-0 grid place-items-center">
        <div className="glass rounded-2xl px-5 py-4 hud-corner animate-float text-center">
          <div className="mono text-[10px] text-[var(--cyan)] tracking-widest">CORE · IDENTITY</div>
          <div className="text-2xl font-semibold text-gradient mt-0.5">JS — v1</div>
          <div className="mono text-[10px] text-muted-foreground mt-0.5">STATUS · ONLINE</div>
        </div>
      </div>
      {[0, 72, 144, 216, 288].map((a, i) => (
        <div key={i} className="absolute left-1/2 top-1/2" style={{ transform: `rotate(${a}deg) translateX(180px)` }}>
          <div className="h-2 w-2 rounded-full bg-[var(--cyan)] shadow-[0_0_14px_var(--cyan)]" />
        </div>
      ))}
    </div>
  );
}

function Hub() {
  useReveal();
  const ROLES = ["Co-Founder", "Cybersecurity", "Robotics", "Web Dev", "Electronics", "AI Systems"];
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-noise">
        <VectorBG variant="home" />
        <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-[1.2fr_1fr] gap-14 items-center">
          <div className="reveal">
            <span className="section-label"><Activity className="h-3 w-3" /> MISSION CONTROL · ONLINE</span>
            <div className="mt-6 mono text-[11px] tracking-[0.32em] text-muted-foreground">
              OPERATOR · {PROFILE.name.toUpperCase()}
            </div>
            <h1 className="mt-3 text-[2.8rem] sm:text-6xl lg:text-[4.5rem] font-bold leading-[1.02] tracking-tight">
              Building <span className="text-gradient">intelligent systems</span>
              <br />
              <span className="text-foreground/90">where hardware meets software.</span>
            </h1>
            <p className="mt-6 max-w-xl text-muted-foreground text-[15.5px] leading-relaxed">
              I'm Jeet — Co-Founder @ <span className="text-foreground">BinBuddy</span>, an incubated &amp; funded startup.
              I work across <span className="text-foreground">cybersecurity, robotics, web, and electronics</span> to
              turn ambitious ideas into AI-driven products that ship and survive the real world.
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {ROLES.map((r) => (
                <span key={r} className="mono text-[10.5px] tracking-widest text-foreground/80 border border-white/10 rounded-full px-2.5 py-1 bg-white/[0.03]">
                  {r.toUpperCase()}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 text-[12.5px] mono text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-[var(--cyan)]" /> {PROFILE.location}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/modules" className="btn-hero"><Rocket className="h-4 w-4" /> View Active Modules</Link>
              <Link to="/contact" className="btn-ghost"><Send className="h-4 w-4" /> Open Transmission</Link>
              <button onClick={() => toast.success("Resume request received", { description: "Reach out via contact and I'll send a copy." })} className="btn-ghost">
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
      </section>

      {/* Dashboard stats */}
      <section className="relative py-10">
        <div className="mx-auto max-w-7xl px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { k: "Active Modules", v: `${PROJECTS.length}`, sub: "shipped & in-flight", icon: Layers },
            { k: "System Capabilities", v: `${SKILLS.length}`, sub: "core stacks online", icon: Cpu },
            { k: "Uplink", v: "99.9%", sub: "transmission stable", icon: Wifi },
            { k: "Operator", v: "ONLINE", sub: "ready for collab", icon: Activity },
          ].map((p) => (
            <div key={p.k} className="reveal glass rounded-2xl p-4 hud-corner card-hover">
              <div className="flex items-center justify-between">
                <div className="mono text-[10.5px] tracking-widest text-[var(--cyan)]">{p.k.toUpperCase()}</div>
                <p.icon className="h-4 w-4 text-[var(--cyan)]" />
              </div>
              <div className="mt-3 text-3xl font-semibold text-gradient">{p.v}</div>
              <div className="mt-1 text-[12.5px] text-muted-foreground">{p.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Module grid */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal flex items-end justify-between flex-wrap gap-4">
            <div>
              <span className="section-label"><Eye className="h-3 w-3" /> NAVIGATION · HUB</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Choose a system</h2>
              <p className="mt-2 text-muted-foreground text-[15px] max-w-xl">Each card is a module of the operating system. Engage one to enter.</p>
            </div>
            <span className="mono text-[11px] tracking-widest text-muted-foreground">8 SYSTEMS · ALL ONLINE</span>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {NAV_ITEMS.map((it, i) => {
              const Icon = ICONS[it.label] ?? Eye;
              return (
                <Link
                  key={it.to}
                  to={it.to}
                  className="reveal module-card glass rounded-2xl p-5 hud-corner card-hover group flex flex-col"
                >
                  <div className="flex items-center justify-between">
                    <div className="mono text-[10.5px] tracking-widest text-[var(--cyan)]">SYSTEM · {String(i + 1).padStart(2, "0")}</div>
                    <Icon className="h-4 w-4 text-[var(--cyan)]" />
                  </div>
                  <div className="mt-5 text-2xl font-semibold">{it.label}</div>
                  <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">{it.desc}</p>
                  <div className="mt-auto pt-6 flex items-center gap-1 text-[12px] mono text-foreground/80 group-hover:text-[var(--cyan)] transition-colors">
                    ENGAGE <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* HUD terminal */}
      <section className="relative pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal glass rounded-2xl p-5 hud-corner scanline">
            <div className="flex items-center gap-2 mono text-[11px] text-[var(--cyan)]">
              <Terminal className="h-3.5 w-3.5" /> /mission/status
              <span className="ml-auto opacity-70">UPTIME 100%</span>
            </div>
            <div className="hairline my-3" />
            <div className="mono text-[13px] grid sm:grid-cols-2 gap-y-1.5 gap-x-6 text-foreground/85">
              <div><span className="text-[var(--cyan)]">›</span> operator: <span className="text-foreground">{PROFILE.name}</span></div>
              <div><span className="text-[var(--cyan)]">›</span> base: <span className="text-foreground">{PROFILE.location}</span></div>
              <div><span className="text-[var(--cyan)]">›</span> mode: <span className="text-foreground">building · shipping · learning</span></div>
              <div><span className="text-[var(--cyan)]">›</span> stack: <span className="text-foreground">AI · IoT · Cloud · Security</span></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
