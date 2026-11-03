import type { Metadata } from "next";
import { Suspense } from "react";
import LinkedInCallbackClient from "./LinkedInCallbackClient";
export const metadata: Metadata = {
  title: "LinkedIn OAuth Callback",
  robots: { index: false, follow: false },
};
export default function LinkedInCallbackPage() {
  return <Suspense fallback={<main className="mx-auto max-w-2xl px-6 py-16">Loading authorization result…</main>}>
    <LinkedInCallbackClient />
  </Suspense>;
}
