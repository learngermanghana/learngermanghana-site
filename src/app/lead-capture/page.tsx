import type { Metadata } from "next";
import { Suspense } from "react";
import LeadCaptureClient from "./LeadCaptureClient";
export const metadata: Metadata = { robots: { index: false, follow: true } };
export default function LeadCapturePage() {
  return <Suspense fallback={<div className="mx-auto max-w-5xl px-6 py-16">Loading registration form…</div>}>
    <LeadCaptureClient />
  </Suspense>;
}
