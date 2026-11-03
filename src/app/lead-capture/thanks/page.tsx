import type { Metadata } from "next";
import { Suspense } from "react";
import LeadCaptureThanksClient from "./LeadCaptureThanksClient";
export const metadata: Metadata = { robots: { index: false, follow: false } };
export default function LeadCaptureThanksPage() {
  return <Suspense fallback={<div className="mx-auto max-w-5xl px-6 py-16">Loading confirmation…</div>}>
    <LeadCaptureThanksClient />
  </Suspense>;
}
