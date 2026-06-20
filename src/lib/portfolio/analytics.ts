import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "js-mc-session";

function getSessionId(): string {
  if (typeof window === "undefined") return "ssr";
  try {
    let s = sessionStorage.getItem(SESSION_KEY);
    if (!s) {
      s = `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
      sessionStorage.setItem(SESSION_KEY, s);
    }
    return s;
  } catch {
    return "anon";
  }
}

export async function track(
  event_type: string,
  metadata: Record<string, unknown> = {},
  path?: string,
) {
  if (typeof window === "undefined") return;
  try {
    await supabase.from("analytics_events").insert({
      event_type: event_type.slice(0, 64),
      path: (path ?? window.location.pathname).slice(0, 256),
      metadata: metadata as never,
      session_id: getSessionId(),
      user_agent: navigator.userAgent.slice(0, 512),
      referrer: document.referrer ? document.referrer.slice(0, 512) : null,
    });
  } catch (err) {
    // analytics must never break UX
    console.debug("analytics error", err);
  }
}
