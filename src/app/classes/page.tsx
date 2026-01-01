import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { tuitionFeesGHS, upcomingClasses } from "@/data/content";
import { LINKS, SITE, WHATSAPP_LINK } from "@/lib/site";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-black/10 bg-neutral-50 px-3 py-1 text-xs text-neutral-700">
      {children}
    </span>
  );
}

export default function ClassesPage() {
  const formatTuition = (level: keyof typeof tuitionFeesGHS) => {
    const fee = tuitionFeesGHS[level];
    if (!fee) {
      return "Tuition: TBA";
    }
    return `Tuition: GHS ${fee.toLocaleString("en-GH")}`;
  };

  return (
    <Container>
      <section className="py-12 sm:py-16">
        <SectionTitle
          title="Upcoming Classes"
          subtitle="Choose your cohort and enroll inside Falowen."
        />

        {/* HOW TO REGISTER (Top block) */}
        <div className="mt-6 rounded-[28px] bg-gradient-to-br from-brand-950 via-brand-900 to-emerald-900 p-6 sm:p-8 text-white shadow-sm ring-1 ring-black/10">
          <div className="text-sm text-white/80">How to enroll (No registration form)</div>
          <div className="mt-1 text-2xl font-semibold">Register inside Falowen</div>
          <div className="mt-2 text-sm text-white/85 leading-6 max-w-2xl">
            Everything happens inside the Falowen app. You will see class dates and prices before you pay.
          </div>

          <ol className="mt-4 space-y-3 text-sm text-white/90 leading-6">
            <li>
              <span className="font-semibold">1) Create an account:</span>{" "}
              Go to <span className="font-semibold">www.falowen.app</span> and tap <span className="font-semibold">Sign up</span>.
            </li>
            <li>
              <span className="font-semibold">2) Pick your class:</span>{" "}
              Open <span className="font-semibold">Upcoming Classes</span> to view dates, locations, and prices.
            </li>
            <li>
              <span className="font-semibold">3) Pay online:</span>{" "}
              Complete payment to receive automatic access right away.
            </li>
          </ol>

          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <a
              href={LINKS.register}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-amber-300 px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-amber-200 shadow-lg ring-1 ring-black/10"
            >
              Register / Contract
            </a>

            <a
              href="/register"
              className="inline-flex items-center justify-center rounded-2xl border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15"
            >
              Full instructions
            </a>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl border border-white/40 bg-black/20 px-6 py-3 text-sm font-semibold text-white hover:bg-black/30"
            >
              WhatsApp help
            </a>
          </div>

          <div className="mt-4 text-xs text-white/70">
            Need help? Email <span className="font-semibold">{SITE.email}</span> or use WhatsApp support.
          </div>
        </div>

        {/* CLASS CARDS */}
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {upcomingClasses.map((c) => (
            <div key={c.id} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <Pill>Level: {c.level}</Pill>
                <Pill>Format: {c.format}</Pill>
                <Pill>Duration: {c.duration}</Pill>
                <Pill>Schedule: {c.scheduleSummary}</Pill>
              </div>

              <div className="mt-4 text-lg font-semibold">
                {c.title}
              </div>

              <div className="mt-2 text-sm text-neutral-700">
                Start Date: <span className="font-semibold">{c.startDate}</span>
              </div>

              <div className="mt-2 text-sm text-neutral-700">
                Tutor: <span className="font-semibold">{c.tutor}</span>
              </div>

              <div className="mt-2 text-sm text-neutral-700">
                {formatTuition(c.level)}
              </div>

              <div className="mt-4 rounded-2xl border border-black/10 bg-neutral-50 p-4">
                <div className="text-sm font-semibold">Meeting Days</div>
                <ul className="mt-2 space-y-1 text-sm text-neutral-700">
                  {c.meetingDays.map((m) => (
                    <li key={m.day} className="flex items-center justify-between gap-4">
                      <span className="font-medium">{m.day}</span>
                      <span className="text-neutral-600">{m.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <div className="text-sm font-semibold">Bonus</div>
                <ul className="mt-2 space-y-1 text-sm text-neutral-700">
                  {c.bonus.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-2 h-2 w-2 rounded-full bg-brand-600" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Register buttons */}
              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <a
                  href={LINKS.register}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl bg-brand-950 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-900"
                >
                  Register / Contract
                </a>

                <a
                  href="/register"
                  className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold hover:bg-neutral-50"
                >
                  How it works
                </a>
              </div>

              <div className="mt-3 text-xs text-neutral-500">
                Need help? Email {SITE.email} or{" "}
                <a className="font-semibold text-brand-800 hover:underline" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
                  chat on WhatsApp
                </a>.
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
