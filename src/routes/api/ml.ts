import { createFileRoute } from "@tanstack/react-router";

type MlTask = "sentiment" | "classify" | "summary" | "keywords";

const SYSTEMS: Record<MlTask, string> = {
  sentiment:
    'You are a sentiment classifier. Respond ONLY with strict JSON: {"label":"positive|neutral|negative","score":0..1,"reason":"<10 words"}.',
  classify:
    'You are a zero-shot topic classifier for short text. Respond ONLY with strict JSON: {"topic":"tech|business|product|security|ai|other","confidence":0..1,"why":"<12 words"}.',
  summary:
    'You are a TL;DR engine. Respond ONLY with strict JSON: {"summary":"one sentence, <=140 chars"}.',
  keywords:
    'You extract 3-6 keywords. Respond ONLY with strict JSON: {"keywords":["..."]}.',
};

export const Route = createFileRoute("/api/ml")({
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
        let body: { task?: MlTask; text?: string };
        try {
          body = (await request.json()) as { task?: MlTask; text?: string };
        } catch {
          return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
        }
        const task = body.task;
        const input = (body.text ?? "").toString().slice(0, 1200).trim();
        if (!task || !(task in SYSTEMS) || !input) {
          return new Response(JSON.stringify({ error: "Missing task or text" }), { status: 400 });
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
            messages: [
              { role: "system", content: SYSTEMS[task] },
              { role: "user", content: input },
            ],
            temperature: 0.1,
            max_tokens: 200,
            response_format: { type: "json_object" },
          }),
        });

        if (upstream.status === 429)
          return new Response(JSON.stringify({ error: "Rate limited. Try again shortly." }), { status: 429 });
        if (upstream.status === 402)
          return new Response(JSON.stringify({ error: "AI credits exhausted." }), { status: 402 });
        if (!upstream.ok) {
          return new Response(JSON.stringify({ error: "Model unavailable." }), { status: 502 });
        }

        const json = (await upstream.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        const raw = json.choices?.[0]?.message?.content?.trim() ?? "{}";
        let parsed: unknown = {};
        try {
          parsed = JSON.parse(raw);
        } catch {
          parsed = { raw };
        }
        return new Response(JSON.stringify({ task, result: parsed }), {
          headers: { "content-type": "application/json" },
        });
      },
    },
  },
});
