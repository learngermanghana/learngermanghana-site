import Link from "next/link";
import { Container } from "@/components/Container";
import { upcomingClasses } from "@/data/content";
import { LINKS, SITE, WHATSAPP_LINK } from "@/lib/site";
import { formatDatePretty } from "@/lib/date";

function feeFor(level: string) {
  const lvl = (level || "").toUpperCase();
  if (lvl.startsWith("A1")) return 2800;
  if (lvl.startsWith("A2")) return 3000;
  if (lvl.startsWith("B1")) return 3000;
  return null;
}

function money(n: number) {
  return `GHS ${n.toLocaleString("en-GH")}`;
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
        <div className="text-base font-semibold text-white">{title}</div>
      </div>
      <p className="mt-3 text-sm leading-6 text-white/85">{text}</p>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="bg-neutral-50">
      {/* Top gradient band so page doesn't feel plain white */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-900 to-emerald-950" />
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-amber-300/20 blur-3xl" />
        <div className="absolute -right-40 top-10 h-80 w-80 rounded-full bg-emerald-300/15 blur-3xl" />
        <div className="absolute inset-0 bg-black/35 sm:bg-black/25" />

        <Container>
          <section className="relative py-10 sm:py-14 text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-black/35 px-4 py-2 text-xs text-white/90 ring-1 ring-white/15">
              <span className="h-2 w-2 rounded-full bg-amber-300" />
              Enrollment • Contract • Support
            </div>

            <h1 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-tight">
              How to enroll (No registration form)
            </h1>

            <p className="mt-3 max-w-2xl text-white/85 text-sm sm:text-base leading-7">
              Register inside Falowen. You will see class dates and prices before you pay.
              After payment, you get automatic access and we contact you inside the app (and by email if needed).
            </p>

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
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15 ring-1 ring-white/25"
              >
                Register / Contract
              </a>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl bg-black/25 px-6 py-3 text-sm font-semibold text-white hover:bg-black/35 ring-1 ring-white/20"
              >
                WhatsApp help
              </a>
            </div>

            {/* Steps card row */}
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

      {/* Upcoming classes list (white cards, but page is now tinted and premium) */}
      <Container>
        <section className="pb-14 sm:pb-20 pt-8">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">Upcoming Classes</h2>
            <Link className="text-sm font-semibold text-brand-800 hover:underline" href="/classes">
              View all →
            </Link>
          </div>

          <p className="mt-2 text-sm text-neutral-700">
            Tuition is shown per class below. Exam fees are paid directly to Goethe (separate from school tuition).
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {upcomingClasses.map((c) => {
              const fee = feeFor(c.level);
              return (
                <div key={c.id} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-black/10 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-800">
                      {c.level}
                    </span>
                    <span className="rounded-full border border-black/10 bg-neutral-50 px-3 py-1 text-xs text-neutral-700">
                      {c.format}
                    </span>
                    <span className="rounded-full border border-black/10 bg-neutral-50 px-3 py-1 text-xs text-neutral-700">
                      {c.duration}
                    </span>

                    {fee ? (
                      <span className="rounded-full border border-black/10 bg-amber-100 px-3 py-1 text-xs font-semibold text-neutral-900">
                        Fee: {money(fee)}
                      </span>
                    ) : (
                      <span className="rounded-full border border-black/10 bg-neutral-50 px-3 py-1 text-xs text-neutral-700">
                        Fee: Check in Falowen
                      </span>
                    )}
                  </div>

                  <div className="mt-3 text-lg font-semibold text-neutral-900">{c.title}</div>

                  <div className="mt-2 text-sm text-neutral-700">
                    <span className="font-semibold">Starts:</span> {formatDatePretty(c.startDate)}
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
              Email <span className="font-semibold">{SITE.email}</span> or use WhatsApp support.
              Most information (dates, fees, and cohorts) is inside Falowen under <span className="font-semibold">Upcoming Classes</span>.
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
