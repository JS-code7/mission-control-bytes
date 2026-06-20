import { useEffect, useRef, useState } from "react";
import { MessageSquare, X, Send, Sparkles, Loader2 } from "lucide-react";
import { track } from "@/lib/portfolio/analytics";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What is BinBuddy?",
  "Show top projects",
  "What are Jeet's skills?",
  "Certifications?",
];

const INTRO: Msg = {
  role: "assistant",
  content:
    "MC-AI online. Ask me about Jeet's work, BinBuddy, projects, skills, certifications, or experience.",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([INTRO]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      track("chat_open");
    }
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
      if (!res.ok) {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: data.error || "Signal lost. Try again." },
        ]);
      } else {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: data.reply || "No response received." },
        ]);
      }
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
            className="absolute inset-0 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in oklab, var(--cyan) 60%, transparent), transparent 70%)",
            }}
          />
          <span className="relative flex items-center gap-2 px-4 py-3 rounded-full glass hud-corner border border-[color:var(--cyan)]/40">
            <Sparkles className="h-4 w-4 text-[var(--cyan)]" />
            <span className="mono text-[11px] tracking-widest text-foreground/90">MC-AI</span>
            <span className="hidden sm:inline mono text-[10px] text-muted-foreground tracking-widest">
              · ASK
            </span>
          </span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div className="fixed bottom-5 right-5 z-[95] w-[min(380px,94vw)] h-[min(560px,80vh)] glass hud-corner rounded-2xl flex flex-col overflow-hidden border border-white/10">
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-white/10">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--cyan)] opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--cyan)]" />
            </span>
            <div className="mono text-[11px] tracking-widest text-[var(--cyan)]">MC-AI · ONLINE</div>
            <span className="ml-auto mono text-[9.5px] tracking-widest text-muted-foreground">
              grounded · profile
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="ml-2 p-1 rounded-md hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-black/20"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] text-[13px] leading-relaxed px-3 py-2 rounded-xl ${
                    m.role === "user"
                      ? "bg-[color:var(--cyan)]/15 border border-[color:var(--cyan)]/30 text-foreground"
                      : "bg-white/[0.04] border border-white/10 text-foreground/90"
                  }`}
                >
                  {m.role === "assistant" && (
                    <div className="mono text-[9.5px] tracking-widest text-[var(--cyan)] mb-1 flex items-center gap-1">
                      <MessageSquare className="h-2.5 w-2.5" /> MC-AI
                    </div>
                  )}
                  <div className="whitespace-pre-wrap">{m.content}</div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/[0.04] border border-white/10 px-3 py-2 rounded-xl text-[13px] text-muted-foreground flex items-center gap-2">
                  <Loader2 className="h-3 w-3 animate-spin text-[var(--cyan)]" />
                  thinking…
                </div>
              </div>
            )}
            {messages.length === 1 && !loading && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="mono text-[10.5px] tracking-wider px-2 py-1 rounded-md border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-[color:var(--cyan)]/40 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 px-2.5 py-2 border-t border-white/10 bg-black/30"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Jeet, BinBuddy, projects…"
              disabled={loading}
              className="flex-1 bg-white/5 border border-white/10 rounded-md px-3 py-2 text-[13px] outline-none focus:border-[var(--cyan)] disabled:opacity-50"
              maxLength={500}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="grid place-items-center h-9 w-9 rounded-md bg-gradient-to-br from-[var(--cyan)] to-[var(--electric)] text-background disabled:opacity-40"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
