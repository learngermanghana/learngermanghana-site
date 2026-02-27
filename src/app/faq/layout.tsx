import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "German Class FAQ in Ghana",
  description:
    "Answers to common questions about class fees, schedules, enrollment, exams, and online learning options.",
  path: "/faq",
});

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
