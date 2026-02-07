import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { courses, feeNotes, goetheExamFeesGHS, goetheExamLinks, tuitionFeesGHS } from "@/data/content";
import { CTA, WHATSAPP_LINK } from "@/lib/site";

function formatMoney(amount: number | null) {
  if (!amount) return "Contact us for pricing";
  return `GHS ${amount.toLocaleString("en-GH")}`;
}

export default function PricingPage() {
  return (
    <div className="bg-neutral-50">
      <Container>
        <section className="py-12 sm:py-16">
          <SectionTitle
            title="Pricing & Fees"
            subtitle="See tuition pricing by level, official Goethe exam fees, and what is included in each course."
          />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => {
              const tuition = tuitionFeesGHS[course.level];
              const examFee = goetheExamFeesGHS[course.level];
              const examLink = goetheExamLinks[course.level];

              return (
                <div key={course.level} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
                  <div className="text-sm text-neutral-500">{course.level}</div>
                  <div className="mt-1 text-lg font-semibold text-neutral-900">{course.title}</div>
                  <p className="mt-3 text-sm text-neutral-700">{course.desc}</p>

                  <div className="mt-4 space-y-2 text-sm text-neutral-700">
                    <div>
                      <span className="font-semibold text-neutral-900">Tuition:</span>{" "}
                      {formatMoney(tuition ?? null)}
                    </div>
                    <div>
                      <span className="font-semibold text-neutral-900">Goethe exam fee:</span>{" "}
                      {examFee ? `GHS ${examFee.toLocaleString("en-GH")}` : "Contact Goethe-Institut"}
                    </div>
                  </div>

                  {examLink ? (
                    <a
                      href={examLink.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex text-sm font-semibold text-brand-950 hover:underline"
                    >
                      {examLink.label}
                    </a>
                  ) : (
                    <div className="mt-4 text-sm text-neutral-500">Goethe exam link coming soon.</div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="text-base font-semibold text-neutral-900">What your tuition covers</div>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                <li>• Live classes with certified tutors (hybrid or self-learning as listed).</li>
                <li>• Falowen app access with lesson plans, practice, and progress tracking.</li>
                <li>• Exam preparation support and class recordings where applicable.</li>
                <li>• WhatsApp guidance for registration and onboarding.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="text-base font-semibold text-neutral-900">Notes & reminders</div>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                {feeNotes.map((note) => (
                  <li key={note}>• {note}</li>
                ))}
                <li>• Ask about installment plans when you contact our team.</li>
              </ul>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href={CTA.primary.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl bg-brand-950 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900"
                >
                  {CTA.primary.label}
                </a>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
                >
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
