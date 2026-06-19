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

function PortraitCard() {
  return (
    <div className="relative w-full max-w-[420px] mx-auto group">
      {/* Ambient halo */}
      <div className="absolute -inset-10 rounded-[2.5rem] opacity-70 blur-3xl pointer-events-none"
           style={{ background: "radial-gradient(closest-side, color-mix(in oklab, var(--cyan) 35%, transparent), transparent 70%)" }} />
      <div className="absolute -inset-10 rounded-[2.5rem] opacity-60 blur-3xl pointer-events-none"
           style={{ background: "radial-gradient(closest-side at 80% 90%, color-mix(in oklab, var(--purple-glow) 40%, transparent), transparent 70%)" }} />

      {/* Orbiting rings */}
      <div className="absolute -inset-6 rounded-[2rem] border border-[color:var(--cyan)]/15 animate-spin-slow pointer-events-none" />
      <div className="absolute -inset-3 rounded-[1.75rem] border border-dashed border-[color:var(--purple-glow)]/20 pointer-events-none"
           style={{ animation: "spin-slow 38s linear infinite reverse" }} />

      {/* Portrait frame */}
      <div className="relative hud-frame rounded-[1.5rem] p-3 transition-transform duration-500 group-hover:-translate-y-1">
        <span className="hud-corner-tl" />
        <span className="hud-corner-tr" />
        <span className="hud-corner-bl" />
        <span className="hud-corner-br" />

        {/* Frame header */}
        <div className="flex items-center justify-between px-1.5 pt-1 pb-3">
          <div className="flex items-center gap-2 mono text-[10px] tracking-widest text-[color:var(--cyan)]/80">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--cyan)] opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--cyan)]" />
            </span>
            OPERATOR · LIVE FEED
          </div>
          <span className="mono text-[10px] text-muted-foreground tracking-widest">ID · 0042</span>
        </div>

        {/* Image */}
        <div className="relative overflow-hidden rounded-[1.1rem] aspect-[4/5]">
          <img
            src={portrait.url}
            alt="Jeet Soni — Co-Founder @ BinBuddy"
            loading="eager"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[50%_28%] transition-transform duration-700 group-hover:scale-[1.04]"
          />
          {/* Tonal grade overlays */}
          <div className="absolute inset-0 pointer-events-none"
               style={{ background: "linear-gradient(180deg, transparent 35%, color-mix(in oklab, var(--bg) 85%, transparent) 100%)" }} />
          <div className="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-60"
               style={{ background: "linear-gradient(135deg, color-mix(in oklab, var(--cyan) 30%, transparent), transparent 55%, color-mix(in oklab, var(--purple-glow) 35%, transparent))" }} />
          {/* Scanline subtle */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
               style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 3px)" }} />

          {/* Caption block */}
          <div className="absolute left-3 right-3 bottom-3 flex items-end justify-between">
            <div>
              <div className="mono text-[10px] tracking-[0.25em] text-[color:var(--cyan)]/90">JEET SONI</div>
              <div className="text-[13px] text-foreground/90 leading-tight mt-0.5">Co-Founder · BinBuddy</div>
            </div>
            <div className="hud-frame rounded-md px-2 py-1 mono text-[9px] tracking-widest text-[color:var(--cyan)]">
              v1.0
            </div>
          </div>
        </div>

        {/* Footer chips */}
        <div className="grid grid-cols-3 gap-2 mt-3 px-1">
          <div className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1.5">
            <div className="mono text-[8.5px] text-muted-foreground tracking-widest">FOCUS</div>
            <div className="mono text-[10.5px] text-foreground/90">Security</div>
          </div>
          <div className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1.5">
            <div className="mono text-[8.5px] text-muted-foreground tracking-widest">BUILDS</div>
            <div className="mono text-[10.5px] text-foreground/90">Robotics</div>
          </div>
          <div className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1.5">
            <div className="mono text-[8.5px] text-muted-foreground tracking-widest">SHIPS</div>
            <div className="mono text-[10.5px] text-foreground/90">AI · Web</div>
          </div>
        </div>
      </div>

      {/* Floating accent tags */}
      <div className="hidden md:flex absolute -left-6 top-16 hud-frame rounded-md px-2.5 py-1.5 items-center gap-2 animate-float">
        <Shield className="h-3.5 w-3.5 text-[var(--cyan)]" />
        <span className="mono text-[10px] tracking-widest text-foreground/85">SECURE NODE</span>
      </div>
      <div className="hidden md:flex absolute -right-4 bottom-24 hud-frame rounded-md px-2.5 py-1.5 items-center gap-2 animate-float" style={{ animationDelay: "1.2s" }}>
        <Radio className="h-3.5 w-3.5 text-[var(--cyan)]" />
        <span className="mono text-[10px] tracking-widest text-foreground/85">AHMEDABAD · IN</span>
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
