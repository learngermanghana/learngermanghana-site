"use client";

import { useMemo, useState } from "react";

import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { LINKS, WHATSAPP_LINK } from "@/lib/site";
import { FAQ_ENTRIES } from "@/data/faq";

function FAQItem({ q, a }: { q: string; a: React.ReactNode }) {
  return (
    <details className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
      <summary className="cursor-pointer font-semibold text-neutral-900">{q}</summary>
      <div className="mt-3 text-sm text-neutral-700 leading-6">{a}</div>
    </details>
  );
}

export default function FAQPage() {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const groupedEntries = useMemo(() => {
    const filtered = FAQ_ENTRIES.filter((entry) => {
      if (!normalizedQuery) return true;
      const haystack = [entry.question, entry.category, ...entry.keywords].join(" ").toLowerCase();
      return haystack.includes(normalizedQuery);
    });

    return filtered.reduce<Record<string, typeof FAQ_ENTRIES>>((acc, entry) => {
      if (!acc[entry.category]) {
        acc[entry.category] = [];
      }
      acc[entry.category].push(entry);
      return acc;
    }, {});
  }, [normalizedQuery]);

  const categoryOrder = [
    "Pricing",
    "Enrollment",
    "Schedule",
    "Classes & Format",
    "Exams & Certificates",
    "Support",
  ];

  const visibleCategories = categoryOrder.filter((category) => groupedEntries[category]?.length);

  return (
    <Container>
      <section className="py-12 sm:py-16">
        <SectionTitle
          title="FAQ"
          subtitle="Quick answers about enrollment, access, payments, certificates, and results."
        />

        <div className="mt-6">
          <label className="text-sm font-semibold text-neutral-800" htmlFor="faq-search">
            Search the FAQ
          </label>
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Type a keyword like pricing, Goethe, or schedule"
            className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-950/30"
          />
        </div>

        <div className="mt-8 space-y-8">
          {visibleCategories.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-black/10 bg-neutral-50 p-6 text-sm text-neutral-700">
              No matching answers yet. Try another keyword or contact support below.
            </div>
          ) : (
            visibleCategories.map((category) => (
              <section key={category} className="space-y-3">
                <h2 className="text-lg font-semibold text-neutral-900">{category}</h2>
                <div className="grid gap-3">
                  {groupedEntries[category].map((entry) => (
                    <FAQItem key={entry.question} q={entry.question} a={entry.answer} />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>

        <div className="mt-10">
          <p className="text-sm text-neutral-700">
            Still need help? Reach out via email or WhatsApp and we will reply as soon as possible.
          </p>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <a
            href={LINKS.falowen}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-2xl bg-brand-950 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-900"
          >
            Enroll on Falowen
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold hover:bg-neutral-50"
          >
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </Container>
  );
}
