import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import Link from "next/link";
import { CTA, LINKS } from "@/lib/site";

export default function PlacementTestPage() {
  return (
    <div className="bg-neutral-50">
      <Container>
        <section className="py-12 sm:py-16">
          <SectionTitle
            title="Find Your Level"
            subtitle="Take the Falowen placement test to match your level, class format, and study plan."
          />

          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="text-base font-semibold text-neutral-900">How the placement test helps</div>
              <ul className="mt-4 space-y-3 text-sm text-neutral-700">
                <li>• Discover the right CEFR level (A1–C1) in under 15 minutes.</li>
                <li>• Get a recommended class format: hybrid, self-learning, or weekend options.</li>
                <li>• Receive a study focus area (speaking, writing, or exam preparation).</li>
                <li>• Start the right class with confidence and a clear learning plan.</li>
              </ul>

              <Link
                href="/lead-capture?intent=placement-test&source=placement-page"
                className="mt-6 inline-flex items-center justify-center rounded-2xl bg-brand-950 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-900"
              >
                Share details &amp; start test
              </Link>

              <a
                href={LINKS.placementTest}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex text-sm font-semibold text-brand-950 hover:underline"
              >
                Already submitted? Go to the test →
              </a>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="text-base font-semibold text-neutral-900">What you will need</div>
              <ul className="mt-4 space-y-3 text-sm text-neutral-700">
                <li>• 15 minutes of quiet time.</li>
                <li>• Your phone or laptop with internet access.</li>
                <li>• Basic comfort with reading and listening questions.</li>
              </ul>

              <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                If you prefer guidance, chat with our team and we will help you choose the right class.
              </div>

              <Link
                href={CTA.help.href}
                className="mt-4 inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
