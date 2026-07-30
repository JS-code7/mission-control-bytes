import { useEffect, useRef, useState } from "react";
import { X, Send, Loader2, User, Sparkles, RotateCcw, RadioTower } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/portfolio/analytics";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What is BinBuddy?",
  "Top projects",
  "Skills & stack",
  "Certifications",
  "How to hire Jeet",
];

const INTRO: Msg = {
  role: "assistant",
  content:
    "MC-AI online. Ask about Jeet's current roles, BinBuddy Technologies, projects, skills, certifications, or collaboration fit.",
};

function AgentMark({ compact = false }: { compact?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`relative grid shrink-0 place-items-center overflow-hidden rounded-lg border border-primary/35 bg-primary/15 text-primary shadow-[0_0_24px_color-mix(in_oklab,var(--primary)_24%,transparent)] ${
        compact ? "h-8 w-8" : "h-9 w-9"
      }`}
    >
      <span className="absolute inset-1 rounded-full border border-primary/25" />
      <span className="absolute h-px w-8 rotate-45 bg-primary/45" />
      <span className="mono relative text-[10px] font-semibold tracking-normal text-primary">MC</span>
    </span>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([INTRO]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const launcherRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    if (!open) {
      launcherRef.current?.focus();
      return;
    }
    setTimeout(() => inputRef.current?.focus(), 50);
    track("chat_open");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (!panelRef.current.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);


  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    track("chat_message", { length: content.length });
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next.filter((m) => m !== INTRO) }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: !res.ok
            ? data.error || "Signal lost. Try again."
            : data.reply || "No response received.",
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Network error. Check your connection and retry." },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }

  const reset = () => setMessages([INTRO]);

  return (
    <>
      {/* Launcher */}
      {!open && (
        <Button
          type="button"
          ref={launcherRef}
          variant="ghost"
          onClick={() => setOpen(true)}
          aria-label="Open MC-AI assistant chat"
          aria-expanded={false}
          aria-haspopup="dialog"
          aria-controls="mcai-panel"
          className="group fixed bottom-4 right-4 z-[90] h-auto rounded-full p-0 hover:bg-transparent focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-5 sm:right-5"
        >
          <span
            className="absolute inset-0 rounded-full bg-primary/20 blur-2xl opacity-70 transition group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in oklab, var(--primary) 50%, transparent), transparent 70%)",
            }}
          />
          <span className="hud-corner relative grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 rounded-full border border-primary/35 bg-card/90 py-1.5 pl-1.5 pr-3 text-left shadow-2xl backdrop-blur-xl transition-colors group-hover:border-primary/70">
            <AgentMark compact />
            <span className="flex min-w-0 flex-col leading-none">
              <span className="mono text-[10px] font-semibold tracking-[0.14em] text-primary">MC-AI</span>
              <span className="mt-1 text-[11px] font-medium text-foreground/85">Ask Jeet's profile</span>
            </span>
          </span>
        </Button>
      )}

      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          id="mcai-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="mcai-title"
          aria-describedby="mcai-desc"
          className="fixed z-[95] flex flex-col overflow-hidden rounded-xl border border-primary/25 bg-card/95 shadow-2xl backdrop-blur-xl
            right-3 bottom-3
            left-auto top-auto
            w-[calc(100vw-1.5rem)] max-w-[23.5rem]
            h-[calc(100dvh-1.5rem)] max-h-[34.5rem]
            sm:right-5 sm:bottom-5
            sm:w-[23.5rem]
            md:w-[24rem]"
        >
          <span className="hud-corner-tl" aria-hidden="true" />
          <span className="hud-corner-tr" aria-hidden="true" />
          <span className="hud-corner-bl" aria-hidden="true" />
          <span className="hud-corner-br" aria-hidden="true" />
          <p id="mcai-desc" className="sr-only">
            MC-AI is an assistant grounded in Jeet Soni's profile. Type a question and press Enter to send. Press
            Escape to close this panel.
          </p>

            {/* Header */}
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/55 px-3.5 py-3">
              <AgentMark />
              <div className="min-w-0">
                <h2 id="mcai-title" className="truncate text-[13px] font-semibold leading-tight text-foreground">MC-AI Concierge</h2>

                <div className="mono mt-1 flex min-w-0 items-center gap-1.5 text-[8.5px] font-medium tracking-[0.14em] text-primary/80">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                  <span className="truncate">ONLINE · PROFILE-GROUNDED</span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={reset}
                  aria-label="Reset conversation and start a new chat"
                  title="New conversation"
                  className="h-8 w-8 rounded-md text-muted-foreground hover:bg-secondary/70 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                  aria-label="Close MC-AI assistant"
                  className="h-8 w-8 rounded-md text-muted-foreground hover:bg-secondary/70 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>


            {/* Messages */}
            <div
              ref={scrollRef}
              role="log"
              aria-live="polite"
              aria-relevant="additions text"
              aria-label="MC-AI conversation"
              tabIndex={0}
              className="flex-1 space-y-3 overflow-y-auto bg-background/35 px-3.5 py-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 animate-fade-in ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    aria-hidden="true"
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg border ${
                      m.role === "user"
                        ? "border-border bg-secondary/70 text-secondary-foreground"
                        : "border-primary/30 bg-primary/15 text-primary"
                    }`}
                  >
                    {m.role === "user" ? <User className="h-3.5 w-3.5" /> : <RadioTower className="h-3.5 w-3.5" />}
                  </div>
                  <div
                    className={`max-w-[82%] rounded-lg px-3 py-2 text-[13px] leading-relaxed ${
                      m.role === "user"
                        ? "border border-primary/30 bg-primary/15 text-foreground rounded-tr-sm"
                        : "border border-border bg-card/55 text-foreground/90 rounded-tl-sm"
                    }`}
                  >
                    <span className="sr-only">{m.role === "user" ? "You said:" : "MC-AI replied:"}</span>
                    <div className="whitespace-pre-wrap">{m.content}</div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2.5 animate-fade-in">
                  <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-primary/30 bg-primary/15 text-primary" aria-hidden="true">
                    <RadioTower className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex items-center gap-2 rounded-lg rounded-tl-sm border border-border bg-card/55 px-3 py-2 text-[12px] text-muted-foreground">
                    <Loader2 className="h-3 w-3 animate-spin text-primary" aria-hidden="true" />
                    <span className="mono text-[10px] tracking-[0.12em]" role="status">
                      <span className="sr-only">MC-AI is </span>processing…
                    </span>
                  </div>
                </div>
              )}
            </div>


            {/* Suggestions strip — only until the user starts chatting */}
            {messages.length <= 1 && (
              <div className="border-t border-border bg-background/60 px-3.5 pb-2.5 pt-3">
                <div className="mb-2 flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-primary" aria-hidden="true" />
                  <span className="mono text-[9px] font-medium tracking-[0.16em] text-muted-foreground">QUICK PROMPTS</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTIONS.map((s) => (
                    <Button
                      type="button"
                      key={s}
                      variant="outline"
                      size="sm"
                      onClick={() => send(s)}
                      disabled={loading}
                      className="h-auto rounded-full border-border bg-card/60 px-2.5 py-1 text-[11px] font-medium text-foreground/75 hover:border-primary/45 hover:bg-primary/10 hover:text-foreground disabled:opacity-40"
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-2 border-t border-border bg-background/70 px-3 py-3"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                placeholder="Ask about Jeet, BinBuddy, projects…"
                disabled={loading}
                rows={1}
                className="min-h-10 max-h-24 min-w-0 resize-none rounded-lg border border-input bg-card/60 px-3 py-2.5 text-[13px] leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:bg-card disabled:opacity-50"
                maxLength={500}
              />
              <Button
                type="submit"
                size="icon"
                disabled={loading || !input.trim()}
                className="h-10 w-10 shrink-0 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
                aria-label="Send"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
        </div>
      )}
    </>
  );
}
