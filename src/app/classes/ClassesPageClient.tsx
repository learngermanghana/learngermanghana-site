
"use client";

import { useMemo, useState } from "react";

import { Container } from "@/components/Container";
import { upcomingClasses, tuitionFeesGHS, goetheExamFeesGHS } from "@/data/content";
import { getClassPath, getNextIntake } from "@/lib/classes";
import { formatDatePretty, getDaysUntilStart } from "@/lib/date";
import { CTA, LINKS, SITE } from "@/lib/site";

function money(amount: number) {
  return `GHS ${amount.toLocaleString("en-GH")}`;
}

function buildClassShareText(
  classInfo: (typeof upcomingClasses)[number],
  effectiveTuition?: number,
  examFee?: number
) {
  const meetingDays = classInfo.meetingDays.map((item) => `${item.day} ${item.time}`).join("; ");
  const includedItems = classInfo.bonus.slice(0, 3).join(", ");
  const tuitionText = effectiveTuition ? money(effectiveTuition) : "Check in Falowen";
  const goetheFeeText = classInfo.language === "German"
    ? ` | Goethe exam fee: ${examFee ? money(examFee) : "Check Goethe"}`
    : "";

  return [
    `${classInfo.title}`,
    `${classInfo.language} ${classInfo.level} • ${classInfo.format}`,
    `Start: ${formatDatePretty(classInfo.startDate)} | Location: ${classInfo.location}`,
    `Duration: ${classInfo.duration} | Tuition: ${tuitionText}${goetheFeeText}`,
    `Schedule: ${meetingDays}`,
    includedItems ? `Included: ${includedItems}` : "",
    `Enroll: ${LINKS.falowen}`,
    `Support: ${CTA.help.href}`,
  ]
    .filter(Boolean)
    .join("\n");
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
    <div className="rounded-3xl border border-black/10 bg-neutral-50 p-5">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-2xl bg-amber-300 text-neutral-900 font-bold">
          {n}
        </div>
        <div className="text-base font-semibold text-neutral-900">{title}</div>
      </div>
      <p className="mt-3 text-sm leading-6 text-neutral-700">{text}</p>
    </div>
  );
}

function getFormatLabel(format: string) {
  const normalized = format.toLowerCase();

  if (normalized.includes("self-learning")) {
    return "Self-learning";
  }

  if (normalized.includes("hybrid")) {
    return "Hybrid";
  }

  return "Other";
}

