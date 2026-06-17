import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Github, Linkedin, Mail, Send, Terminal, Menu, X } from "lucide-react";
import { NAV_ITEMS, PROFILE } from "./data";

/* ---------------- hooks ---------------- */
export function useReveal() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    els.forEach((el) => el.classList.remove("in"));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);
}

export function useCursorLight() {
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

/* ---------------- Preloader (premium JS) ---------------- */
const BOOT_LINES = [
  "INITIALIZING SYSTEM…",
  "LOADING MISSION CONTROL…",
  "AUTHENTICATING OPERATOR…",
  "LOADING ACTIVE MODULES…",
  "SYSTEM READY",
];

export function Preloader({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStep((s) => Math.min(s + 1, BOOT_LINES.length)), 420);
    const p = setInterval(() => setPct((v) => Math.min(100, v + 3)), 55);
    const end = setTimeout(onDone, 2400);
    return () => { clearInterval(t); clearInterval(p); clearTimeout(end); };
  }, [onDone]);

  return (
    <div className="preloader fixed inset-0 z-[200] grid place-items-center bg-black overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute inset-0 radial-glow opacity-50" />
      {/* particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 36 }).map((_, i) => (
          <span
            key={i}
            className="preloader-particle"
            style={{
              left: `${(i * 137) % 100}%`,
              top: `${(i * 91) % 100}%`,
              animationDelay: `${(i % 10) * 0.2}s`,
              animationDuration: `${4 + (i % 5)}s`,
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center gap-8 px-6">
        {/* JS logo */}
        <div className="relative h-44 w-44 grid place-items-center">
          <div className="absolute inset-0 rounded-full border border-[color:var(--cyan)]/30 animate-spin-slow" />
          <div className="absolute inset-3 rounded-full border border-dashed border-[color:var(--purple-glow)]/40" style={{ animation: "spin-slow 14s linear infinite reverse" }} />
          <div className="absolute inset-6 rounded-full border border-[color:var(--electric)]/40 animate-spin-slow" />
          <div className="absolute inset-0 rounded-full radial-glow blur-2xl opacity-80" />
          <svg viewBox="0 0 100 100" className="relative h-28 w-28 js-logo">
            <defs>
              <linearGradient id="jsGrad" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--cyan)" />
                <stop offset="60%" stopColor="var(--electric)" />
                <stop offset="100%" stopColor="var(--purple-glow)" />
              </linearGradient>
            </defs>
            <text
              x="50" y="68" textAnchor="middle"
              fontFamily="'Space Grotesk', sans-serif"
              fontWeight="700" fontSize="58"
              fill="url(#jsGrad)"
              stroke="url(#jsGrad)" strokeWidth="0.6"
              style={{ filter: "drop-shadow(0 0 16px color-mix(in oklab, var(--cyan) 60%, transparent))" }}
            >JS</text>
          </svg>
        </div>

        <div className="mono text-[10.5px] tracking-[0.3em] text-[var(--cyan)]">JEET · SONI · OS</div>

        {/* boot log */}
        <div className="w-[min(440px,90vw)] glass rounded-xl p-4 hud-corner scanline">
          <div className="flex items-center gap-2 mono text-[10.5px] text-[var(--cyan)]">
            <Terminal className="h-3 w-3" /> BOOT SEQUENCE
            <span className="ml-auto opacity-70">{pct}%</span>
          </div>
          <div className="hairline my-2" />
          <div className="mono text-[11.5px] leading-relaxed min-h-[110px]">
            {BOOT_LINES.slice(0, step).map((l, i) => (
              <div key={i} className="text-foreground/85">
                <span className="text-[var(--cyan)]">›</span> [ OK ] {l}
              </div>
            ))}
            {step < BOOT_LINES.length && (
              <div className="text-[var(--cyan)] cursor-blink">running</div>
            )}
          </div>
          <div className="mt-3 h-1 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[var(--cyan)] via-[var(--electric)] to-[var(--purple-glow)] transition-all" style={{ width: pct + "%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Nav ---------------- */
export function Nav() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => { setOpen(false); }, [path]);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1180px,94vw)]">
      <div className="glass rounded-full px-3 py-2 flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2 px-2">
          <div className="relative h-7 w-7 rounded-md bg-gradient-to-br from-[var(--cyan)] to-[var(--electric)] grid place-items-center text-background font-bold text-[11px]">JS</div>
          <span className="mono text-[11.5px] tracking-[0.2em] text-foreground/80 hidden sm:inline">JEET.SONI</span>
        </Link>
        <nav className="ml-auto hidden lg:flex items-center gap-0.5">
          {NAV_ITEMS.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              className="px-3 py-1.5 text-[12px] mono tracking-widest text-muted-foreground hover:text-foreground transition-colors rounded-full"
              activeProps={{ className: "px-3 py-1.5 text-[12px] mono tracking-widest text-[var(--cyan)] bg-[color:var(--cyan)]/10 rounded-full" }}
            >
              {it.label.toUpperCase()}
            </Link>
          ))}
        </nav>
        <Link to="/contact" className="btn-hero !py-2 !px-3 text-[12px] hidden md:inline-flex">
          <Send className="h-3.5 w-3.5" /> Transmit
        </Link>
        <button onClick={() => setOpen((o) => !o)} className="lg:hidden ml-auto btn-ghost !py-2 !px-2.5" aria-label="Menu">
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden mt-2 glass rounded-2xl p-3 hud-corner">
          <div className="grid grid-cols-2 gap-2">
            {NAV_ITEMS.map((it) => (
              <Link
                key={it.to}
                to={it.to}
                className="glass-soft rounded-lg px-3 py-2 mono text-[11.5px] tracking-widest text-foreground/85"
                activeProps={{ className: "rounded-lg px-3 py-2 mono text-[11.5px] tracking-widest text-[var(--cyan)] bg-[color:var(--cyan)]/10 border border-[color:var(--cyan)]/40" }}
              >
                {it.label.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  return (
    <footer className="relative py-10 border-t border-white/5 mt-10">
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

/* ---------------- Page transition wrapper ---------------- */
export function PageTransition({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div key={path} className="page-enter">
      {children}
    </div>
  );
}

/* ---------------- Page hero (consistent header) ---------------- */
export function PageHero({
  eyebrow, title, subtitle, code, children,
}: { eyebrow: string; title: ReactNode; subtitle?: string; code?: string; children?: ReactNode }) {
  return (
    <section className="relative pt-32 pb-12 overflow-hidden bg-noise">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute inset-0 radial-glow opacity-60" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <span className="section-label">{eyebrow}</span>
          {code && <span className="mono text-[11px] tracking-widest text-muted-foreground">{code}</span>}
        </div>
        <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
          {title}
        </h1>
        {subtitle && <p className="mt-4 max-w-2xl text-muted-foreground text-[15.5px] leading-relaxed">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
