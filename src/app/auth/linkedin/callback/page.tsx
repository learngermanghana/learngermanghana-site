import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkedIn OAuth Callback",
  robots: {
    index: false,
    follow: false,
  },
};

type CallbackPageProps = {
  searchParams?: Promise<{
    code?: string;
    state?: string;
    error?: string;
    error_description?: string;
  }>;
};

export default async function LinkedInCallbackPage({ searchParams }: CallbackPageProps) {
  const params = (await searchParams) ?? {};
  const hasCode = Boolean(params.code);
  const callbackHosts = [
    "https://learngermanghana.com/auth/linkedin/callback",
    "https://www.learngermanghana.com/auth/linkedin/callback",
  ];

  return (
    <main className="mx-auto max-w-2xl px-6 py-16 text-neutral-900">
      <h1 className="text-2xl font-bold">LinkedIn OAuth callback received</h1>
      <p className="mt-3 text-sm text-neutral-700">This page is used as the LinkedIn redirect URL.</p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-700">
        {callbackHosts.map((host) => (
          <li key={host}>
            <span className="rounded bg-neutral-100 px-2 py-1 font-mono text-xs">{host}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-neutral-700">
        Register the exact hostname you use during OAuth. If your login starts on <span className="font-mono text-xs">www</span>, make sure the
        <span className="mx-1 rounded bg-neutral-100 px-2 py-1 font-mono text-xs">www</span>
        callback is also allowed in your LinkedIn app settings.
      </p>

      {params.error ? (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm">
          <div className="font-semibold text-red-800">Authorization failed</div>
          <div className="mt-1 text-red-700">{params.error_description ?? params.error}</div>
        </div>
      ) : hasCode ? (
        <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
          <div className="font-semibold">Authorization code captured.</div>
          <div className="mt-1">Exchange this code on your server for a LinkedIn access token.</div>
        </div>
      ) : (
        <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <div className="font-semibold">No authorization code in query string yet.</div>
          <div className="mt-1">Start the LinkedIn OAuth flow and return here with <span className="font-mono">?code=...</span>.</div>
        </div>
      )}

      <div className="mt-6 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-xs text-neutral-700">
        <div className="font-semibold text-neutral-900">Debug query values</div>
        <pre className="mt-2 overflow-x-auto whitespace-pre-wrap">{JSON.stringify({
          hasCode,
          state: params.state ?? null,
          error: params.error ?? null,
        }, null, 2)}</pre>
      </div>
    </main>
  );
}