export default function ClassesPage() {
  const [shareStatus, setShareStatus] = useState("");
  const [sharedClassId, setSharedClassId] = useState("");
  const nextIntake = useMemo(() => getNextIntake(), []);

  const shareContent = async ({ title, text, url }: { title: string; text: string; url: string }) => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return "Thanks! Your share has been sent.";
      } catch (error) {
        return "Share canceled. You can copy the link instead.";
      }
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      return "Link copied. Share it with family or friends.";
    }

    return "Copy this link: " + url;
  };

  const filteredClasses = upcomingClasses;

  const handleClassShare = async (classInfo: (typeof upcomingClasses)[number]) => {
    const classUrl = `${window.location.origin}${getClassPath(classInfo.id)}`;
    const tuition = tuitionFeesGHS[classInfo.level];
    const effectiveTuition = classInfo.tuitionFee ?? tuition ?? undefined;
    const examFee = classInfo.examFee ?? goetheExamFeesGHS[classInfo.level];
    const message = await shareContent({
      title: `${classInfo.title} • Learn Language Education Academy`,
      text: buildClassShareText(classInfo, effectiveTuition, examFee),
      url: classUrl,
    });

    setSharedClassId(classInfo.id);
    setShareStatus(message);
  };

  return (
    <div className="bg-neutral-50">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-900 to-emerald-950" />
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-amber-300/20 blur-3xl" />
        <div className="absolute -right-40 top-10 h-80 w-80 rounded-full bg-emerald-300/15 blur-3xl" />
        <div className="absolute inset-0 bg-black/35 sm:bg-black/25" />

        <Container>
          <section className="relative py-8 sm:py-10 text-slate-100">
            <div className="inline-flex items-center gap-2 rounded-full bg-black/35 px-4 py-2 text-xs text-slate-100/90 ring-1 ring-white/15">
              <span className="h-2 w-2 rounded-full bg-amber-300" />
              Enrollment • Contract • Support
            </div>

            <h1 className="mt-5 text-2xl sm:text-4xl font-semibold text-white drop-shadow">
              Upcoming Classes & Enrollment
            </h1>

            <p className="mt-2 text-sm sm:text-base text-white/95 leading-7 drop-shadow max-w-3xl">
              <span className="font-semibold">Register inside Falowen.</span> Everything happens inside the Falowen
              app. You will see class dates, tuition, and Goethe exam fees before you pay.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs text-white/90 ring-1 ring-white/15">
              <span className="font-semibold">Location:</span> Awoshie - Accra
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
                href={CTA.primary.href}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl bg-white/10 px-6 py-3 text-sm font-semibold text-slate-100 hover:bg-white/15 ring-1 ring-white/25"
              >
                Register / Contract
              </a>

              <a
                href={CTA.help.href}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl bg-black/25 px-6 py-3 text-sm font-semibold text-slate-100 hover:bg-black/35 ring-1 ring-white/20"
              >
                Talk to us
              </a>
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
            Tuition covers classes only. Exam fees are paid directly to the exam provider when you are ready to sit
            the exam.
          </p>

          {nextIntake ? (
            <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50/70 p-5 shadow-sm">
              <div className="text-xs font-semibold uppercase text-amber-800">Next intake</div>
              <div className="mt-2 text-lg font-semibold text-neutral-900">{nextIntake.title}</div>
              <p className="mt-2 text-sm text-neutral-800">
                {nextIntake.language} {nextIntake.level} starts <span className="font-semibold">{formatDatePretty(nextIntake.startDate)}</span> at <span className="font-semibold">{nextIntake.location}</span>.
              </p>
              <a
                href={getClassPath(nextIntake.id)}
                className="mt-4 inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
              >
                View class details
              </a>
            </div>
          ) : null}

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {filteredClasses.map((c) => {
              const tuition = tuitionFeesGHS[c.level];
              const examFee = c.examFee ?? goetheExamFeesGHS[c.level];
              const formatLabel = getFormatLabel(c.format);
              const isAlwaysOpen = c.startDate === "Always open";
              const effectiveTuition = c.tuitionFee ?? tuition;
              const daysUntilStart = getDaysUntilStart(c.startDate);

              return (
                <div id={c.id} key={c.id} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-black/10 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-800">
                      {c.language}
                    </span>
                    <span className="rounded-full border border-black/10 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-800">
                      Level: {c.level}
                    </span>
                    <span className="rounded-full border border-black/10 bg-neutral-50 px-3 py-1 text-xs text-neutral-700">
                      {formatLabel}
                    </span>
                    <span className="rounded-full border border-black/10 bg-neutral-50 px-3 py-1 text-xs text-neutral-700">
                      {c.duration}
                    </span>
                    {isAlwaysOpen ? (
                      <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        Self-paced / Always open
                      </span>
                    ) : null}
                    <span className="rounded-full border border-black/10 bg-amber-100 px-3 py-1 text-xs font-semibold text-neutral-900">
                      Tuition: {effectiveTuition ? money(effectiveTuition) : "Check in Falowen"}
                    </span>
                    {c.language === "German" ? (
                      <span className="rounded-full border border-black/10 bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900">
                        Goethe exam fee: {examFee ? money(examFee) : "Check Goethe"}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-3 text-lg font-semibold text-neutral-900">{c.title}</div>

                  <div className="mt-2 text-sm text-neutral-700">
                    <span className="font-semibold">Starts:</span> {formatDatePretty(c.startDate)}
                  </div>
                  {daysUntilStart !== null ? (
                    <div className="mt-1 text-xs font-semibold text-amber-700">
                      {daysUntilStart <= 0
                        ? "Starts today"
                        : `${daysUntilStart} day${daysUntilStart === 1 ? "" : "s"} remaining`}
                    </div>
                  ) : null}

                  <div className="mt-2 text-sm text-neutral-700">
                    <span className="font-semibold">Location:</span> {c.location}
                  </div>

                  <div className="mt-2 text-sm text-neutral-700">
                    <span className="font-semibold">Format:</span> {c.format}
                  </div>

                  {c.language === "German" ? (
                    <div className="mt-2 text-sm text-neutral-700">
                      Tuition covers classes only. Exams are paid directly to Goethe-Institut.
                    </div>
                  ) : null}

                  <div className="mt-4 rounded-2xl border border-black/10 bg-white p-4">
                    <div className="text-sm font-semibold text-neutral-900">What&apos;s included</div>
                    <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-neutral-700">
                      {c.bonus.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  {c.level === "A1" ? (
                    <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm text-neutral-800">
                      <div className="text-sm font-semibold text-neutral-900">Class session length &amp; assignments</div>
                      <p className="mt-1 text-sm text-neutral-700 leading-6">
                        Each live class is <span className="font-semibold">1 hour</span>. After every session, students
                        receive assignments to complete at their own pace before the next class.
                      </p>
                    </div>
                  ) : null}

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
                      href={getClassPath(c.id)}
                      className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold hover:bg-neutral-50"
                    >
                      Class details
                    </a>

                    <a
                      href={LINKS.falowen}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold hover:bg-neutral-50"
                    >
                      Enroll inside Falowen
                    </a>

                    <a
                      href={CTA.help.href}
                      className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold hover:bg-neutral-50"
                    >
                      Talk to us
                    </a>

                    <button
                      type="button"
                      onClick={() => handleClassShare(c)}
                      className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold hover:bg-neutral-50"
                    >
                      Share this class
                    </button>
                  </div>

                  {sharedClassId === c.id && shareStatus ? (
                    <div className="mt-3 text-xs text-neutral-500">{shareStatus}</div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-3xl border border-black/10 bg-white p-6">
            <div className="text-lg font-semibold text-neutral-900">How enrollment works</div>
            <p className="mt-1 text-sm text-neutral-700">
              Register inside Falowen to see dates, locations, and prices before you pay.
            </p>
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
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
          </div>

          <div className="mt-8 rounded-3xl border border-black/10 bg-white p-6">
            <div className="text-lg font-semibold text-neutral-900">Download the class brochure</div>
            <p className="mt-1 text-sm text-neutral-700">
              Need a printable summary? Open the brochure and use the print button to save it as a PDF.
            </p>
            <div className="mt-4">
              <a
                href="/classes/brochure"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold shadow-sm transition hover:bg-neutral-50"
              >
                Open brochure
              </a>
            </div>
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
