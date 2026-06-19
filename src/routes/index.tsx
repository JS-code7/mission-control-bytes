import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity, Rocket, Send, MapPin, Download, Linkedin, Github, Mail, Phone,
  Eye, Sparkles, FlaskConical, Brain, Star, Layers, Wifi, Terminal,
  ChevronRight, Cpu, Shield, Radio,
} from "lucide-react";
import { toast } from "sonner";
import { PROFILE, NAV_ITEMS, PROJECTS, SKILLS } from "../lib/portfolio/data";
import { useReveal } from "../lib/portfolio/shared";
import { VectorBG } from "../lib/portfolio/VectorBG";
import portrait from "../assets/jeet-soni.jpg.asset.json";


export const Route = createFileRoute("/")({ component: Hub });

const ICONS: Record<string, typeof Eye> = {
  Mission: Eye, Story: Sparkles, Lab: FlaskConical, Brain: Brain,
  Timeline: Star, Modules: Layers, Transmit: Terminal, Contact: Wifi,
};

function HudConsole() {
  const bars = [40, 70, 100, 60, 30, 85, 50];
  return (
    <div className="relative w-full max-w-md aspect-square mx-auto">
      {/* Outer rotating ring */}
      <div className="absolute inset-0 rounded-full border border-[color:var(--cyan)]/10 animate-spin-slow" />
      <div className="absolute inset-4 rounded-full border border-dashed border-[color:var(--cyan)]/20" style={{ animation: "spin-slow 32s linear infinite reverse" }} />

      {/* Top telemetry ticker */}
      <div className="absolute top-0 left-0 right-0 h-6 overflow-hidden bg-[color:var(--cyan)]/5 border-y border-[color:var(--cyan)]/15 z-20 flex items-center">
        <div className="flex whitespace-nowrap mono text-[9px] tracking-widest text-[color:var(--cyan)]/70 animate-marquee">
          <span className="px-6">SYSTEM_STATUS: NOMINAL // CORE_TEMP: 32C // MEMORY_LOAD: 42% // NETWORK_UPTIME: 99.99% // PACKET_LOSS: 0% //&nbsp;</span>
          <span className="px-6">SYSTEM_STATUS: NOMINAL // CORE_TEMP: 32C // MEMORY_LOAD: 42% // NETWORK_UPTIME: 99.99% // PACKET_LOSS: 0% //&nbsp;</span>
        </div>
      </div>

      {/* HUD core panel */}
      <div className="absolute inset-10 sm:inset-12 hud-frame rounded-xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden">
        <span className="hud-corner-tl" />
        <span className="hud-corner-tr" />
        <span className="hud-corner-bl" />
        <span className="hud-corner-br" />

        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="mono text-[9px] text-[color:var(--cyan)]/70 tracking-widest uppercase">Core Identity</div>
            <div className="mono text-lg sm:text-xl font-bold text-foreground tracking-tight">JS // v1.0.4</div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] animate-pulse shadow-[0_0_8px_var(--cyan)]" />
            <span className="mono text-[8px] text-[color:var(--cyan)] font-bold">LIVE</span>
          </div>
        </div>

        {/* Equalizer */}
        <div className="flex-1 flex items-end justify-center gap-1.5 py-5">
          {bars.map((h, i) => (
            <div
              key={i}
              className="w-2 sm:w-2.5 rounded-sm eq-bar bg-gradient-to-t from-[color:var(--cyan)]/30 to-[color:var(--cyan)] shadow-[0_0_10px_color-mix(in_oklab,var(--cyan)_60%,transparent)]"
              style={{ height: `${h}%`, animationDelay: `${i * 0.14}s`, animationDuration: `${1.4 + (i % 3) * 0.35}s` }}
            />
          ))}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4 border-t border-[color:var(--cyan)]/20 pt-3">
          <div>
            <div className="mono text-[8px] text-muted-foreground tracking-widest uppercase">Stability</div>
            <div className="mono text-sm font-bold text-[color:var(--cyan)]">99.98%</div>
          </div>
          <div>
            <div className="mono text-[8px] text-muted-foreground tracking-widest uppercase">Latency</div>
            <div className="mono text-sm font-bold text-[color:var(--cyan)]">14ms</div>
          </div>
        </div>
      </div>

      {/* Satellite data points */}
      <div className="absolute top-[14%] right-[2%] p-2 bg-background/70 border border-white/10 backdrop-blur-sm mono text-[8px] uppercase tracking-widest text-muted-foreground z-30">
        Sat_Link: Established
      </div>
      <div className="absolute bottom-[16%] left-[0%] p-2 bg-background/70 border border-white/10 backdrop-blur-sm mono text-[8px] uppercase tracking-widest text-muted-foreground z-30">
        Loc: Ahmedabad, IN
      </div>

      {/* Bottom ticker */}
      <div className="absolute bottom-0 left-0 right-0 h-6 overflow-hidden bg-[color:var(--electric)]/5 border-y border-[color:var(--electric)]/15 z-20 flex items-center">
        <div className="flex whitespace-nowrap mono text-[9px] tracking-widest text-[color:var(--electric)]/70 animate-marquee-rev">
          <span className="px-6">ENCRYPTION: AES-256 // PROTOCOL: BIN-SYNC // SECTOR: DELTA-9 // THREAT_LEVEL: ZERO //&nbsp;</span>
          <span className="px-6">ENCRYPTION: AES-256 // PROTOCOL: BIN-SYNC // SECTOR: DELTA-9 // THREAT_LEVEL: ZERO //&nbsp;</span>
        </div>
      </div>
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
        <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-[1.15fr_1fr] gap-14 items-center">
          <div className="reveal">
            <span className="section-label inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--cyan)] opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--cyan)] shadow-[0_0_8px_var(--cyan)]" />
              </span>
              MISSION CONTROL · ONLINE
              <span className="hidden sm:inline-block h-px w-10 bg-[color:var(--cyan)]/30 mx-1" />
              <span className="hidden sm:inline mono text-[10px] text-[color:var(--cyan)]/60 tracking-widest">OPERATOR · {PROFILE.name.toUpperCase()}</span>
            </span>

            <h1 className="mt-6 text-[2.8rem] sm:text-6xl lg:text-[4.6rem] font-bold leading-[0.98] tracking-tight">
              Building <span className="text-gradient text-glow">intelligent systems</span>
              <span className="block text-foreground/90">where hardware meets software.</span>
            </h1>

            <p className="mt-6 max-w-xl text-muted-foreground text-[15.5px] leading-relaxed">
              I'm Jeet — Co-Founder @ <span className="text-[color:var(--cyan)]">BinBuddy</span>. I work across{" "}
              <span className="text-foreground font-medium">cybersecurity</span>,{" "}
              <span className="text-foreground font-medium">robotics</span>,{" "}
              <span className="text-foreground font-medium">web</span>, and{" "}
              <span className="text-foreground font-medium">electronics</span> to turn ambitious ideas into AI-driven products.
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {ROLES.map((r) => (
                <span key={r} className="mono text-[10.5px] tracking-widest text-foreground/80 border border-white/10 rounded-sm px-2.5 py-1 bg-white/[0.03]">
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
            <HudConsole />
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
