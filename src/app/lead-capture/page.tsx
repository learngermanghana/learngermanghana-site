"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { LINKS, SITE } from "@/lib/site";

type LeadCaptureSearchParams = {
  intent?: string;
  next?: string;
  source?: string;
};

type LeadCaptureForm = {
  name: string;
  phone: string;
  email: string;
  levelInterest: string;
  preferredMode: string;
  preferredStart: string;
  notes: string;
};

const initialForm: LeadCaptureForm = {
  name: "",
  phone: "",
  email: "",
  levelInterest: "",
  preferredMode: "",
  preferredStart: "",
  notes: "",
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
        next: `https://api.whatsapp.com/send?phone=${SITE.phoneIntl}`,
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
  const router = useRouter();
  const [form, setForm] = useState<LeadCaptureForm>(initialForm);
  const intentDetails = getIntentDetails(searchParams?.intent);
  const nextLink = searchParams?.next ?? intentDetails.next;
  const nextUrl = `${LINKS.mainWebsite}/lead-capture/thanks?intent=${
    searchParams?.intent ?? "register"
  }&next=${encodeURIComponent(nextLink)}`;

  const whatsappMessage = useMemo(() => {
    const lines = [
      `*Lead Capture · ${intentDetails.label}*`,
      `Name: ${form.name || "-"}`,
      `Phone: ${form.phone || "-"}`,
      `Email: ${form.email || "-"}`,
      `Level interest: ${form.levelInterest || "-"}`,
      `Preferred mode: ${form.preferredMode || "-"}`,
      `Preferred start: ${form.preferredStart || "-"}`,
      `Notes: ${form.notes || "-"}`,
      `Source: ${searchParams?.source ?? "website"}`,
    ];

    return lines.join("\n");
  }, [form, intentDetails.label, searchParams?.source]);

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${SITE.phoneIntl}&text=${encodeURIComponent(
    whatsappMessage
  )}`;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    router.push(nextUrl);
  }

  return (
    <Container>
      <section className="py-12 sm:py-16">
        <SectionTitle
          title={`Lead capture · ${intentDetails.label}`}
          subtitle={intentDetails.description}
        />

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium text-neutral-700">
                Full name
                <input
                  required
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-2 text-sm"
                  placeholder="Your name"
                />
              </label>

              <label className="text-sm font-medium text-neutral-700">
                Phone / WhatsApp
                <input
                  required
                  value={form.phone}
                  onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-2 text-sm"
                  placeholder="+233..."
                />
              </label>

              <label className="text-sm font-medium text-neutral-700">
                Email
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-2 text-sm"
                  placeholder="you@example.com"
                />
              </label>

              <label className="text-sm font-medium text-neutral-700">
                Level interest
                <select
                  required
                  value={form.levelInterest}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, levelInterest: event.target.value }))
                  }
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
                  required
                  value={form.preferredMode}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, preferredMode: event.target.value }))
                  }
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
                  required
                  value={form.preferredStart}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, preferredStart: event.target.value }))
                  }
                  className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-2 text-sm"
                />
              </label>
            </div>

            <label className="mt-4 block text-sm font-medium text-neutral-700">
              Notes (optional)
              <textarea
                className="mt-2 min-h-[110px] w-full rounded-2xl border border-black/10 px-4 py-2 text-sm"
                placeholder="Anything else you'd like us to know?"
                value={form.notes}
                onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
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
              We&apos;ll send your details to WhatsApp so our team can follow up quickly.
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
