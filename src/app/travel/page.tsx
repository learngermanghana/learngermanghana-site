"use client";

import { FormEvent, useMemo, useState } from "react";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { SITE } from "@/lib/site";

type FormData = {
  fullName: string;
  phone: string;
  purpose: string;
  destination: string;
  visaType: string;
  travelDate: string;
  budget: string;
  notes: string;
};

const initialForm: FormData = {
  fullName: "",
  phone: "",
  purpose: "Ausbildung",
  destination: "Germany",
  visaType: "",
  travelDate: "",
  budget: "",
  notes: "",
};

export default function TravelPage() {
  const [form, setForm] = useState<FormData>(initialForm);

  const whatsappMessage = useMemo(() => {
    const lines = [
      "*Visa Assessment / Booking Form*",
      `Full Name: ${form.fullName || "-"}`,
      `Phone / WhatsApp Number: ${form.phone || "-"}`,
      `Purpose: ${form.purpose || "-"}`,
      `Destination Country / Package: ${form.destination || "-"}`,
      `Visa Type: ${form.visaType || "-"}`,
      `Preferred Travel Date: ${form.travelDate || "-"}`,
      `Budget: ${form.budget || "-"}`,
      `Notes: ${form.notes || "-"}`,
    ];

    return lines.join("\n");
  }, [form]);

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${SITE.phoneIntl}&text=${encodeURIComponent(
    whatsappMessage
  )}`;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <Container>
      <section className="py-12 sm:py-16">
        <SectionTitle
          title="Travel Services"
          subtitle="Applying for Ausbildung, tourist visa, or university admission? Complete this Visa Assessment / Booking Form and send it directly to us on WhatsApp."
        />

        <div className="mx-auto mb-6 max-w-3xl rounded-3xl border border-brand-100 bg-brand-50/60 p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-brand-950">Looking for professional travel advice?</h2>
          <p className="mt-2 text-sm leading-6 text-neutral-700">
            Our team helps you choose the right visa pathway, prepare documents, and avoid common mistakes.
            Fill this short assessment and send directly to WhatsApp. We&apos;ll reply with requirements and your next steps.
          </p>
        </div>

        <div className="mx-auto max-w-3xl rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 sm:col-span-2">
              <span className="text-sm font-medium text-neutral-800">Full Name</span>
              <input
                required
                type="text"
                value={form.fullName}
                onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
                className="rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-700"
                placeholder="Enter your full name"
              />
            </label>

            <label className="flex flex-col gap-2 sm:col-span-2">
              <span className="text-sm font-medium text-neutral-800">Phone / WhatsApp Number</span>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                className="rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-700"
                placeholder="e.g. +233 XX XXX XXXX"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-neutral-800">Purpose</span>
              <select
                required
                value={form.purpose}
                onChange={(event) => setForm((prev) => ({ ...prev, purpose: event.target.value }))}
                className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-brand-700"
              >
                <option>Ausbildung</option>
                <option>Tourist Visa</option>
                <option>University Admission</option>
                <option>Other</option>
              </select>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-neutral-800">Destination Country / Package</span>
              <input
                required
                type="text"
                value={form.destination}
                onChange={(event) => setForm((prev) => ({ ...prev, destination: event.target.value }))}
                className="rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-700"
                placeholder="Germany / Europe Tour / etc."
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-neutral-800">Visa Type</span>
              <input
                required
                type="text"
                value={form.visaType}
                onChange={(event) => setForm((prev) => ({ ...prev, visaType: event.target.value }))}
                className="rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-700"
                placeholder="e.g. Student, Work, Tourist"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-neutral-800">Preferred Travel Date</span>
              <input
                required
                type="date"
                value={form.travelDate}
                onChange={(event) => setForm((prev) => ({ ...prev, travelDate: event.target.value }))}
                className="rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-700"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-neutral-800">Budget (optional)</span>
              <input
                type="text"
                value={form.budget}
                onChange={(event) => setForm((prev) => ({ ...prev, budget: event.target.value }))}
                className="rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-700"
                placeholder="Your budget range"
              />
            </label>

            <label className="flex flex-col gap-2 sm:col-span-2">
              <span className="text-sm font-medium text-neutral-800">Notes (documents, background, questions)</span>
              <textarea
                rows={4}
                value={form.notes}
                onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
                className="rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-700"
                placeholder="Share any useful information"
              />
            </label>

            <div className="sm:col-span-2 sticky bottom-3">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-md hover:brightness-95"
              >
                Send Assessment to WhatsApp
              </button>
            </div>
          </form>
        </div>
      </section>
    </Container>
  );
}
