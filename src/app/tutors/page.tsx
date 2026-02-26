import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { tutors } from "@/data/content";

const tutorHighlights = [
  "Experienced tutors for beginner to upper-intermediate levels.",
  "Exam-focused coaching with practical speaking and writing support.",
  "Friendly guidance and clear feedback to keep your learning consistent.",
];


export const metadata: Metadata = {
  title: "Our Team | German Tutors & Advisors | Learn German Ghana",
  description:
    "Meet our German tutors and consulting partners, including Hana in Germany for global mobility and education advising support.",
  keywords: [
    "German tutors Ghana",
    "learn German team",
    "education advisor Germany",
    "global mobility specialist",
    "Goethe exam preparation tutors",
  ],
  alternates: {
    canonical: "/tutors",
  },
  openGraph: {
    title: "Meet the Learn German Ghana Team",
    description:
      "Discover the tutors and advisors supporting your German learning, exam preparation, and Germany pathway planning.",
    url: "/tutors",
    type: "website",
  },
};

export default function TutorsPage() {
  return (
    <Container>
      <section className="py-12 sm:py-16">
        <SectionTitle title="Team" subtitle="Meet the team supporting your German journey." />

        <div className="mb-8 rounded-3xl border border-black/10 bg-neutral-50 p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-neutral-900">Why students enjoy learning with our team</h2>
          <ul className="mt-4 grid gap-3 text-sm text-neutral-700 sm:grid-cols-3">
            {tutorHighlights.map((highlight) => (
              <li key={highlight} className="rounded-2xl border border-black/10 bg-white p-4 leading-6">
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tutors.map((t) => (
            <article key={t.name} className="flex h-full flex-col rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              {t.photo ? (
                <div className="mb-4 overflow-hidden rounded-2xl bg-neutral-100">
                  <Image
                    src={t.photo}
                    alt={`${t.name} portrait`}
                    width={600}
                    height={480}
                    className={`h-60 w-full ${t.name === "Hana" ? "object-contain bg-neutral-50 p-2" : "object-cover"}`}
                    loading="lazy"
                  />
                </div>
              ) : null}
              <div className="text-lg font-semibold">{t.name}</div>
              <div className="text-sm text-neutral-600">{t.role}</div>
              <p className="mt-3 text-sm leading-6 text-neutral-700">{t.bio}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.specialties.map((s) => (
                  <span key={s} className="rounded-full border border-black/10 bg-neutral-50 px-3 py-1 text-xs text-neutral-700">
                    {s}
                  </span>
                ))}
              </div>
              {t.name === "Hana" ? (
                <Link
                  href="/travel"
                  className="mt-5 inline-flex w-fit items-center rounded-xl bg-brand-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-900"
                >
                  Book appointment now
                </Link>
              ) : null}
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-black/10 bg-white p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-neutral-900">Ready to start learning?</h2>
            <p className="mt-2 text-sm text-neutral-600">
              Contact us for class placement and choose a learning path that fits your goals and schedule.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 sm:mt-0">
            <Button href="/contact">Talk to the team</Button>
            <Button href="/schedule" variant="outline">
              View class schedule
            </Button>
          </div>
        </div>
      </section>
    </Container>
  );
}
