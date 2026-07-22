import { useEffect, useRef, useState } from "react";
import { X, Send, Loader2, Bot, User, Sparkles, RotateCcw } from "lucide-react";
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
    "Hey — I'm MC-AI, Jeet's mission-control assistant. Ask about his work, BinBuddy, projects, skills, or how to collaborate.",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([INTRO]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    if (!open) return;
    setTimeout(() => inputRef.current?.focus(), 50);
    track("chat_open");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
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
        <button
          onClick={() => setOpen(true)}
          aria-label="Open MC-AI assistant"
          className="fixed bottom-5 right-5 z-[90] group"
        >
          <span
            className="absolute inset-0 rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in oklab, var(--cyan) 60%, transparent), transparent 70%)",
            }}
          />
          <span className="relative flex items-center gap-3 pl-2 pr-4 py-2 rounded-full glass hud-corner border border-[color:var(--cyan)]/40 hover:border-[color:var(--cyan)]/80 transition-colors">
            <span className="relative grid place-items-center h-9 w-9 rounded-full bg-gradient-to-br from-[var(--cyan)] to-[var(--electric)] text-background shrink-0">
              <Bot className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[var(--cyan)] ring-2 ring-background" />
            </span>
            <span className="flex flex-col items-start leading-none whitespace-nowrap">
              <span className="mono text-[10px] tracking-[0.18em] text-[var(--cyan)]">MC-AI</span>
              <span className="text-[12px] text-foreground/90 mt-1">Ask anything</span>
            </span>
          </span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="mcai-title"
          className="fixed z-[95] glass hud-corner rounded-2xl flex flex-col overflow-hidden border border-[color:var(--cyan)]/20 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]
            right-[max(0.75rem,env(safe-area-inset-right))]
            bottom-[max(0.75rem,env(safe-area-inset-bottom))]
            left-[max(0.75rem,env(safe-area-inset-left))]
            top-auto
            sm:left-auto
            w-auto sm:w-[min(420px,calc(100vw-2rem))]
            h-[min(620px,calc(100dvh-1.5rem))]
            max-h-[calc(100dvh-1.5rem)]"
        >
          <span className="hud-corner-tl" />
          <span className="hud-corner-tr" />
          <span className="hud-corner-bl" />
          <span className="hud-corner-br" />

            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-gradient-to-r from-[color:var(--cyan)]/10 via-transparent to-[color:var(--purple-glow)]/10">
              <div className="relative grid place-items-center h-9 w-9 rounded-full bg-gradient-to-br from-[var(--cyan)] to-[var(--electric)] text-background shrink-0">
                <Bot className="h-4 w-4" aria-hidden="true" />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[var(--cyan)] ring-2 ring-background animate-pulse" />
              </div>
              <div className="flex-1 min-w-0">
                <div id="mcai-title" className="text-[14px] font-semibold leading-tight">MC-AI Assistant</div>

                <div className="mono text-[9.5px] tracking-[0.18em] text-[var(--cyan)]/80 flex items-center gap-1.5 mt-1">
                  <span className="h-1 w-1 rounded-full bg-[var(--cyan)]" /> ONLINE · GROUNDED ON PROFILE
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={reset}
                  aria-label="Reset conversation"
                  title="New conversation"
                  className="p-1.5 rounded-md hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="p-1.5 rounded-md hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5 bg-black/20">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 animate-fade-in ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`shrink-0 grid place-items-center h-7 w-7 rounded-full ${
                      m.role === "user"
                        ? "bg-white/10 border border-white/15 text-foreground/80"
                        : "bg-gradient-to-br from-[var(--cyan)] to-[var(--electric)] text-background"
                    }`}
                  >
                    {m.role === "user" ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                  </div>
                  <div
                    className={`max-w-[80%] text-[13.5px] leading-relaxed px-3.5 py-2.5 rounded-2xl ${
                      m.role === "user"
                        ? "bg-[color:var(--cyan)]/12 border border-[color:var(--cyan)]/25 text-foreground rounded-tr-sm"
                        : "bg-white/[0.04] border border-white/10 text-foreground/90 rounded-tl-sm"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{m.content}</div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2.5 animate-fade-in">
                  <div className="shrink-0 grid place-items-center h-7 w-7 rounded-full bg-gradient-to-br from-[var(--cyan)] to-[var(--electric)] text-background">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                  <div className="bg-white/[0.04] border border-white/10 px-3.5 py-2.5 rounded-2xl rounded-tl-sm text-[13px] text-muted-foreground flex items-center gap-2">
                    <Loader2 className="h-3 w-3 animate-spin text-[var(--cyan)]" />
                    <span className="mono text-[11px] tracking-wider">processing…</span>
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions strip — only until the user starts chatting */}
            {messages.length <= 1 && (
              <div className="px-4 pt-3 pb-2 border-t border-white/10 bg-black/30">
                <div className="flex items-center gap-1.5 mb-2">
                  <Sparkles className="h-3 w-3 text-[var(--cyan)]" />
                  <span className="mono text-[9.5px] tracking-[0.18em] text-muted-foreground">QUICK PROMPTS</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      disabled={loading}
                      className="text-[11.5px] px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.04] hover:bg-[color:var(--cyan)]/10 hover:border-[color:var(--cyan)]/40 hover:text-foreground text-foreground/75 transition-colors disabled:opacity-40"
                    >
                      {s}
                    </button>
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
              className="flex items-end gap-2 px-3 py-3 border-t border-white/10 bg-black/40"
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
                className="flex-1 resize-none bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-[13.5px] outline-none focus:border-[var(--cyan)] focus:bg-white/[0.07] disabled:opacity-50 max-h-28 leading-relaxed transition-colors"
                maxLength={500}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="shrink-0 grid place-items-center h-10 w-10 rounded-xl bg-gradient-to-br from-[var(--cyan)] to-[var(--electric)] text-background disabled:opacity-40 hover:shadow-[0_0_20px_color-mix(in_oklab,var(--cyan)_50%,transparent)] transition-shadow"
                aria-label="Send"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </form>
        </div>
      )}
    </>
  );
}
