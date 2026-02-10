import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { CTA, LINKS, WHATSAPP_LINK } from "@/lib/site";

type LeadCaptureThanksParams = {
  intent?: string;
  next?: string;
  wa?: string;
};

function getThanksCopy(intent?: string) {
  switch (intent) {
    case "placement-test":
      return {
        title: "Thanks! Your details are in.",
        subtitle: "You can now continue to the placement test or ask our team for help.",
        actionLabel: "Continue to placement test",
        fallback: LINKS.placementTest,
      };
    case "talk-to-us":
      return {
        title: "Thanks! We will reach out shortly.",
        subtitle: "If you need urgent support, chat with us on WhatsApp now.",
        actionLabel: "Chat on WhatsApp",
        fallback: WHATSAPP_LINK,
      };
    case "register":
    default:
      return {
        title: "Thanks! We have received your details.",
        subtitle: "Use the link below to continue your registration with us on WhatsApp.",
        actionLabel: "Chat on WhatsApp",
        fallback: WHATSAPP_LINK,
      };
  }
}

export default function LeadCaptureThanksPage({
  searchParams,
}: {
  searchParams?: LeadCaptureThanksParams;
}) {
  const thanksCopy = getThanksCopy(searchParams?.intent);
  const nextLink = searchParams?.wa ?? searchParams?.next ?? thanksCopy.fallback;

  return (
    <Container>
      <section className="py-12 sm:py-16">
        <SectionTitle title={thanksCopy.title} subtitle={thanksCopy.subtitle} />

        <div className="flex flex-col gap-4 rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-neutral-700">
            We&apos;ll follow up with schedules, level placement guidance, and the right study mode.
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={nextLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-brand-950 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-900"
            >
              {thanksCopy.actionLabel}
            </a>
            <Link
              href={CTA.primary.href}
              className="inline-flex items-center justify-center rounded-2xl border border-black/10 px-5 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
            >
              Submit another lead
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
}
