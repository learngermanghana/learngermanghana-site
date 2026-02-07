import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { upcomingClasses } from "@/data/content";
import { formatDatePretty } from "@/lib/date";
import { CTA, WHATSAPP_LINK } from "@/lib/site";

function getTimeValue(dateStr: string) {
  if (!dateStr || dateStr === "TBA") return Number.POSITIVE_INFINITY;
  const time = new Date(dateStr).getTime();
  return Number.isFinite(time) ? time : Number.POSITIVE_INFINITY;
}

const sortedClasses = [...upcomingClasses].sort((a, b) => getTimeValue(a.startDate) - getTimeValue(b.startDate));

export default function SchedulePage() {
  return (
    <div className="bg-neutral-50">
      <Container>
        <section className="py-12 sm:py-16">
          <SectionTitle
            title="Class Schedule"
            subtitle="Browse upcoming German and French classes with start dates, weekly schedules, and learning formats."
          />

          <div className="grid gap-4 lg:grid-cols-2">
            {sortedClasses.map((item) => (
              <div key={item.id} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-600">
                  <span className="rounded-full bg-amber-100 px-3 py-1 font-semibold text-amber-900">
                    {item.language} • {item.level}
                  </span>
                  <span className="rounded-full bg-neutral-100 px-3 py-1 font-medium">{item.location}</span>
                </div>

                <div className="mt-3 text-lg font-semibold text-neutral-900">{item.title}</div>
                <div className="mt-2 text-sm text-neutral-700">
                  <span className="font-semibold">Starts:</span> {formatDatePretty(item.startDate)}
                </div>
                <div className="mt-1 text-sm text-neutral-700">
                  <span className="font-semibold">Format:</span> {item.format}
                </div>
                <div className="mt-1 text-sm text-neutral-700">
                  <span className="font-semibold">Duration:</span> {item.duration}
                </div>

                <div className="mt-4">
                  <div className="text-sm font-semibold text-neutral-900">Weekly schedule</div>
                  <ul className="mt-2 space-y-2 text-sm text-neutral-700">
                    {item.meetingDays.map((slot) => (
                      <li key={`${item.id}-${slot.day}`} className="flex justify-between gap-2">
                        <span>{slot.day}</span>
                        <span className="text-neutral-600">{slot.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.bonus.map((bonus) => (
                    <span
                      key={`${item.id}-${bonus}`}
                      className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900"
                    >
                      {bonus}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 rounded-3xl border border-black/10 bg-white p-6 text-sm text-neutral-700 shadow-sm sm:grid-cols-[1.3fr_1fr] sm:items-center">
            <div>
              <div className="text-base font-semibold text-neutral-900">Ready to enroll?</div>
              <p className="mt-2">
                Register on Falowen to secure your seat. Need help choosing the best schedule? Chat with our team.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:items-end">
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
                WhatsApp support
              </a>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
