import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, Linkedin, Github, MapPin, Send, Terminal, ArrowRight, Wifi, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { PROFILE } from "../lib/portfolio/data";
import { PageHero, useReveal } from "../lib/portfolio/shared";
import { supabase } from "@/integrations/supabase/client";
import { track } from "../lib/portfolio/analytics";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({ meta: [
    { title: "Contact — Jeet Soni" },
    { name: "description", content: "Open a direct channel. Email, phone, LinkedIn, GitHub — all functional." },
  ]}),
});

const ContactSchema = z.object({
  name: z.string().trim().min(1, "Callsign required").max(100),
  email: z.string().trim().email("Invalid channel address").max(255),
  message: z.string().trim().min(4, "Transmission too short").max(2000),
});

function ContactPage() {
  useReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = ContactSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Check your inputs.");
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("contact_messages").insert(parsed.data);
      if (error) throw error;
      await track("contact_submit", { email_domain: parsed.data.email.split("@")[1] });
      toast.success("Transmission received", { description: "Jeet will reply shortly." });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Channel disrupted. Try email instead.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero variant="contact"
        eyebrow={<><Wifi className="h-3 w-3" /> SYSTEM · 08 · CONTACT</>}
        code="CHANNEL · OPEN"
        title={<>Open a <span className="text-gradient">channel</span></>}
        subtitle="Short notes welcome. I read every message — pitches, collabs, questions, hellos."
      />

      <section className="relative py-10">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[1fr_1.1fr] gap-6">
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
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={6} className="mt-1 w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-[14px] outline-none focus:border-[var(--cyan)]" placeholder="What are we building?" />
            </label>
            <div className="flex items-center justify-between gap-3">
              <span className="mono text-[10.5px] text-muted-foreground">SECURE · STORED IN CLOUD</span>
              <button type="submit" disabled={submitting} className="btn-hero disabled:opacity-60">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {submitting ? "Transmitting…" : "Send Transmission"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
