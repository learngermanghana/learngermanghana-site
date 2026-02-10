"use client";

import { useMemo, useState } from "react";
import { LINKS, SITE, WHATSAPP_LINK } from "@/lib/site";

type LeadCaptureFormProps = {
  intent: string;
  intentLabel: string;
  source?: string;
  defaultNextLink: string;
  nextLabel: string;
};

function buildLeadWhatsAppLink({
  intent,
  name,
  phone,
  email,
  level,
  mode,
  start,
  notes,
  source,
}: {
  intent: string;
  name?: string;
  phone?: string;
  email?: string;
  level?: string;
  mode?: string;
  start?: string;
  notes?: string;
  source?: string;
}) {
  const messageLines = [
    "Hello Learn Language Education Academy 👋",
    "I filled the Talk to Us form.",
    `Intent: ${intent || "Talk to us"}`,
    `Name: ${name || "Not shared"}`,
    `Phone/WhatsApp: ${phone || "Not shared"}`,
    `Email: ${email || "Not shared"}`,
    `Level interest: ${level || "Not shared"}`,
    `Preferred mode: ${mode || "Not shared"}`,
    `Preferred start date: ${start || "Not shared"}`,
    `Notes: ${notes || "None"}`,
    `Source: ${source || "Website"}`,
  ];

  return `https://api.whatsapp.com/send?phone=${SITE.phoneIntl}&text=${encodeURIComponent(messageLines.join("\n"))}`;
}

export function LeadCaptureForm({ intent, intentLabel, source, defaultNextLink, nextLabel }: LeadCaptureFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState("");
  const [mode, setMode] = useState("");
  const [start, setStart] = useState("");
  const [notes, setNotes] = useState("");

  const whatsappLink = useMemo(
    () =>
      buildLeadWhatsAppLink({
        intent: intentLabel,
        name,
        phone,
        email,
        level,
        mode,
        start,
        notes,
        source,
      }),
    [email, intentLabel, level, mode, name, notes, phone, source, start],
  );

  const nextUrl = useMemo(() => {
    const params = new URLSearchParams({
      intent,
      next: defaultNextLink,
      wa: whatsappLink,
    });

    if (source) {
      params.set("source", source);
    }

    return `${LINKS.mainWebsite}/lead-capture/thanks?${params.toString()}`;
  }, [defaultNextLink, intent, source, whatsappLink]);

  return (
    <form action={`https://formsubmit.co/${SITE.email}`} method="POST" className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
      <input type="hidden" name="_subject" value={`New lead: ${intentLabel}`} />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value={nextUrl} />
      <input type="hidden" name="Intent" value={intentLabel} />
      {source ? <input type="hidden" name="Source" value={source} /> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-neutral-700">
          Full name
          <input
            name="Name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-2 text-sm"
            placeholder="Your name"
          />
        </label>

        <label className="text-sm font-medium text-neutral-700">
          Phone / WhatsApp
          <input
            name="Phone"
            required
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
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
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-2 text-sm"
            placeholder="you@example.com"
          />
        </label>

        <label className="text-sm font-medium text-neutral-700">
          Level interest
          <select
            name="Level interest"
            required
            value={level}
            onChange={(event) => setLevel(event.target.value)}
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
            value={mode}
            onChange={(event) => setMode(event.target.value)}
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
            value={start}
            onChange={(event) => setStart(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-2 text-sm"
          />
        </label>
      </div>

      <label className="mt-4 block text-sm font-medium text-neutral-700">
        Notes (optional)
        <textarea
          name="Notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
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
          href={whatsappLink || WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-2xl border border-black/10 px-5 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
        >
          {nextLabel}
        </a>
      </div>

      <p className="mt-4 text-xs text-neutral-500">We only use your details to contact you about classes and enrollment support.</p>
    </form>
  );
}
