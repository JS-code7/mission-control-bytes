import { createFileRoute } from "@tanstack/react-router";
import { SYSTEM_PROMPT } from "@/lib/portfolio/knowledge";

type ChatMessage = { role: "user" | "assistant"; content: string };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env.LOVABLE_API_KEY;
        if (!key) {
          return new Response(JSON.stringify({ error: "AI not configured" }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }

        let body: { messages?: ChatMessage[] };
        try {
          body = (await request.json()) as { messages?: ChatMessage[] };
        } catch {
          return new Response(JSON.stringify({ error: "Invalid JSON" }), {
            status: 400,
            headers: { "content-type": "application/json" },
          });
        }

        const incoming = Array.isArray(body.messages) ? body.messages : [];
        const clean = incoming
          .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
          .slice(-12)
          .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));

        if (clean.length === 0) {
          return new Response(JSON.stringify({ error: "No messages" }), {
            status: 400,
            headers: { "content-type": "application/json" },
          });
        }

        const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": key,
            "X-Lovable-AIG-SDK": "raw-fetch",
          },
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview",
            messages: [{ role: "system", content: SYSTEM_PROMPT }, ...clean],
            temperature: 0.4,
            max_tokens: 600,
          }),
        });

        if (upstream.status === 429) {
          return new Response(
            JSON.stringify({ error: "Rate limited. Please try again in a moment." }),
            { status: 429, headers: { "content-type": "application/json" } },
          );
        }
        if (upstream.status === 402) {
          return new Response(
            JSON.stringify({ error: "AI credits exhausted. Operator has been notified." }),
            { status: 402, headers: { "content-type": "application/json" } },
          );
        }
        if (!upstream.ok) {
          const text = await upstream.text();
          console.error("AI gateway error", upstream.status, text);
          return new Response(
            JSON.stringify({ error: "Assistant unavailable. Try again." }),
            { status: 502, headers: { "content-type": "application/json" } },
          );
        }

        const json = (await upstream.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        const reply = json.choices?.[0]?.message?.content?.trim() ?? "";

        return new Response(JSON.stringify({ reply }), {
          headers: { "content-type": "application/json" },
        });
      },
    },
  },
});
