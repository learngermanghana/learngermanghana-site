import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { SEORelatedLinks } from "@/components/SEORelatedLinks";
import { WHATSAPP_LINK } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Travel & Visa Checklist for Germany",
  description:
    "Use this travel and visa preparation checklist to organize documents, timelines, and language requirements.",
  path: "/travel-checklist",
});

const checklist = [
  {
    title: "Documents to prepare",
    items: [
      "Valid passport with at least 6 months remaining.",
      "Birth certificate and national ID.",
      "Academic certificates (WASSCE, diploma, or degree).",
      "Proof of funds or sponsor documents.",
      "German language certificate where required (Goethe or TELC).",
    ],
  },
  {
    title: "Visa planning steps",
    items: [
      "Confirm your visa type (Ausbildung, study, tourist, or work).",
      "Check language requirements for your chosen pathway.",
      "Collect translated and notarized documents if needed.",
      "Book your embassy appointment early.",
      "Prepare for visa interview questions.",
    ],
  },
  {
    title: "Timeline tips",
    items: [
      "Give yourself 3–6 months for language and document preparation.",
      "Start Goethe exam registration early to secure a slot.",
      "Keep digital copies of all documents in one folder.",
    ],
  },
];

export default function TravelChecklistPage() {
  return (
    <div className="bg-neutral-50">
      <Container>
        <section className="py-12 sm:py-16">
          <SectionTitle
            title="Travel & Visa Checklist"
            subtitle="A step-by-step checklist to help you prepare documents, language requirements, and timelines."
          />

          <div className="grid gap-4 lg:grid-cols-3">
            {checklist.map((section) => (
              <div key={section.title} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
                <div className="text-base font-semibold text-neutral-900">{section.title}</div>
                <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                  {section.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-black/10 bg-white p-6 text-sm text-neutral-700 shadow-sm">
            <div className="text-base font-semibold text-neutral-900">Need a visa assessment?</div>
            <p className="mt-2">
              Complete the visa assessment form and send it to our team for personalized guidance.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <a
                href="/travel"
                className="inline-flex items-center justify-center rounded-2xl bg-brand-950 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900"
              >
                Open visa assessment form
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>

          <SEORelatedLinks />
        </section>
      </Container>
    </div>
  );
}
