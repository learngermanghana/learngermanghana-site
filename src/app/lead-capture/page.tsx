import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { LINKS, SITE, WHATSAPP_LINK } from "@/lib/site";

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
        next: LINKS.register,
        nextLabel: "Continue to registration",
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
  const nextUrl = `${LINKS.mainWebsite}/lead-capture/thanks?intent=${
    searchParams?.intent ?? "register"
  }&next=${encodeURIComponent(nextLink)}`;

  return (
    <Container>
      <section className="py-12 sm:py-16">
        <SectionTitle
          title={`Lead capture · ${intentDetails.label}`}
          subtitle={intentDetails.description}
        />

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <form
            action={`https://formsubmit.co/${SITE.email}`}
            method="POST"
            className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm"
          >
            <input type="hidden" name="_subject" value={`New lead: ${intentDetails.label}`} />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value={nextUrl} />
            <input type="hidden" name="Intent" value={intentDetails.label} />
            {searchParams?.source ? (
              <input type="hidden" name="Source" value={searchParams.source} />
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium text-neutral-700">
                Full name
                <input
                  name="Name"
                  required
                  className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-2 text-sm"
                  placeholder="Your name"
                />
              </label>

              <label className="text-sm font-medium text-neutral-700">
                Phone / WhatsApp
                <input
                  name="Phone"
                  required
                  className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-2 text-sm"
                  placeholder="+233..."
                />
              </label>

              <label className="text-sm font-medium text-neutral-700">
                Email
                <input
                  type="email"
                  name="Email"
                  required
                  className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-2 text-sm"
                  placeholder="you@example.com"
                />
              </label>

              <label className="text-sm font-medium text-neutral-700">
                Level interest
                <select
                  name="Level interest"
                  required
                  className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-2 text-sm"
                >
                  <option value="">Select a level</option>
                  <option value="A1">A1 (Beginner)</option>
                  <option value="A2">A2</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                  <option value="C1">C1</option>
                  <option value="Not sure">Not sure</option>
                </select>
              </label>

              <label className="text-sm font-medium text-neutral-700">
                Preferred mode
                <select
                  name="Preferred mode"
                  required
                  className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-2 text-sm"
                >
                  <option value="">Select a mode</option>
                  <option value="Online">Online</option>
                  <option value="In-person">In-person</option>
                  <option value="Hybrid">Hybrid (online + in-person)</option>
                  <option value="Not sure">Not sure</option>
                </select>
              </label>

              <label className="text-sm font-medium text-neutral-700">
                Preferred start date
                <input
                  type="date"
                  name="Preferred start"
                  required
                  className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-2 text-sm"
                />
              </label>
            </div>

            <label className="mt-4 block text-sm font-medium text-neutral-700">
              Notes (optional)
              <textarea
                name="Notes"
                className="mt-2 min-h-[110px] w-full rounded-2xl border border-black/10 px-4 py-2 text-sm"
                placeholder="Anything else you'd like us to know?"
              />
            </label>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-2xl bg-brand-950 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-900"
              >
                Submit and continue
              </button>
              <a
                href={nextLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl border border-black/10 px-5 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
              >
                {intentDetails.nextLabel}
              </a>
            </div>

            <p className="mt-4 text-xs text-neutral-500">
              We only use your details to contact you about classes and enrollment support.
            </p>
          </form>

          <div className="rounded-3xl border border-black/10 bg-neutral-50 p-6 text-sm text-neutral-700 shadow-sm">
            <div className="text-base font-semibold text-neutral-900">What happens next</div>
            <ul className="mt-4 space-y-3">
              <li>• Our team reviews your details and confirms the right level.</li>
              <li>• We share class schedules, start dates, and payment steps.</li>
              <li>• You receive the direct link to register on Falowen.</li>
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
