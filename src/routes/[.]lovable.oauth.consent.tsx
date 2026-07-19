import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type OAuthClient = { name?: string; client_uri?: string };
type AuthorizationDetails = {
  client?: OAuthClient;
  redirect_url?: string;
  redirect_to?: string;
  scopes?: string[];
};

type OAuthNS = {
  getAuthorizationDetails: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  approveAuthorization: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  denyAuthorization: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
};

function oauthNs(): OAuthNS {
  return (supabase.auth as unknown as { oauth: OAuthNS }).oauth;
}

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s.authorization_id === "string" ? s.authorization_id : "",
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("Missing authorization_id");
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      const next = location.pathname + location.searchStr;
      throw redirect({ to: "/auth", search: { next } });
    }
  },
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id")!;
    const { data, error } = await oauthNs().getAuthorizationDetails(authorizationId);
    if (error) throw new Error(error.message);
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) {
      window.location.href = immediate;
      return data;
    }
    return data;
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <main className="min-h-screen grid place-items-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-lg font-semibold">Authorization error</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {String((error as Error)?.message ?? error)}
        </p>
      </div>
    </main>
  ),
});

function Consent() {
  const details = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clientName = details?.client?.name ?? "an app";

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const { data, error } = approve
      ? await oauthNs().approveAuthorization(authorization_id)
      : await oauthNs().denyAuthorization(authorization_id);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  }

  return (
    <main className="min-h-screen grid place-items-center px-4 py-24">
      <div className="w-full max-w-md glass hud-corner rounded-2xl p-8 border border-[color:var(--cyan)]/20">
        <div className="mono text-[10px] tracking-[0.24em] text-[var(--cyan)] mb-2">
          MCP · CONNECTION REQUEST
        </div>
        <h1 className="text-xl font-semibold mb-2">
          Connect {clientName} to Mission Control
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          {clientName} will be able to call this app's enabled MCP tools while you are signed in.
          This does not bypass this app's permissions or backend policies.
        </p>

        <div className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm space-y-2 mb-6">
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Share your basic profile</span>
            <span className="text-foreground/80">Yes</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Share your email</span>
            <span className="text-foreground/80">Yes</span>
          </div>
        </div>

        {error && <p role="alert" className="text-sm text-red-400 mb-4">{error}</p>}

        <div className="flex gap-2">
          <button
            disabled={busy}
            onClick={() => decide(false)}
            className="flex-1 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 px-4 py-2.5 text-sm disabled:opacity-50"
          >
            Cancel connection
          </button>
          <button
            disabled={busy}
            onClick={() => decide(true)}
            className="flex-1 rounded-lg bg-gradient-to-br from-[var(--cyan)] to-[var(--electric)] text-background px-4 py-2.5 text-sm font-medium disabled:opacity-50"
          >
            {busy ? "…" : "Approve"}
          </button>
        </div>
      </div>
    </main>
  );
}
