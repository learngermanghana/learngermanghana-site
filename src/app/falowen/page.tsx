import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { LINKS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Falowen | Learn German & French in Ghana & Nigeria",
  description:
    "Discover Falowen, the modern language-learning platform (German & French) trusted in Ghana and Nigeria. Study online or in-person, practice with the app, and prepare for Goethe and DELF exams with expert tutors.",
  openGraph: {
    title: "Falowen | Learn German & French in Ghana & Nigeria",
    description:
      "Discover Falowen, the modern language-learning platform (German & French) trusted in Ghana and Nigeria. Study online or in-person, practice with the app, and prepare for Goethe and DELF exams with expert tutors.",
  },
};

export default function FalowenPage() {
  return (
    <Container>
      <section className="py-12 sm:py-16">
        <SectionTitle
          title="Falowen: The right place to learn German & French in Ghana & Nigeria"
          subtitle="A modern language-learning platform (German & French) backed by the Learn Language Education Academy — with structured classes, app practice, and real exam readiness."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl border border-black/10 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-semibold">Why Falowen works for Ghana & Nigeria</h2>
              <p className="mt-3 text-neutral-700 leading-7">
                Falowen is built for learners in West Africa who want a clear path to German or French fluency. We
                combine structured lessons, guided assignments, and community support with the flexibility of a
                mobile-friendly learning app. Whether you are studying in Accra, Kumasi, Lagos, or Abuja, you can
                access the same quality language instruction, live classes, and practice tools.
              </p>
              <p className="mt-4 text-neutral-700 leading-7">
                The platform is trusted by students of the <span className="font-semibold">{SITE.brand}</span>, a
                German school in Ghana known for helping learners pass Goethe exams and build real speaking confidence.
              </p>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-semibold">What you get on Falowen</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 text-sm text-neutral-700">
                {[
                  "Online + in-person classes that fit busy schedules.",
                  "Grammar, speaking, listening, and writing practice in one place.",
                  "Structured learning paths (A1–B2 for German; A1 for French).",
                  "Goethe and DELF exam preparation with feedback from tutors.",
                  "Progress tracking to keep you motivated and consistent.",
                  "Easy enrollment, tuition visibility, and class reminders.",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-2 w-2 rounded-full bg-brand-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-semibold">Learning German & French in Ghana & Nigeria</h2>
              <p className="mt-3 text-neutral-700 leading-7">
                Demand for German and French language skills is growing across Ghana and Nigeria. Falowen connects you
                with qualified tutors, clear study plans, and the support you need to prepare for language proficiency
                exams. You can join from anywhere, attend live lessons, and practice daily in the app for steady
                progress.
              </p>
              <div className="mt-4 rounded-2xl bg-neutral-50 p-4 ring-1 ring-black/5">
                <div className="text-sm font-semibold">Ideal for learners who want:</div>
                <ul className="mt-2 space-y-2 text-sm text-neutral-700">
                  <li>• German or French for study abroad, visas or relocation planning.</li>
                  <li>• A structured path from beginner to intermediate levels.</li>
                  <li>• A supportive learning community with real accountability.</li>
                </ul>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Start learning today</h3>
              <p className="mt-3 text-sm text-neutral-700">
                Create your Falowen account and explore available classes, schedules, and tuition in one place.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href={LINKS.falowen}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl bg-brand-950 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-900"
                >
                  Go to Falowen
                </a>
                <a
                  href="https://register.falowen.app/french"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold hover:bg-neutral-50"
                >
                  Sign up for French A1
                </a>
                <Link
                  href="/classes"
                  className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold hover:bg-neutral-50"
                >
                  View upcoming classes
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Trusted by local learners</h3>
              <p className="mt-3 text-sm text-neutral-700">
                Falowen powers the German learning experience for students across Ghana and Nigeria with direct
                support from the Learn Language Education Academy team.
              </p>
              <div className="mt-4 text-xs text-neutral-500">
                Location: {SITE.location} • Online classes available everywhere.
              </div>
            </div>
          </aside>
        </div>
      </section>
    </Container>
  );
}
