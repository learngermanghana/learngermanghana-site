"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";

import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";

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

export function TravelPageClient() {
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

  const whatsappUrl = `https://api.whatsapp.com/send?phone=4917620721491&text=${encodeURIComponent(
    whatsappMessage
  )}`;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="bg-neutral-50">
      <Container>
        <section className="py-12 sm:py-16">
          <SectionTitle
            title="Visa Assessment & Booking"
            subtitle="Are you applying for Ausbildung, a tourist visa, or university admission? Complete this Visa Assessment / Booking Form and send it directly to us on WhatsApp so we can understand your plans, review your timeline, and guide you on the next steps."
          />

          <div className="mx-auto mb-6 grid max-w-3xl gap-4 rounded-3xl border border-black/10 bg-white p-5 shadow-sm sm:grid-cols-[180px,1fr] sm:items-center sm:p-6">
            <div className="overflow-hidden rounded-2xl bg-neutral-100">
              <Image
                src="https://raw.githubusercontent.com/learngermanghana/learngermanghana-site/master/photos/2025-07-02.jpg"
                alt="Hana, education and travel expert based in Germany"
                width={500}
                height={500}
                className="h-48 w-full object-contain bg-neutral-100 p-1 sm:h-44"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-neutral-900">Meet Hana</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-700">
                Hello, I am Hana, an education and travel expert based in Germany. Are you interested in studying,
                relocating, or traveling with the right support? Fill the form and we will review your plan and guide
                you on the next steps.
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-3xl rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3 text-sm text-neutral-700">
              Fill this form and send directly to WhatsApp. We&apos;ll respond with requirements and next steps.
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 sm:col-span-2">
                <span className="text-sm font-medium text-neutral-800">Full Name</span>
                <input
                  required
                  type="text"
                  value={form.fullName}
                  onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-200"
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
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-200"
                  placeholder="e.g. +233 XX XXX XXXX"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-neutral-800">Purpose</span>
                <select
                  required
                  value={form.purpose}
                  onChange={(event) => setForm((prev) => ({ ...prev, purpose: event.target.value }))}
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-200"
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
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-200"
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
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-200"
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
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-200"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-neutral-800">Budget (optional)</span>
                <input
                  type="text"
                  value={form.budget}
                  onChange={(event) => setForm((prev) => ({ ...prev, budget: event.target.value }))}
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-200"
                  placeholder="Your budget range"
                />
              </label>

              <label className="flex flex-col gap-2 sm:col-span-2">
                <span className="text-sm font-medium text-neutral-800">Notes (documents, background, questions)</span>
                <textarea
                  rows={4}
                  value={form.notes}
                  onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-200"
                  placeholder="Share any useful information"
                />
              </label>

              <button
                type="submit"
                className="sm:col-span-2 inline-flex w-full items-center justify-center rounded-2xl bg-neutral-900 bg-brand-950 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-neutral-800 hover:bg-brand-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-brand-300"
              >
                Send to WhatsApp
              </button>
            </form>
          </div>
        </section>
      </Container>
    </div>
  );
}
