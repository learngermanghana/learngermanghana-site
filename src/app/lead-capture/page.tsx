import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { SectionTitle } from "@/components/SectionTitle";
import { LINKS, WHATSAPP_LINK } from "@/lib/site";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

type LeadCaptureSearchParams = {
  intent?: string;
  next?: string;
  source?: string;
};

function getIntentDetails(intent?: string) {
  switch (intent) {
    case "placement-test":
      return {
        label: "Placement test",
        description: "Tell us your details so we can guide you before you take the test.",
        next: LINKS.placementTest,
        nextLabel: "Continue to placement test",
      };
    case "talk-to-us":
      return {
        label: "Talk to us",
        description: "Share your details and we will reach out with the best next step.",
        next: WHATSAPP_LINK,
        nextLabel: "Chat on WhatsApp",
      };
    case "register":
    default:
      return {
        label: "Register",
        description: "Share your details so we can guide your registration and class choice.",
        next: WHATSAPP_LINK,
        nextLabel: "Chat on WhatsApp",
      };
  }
}

export default function LeadCapturePage({
  searchParams,
}: {
  searchParams?: LeadCaptureSearchParams;
}) {
  const intentDetails = getIntentDetails(searchParams?.intent);
  const nextLink = searchParams?.next ?? intentDetails.next;
  const intent = searchParams?.intent ?? "register";

  return (
    <Container>
      <section className="py-12 sm:py-16">
        <SectionTitle
          title={`Lead capture · ${intentDetails.label}`}
          subtitle={intentDetails.description}
        />

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <LeadCaptureForm
            intent={intent}
            intentLabel={intentDetails.label}
            source={searchParams?.source}
            defaultNextLink={nextLink}
            nextLabel={intentDetails.nextLabel}
          />

          <div className="rounded-3xl border border-black/10 bg-neutral-50 p-6 text-sm text-neutral-700 shadow-sm">
            <div className="text-base font-semibold text-neutral-900">What happens next</div>
            <ul className="mt-4 space-y-3">
              <li>• Our team reviews your details and confirms the right level.</li>
              <li>• We share class schedules, start dates, and payment steps.</li>
              <li>• We continue your registration with you on WhatsApp.</li>
            </ul>

            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900">
              Need immediate help? You can still reach us on WhatsApp after you submit this form.
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
