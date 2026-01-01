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

export default function RegisterPage() {
  return (
    <Container>
      <section className="py-10 sm:py-14">
        {/* Crisp hero card (no faint blur on mobile) */}
        <div className="rounded-[28px] overflow-hidden border border-black/10 bg-white shadow-sm">
          <div className="bg-gradient-to-br from-brand-950 via-brand-900 to-emerald-950 px-6 py-8 sm:px-10 sm:py-10 text-white">
            <div className="text-xs sm:text-sm text-white/90">
              {SITE.name} • Enrollment & Contract
            </div>
            <h1 className="mt-2 text-2xl sm:text-4xl font-semibold tracking-tight">
              Upcoming Classes & How to Enroll
            </h1>
            <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/85 leading-7">
              Enrollment happens inside <span className="font-semibold">Falowen</span>. No manual registration form.
              Choose a class in your Falowen account and pay online to get automatic access.
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
          </div>

          {/* Steps (high contrast on mobile) */}
          <div className="px-6 py-7 sm:px-10 sm:py-10 bg-white">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="rounded-3xl border border-black/10 bg-neutral-50 p-5">
                <div className="text-xs text-neutral-500">Step 1</div>
                <div className="mt-1 text-base font-semibold text-neutral-900">
                  Create your account
                </div>
                <div className="mt-2 text-sm text-neutral-800 leading-6">
                  Go to <span className="font-semibold">www.falowen.app</span> and click <span className="font-semibold">Sign up</span>.
                </div>
              </div>

              <div className="rounded-3xl border border-black/10 bg-neutral-50 p-5">
                <div className="text-xs text-neutral-500">Step 2</div>
                <div className="mt-1 text-base font-semibold text-neutral-900">
                  Choose a class
                </div>
                <div className="mt-2 text-sm text-neutral-800 leading-6">
                  Inside Falowen, open <span className="font-semibold">Upcoming Classes</span> and select your cohort.
                </div>
              </div>

              <div className="rounded-3xl border border-black/10 bg-neutral-50 p-5">
                <div className="text-xs text-neutral-500">Step 3</div>
                <div className="mt-1 text-base font-semibold text-neutral-900">
                  Pay online → get access
                </div>
                <div className="mt-2 text-sm text-neutral-800 leading-6">
                  Pay for the selected class. Access is granted automatically (or as soon as payment is confirmed).
                </div>
              </div>
            </div>

            {/* Help line */}
            <div className="mt-6 rounded-3xl border border-black/10 bg-white p-5">
              <div className="text-sm font-semibold text-neutral-900">Need help?</div>
              <div className="mt-2 text-sm text-neutral-800 leading-6">
                Contact <span className="font-semibold">{SITE.email}</span> or click WhatsApp help above.
                After you enroll, we will contact you inside Falowen (and by email if needed).
              </div>
              <div className="mt-3 text-xs text-neutral-500">
                By enrolling and making payment, you agree to our Privacy Policy, Terms of Service, and Payment Agreement shown on the portal.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming classes list (with fee per class) */}
      <section className="pb-14 sm:pb-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">Upcoming Classes</h2>
          <Link className="text-sm font-semibold text-brand-800 hover:underline" href="/classes">
            View all →
          </Link>
        </div>

        <p className="mt-2 text-sm text-neutral-800">
          Prices are shown below. Exam fees are paid directly to Goethe (separate from school tuition).
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
                  ) : null}
                </div>

                <div className="mt-3 text-lg font-semibold text-neutral-900">{c.title}</div>

                <div className="mt-2 text-sm text-neutral-800">
                  <span className="font-semibold">Starts:</span> {formatDatePretty(c.startDate)}
                </div>

                <div className="mt-4 rounded-2xl border border-black/10 bg-neutral-50 p-4">
                  <div className="text-sm font-semibold text-neutral-900">Meeting days</div>
                  <ul className="mt-2 space-y-1 text-sm text-neutral-800">
                    {c.meetingDays.map((m) => (
                      <li key={m.day} className="flex items-center justify-between gap-4">
                        <span className="font-medium">{m.day}</span>
                        <span className="text-neutral-700">{m.time}</span>
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

        <div className="mt-6 text-sm text-neutral-700">
          Want full details? Visit the portal:{" "}
          <a className="font-semibold text-brand-800 hover:underline" href={LINKS.register} target="_blank" rel="noreferrer">
            register.falowen.app →
          </a>
        </div>
      </section>
    </Container>
  );
}
