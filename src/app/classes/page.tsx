import { Container } from "@/components/Container";
import { upcomingClasses, tuitionFeesGHS, goetheExamFeesGHS } from "@/data/content";
import { formatDatePretty } from "@/lib/date";
import { LINKS, SITE, WHATSAPP_LINK } from "@/lib/site";

function money(amount: number) {
  return `GHS ${amount.toLocaleString("en-GH")}`;
}

function Step({
  n,
  title,
  text,
}: {
  n: number;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl bg-white/10 ring-1 ring-white/15 p-5 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-2xl bg-amber-300 text-neutral-900 font-bold">
          {n}
        </div>
        <div className="text-base font-semibold text-slate-100">{title}</div>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-200/90">{text}</p>
    </div>
  );
}

export default function ClassesPage() {
  return (
    <div className="bg-neutral-50">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-900 to-emerald-950" />
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-amber-300/20 blur-3xl" />
        <div className="absolute -right-40 top-10 h-80 w-80 rounded-full bg-emerald-300/15 blur-3xl" />
        <div className="absolute inset-0 bg-black/35 sm:bg-black/25" />

        <Container>
          <section className="relative py-10 sm:py-14 text-slate-100">
            <div className="inline-flex items-center gap-2 rounded-full bg-black/35 px-4 py-2 text-xs text-slate-100/90 ring-1 ring-white/15">
              <span className="h-2 w-2 rounded-full bg-amber-300" />
              Enrollment • Contract • Support
            </div>

            <div className="mt-6 rounded-[28px] bg-white/12 ring-1 ring-white/20 p-5 sm:p-7 backdrop-blur">
              <h1 className="text-2xl sm:text-4xl font-semibold text-white drop-shadow">
                Upcoming Classes & Enrollment
              </h1>

              <p className="mt-2 text-sm sm:text-base text-white/95 leading-7 drop-shadow">
                <span className="font-semibold">Register inside Falowen.</span> Everything happens inside the
                Falowen app. You will see class dates, tuition, and Goethe exam fees before you pay.
              </p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={LINKS.falowen}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl bg-amber-300 px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-amber-200 shadow-md ring-1 ring-black/10"
              >
                Go to Falowen (Sign up)
              </a>

              <a
                href={LINKS.register}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl bg-white/10 px-6 py-3 text-sm font-semibold text-slate-100 hover:bg-white/15 ring-1 ring-white/25"
              >
                Register / Contract
              </a>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl bg-black/25 px-6 py-3 text-sm font-semibold text-slate-100 hover:bg-black/35 ring-1 ring-white/20"
              >
                WhatsApp help
              </a>
            </div>

            <div className="mt-7 grid gap-4 lg:grid-cols-3">
              <Step
                n={1}
                title="Create an account"
                text="Go to www.falowen.app and tap Sign up."
              />
              <Step
                n={2}
                title="Pick your class"
                text="Open Upcoming Classes to view dates, locations, and prices."
              />
              <Step
                n={3}
                title="Pay online → get access"
                text="Complete payment to receive automatic access right away."
              />
            </div>
          </section>
        </Container>
      </div>

      <Container>
        <section className="pb-14 sm:pb-20 pt-8">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">Upcoming Classes</h2>
          </div>

          <p className="mt-2 text-sm text-neutral-700">
            Tuition covers classes only. Goethe exam fees are paid directly to Goethe-Institut when you are ready
            to sit the exam.
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {upcomingClasses.map((c) => {
              const tuition = tuitionFeesGHS[c.level];
              const examFee = goetheExamFeesGHS[c.level];

              return (
                <div key={c.id} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-black/10 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-800">
                      Level: {c.level}
                    </span>
                    <span className="rounded-full border border-black/10 bg-neutral-50 px-3 py-1 text-xs text-neutral-700">
                      {c.format}
                    </span>
                    <span className="rounded-full border border-black/10 bg-neutral-50 px-3 py-1 text-xs text-neutral-700">
                      {c.duration}
                    </span>
                    <span className="rounded-full border border-black/10 bg-amber-100 px-3 py-1 text-xs font-semibold text-neutral-900">
                      Tuition: {tuition ? money(tuition) : "Check in Falowen"}
                    </span>
                    <span className="rounded-full border border-black/10 bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900">
                      Goethe exam fee: {examFee ? money(examFee) : "Check Goethe"}
                    </span>
                  </div>

                  <div className="mt-3 text-lg font-semibold text-neutral-900">{c.title}</div>

                  <div className="mt-2 text-sm text-neutral-700">
                    <span className="font-semibold">Starts:</span> {formatDatePretty(c.startDate)}
                  </div>

                  <div className="mt-2 text-sm text-neutral-700">
                    Tuition covers classes only. Exams are paid directly to Goethe-Institut.
                  </div>

                  <div className="mt-4 rounded-2xl border border-black/10 bg-neutral-50 p-4">
                    <div className="text-sm font-semibold text-neutral-900">Meeting days</div>
                    <ul className="mt-2 space-y-1 text-sm text-neutral-700">
                      {c.meetingDays.map((m) => (
                        <li key={m.day} className="flex items-center justify-between gap-4">
                          <span className="font-medium">{m.day}</span>
                          <span className="text-neutral-600">{m.time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 flex flex-col sm:flex-row gap-3">
                    <a
                      href={LINKS.falowen}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl bg-brand-950 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-900"
                    >
                      Enroll inside Falowen
                    </a>

                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold hover:bg-neutral-50"
                    >
                      WhatsApp help
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-3xl border border-black/10 bg-white p-6">
            <div className="text-sm font-semibold text-neutral-900">Still have questions?</div>
            <div className="mt-2 text-sm text-neutral-700 leading-6">
              Email <span className="font-semibold">{SITE.email}</span> or use WhatsApp support. Most information
              (dates, fees, and cohorts) is inside Falowen under <span className="font-semibold">Upcoming Classes</span>.
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
