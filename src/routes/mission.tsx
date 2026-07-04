import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, Terminal, Briefcase, GraduationCap, Award, Cpu, Linkedin, Github, Mail, Cloud } from "lucide-react";
import { PROFILE, EXPERIENCES, EDUCATION, CERTIFICATIONS, SKILLS } from "../lib/portfolio/data";
import { PageHero, useReveal } from "../lib/portfolio/shared";

export const Route = createFileRoute("/mission")({
  component: MissionPage,
  head: () => ({ meta: [
    { title: "Mission — Jeet Soni" },
    { name: "description", content: "Operator profile, experience, education, and system capabilities." },
  ]}),
});

function MissionPage() {
  useReveal();
  return (
    <>
      <PageHero variant="home"
        eyebrow={<><Eye className="h-3 w-3" /> SYSTEM · 01 · MISSION</>}
        code="UPLINK · STABLE · 99.9%"
        title={<>Operator <span className="text-gradient">Profile</span></>}
        subtitle="The brief: who I am, where I've operated, and the capability matrix that powers every module."
      />

      <section className="relative py-8">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[1.2fr_1fr] gap-6">
          <div className="reveal glass rounded-2xl p-6 hud-corner">
            <div className="mono text-[11px] tracking-widest text-[var(--cyan)]">ABOUT · OPERATOR</div>
            <div className="hairline my-3" />
            <div className="space-y-4 text-[15px] leading-relaxed text-foreground/85">
              <p>I'm a builder at the intersection of <span className="text-foreground">cybersecurity, robotics, AI, and web</span>. I co-founded <span className="text-foreground">BinBuddy</span>, an incubated and funded startup turning waste operations into intelligent, measurable systems.</p>
              <p>My work is grounded in a simple idea: software is sharper when it touches the real world. That's why I gravitate toward problems where bits meet atoms — sensors, vehicles, secure storage, smart agents that do more than chat.</p>
              <p>I care deeply about <span className="text-foreground">ethical hacking, defensive security, and secure-by-default architecture</span>. Building something powerful is only half the job; building it responsibly is the rest.</p>
            </div>
          </div>
          <div className="reveal glass rounded-2xl p-5 hud-corner">
            <div className="mono text-[11px] tracking-widest text-[var(--cyan)]">OPERATOR · CARD</div>
            <div className="hairline my-3" />
            <dl className="text-[14px] space-y-2.5">
              {[["Name", PROFILE.name],["Role", PROFILE.role],["Base", PROFILE.location],["Email", PROFILE.email],["Phone", PROFILE.phone],["Focus", "AI · Security · Robotics · Web"]].map(([k, v]) => (
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

      {/* Experience */}
      <section className="relative py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-[var(--cyan)]" />
            <h2 className="text-2xl font-semibold tracking-tight">Experience Log</h2>
          </div>
          <div className="mt-6 grid md:grid-cols-2 gap-5">
            {EXPERIENCES.map((e) => (
              <article key={e.company + e.role} className="reveal glass rounded-2xl p-5 hud-corner card-hover">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold">{e.role}</div>
                    <div className="text-[var(--cyan)] mono text-[12px] tracking-widest mt-0.5">{e.company.toUpperCase()}</div>
                  </div>
                  <div className="text-right">
                    <div className="mono text-[11px] text-muted-foreground whitespace-nowrap">{e.period}</div>
                    {e.location && <div className="mono text-[10px] text-muted-foreground/70 whitespace-nowrap mt-0.5">{e.location}</div>}
                  </div>
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

      {/* Education */}
      <section className="relative py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-[var(--cyan)]" />
            <h2 className="text-2xl font-semibold tracking-tight">Education</h2>
          </div>
          <div className="mt-6 grid md:grid-cols-2 gap-5">
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

      {/* Capabilities */}
      <section className="relative py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal flex items-center gap-2">
            <Cpu className="h-4 w-4 text-[var(--cyan)]" />
            <h2 className="text-2xl font-semibold tracking-tight">System Capabilities</h2>
          </div>
          <div className="mt-6 grid lg:grid-cols-3 gap-5">
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
        </div>
      </section>

      {/* Certs */}
      <section className="relative pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal flex items-center gap-2">
            <Award className="h-4 w-4 text-[var(--gold)]" />
            <h2 className="text-2xl font-semibold tracking-tight">Certifications</h2>
          </div>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((c) => (
              <div key={c.name} className="reveal glass-soft rounded-xl p-4 card-hover border border-white/10">
                <c.icon className="h-5 w-5 text-[var(--gold)]" />
                <div className="mt-3 text-[13.5px] font-medium leading-snug">{c.name}</div>
                <div className="mono text-[10.5px] tracking-widest text-muted-foreground mt-1">{c.issuer.toUpperCase()}</div>
              </div>
            ))}
          </div>

          <div className="reveal mt-10 glass rounded-2xl p-5 hud-corner scanline">
            <div className="flex items-center gap-2 mono text-[11px] text-[var(--cyan)]">
              <Terminal className="h-3.5 w-3.5" /> /mission/next
            </div>
            <div className="hairline my-3" />
            <div className="flex flex-wrap gap-3">
              <Link to="/story" className="btn-hero">Enter Story Mode</Link>
              <Link to="/modules" className="btn-ghost">Browse Active Modules</Link>
              <Link to="/contact" className="btn-ghost"><Cloud className="h-4 w-4" /> Open Channel</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
