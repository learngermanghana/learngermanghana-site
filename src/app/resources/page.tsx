import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { SEORelatedLinks } from "@/components/SEORelatedLinks";
import Link from "next/link";
import { CTA, LINKS } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "German Learning Tools & Resources",
  description:
    "Explore placement tools, exam prep resources, and practice support to improve your German learning path.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <div className="bg-neutral-50">
      <Container>
        <section className="py-12 sm:py-16">
          <SectionTitle
            title="Learning Resources"
            subtitle="Use these tools to guide your study plan, practice daily, and prepare for exams."
          />

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="text-base font-semibold text-neutral-900">Placement test</div>
              <p className="mt-3 text-sm text-neutral-700">
                Find your level and get a recommended learning path in minutes.
              </p>
              <Link
                href="/lead-capture?intent=placement-test&source=resources"
                className="mt-4 inline-flex text-sm font-semibold text-brand-950 hover:underline"
              >
                Take the placement test →
              </Link>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="text-base font-semibold text-neutral-900">Falowen practice hub</div>
              <p className="mt-3 text-sm text-neutral-700">
                Access daily exercises, class recordings, and AI study support on Falowen.
              </p>
              <a
                href={LINKS.falowen}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex text-sm font-semibold text-brand-950 hover:underline"
              >
                Open Falowen →
              </a>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="text-base font-semibold text-neutral-900">Exam prep checklist</div>
              <p className="mt-3 text-sm text-neutral-700">
                Focus on speaking, writing, and listening tasks that match Goethe exam expectations.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                <li>• Weekly mock speaking sessions.</li>
                <li>• Timed reading and listening practice.</li>
                <li>• Writing templates and feedback rounds.</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <div className="text-base font-semibold text-neutral-900">Need a full study plan?</div>
            <p className="mt-2 text-sm text-neutral-700">
              Register on Falowen to receive your study schedule and start your learning journey with tutor support.
            </p>
            <a
              href={CTA.primary.href}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-2xl bg-brand-950 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900"
            >
              {CTA.primary.label}
            </a>
          </div>

          <SEORelatedLinks />
        </section>
      </Container>
    </div>
  );
}
