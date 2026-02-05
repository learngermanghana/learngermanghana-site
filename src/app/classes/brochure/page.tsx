import { Container } from "@/components/Container";
import { BrochureAutoPrint } from "@/components/BrochureAutoPrint";
import { BrochurePrintButton } from "@/components/BrochurePrintButton";
import { upcomingClasses, tuitionFeesGHS, goetheExamFeesGHS } from "@/data/content";
import { formatDatePretty } from "@/lib/date";
import { SITE, WHATSAPP_LINK } from "@/lib/site";

function money(amount: number) {
  return `GHS ${amount.toLocaleString("en-GH")}`;
}

export default function ClassesBrochurePage() {
  return (
    <div className="bg-neutral-50 print:bg-white">
      <Container>
        <section className="py-8 sm:py-12">
          <BrochureAutoPrint />
          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm print:border-none print:shadow-none">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between print:hidden">
              <div>
                <div className="text-xs font-semibold uppercase text-neutral-500">Class Brochure</div>
                <h1 className="mt-2 text-2xl sm:text-3xl font-semibold text-neutral-900">
                  Learn Language Education Academy
                </h1>
                <p className="mt-1 text-sm text-neutral-600">
                  Printable summary of upcoming classes, tuition, and contact details.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <BrochurePrintButton />
                <a
                  href="/classes"
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold hover:bg-neutral-50"
                >
                  Back to classes
                </a>
              </div>
            </div>

            <div className="mt-4 print:mt-0">
              <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
                Upcoming classes &amp; schedules
              </h2>
              <p className="mt-2 text-sm text-neutral-700">
                For the latest seat availability, visit learngermanghana.com/classes or register inside Falowen.
              </p>
            </div>

            <div className="mt-6 grid gap-4">
              {upcomingClasses.map((item) => {
                const tuition = item.tuitionFee ?? tuitionFeesGHS[item.level];
                const examFee = item.examFee ?? goetheExamFeesGHS[item.level];
                const examFeeLabel = item.language === "German" ? "Goethe exam fee" : "Exam fee";
                const examFeeDisplay = examFee ? money(examFee) : "Check with provider";

                return (
                  <div key={item.id} className="rounded-2xl border border-black/10 bg-neutral-50 p-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-600">
                      <span className="rounded-full border border-black/10 bg-white px-3 py-1 font-semibold text-neutral-800">
                        {item.language}
                      </span>
                      <span className="rounded-full border border-black/10 bg-white px-3 py-1 font-semibold text-neutral-800">
                        Level {item.level}
                      </span>
                      <span className="rounded-full border border-black/10 bg-white px-3 py-1">
                        Starts {formatDatePretty(item.startDate)}
                      </span>
                      <span className="rounded-full border border-black/10 bg-white px-3 py-1">
                        {item.duration}
                      </span>
                    </div>
                    <div className="mt-3 text-lg font-semibold text-neutral-900">{item.title}</div>
                    <div className="mt-2 text-sm text-neutral-700">
                      <span className="font-semibold">Format:</span> {item.format}
                    </div>
                    <div className="mt-1 text-sm text-neutral-700">
                      <span className="font-semibold">Location:</span> {item.location}
                    </div>
                    <div className="mt-1 text-sm text-neutral-700">
                      <span className="font-semibold">Tuition:</span>{" "}
                      {tuition ? money(tuition) : "Check in Falowen"}
                    </div>
                    <div className="mt-1 text-sm text-neutral-700">
                      <span className="font-semibold">{examFeeLabel}:</span> {examFeeDisplay}
                    </div>
                    <div className="mt-3 text-sm text-neutral-700">
                      <span className="font-semibold">Meeting days:</span>{" "}
                      {item.meetingDays.map((meeting) => `${meeting.day} ${meeting.time}`).join(", ")}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-2xl border border-black/10 bg-white p-4">
              <div className="text-sm font-semibold text-neutral-900">How to enroll</div>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-neutral-700">
                <li>Create a Falowen account.</li>
                <li>Open Upcoming Classes to confirm dates and fees.</li>
                <li>Pay online to receive immediate access.</li>
              </ol>
            </div>

            <div className="mt-6 rounded-2xl border border-black/10 bg-white p-4 text-sm text-neutral-700">
              <div className="text-sm font-semibold text-neutral-900">Contact &amp; share</div>
              <div className="mt-2">
                Email: <span className="font-semibold">{SITE.email}</span>
              </div>
              <div>
                WhatsApp: <a className="font-semibold" href={WHATSAPP_LINK}>+{SITE.phoneIntl}</a>
              </div>
              <div>Website: <span className="font-semibold">www.learngermanghana.com/classes</span></div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
